# Module/exercise artifact notes

## Classic constructive foundations: DNC vs Cascade-Correlation

A bundle-first module/exercise pass can build or refine a conservative `classic-constructive-foundations` exercise when these conditions hold:

- `review-bundles.json` lists planned output: `DNC vs Cascade-Correlation comparison exercise`.
- Public review drafts exist for both:
  - `ash-1989-dynamic-node-construction`
  - `fahlman-1990-cascade-correlation`
- The artifact avoids exact Dynamic Node Creation insertion equations, trigger thresholds, and full post-insertion schedules unless a close full-text/human review has verified them.

Safe teaching axis:

- Shared: both are classic constructive hidden-unit-growth anchors.
- Cascade-Correlation: candidate-unit training, residual-error correlation, installed input-weight freezing.
- Dynamic Node Creation: backpropagation-network growth framing; keep exact trigger/schedule claims cautious.
- Guardrail option for exercises: classify claims as `not safe to assert from these drafts` when they require unverified DNC specifics.
- Refinement option for an already-available artifact: add a source-boundary warmup or claim ledger that separates what Ash1989, Fahlman1990, Platt1991, and Prechelt1997 can safely support from details still held back for human/full-text review, without changing `data/exercises.json` unless metadata changes.

A successful static artifact pattern used:

- `exercises/dnc-vs-cascor-growth-1/exercise.json`
- `index.html`
- `demo.js`
- `styles.css`
- `README.md`
- Register in `data/exercises.json` only after all files exist.

Validation/smoke sequence used:

```bash
python3 scripts/growing-neural-networks-cron/validate_data.py
node --check exercises/<id>/demo.js
python3 -m json.tool data/exercises.json >/dev/null
python3 -m json.tool exercises/<id>/exercise.json >/dev/null
python3 scripts/check_missing_library_assets.py
git diff --check
```

For HTTP smoke tests, a robust no-fixed-port pattern is a short Python `ThreadingHTTPServer(('127.0.0.1', 0), SimpleHTTPRequestHandler)` script, then `urllib.request.urlopen` the changed HTML/JS/CSS/data routes and shut the server down in `finally`.
