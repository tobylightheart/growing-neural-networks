# GNN-2 Expose the runnable Cascade-Correlation trace — debrief

## What shipped

- Added a clearly labelled companion-lab callout to the Cascade-Correlation Growth Walkthrough.
- Linked the callout to the published deterministic XOR trace in the companion lab.
- Kept the review-backed walkthrough distinct from the lab by identifying the trace as a deterministic educational toy mechanism rather than a full reproduction of Fahlman & Lebiere (1990).
- Explained that the runnable trace exposes concrete XOR values for residuals, candidate selection, freezing, and output refitting.

## Descoped or deferred

- No module behavior, paper record, review status, algorithm claim, registry, schema, or sibling-repository file was changed.
- No general cross-repository navigation system was introduced; this remains a selective link at the established Cascade-Correlation seam.

## Design decisions made in-flight

- Placed the callout between the module hero and the interactive walkthrough so the runnable option is discoverable without displacing or altering the existing module and review navigation.
- Reused the site's existing `callout` styling rather than adding module-specific CSS.
- Opened the companion route as ordinary same-tab navigation, consistent with the site's existing links and without requiring JavaScript.

## Surprises and non-obvious findings

- The shared stylesheet already provided a responsive, theme-aware callout pattern, so the task required only the scoped HTML change.
- The published companion-lab URL returned the expected scoped XOR page during validation.

## Candidate tasks surfaced

None.

## Validation

- `python3 scripts/growing-neural-networks-cron/validate_data.py` — passed (18 papers, 8 algorithms, 23 themes, 28 sources, 5 modules, 4 exercises, 18 assets, 7 bundles).
- `python3 scripts/check_missing_library_assets.py` — passed (no wanted or missing assets reported).
- Local HTTP smoke test — passed with HTTP 200 and verified the callout, scope language, and companion URL in the served module page.
- Published companion-lab smoke test — passed with HTTP 200 and verified the expected Cascade-Correlation XOR page and reproduction boundary.
- `git diff --check` and `git diff --cached --check` — passed.

## Delivery commit

`c9b57a59ee42b29ac47eeef03ec7f560edebd8b6`
