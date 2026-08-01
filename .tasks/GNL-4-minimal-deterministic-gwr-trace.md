# GNL-4 Minimal deterministic GWR trace

**Priority:** high
**Blocked by:** nothing
**Depends-on (external):** growing-neural-networks GNN-3
**Touches:** `labs/gwr-deterministic-trace/**`, `data/experiments.json`, `data/algorithms.json`, `index.html`, `README.md`, `TASKS.md`, `.tasks/LOG.jsonl`, `.tasks/debriefs/GNL-4-minimal-deterministic-gwr-trace.md`

## Context

GNN-3 verified the core Grow When Required mechanism from Marsland, Shapiro, and Nehmzow (2002): distance-derived activity, the two-part insertion trigger, midpoint initialization, alternative insertion/adaptation branches, habituation-scaled learning, competitive-Hebbian topology maintenance, deletion, and growth resumption. The portfolio review proposed an oracle-only spike, but interactive review decided that a separate oracle phase would delay contact with executable reality. This task therefore pairs a minimal implementation with a small independently specified trace oracle.

The lab already has a deterministic artifact contract: a pure-Python script emits JSON, a committed trace exactly matches it, direct tests verify behavior, and a static page loads the canonical trace. Reuse that contract without expanding validator infrastructure.

## Goal

Add one readable, dependency-free GWR mechanism slice that demonstrates adaptation, insertion, topology maintenance, and resumed growth under an explicitly pinned toy policy. Verify selected checkpoints against expected values written independently from the generated trace.

## Acceptance criteria

- [ ] A pure-Python implementation exposes a deterministic single-input GWR step and emits a tiny fixed-input trace without NumPy, Torch, or TensorFlow.
- [ ] Demo policy explicitly pins initial nodes, input order, thresholds, learning rates, habituation treatment, edge-age limit, tie-breaking, and numerical rounding; configurable values are not described as universal GWR defaults.
- [ ] The trace makes the insertion and adaptation branches distinguishable and includes at least one later insertion after a non-insertion step, demonstrating growth resumption rather than loop termination.
- [ ] Tests contain independently written expected checkpoints for activity/branch choice, node weights, edges/ages, and firing variables; they do not obtain oracle values by calling the implementation’s update helpers.
- [ ] Tests also cover deterministic repeatability and source-supported invariants: inserted weight midpoint, insertion as an alternative to adaptation, winner/neighbor adaptation scaling, and edge/node cleanup when exercised.
- [ ] `experiment.json`, repository registries, README/context, lab home, canonical `trace.json`, and a static browser page expose the new lab with `toy-mechanism` and `not-a-full-paper-reproduction` boundaries.
- [ ] `python3 scripts/validate_lab.py`, the new direct test, JSON checks, JavaScript syntax checks, an HTTP route smoke test, and `git diff --check` pass.

## Relevant files

- `../growing-neural-networks/docs/reviews/gwr-mechanism-source-verification.md`
- `../growing-neural-networks/.tasks/debriefs/GNN-3-gwr-mechanism-source-verification.md`
- `labs/perceptron-and/`
- `labs/cascade-correlation-xor/`
- `scripts/validate_lab.py`
- `data/experiments.json`
- `data/algorithms.json`

## Decisions already made

- Deliver implementation and oracle together; do not create a standalone specification phase.
- Treat this as an inspectable mechanism slice, not a reproduction of the paper’s experiments.
- Keep source-supported update structure separate from demo parameter choices.
- Use fixed initial nodes rather than random samples so every state transition is replayable.
- Keep the independently specified oracle in the test source, separate from the generated `trace.json` snapshot.

## Out of scope

- Updating or promoting the public Marsland review.
- Reproducing any paper benchmark or quantitative result.
- Selecting universal GWR parameter defaults or a universal stopping criterion.
- A general-purpose GWR library, parameter sweep, visualization playground, or GWR-versus-GNG comparison.
- Changes to the sibling literature repository.
