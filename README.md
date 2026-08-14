# Growing Neural Networks

An interactive literature review and runnable lab for constructive and growing
neural networks.

The GitHub Pages site combines structured paper metadata, public Markdown
reviews, algorithm and concept pages, interactive modules, exercises, and small
inspectable experiments. The former companion lab was merged into this
repository with its history preserved; this repository and its existing Pages
URL are now the primary home for both explanation and execution.

## Repository map

- `index.html` and `pages/` — the primary static literature-garden site.
- `data/catalog.json`, `data/papers.json`, and `reviews/` — bibliography and
  public review drafts.
- `modules/` and `exercises/` — interactive teaching artifacts.
- `labs/` — pure-Python mechanisms, deterministic traces, direct tests, and
  static browser demonstrations.
- `data/experiments.json` and `data/lab-algorithms.json` — runnable-lab
  registries, kept separate from the review-oriented `data/algorithms.json`.
- `scripts/validate_lab.py` — executes every declared lab script and test and
  checks that committed trace snapshots match fresh output.
- `cascade_correlation/` — the repaired historical Python entry points.

The lab's claim boundary remains deliberately modest: these are educational toy
mechanisms unless a lab explicitly demonstrates a fuller paper reproduction.
Dependencies stay light and there is no site build step.

## Preview locally

Because the site uses `fetch()` to load JSON and Markdown files, serve it over a
local HTTP server rather than opening files directly:

```bash
cd /workspace/growing-neural-networks
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. The runnable experiments are under
`http://localhost:8000/labs/`; for example:

- `/labs/cascade-correlation-xor/`
- `/labs/perceptron-and/`
- `/labs/gwr-deterministic-trace/`

## Validate

```bash
cd /workspace/growing-neural-networks
python3 scripts/growing-neural-networks-cron/validate_data.py
python3 scripts/check_missing_library_assets.py
python3 scripts/validate_lab.py
```

The review validator checks unique paper IDs, review-file links, related-paper
IDs, themes, source provenance, modules, and exercises. The lab validator checks
all available experiments across the same repository: metadata, local routes,
runnable JSON output, direct tests, and exact trace snapshots.

## Data model

The site loads `data/catalog.json` first. Review-facing algorithm records remain
in `data/algorithms.json`; the merged lab's smaller execution catalogue is
`data/lab-algorithms.json`. Keeping the two schemas named explicitly resolves
the only data-file collision without weakening either contract.

Long-form review text lives in Markdown files under `reviews/`, while
`data/papers.json` keeps machine-readable metadata for search, timelines,
filters, and cross-links.

## Local paper library

PDFs and extracted full-text files stay outside Git by default. The recommended
local/private asset store is:

```text
/workspace/growing-neural-networks-library/
```

The tracked inventory is `data/paper-assets.json`; see
`docs/paper-library.md` for conventions and status fields.

## Agent work

Start with `AGENTS.md`, `TASKS.md`, and the detailed guidance under
`docs/agent/`. The former lab's task history is retained as
`.tasks/LAB_LOG.jsonl` plus its `GNL-*` debriefs; new work uses this repository's
normal task queue.
