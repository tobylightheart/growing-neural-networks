# GNN-5 Canonicalize the not-human-reviewed caveat surface

**Blocked by:** nothing
**Touches:** `assets/css/main.css`, `labs/**/index.html`, `labs/**/styles.css`, `modules/**/index.html`, `modules/**/styles.css`, `docs/visual-reviews/**`

## Context

G-030 found that the required “Not human-reviewed” caveat is candid but rendered
with at least four visual grammars: warning panel, compact warning section,
review-status aside, and inline hero prose. Routes and measurements are listed in
`docs/visual-reviews/2026-09-04/REVIEW.md`. This is house-style drift rather than
a factual or accessibility defect.

## Goal

Define and apply a recognisable caveat treatment so readers can identify the
review boundary consistently without erasing each module's distinct teaching
layout.

## Acceptance criteria

- [ ] A short documented rule defines placement, label text, and minimum visual
      prominence for the caveat.
- [ ] Every current paper-grounded automated lab/module uses the canonical rule,
      with route-specific variants documented rather than accidental.
- [ ] The treatment is readable at 390 px and 1440 px and does not introduce
      document-level overflow.
- [ ] Fresh browser checks cover every changed route at both widths. Captures
      remain transient unless deliberately selected as durable documentation.
- [ ] `python3 scripts/validate_lab.py` and relevant validators pass.

## Relevant files

- `docs/visual-reviews/2026-09-04/REVIEW.md`
- `modules/capacity-growth-signals/index.html`
- `modules/evolving-spiking-lineage-cards/index.html`
- `modules/topology-growth-comparison/index.html`
- The warning-bearing lab entry points

## Decisions already made

- Preserve the wording's explicit provenance boundary.
- Consistency means recognisable hierarchy and placement, not one shared color
  palette across the anthology.

## Out of scope

- Restyling modules/labs that do not carry this provenance caveat.
- Changing any scientific claim or review status.
