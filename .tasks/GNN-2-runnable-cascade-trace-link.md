# GNN-2 Expose the runnable Cascade-Correlation trace

**Priority:** high
**Blocked by:** nothing
**Touches:** `modules/cascade-correlation-growth/index.html`

## Context

The 2026-07-25 strategic audit found that the literature garden and companion lab reinforce one another at the Cascade-Correlation seam, but readers cannot traverse that relationship from the public garden. The lab already publishes a deterministic XOR trace and clearly labels it as a toy mechanism rather than a paper reproduction. This task makes that existing seam visible without adding literature claims or changing the module mechanism.

## Goal

Add a reader-facing path from the Cascade-Correlation Growth Walkthrough to the companion lab's runnable XOR trace, with the distinction between the review-backed walkthrough and the lab's deterministic toy trace visible beside the link.

## Acceptance criteria

- [ ] `modules/cascade-correlation-growth/index.html` links to `https://tobylightheart.github.io/growing-neural-networks-lab/labs/cascade-correlation-xor/` from a clearly labelled companion-lab callout or navigation element.
- [ ] Nearby copy says the lab is a deterministic educational toy mechanism, not a full reproduction of Fahlman & Lebiere (1990), and explains that it exposes concrete XOR values for residuals, candidate selection, freezing, and output refitting.
- [ ] Existing review and module navigation remains intact and understandable without requiring the lab.
- [ ] No paper record, review status, algorithm claim, module behavior, or sibling-repository file is changed.
- [ ] `python3 scripts/growing-neural-networks-cron/validate_data.py` passes.
- [ ] `python3 scripts/check_missing_library_assets.py` passes.
- [ ] The changed page and external lab URL are smoke-tested over HTTP, and `git diff --check` passes.

## Relevant files

- `modules/cascade-correlation-growth/index.html`
- `docs/reviews/strategic-progress-audit-2026-07-25.md`
- Sibling read-only context: `/workspace/growing-neural-networks-lab/labs/cascade-correlation-xor/index.html`

## Decisions already made

- Integration should be selective and reciprocal; the garden remains authoritative for literature context and the lab for runnable traces.
- The existing published GitHub Pages lab route is the canonical reader-facing target for this slice.
- The lab must remain labelled as a toy mechanism and not a paper reproduction.
- This is a navigation and claim-boundary task, not a new experiment or synthesis task.

## Out of scope

Changing the walkthrough, adding algorithm mechanics, reviewing a paper, altering registries or schemas, creating a general cross-repository link system, or editing the lab repository.
