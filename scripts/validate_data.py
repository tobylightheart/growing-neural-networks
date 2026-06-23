#!/usr/bin/env python3
"""Validate the static literature-review data files.

This intentionally uses only the Python standard library so it can run anywhere
GitHub Pages-compatible static files can be edited.
"""

from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"


def load_json(path: Path) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        fail(f"missing JSON file: {path.relative_to(ROOT)}")
    except json.JSONDecodeError as exc:
        fail(f"invalid JSON in {path.relative_to(ROOT)}: {exc}")


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def warn(message: str) -> None:
    print(f"WARN: {message}")


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT))


def require_keys(record: dict[str, Any], keys: list[str], context: str) -> None:
    for key in keys:
        if key not in record or record[key] in (None, "", []):
            fail(f"{context} missing required key: {key}")


def load_catalog() -> dict[str, Any]:
    catalog = load_json(DATA / "catalog.json")
    require_keys(catalog, ["schema_version", "papers", "algorithms", "themes", "sources"], "catalog")
    return catalog


def load_papers(catalog: dict[str, Any]) -> list[dict[str, Any]]:
    papers: list[dict[str, Any]] = []
    for paper_file in catalog.get("papers", []):
        path = ROOT / paper_file
        chunk = load_json(path)
        if not isinstance(chunk, list):
            fail(f"paper file must contain a list: {paper_file}")
        papers.extend(chunk)
    return papers


def check_unique(records: list[dict[str, Any]], field: str, context: str) -> set[str]:
    raw_values = [record.get(field) for record in records]
    missing = [i for i, value in enumerate(raw_values) if not value]
    if missing:
        fail(f"{context} has records missing {field}: indexes {missing}")
    values = [str(value) for value in raw_values]
    counts = Counter(values)
    duplicates = sorted(value for value, count in counts.items() if count > 1)
    if duplicates:
        fail(f"duplicate {field} in {context}: {', '.join(duplicates)}")
    return set(values)


def main() -> int:
    catalog = load_catalog()
    papers = load_papers(catalog)
    algorithms = load_json(ROOT / catalog["algorithms"])
    themes = load_json(ROOT / catalog["themes"])
    sources = load_json(ROOT / catalog["sources"])
    modules = load_json(ROOT / catalog.get("modules", "data/modules.json"))
    exercises = load_json(ROOT / catalog.get("exercises", "data/exercises.json"))

    paper_ids = check_unique(papers, "id", "papers")
    algorithm_ids = check_unique(algorithms, "id", "algorithms")
    theme_ids = check_unique(themes, "id", "themes")
    source_ids = check_unique(sources, "id", "sources")
    module_ids = check_unique(modules, "id", "modules") if modules else set()
    exercise_ids = check_unique(exercises, "id", "exercises") if exercises else set()

    seen_external_ids: dict[str, str] = {}

    for paper in papers:
        context = f"paper {paper.get('id', '<missing>')}"
        require_keys(paper, ["id", "title", "authors", "year", "status", "summary"], context)
        if paper.get("review"):
            review_path = ROOT / paper["review"]
            if not review_path.exists():
                fail(f"{context} points to missing review: {paper['review']}")
        for related in paper.get("related", []):
            if related not in paper_ids:
                fail(f"{context} references unknown related paper: {related}")
        for theme in paper.get("themes", []):
            if theme not in theme_ids:
                fail(f"{context} references unknown theme: {theme}")
        for source in paper.get("discovered_via", []):
            if source not in source_ids:
                fail(f"{context} references unknown source: {source}")
        links = paper.get("links", {}) or {}
        for external_key in ("doi", "semantic_scholar", "paper", "pdf"):
            value = links.get(external_key)
            if value:
                composite = f"{external_key}:{value}"
                if composite in seen_external_ids:
                    fail(f"duplicate external id/link {composite} on {paper['id']} and {seen_external_ids[composite]}")
                seen_external_ids[composite] = paper["id"]

    for algorithm in algorithms:
        context = f"algorithm {algorithm.get('id', '<missing>')}"
        require_keys(algorithm, ["id", "name", "summary"], context)
        for theme in algorithm.get("themes", []):
            if theme not in theme_ids:
                fail(f"{context} references unknown theme: {theme}")
        for paper_id in algorithm.get("papers", []):
            if paper_id not in paper_ids:
                fail(f"{context} references unknown paper: {paper_id}")

    for module in modules:
        context = f"module {module.get('id', '<missing>')}"
        require_keys(module, ["id", "title", "type", "status", "summary"], context)
        if module.get("status") == "available":
            require_keys(module, ["entry"], context)
            entry_path = ROOT / module["entry"]
            if not entry_path.exists():
                fail(f"{context} points to missing entry: {module['entry']}")
        for paper_id in module.get("papers", []):
            if paper_id not in paper_ids:
                fail(f"{context} references unknown paper: {paper_id}")
        for concept in module.get("concepts", []):
            if concept not in theme_ids:
                fail(f"{context} references unknown concept/theme: {concept}")

    for exercise in exercises:
        context = f"exercise {exercise.get('id', '<missing>')}"
        require_keys(exercise, ["id", "title", "type", "status"], context)
        for paper_id in exercise.get("papers", []):
            if paper_id not in paper_ids:
                fail(f"{context} references unknown paper: {paper_id}")
        for concept in exercise.get("concepts", []):
            if concept not in theme_ids:
                fail(f"{context} references unknown concept/theme: {concept}")

    for source in sources:
        for paper_id in source.get("added", []) + source.get("needs_triage", []) + source.get("rejected", []):
            if paper_id not in paper_ids:
                fail(f"source {source['id']} references unknown paper: {paper_id}")

    print("Data validation passed:")
    print(f"  papers:     {len(papers)}")
    print(f"  algorithms: {len(algorithms)}")
    print(f"  themes:     {len(themes)}")
    print(f"  sources:    {len(sources)}")
    print(f"  modules:    {len(module_ids)}")
    print(f"  exercises:  {len(exercise_ids)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
