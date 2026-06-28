# Local Paper Library

The website repository tracks paper metadata and reviews, but not paper PDFs.

Use a sibling local/cloud-synced directory for private research assets:

```text
/workspace/
├── growing-neural-networks/          # Git repository
└── growing-neural-networks-library/  # local/cloud-synced assets, not Git-tracked
    ├── pdfs/
    ├── text/
    └── metadata/
```

This keeps the GitHub Pages repository lightweight and avoids accidentally publishing copyrighted PDFs, while still giving Hermes a stable place to read collected papers and extracted text.

## Tracked inventory

The repository tracks asset state for papers already promoted into the public corpus in:

```text
data/paper-assets.json
```

Each paper in `data/papers.json` should have exactly one matching asset record.

A separate bundle-first wanted list highlights prominent missing PDFs before they are promoted into formal paper records:

```text
data/missing-library-assets.json
```

The broader bundle roadmap lives in:

```text
data/review-bundles.json
docs/pdf-library-review-plan.md
```

Use the wanted list for collection planning across topic bundles, especially thesis-critical papers that should not yet pollute `data/papers.json` with stubs. Use the bundle roadmap to decide which collected asset should be promoted next.

To scan the wanted list against the private library filenames, run:

```bash
python3 scripts/check_missing_library_assets.py
```

The script reports exact expected-path matches, likely filename matches that need a human check, and entries that still look missing. To update `collection_status` values in the wanted list after adding files, run:

```bash
python3 scripts/check_missing_library_assets.py --apply
```

Example:

```json
{
  "paper_id": "fahlman-1990-cascade-correlation",
  "pdf_status": "missing",
  "text_status": "missing",
  "access": "unknown",
  "local_private_only": true,
  "pdf_local_path": "../growing-neural-networks-library/pdfs/fahlman-1990-cascade-correlation.pdf",
  "text_local_path": "../growing-neural-networks-library/text/fahlman-1990-cascade-correlation.md",
  "source_url": "",
  "last_checked": "",
  "notes": "Local PDF/text assets have not been collected yet."
}
```

## Status values

`pdf_status`:

- `missing` — no local PDF has been collected.
- `located` — a likely source URL is known, but the PDF is not stored locally.
- `collected` — a local PDF exists at `pdf_local_path`.
- `blocked` — collection is blocked by access, licensing, or quality problems.
- `not-needed` — no PDF is needed for this record.

`text_status`:

- `missing` — no local extracted text exists.
- `extracted` — Markdown/text extraction exists at `text_local_path`.
- `extraction-failed` — extraction was attempted but failed.
- `needs-ocr` — the PDF appears scanned or otherwise needs OCR.
- `not-needed` — no extracted text is needed.

`access`:

- `open`
- `publisher-gated`
- `author-copy`
- `unknown`

## Local configuration

The default convention is the sibling directory:

```text
../growing-neural-networks-library
```

If a machine uses a different cloud-synced path, copy:

```text
data/local-library.example.json
```

to:

```text
data/local-library.json
```

and edit the local path. `data/local-library.json` is ignored by Git.

## Recommended workflow

1. Discovery adds paper metadata and a `paper-assets.json` record with `pdf_status: missing`.
2. Manual or future asset-collection jobs locate open PDFs only.
3. PDFs are saved outside Git under the local library.
4. Text is extracted to `text/<paper-id>.md`.
5. `data/paper-assets.json` is updated and committed.
6. Review jobs prefer extracted local text when available, then fall back to web extraction/search.

## Validation

Run:

```bash
python3 scripts/validate_data.py
```

The validator checks that:

- every paper has exactly one asset record;
- asset records reference real paper IDs;
- statuses use known values;
- collected PDFs exist locally;
- extracted text files exist locally;
- asset paths stay inside the configured local library root.

The validator allows `missing`, `located`, `blocked`, and `not-needed` assets to point at future local paths without requiring the files to exist yet.

## Publishing policy

Do not commit PDFs or extracted full-text files unless explicitly intended and legally safe. The default is private/local use only.

The website can later expose high-level asset status, but should not publish local paths or private files.
