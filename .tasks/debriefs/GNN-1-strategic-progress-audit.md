# GNN-1 Strategic progress audit — debrief

## What shipped

- Added `docs/reviews/strategic-progress-audit-2026-07-25.md`.
- Audited the latest 30 commits, current guidance and bundle records, representative public reviews and teaching artifacts, and the companion lab as read-only context.
- Classified recent effort across core understanding, necessary foundation, usability/verification, maintenance/bookkeeping, and marginal refinement.
- Assessed mechanism understandability and review–lab reinforcement, then documented strengths, strategic gaps, wheel-spinning signals, and five unranked candidate directions.
- Kept repository evidence separate from reviewer interpretation and made no new literature claims.

## Descoped or deferred

- No papers, reviews, taxonomies, modules, exercises, priorities, or sibling-lab files were changed, as required by the brief.
- Candidate directions were not filed, ranked, or started. They remain inputs to human portfolio planning.
- No private PDF content was re-reviewed; the audit relied on tracked provenance and existing public claim boundaries.

## Design decisions made in-flight

- Classified commits by their primary strategic intent rather than line count. Review drafts and synthesis were counted as core understanding; metadata/private-asset rechecks were counted as necessary foundation; interactive artifact changes were counted as usability/verification.
- Treated the companion lab's current tracked state as evidence of programme integration, but did not pre-empt or rely on the sibling lab's separately filed audit conclusions.
- Used explicit **Repository evidence** and **Reviewer interpretation** labels throughout the audit instead of placing a single caveat only at the beginning.
- Reported the missing `notebook/` path and stale top-level roadmap/status language as discoverability/status gaps, not as grounds to broaden this task into documentation maintenance.

## Surprises and non-obvious findings

- All 18 paper records have public review Markdown, but all 18 remain `review-draft`; breadth has advanced faster than the human-review boundary.
- The latest 30 commits include substantial synthesis and teaching-artifact work, so the recent period is not accurately characterized as validation/bookkeeping alone.
- The review–lab seam is strong for Cascade-Correlation but narrow across the broader bundle portfolio.
- The early roadmap still describes the static site as absent, and the README still describes modules as a future home despite five registered available modules.

## Candidate tasks surfaced

None filed. The task explicitly required candidate directions to remain unranked and unfiled; the audit records five options for later human portfolio planning.

## Validation

- `python3 scripts/growing-neural-networks-cron/validate_data.py` — passed (18 papers, 8 algorithms, 23 themes, 28 sources, 5 modules, 4 exercises, 18 assets, 7 bundles).
- `python3 scripts/check_missing_library_assets.py` — passed (no wanted or missing assets reported by the current tracked scan).
- `git diff --check` — passed.
- `git diff --cached --check` — passed before the work commit.

## Delivery commit

`67c358f8d591abb0ee9a9e38c5c93ef8515f2c65`
