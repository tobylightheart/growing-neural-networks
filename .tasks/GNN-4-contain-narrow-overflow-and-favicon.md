# GNN-4 Contain narrow-route overflow and add a favicon

**Blocked by:** nothing
**Touches:** `labs/cascade-correlation-xor/styles.css`, `modules/cascade-correlation-growth/styles.css`, `modules/constructive-taxonomy/styles.css`, `modules/residual-correlation-playground/styles.css`, `modules/simulation-expansion-contraction/styles.css`, `modules/topology-growth-comparison/index.html`, `exercises/dnc-vs-cascor-growth-1/styles.css`, `favicon.ico` or equivalent root icon asset, `docs/visual-reviews/**`

## Context

G-030 rendered all 28 public routes at 1440×1000 and 390×844. Seven narrow
routes widened the entire document to 474–716 px. Six are table-driven; the DNC
versus Cascade-Correlation exercise instead has 458 px panels in a 390 px
viewport. Fresh sessions also receive a 404 for `/favicon.ico` on every route.
The measured baseline and route inventory are in
`docs/visual-reviews/2026-09-04/REVIEW.md`.

## Goal

Keep every route at the viewport width while preserving usable access to dense
tables/visualizations, and give the site a deliberate root favicon.

## Acceptance criteria

- [ ] At 390 px, each of the seven named routes has document/body scroll width
      no greater than the viewport.
- [ ] Wide tables or canvases remain readable through a local scroller, stacked
      representation, or another explicit responsive treatment; content is not
      silently clipped.
- [ ] `/favicon.ico` (or an explicitly linked equivalent on every route) returns
      successfully and is legible at browser-tab size.
- [ ] Fresh narrow and wide browser checks demonstrate the fixes without
      regressions. Captures are transient verification output unless an image
      is deliberately selected as durable documentation.
- [ ] `python3 scripts/validate_lab.py` and relevant validators pass.

## Relevant files

- `docs/visual-reviews/2026-09-04/REVIEW.md`
- `docs/visual-reviews/2026-09-04/summary.json`
- The seven route-specific stylesheets/HTML files in `Touches`

## Decisions already made

- Whole-document horizontal overflow is the defect. A deliberately contained
  local scroller is acceptable for dense technical content.
- Do not solve the table cases by hiding columns or text.

## Out of scope

- A site-wide visual redesign.
- Rewriting the content or changing experiment behavior.
