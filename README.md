# Growing Neural Networks

An interactive literature review of constructive and growing neural networks.

The project is pivoting from a pure implementation repository into a static, GitHub Pages-compatible site: structured paper metadata, public Markdown reviews, algorithm/concept pages, and future interactive modules and exercises. Downloadable Python scripts remain welcome, but they support the review rather than defining the whole interface.

## Current status

A first static-site skeleton is in place:

- `index.html` — landing page.
- `pages/` — papers, reviews, timeline, algorithms, concepts, modules, exercises, reading queue, and scripts pages.
- `data/catalog.json` — manifest that lets paper data split into multiple files later.
- `data/papers.json` — initial seed bibliography.
- `reviews/` — public Markdown paper reviews rendered through `pages/review.html`.
- `modules/` — future home for standalone interactive visualizations and playgrounds.
- `scripts/validate_data.py` — standard-library data integrity checker.

The old exploratory Python attempts are still preserved in `cascade_correlation/`.

## Preview locally

Because the site uses `fetch()` to load JSON and Markdown files, serve it over a local HTTP server rather than opening files directly:

```bash
cd /workspace/growing-neural-networks
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Validate data

```bash
cd /workspace/growing-neural-networks
python3 scripts/validate_data.py
```

The validator checks unique paper IDs, review-file links, related-paper IDs, theme references, source provenance, module references, and exercise references.

## Data model

The site loads `data/catalog.json` first. Today it points at one paper file:

```json
{
  "papers": ["data/papers.json"]
}
```

Later this can become multiple chunks without changing the site UI:

```json
{
  "papers": [
    "data/papers/foundations.json",
    "data/papers/cascade-correlation.json",
    "data/papers/dynamic-node-construction.json"
  ]
}
```

Long-form review text lives in Markdown files under `reviews/`, while `data/papers.json` keeps machine-readable metadata for search, timelines, filters, and cross-links.

## Seed references

Initial seed papers:

- Scott E. Fahlman, *Chaining Together Simple Modules to Create Complex Functions* (1988).
- Timothy Ash, *Dynamic Node Construction for the Backpropagation Algorithm* (1989).
- Scott E. Fahlman and Christian Lebiere, *The Cascade-Correlation Learning Architecture* (1990).

These are intentionally only a starting point. The next research workflow should verify metadata, add links/DOIs where available, and expand by citation trails and keyword searches.

## Roadmap

See `LITERATURE_REVIEW_ROADMAP.md` for the broader incremental plan.

For recurring autonomous work, see `docs/cron-workflow.md`. It proposes a staged Hermes cron pipeline for paper discovery, triage, review drafting, synthesis, module/exercise development, and validation.
