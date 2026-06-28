#!/usr/bin/env python3
"""Check bundle-first wanted assets against the private paper library.

The repository deliberately keeps PDFs outside Git. This script scans the local
library filenames and reports whether entries in data/missing-library-assets.json
still look missing, have an exact expected-path match, or have likely filename
matches that need a human check.

By default the script only reports. Use --apply to update collection_status in
missing-library-assets.json for exact expected-path matches and strong/likely
filename matches.
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
DEFAULT_LIBRARY_ROOT = "../growing-neural-networks-library"

STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "based",
    "by",
    "for",
    "from",
    "in",
    "into",
    "is",
    "learning",
    "method",
    "models",
    "network",
    "networks",
    "neural",
    "of",
    "on",
    "online",
    "rule",
    "spike",
    "spiking",
    "the",
    "through",
    "timing",
    "to",
    "with",
}

STATUS_EXACT = "collected-needs-paper-record"
STATUS_LIKELY = "needs-filename-check"
STATUS_MISSING = "missing-from-library"


@dataclass
class LibraryFile:
    path: Path
    relative: str
    normalized_name: str
    tokens: set[str]


@dataclass
class MatchResult:
    status: str
    reason: str
    matches: list[tuple[int, str]]


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Any) -> None:
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def normalize(text: str) -> str:
    text = text.casefold()
    text = text.replace("é", "e").replace("è", "e").replace("ê", "e")
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return " ".join(text.split())


def tokens(text: str) -> set[str]:
    return {token for token in normalize(text).split() if len(token) > 2 and token not in STOPWORDS}


def surname(author: str) -> str:
    author = author.strip()
    if not author:
        return ""
    if "," in author:
        return normalize(author.split(",", 1)[0]).split()[0]
    parts = normalize(author).split()
    return parts[-1] if parts else ""


def load_local_library_root() -> Path:
    config_path = DATA / "local-library.json"
    if config_path.exists():
        config = load_json(config_path)
    else:
        config = load_json(DATA / "local-library.example.json")
    return (ROOT / config.get("library_root", DEFAULT_LIBRARY_ROOT)).resolve()


def scan_library(library_root: Path) -> list[LibraryFile]:
    if not library_root.exists():
        return []
    out: list[LibraryFile] = []
    for path in library_root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".pdf", ".ps", ".doc", ".docx", ".txt", ".md"}:
            continue
        relative = str(path.relative_to(library_root))
        normalized_name = normalize(path.stem)
        out.append(LibraryFile(path, relative, normalized_name, tokens(path.stem)))
    return out


def wanted_file_path() -> Path:
    catalog = load_json(DATA / "catalog.json")
    return ROOT / catalog.get("missing_library_assets", "data/missing-library-assets.json")


def score_asset(asset: dict[str, Any], library_files: list[LibraryFile]) -> MatchResult:
    expected = asset.get("expected_local_path")
    if expected:
        expected_path = (ROOT / expected).resolve()
        if expected_path.exists():
            return MatchResult(STATUS_EXACT, "expected_local_path exists", [(100, str(expected_path))])

    title_tokens = tokens(asset.get("title", ""))
    author_surnames = {surname(author) for author in asset.get("authors", []) if surname(author)}
    year = str(asset.get("year", "") or "")
    doi = normalize(asset.get("doi", ""))

    scored: list[tuple[int, str]] = []
    for file in library_files:
        score = 0
        reasons: list[str] = []

        if year and year in file.tokens:
            score += 18
            reasons.append("year")

        author_hits = sorted(author_surnames & file.tokens)
        if author_hits:
            score += min(30, 12 * len(author_hits))
            reasons.append("author:" + "/".join(author_hits[:3]))

        title_hits = sorted(title_tokens & file.tokens)
        if title_tokens:
            title_ratio = len(title_hits) / len(title_tokens)
            score += int(55 * title_ratio)
            if title_ratio >= 0.5:
                reasons.append(f"title:{len(title_hits)}/{len(title_tokens)}")

        if doi and doi in file.normalized_name:
            score += 40
            reasons.append("doi")

        # Avoid surfacing generic matches that only share words like neural/STDP.
        if not author_hits and len(title_hits) < 3:
            continue

        if score >= 35:
            scored.append((score, f"{file.relative} ({', '.join(reasons)})"))

    scored.sort(key=lambda item: (-item[0], item[1]))
    top = scored[:5]
    if top and top[0][0] >= 75:
        return MatchResult(STATUS_LIKELY, "strong likely filename match", top)
    if top:
        return MatchResult(STATUS_LIKELY, "possible filename match", top)
    return MatchResult(STATUS_MISSING, "no likely filename match", [])


def iter_assets(data: dict[str, Any]) -> list[tuple[dict[str, Any], dict[str, Any]]]:
    rows: list[tuple[dict[str, Any], dict[str, Any]]] = []
    for bundle in data.get("bundles", []):
        for asset in bundle.get("wanted_assets", []):
            rows.append((bundle, asset))
    return rows


def print_report(data: dict[str, Any], results: dict[str, MatchResult], library_root: Path) -> None:
    rows = iter_assets(data)
    counts = {STATUS_EXACT: 0, STATUS_LIKELY: 0, STATUS_MISSING: 0}
    for _bundle, asset in rows:
        result = results[asset["paper_id_suggestion"]]
        counts[result.status] = counts.get(result.status, 0) + 1

    print("Missing library asset scan")
    print(f"  library: {library_root}")
    print(f"  wanted assets: {len(rows)}")
    print(f"  exact collected: {counts.get(STATUS_EXACT, 0)}")
    print(f"  needs filename check: {counts.get(STATUS_LIKELY, 0)}")
    print(f"  still missing: {counts.get(STATUS_MISSING, 0)}")

    current_bundle = None
    for bundle, asset in rows:
        if current_bundle != bundle["id"]:
            current_bundle = bundle["id"]
            print(f"\n[{bundle['id']}] {bundle.get('title', '')}")
        result = results[asset["paper_id_suggestion"]]
        previous = asset.get("collection_status", "")
        marker = "" if previous == result.status else f" (was {previous})"
        print(f"  - {asset['paper_id_suggestion']}: {result.status}{marker}")
        print(f"    {asset.get('title', '')}")
        print(f"    reason: {result.reason}")
        for score, match in result.matches:
            print(f"    candidate[{score}]: {match}")


def apply_results(data: dict[str, Any], results: dict[str, MatchResult]) -> bool:
    changed = False
    for _bundle, asset in iter_assets(data):
        key = asset["paper_id_suggestion"]
        new_status = results[key].status
        if asset.get("collection_status") != new_status:
            asset["collection_status"] = new_status
            changed = True
    return changed


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="update collection_status values in data/missing-library-assets.json")
    args = parser.parse_args()

    path = wanted_file_path()
    data = load_json(path)
    library_root = load_local_library_root()
    library_files = scan_library(library_root)

    results = {
        asset["paper_id_suggestion"]: score_asset(asset, library_files)
        for _bundle, asset in iter_assets(data)
    }
    print_report(data, results, library_root)

    if args.apply:
        changed = apply_results(data, results)
        if changed:
            write_json(path, data)
            print(f"\nUpdated {path.relative_to(ROOT)}")
        else:
            print("\nNo status changes to apply.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
