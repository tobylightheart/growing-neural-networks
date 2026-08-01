# Deterministic Grow When Required trace

This lab turns a narrow part of Grow When Required (GWR) into an inspectable,
dependency-free state trace. A fixed one-dimensional input sequence shows the
network adapting represented inputs, inserting a midpoint node when both match
activity and winner firing are low, pausing growth while a new node adapts,
resuming insertion later, and deleting an over-age edge plus its isolated node.

## Scope

This is a **toy mechanism**, not a full reproduction of Marsland, Shapiro, and
Nehmzow (2002). The source supports the update structure, including:

- closest and second-closest matching nodes;
- activity `exp(-distance)`;
- insertion only when activity and winner firing are both below thresholds;
- midpoint initialization and edge rewiring on insertion;
- firing-scaled winner and neighbor adaptation when insertion does not occur;
- edge aging, over-age deletion, and removal of isolated nodes; and
- growth that can pause and resume independently of loop termination.

The fixed initial nodes, input order, thresholds, rates, edge-age limit,
multiplicative habituation factors, tie-break, and six-decimal rounding are
explicit **demo choices**, not universal GWR defaults. In particular, the
multiplicative firing decrease keeps the source-supported distinction between
faster winner and slower neighbor habituation, but does not claim to reproduce
the paper's experimental habituation constants.

## Run

```bash
python3 gwr_deterministic_trace.py
python3 tests/test_gwr.py
```

## The independent oracle

`tests/test_gwr.py` hard-codes selected expected activities, node weights, firing
values, edge ages, insertion points, and cleanup results. Those values were
calculated separately and are not produced by calling the implementation's
update helpers. This prevents `trace.json` and the code that generates it from
being their own only authority.

The repository validator adds a second, different check: it requires the complete
committed `trace.json` to exactly match current script output.

## What to inspect

- Iterations 1–2 adapt the initial nodes and habituate the winner.
- Iteration 3 inserts node 2 because activity and winner firing are both low.
- Iterations 4–5 adapt rather than insert while node 2 becomes habituated.
- Iteration 6 inserts node 3, demonstrating resumed growth.
- Iteration 7 adapts, expires an old edge, and removes the newly isolated node 0.

For literature context, see the garden's [Marsland GWR review draft](https://github.com/tobylightheart/growing-neural-networks/blob/main/reviews/marsland-2002-grows-when-required.md). The lab's claim boundary remains narrower than a paper reproduction or benchmark result.
