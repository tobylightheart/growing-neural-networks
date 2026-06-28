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

PDF_STATUSES = {"missing", "located", "collected", "blocked", "not-needed"}
TEXT_STATUSES = {"missing", "extracted", "extraction-failed", "needs-ocr", "not-needed"}
ACCESS_STATUSES = {"open", "publisher-gated", "author-copy", "unknown"}
REVIEW_BUNDLE_STATUSES = {"active", "planned", "seeded", "paused"}
REVIEW_BUNDLE_PRIORITIES = {"urgent", "high", "medium", "low"}
REVIEW_BUNDLE_ASSET_STATUSES = {
    "existing-paper",
    "collected-needs-paper-record",
    "available-in-library",
    "missing-from-library",
    "needs-filename-check",
    "deprioritized",
}


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


def load_local_library_root() -> Path:
    """Return the configured private paper-library root.

    The real local config is intentionally ignored by Git. If absent, use the
    checked-in example/default sibling-directory convention.
    """
    config_path = DATA / "local-library.json"
    if config_path.exists():
        config = load_json(config_path)
    else:
        config = load_json(DATA / "local-library.example.json")
    library_root = config.get("library_root", "../growing-neural-networks-library")
    return (ROOT / library_root).resolve()


def is_relative_to(path: Path, parent: Path) -> bool:
    try:
        path.resolve().relative_to(parent.resolve())
        return True
    except ValueError:
        return False


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
    paper_assets = load_json(ROOT / catalog.get("paper_assets", "data/paper-assets.json"))
    review_bundles_data = load_json(ROOT / catalog.get("review_bundles", "data/review-bundles.json"))
    library_root = load_local_library_root()

    paper_ids = check_unique(papers, "id", "papers")
    algorithm_ids = check_unique(algorithms, "id", "algorithms")
    theme_ids = check_unique(themes, "id", "themes")
    source_ids = check_unique(sources, "id", "sources")
    module_ids = check_unique(modules, "id", "modules") if modules else set()
    exercise_ids = check_unique(exercises, "id", "exercises") if exercises else set()
    asset_paper_ids = check_unique(paper_assets, "paper_id", "paper assets") if paper_assets else set()

    if not isinstance(review_bundles_data, dict):
        fail("review bundles file must contain an object")
    review_bundles = review_bundles_data.get("bundles", [])
    if not isinstance(review_bundles, list):
        fail("review bundles `bundles` must be a list")
    review_bundle_ids = check_unique(review_bundles, "id", "review bundles") if review_bundles else set()

    missing_asset_records = sorted(paper_ids - asset_paper_ids)
    extra_asset_records = sorted(asset_paper_ids - paper_ids)
    if missing_asset_records:
        fail(f"missing paper asset records for: {', '.join(missing_asset_records)}")
    if extra_asset_records:
        fail(f"paper asset records reference unknown papers: {', '.join(extra_asset_records)}")

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
        for algorithm_id in module.get("algorithms", []):
            if algorithm_id not in algorithm_ids:
                fail(f"{context} references unknown algorithm: {algorithm_id}")

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

    for asset in paper_assets:
        context = f"paper asset {asset.get('paper_id', '<missing>')}"
        require_keys(asset, ["paper_id", "pdf_status", "text_status", "access", "local_private_only"], context)
        if asset["pdf_status"] not in PDF_STATUSES:
            fail(f"{context} has invalid pdf_status: {asset['pdf_status']}")
        if asset["text_status"] not in TEXT_STATUSES:
            fail(f"{context} has invalid text_status: {asset['text_status']}")
        if asset["access"] not in ACCESS_STATUSES:
            fail(f"{context} has invalid access: {asset['access']}")
        if asset.get("local_private_only") is not True:
            warn(f"{context} is not marked local_private_only=true; confirm this is intentional")

        pdf_path_value = asset.get("pdf_local_path")
        text_path_value = asset.get("text_local_path")
        if asset["pdf_status"] == "collected":
            if not pdf_path_value:
                fail(f"{context} is collected but missing pdf_local_path")
            pdf_path = (ROOT / pdf_path_value).resolve()
            if not is_relative_to(pdf_path, library_root):
                fail(f"{context} pdf path is outside local library root: {pdf_path_value}")
            if not pdf_path.exists():
                fail(f"{context} pdf_status is collected but file is missing: {pdf_path_value}")
        elif pdf_path_value:
            pdf_path = (ROOT / pdf_path_value).resolve()
            if not is_relative_to(pdf_path, library_root):
                fail(f"{context} pdf path is outside local library root: {pdf_path_value}")

        if asset["text_status"] == "extracted":
            if not text_path_value:
                fail(f"{context} is extracted but missing text_local_path")
            text_path = (ROOT / text_path_value).resolve()
            if not is_relative_to(text_path, library_root):
                fail(f"{context} text path is outside local library root: {text_path_value}")
            if not text_path.exists():
                fail(f"{context} text_status is extracted but file is missing: {text_path_value}")
        elif text_path_value:
            text_path = (ROOT / text_path_value).resolve()
            if not is_relative_to(text_path, library_root):
                fail(f"{context} text path is outside local library root: {text_path_value}")

    for bundle in review_bundles:
        context = f"review bundle {bundle.get('id', '<missing>')}"
        require_keys(bundle, ["id", "title", "priority", "status", "rationale"], context)
        if bundle["priority"] not in REVIEW_BUNDLE_PRIORITIES:
            fail(f"{context} has invalid priority: {bundle['priority']}")
        if bundle["status"] not in REVIEW_BUNDLE_STATUSES:
            fail(f"{context} has invalid status: {bundle['status']}")
        anchor_papers = bundle.get("anchor_papers", [])
        if not isinstance(anchor_papers, list):
            fail(f"{context} anchor_papers must be a list")
        seen_bundle_papers: set[str] = set()
        for anchor in anchor_papers:
            if not isinstance(anchor, dict):
                fail(f"{context} anchor paper entries must be objects")
            require_keys(anchor, ["paper_id", "title", "role", "asset_status"], f"{context} anchor paper")
            paper_id = anchor["paper_id"]
            if paper_id in seen_bundle_papers:
                fail(f"{context} repeats anchor paper: {paper_id}")
            seen_bundle_papers.add(paper_id)
            if anchor["asset_status"] not in REVIEW_BUNDLE_ASSET_STATUSES:
                fail(f"{context} anchor {paper_id} has invalid asset_status: {anchor['asset_status']}")
            if anchor["asset_status"] == "existing-paper" and paper_id not in paper_ids:
                fail(f"{context} marks unknown paper as existing-paper: {paper_id}")
        for action in bundle.get("next_actions", []):
            if not isinstance(action, str) or not action.strip():
                fail(f"{context} has blank next action")
        for output in bundle.get("planned_outputs", []):
            if not isinstance(output, str) or not output.strip():
                fail(f"{context} has blank planned output")

    print("Data validation passed:")
    print(f"  papers:     {len(papers)}")
    print(f"  algorithms: {len(algorithms)}")
    print(f"  themes:     {len(themes)}")
    print(f"  sources:    {len(sources)}")
    print(f"  modules:    {len(module_ids)}")
    print(f"  exercises:  {len(exercise_ids)}")
    print(f"  assets:     {len(asset_paper_ids)}")
    print(f"  bundles:    {len(review_bundle_ids)}")
    print(f"  library:    {library_root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
