# Whole-site visual review — 2026-09-04

**Status:** automated reconnaissance; not human-reviewed.

## Method

Google Chrome 152 rendered every checked-in public HTML route from a local HTTP
server at **1440 × 1000** and **390 × 844**. The 56 viewport captures were used
for visual inspection and intentionally retained only as transient review
artifacts, not repository documentation. [`manifest.jsonl`](manifest.jsonl)
records route, viewport, document dimensions, broken-image checks, headings, and
browser-console output. [`summary.json`](summary.json) is the derived anomaly
view.

This is reconnaissance, not a claim that browser capture substitutes for a
human aesthetic review. Findings below separate measured defects from
house-style drift and from surfaces that merely look awkward because their
content is intentionally dense.

## Defects

### D1 — seven narrow routes widen the whole document

At 390 px, these routes report a document/body width between 474 and 716 px.
The browser therefore gives the **whole page** horizontal scroll rather than
containing a wide visualization or table locally.

| Route | Measured width |
|---|---:|
| `/labs/cascade-correlation-xor/` | 705 px |
| `/modules/cascade-correlation-growth/` | 489 px |
| `/modules/constructive-taxonomy/` | 665 px |
| `/modules/residual-correlation-playground/` | 493 px |
| `/modules/simulation-expansion-contraction/` | 716 px |
| `/modules/topology-growth-comparison/` | 509 px |
| `/exercises/dnc-vs-cascor-growth-1/` | 474 px |

The first six are table-driven. The exercise is a separate grid/minimum-width
failure: entire panels become 458 px wide in a 390 px viewport. Filed as
**GNN-4** rather than applying seven unrelated CSS guesses during reconnaissance.

### D2 — no favicon is served

A fresh browser session requests `/favicon.ico` and receives 404 on every route.
It is one site-wide defect, not 28 route defects. The repeated network entries
are retained in [`summary.json`](summary.json). A visual asset choice is not a
one-line repair; GNN-4 includes it.

No broken inline images were found, and all 56 route renders completed.

## House-style inconsistencies

### H1 — the “Not human-reviewed” caveat has several visual grammars

The standing caveat appears as at least four different surfaces:

- dedicated warning panels in `/labs/dynamic-node-construction-xor/` and
  `/labs/gwr-deterministic-trace/`;
- compact warning sections in `/labs/gng-topology-growth/` and
  `/labs/capacity-control-after-growth/`;
- a review-status aside in `/modules/capacity-growth-signals/`;
- prose inside the hero in `/modules/evolving-spiking-lineage-cards/` and bare
  bold copy in `/modules/topology-growth-comparison/`.

The wording is consistently candid, but its prominence and placement are not.
That is house-style drift, not a factual defect. **GNN-5** asks for a canonical
presentation without flattening the modules' distinct teaching layouts.

### H2 — modules and labs deliberately use several visual themes

The public index/pages use the shared `assets/css/main.css`; individual labs and
modules use route-local palettes and card/table treatments. The dark perceptron
lab, pale GWR lab, and lineage-card module are visually distinct, but the
variation reads as anthology structure rather than breakage. No task was filed
beyond the caveat component above.

## Things that only look odd

- Several narrow routes intentionally show a clipped-looking table or canvas
  inside a **local** horizontal scroller. The page itself remains 390 px wide,
  so this is containment rather than the D1 defect. Representative routes are
  `/labs/perceptron-and/`, `/labs/gwr-deterministic-trace/`,
  `/modules/evolving-spiking-lineage-cards/`, and
  `/exercises/post-growth-stabilization-compare-1/`.
- The one-line `modules/topology-growth-comparison/index.html` source is awkward
  to maintain, but the wide render is coherent; source formatting is not a
  visual finding and was not filed.

## Route inventory

Every route below was checked at both required viewport sizes. Measurements and
console records are retained in [`manifest.jsonl`](manifest.jsonl); the transient
captures themselves are not committed.

- `/`
- `/pages/algorithms.html`
- `/pages/concepts.html`
- `/pages/exercises.html`
- `/pages/modules.html`
- `/pages/papers.html`
- `/pages/reading-queue.html`
- `/pages/review.html`
- `/pages/scripts.html`
- `/pages/timeline.html`
- `/labs/`
- `/labs/perceptron-and/`
- `/labs/cascade-correlation-xor/`
- `/labs/dynamic-node-construction-xor/`
- `/labs/gng-topology-growth/`
- `/labs/gwr-deterministic-trace/`
- `/labs/capacity-control-after-growth/`
- `/modules/capacity-growth-signals/`
- `/modules/cascade-correlation-growth/`
- `/modules/constructive-taxonomy/`
- `/modules/evolving-spiking-lineage-cards/`
- `/modules/residual-correlation-playground/`
- `/modules/simulation-expansion-contraction/`
- `/modules/topology-growth-comparison/`
- `/exercises/dnc-vs-cascor-growth-1/`
- `/exercises/post-growth-stabilization-compare-1/`
- `/exercises/residual-correlation-intuition-1/`
- `/exercises/stdp-timing-window-selectivity-1/`
