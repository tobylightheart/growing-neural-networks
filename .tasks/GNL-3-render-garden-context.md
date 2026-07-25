# GNL-3 Render the Cascade-Correlation garden context

**Priority:** high
**Blocked by:** nothing
**Depends-on (external):** growing-neural-networks GNN-2
**Touches:** `labs/cascade-correlation-xor/index.html`, `labs/cascade-correlation-xor/README.md`

## Context

The 2026-07-25 strategic audit found that the XOR lab already declares specific links to the literature garden, but those links are metadata-only and are not visible on its public page. GNN-2 adds the reciprocal garden-to-lab path first. This task completes the reader-facing seam from the lab side while preserving the lab's deterministic toy-mechanism scope.

## Goal

Expose the specific garden algorithm and growth-walkthrough links on the XOR lab page and document the experiment's explanatory question, comparison baseline, and claim scope.

## Acceptance criteria

- [ ] Before starting, verify that sibling task GNN-2 has completed and that the garden module links to this runnable trace; otherwise stop with a no-op.
- [ ] `labs/cascade-correlation-xor/index.html` contains reader-facing links to the published garden algorithms page and Cascade-Correlation Growth Walkthrough.
- [ ] The page states the explanatory question: what changes when a stalled fixed linear readout gains one selected, frozen hidden feature?
- [ ] The page names the baseline as the XOR linear readout already present in the committed trace and preserves the existing toy/non-reproduction limitation.
- [ ] `labs/cascade-correlation-xor/README.md` records the same integration note: garden artifacts, explanatory question, baseline, and claim scope.
- [ ] No Python mechanism, trace value, test expectation, registry schema, or sibling-repository file is changed.
- [ ] `python3 scripts/validate_lab.py` and `python3 labs/cascade-correlation-xor/tests/test_xor.py` pass.
- [ ] Changed routes and links are smoke-tested over HTTP; `git diff --check` passes.

## Relevant files

- `labs/cascade-correlation-xor/index.html`
- `labs/cascade-correlation-xor/README.md`
- `data/experiments.json`
- Sibling read-only context: `/workspace/growing-neural-networks/modules/cascade-correlation-growth/index.html`

## Decisions already made

- GNN-2 must land first so reciprocity is evidence rather than aspiration.
- Use the published garden routes under `https://tobylightheart.github.io/growing-neural-networks/` for reader-facing navigation.
- Keep the current XOR baseline and deterministic trace unchanged.
- Integration notes are required to separate explanatory purpose from implementation inventory.

## Out of scope

Adding a new experiment, comparing AND and XOR, changing metadata schemas or validators, altering trace data, reviewing literature, or editing the garden repository.
