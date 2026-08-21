# Dynamic Node Construction on XOR

This lab is a deterministic, dependency-free **paper-faithful vertical slice** of
Timur Ash's Dynamic Node Construction (DNC), not a reproduction of every reported
experiment. It starts XOR training with one logistic hidden node, detects a plateau,
adds exactly one fully connected hidden node with small weights, and continues
ordinary backpropagation over the whole network. An ordinary fixed-width two-node
network trains for the same number of sweeps as a comparator.

> **Review status:** automated reproduction; **not human-reviewed**.

## Source-grounded mechanism

A close automated reading of Ash (1989), pp. 368–369, resolves the trigger as:

```text
(a[t-w] - a[t]) / a[t0] < A_T    and    t - w >= t0
```

Here `a[t]` is average squared error per output node, `w` is the back-history
window, `t0` is the most recent insertion trial (initially zero), and `A_T` is the
user-selected trigger slope. The second condition prevents the window from
crossing a topology change. The paper also states that:

- reported networks started with one hidden node and used logistic units;
- a new node receives complete input and output connections;
- all weights are initialized in `[-0.1666, +0.1666]`;
- ordinary backpropagation continues after growth; and
- average and maximum squared-error cutoffs disable further growth.

The reproduction implements each of those points. The exact formula was recovered
from the page image and checked against the surrounding prose and Table I because
the PDF text layer drops Equation (2)'s mathematical glyphs.

## Explicit deviations and bounds

- Ash reports learning rate `0.5`, momentum `0.9`, a 1000-sweep window, and a
  trigger slope of `0.05` for most tests. This inspectable default keeps the first
  two but uses a 250-sweep window and `0.002` threshold so the deterministic XOR
  trace has one clear insertion and runs immediately in a browser.
- The paper specifies small random initialization, not a reproducible generator.
  Python and JavaScript therefore share a documented 32-bit LCG seeded with 1989.
- The exhaustive XOR cases are presented in a fixed order. The paper defines one
  full presentation as one trial but does not state this reproduction's order.
- Growth is capped at one insertion because the goal is to expose exactly one
  plateau/growth/continued-training transition, not tune a general DNC package.
- The fixed-width baseline is one deterministic run with the same final width,
  update rule, seed policy, and training duration. It is not a statistical claim.

## Run and verify

```bash
python3 dnc.py
python3 tests/test_dnc.py
node -e "console.log(require('./demo.js').runExperiment().dnc.summary)"
```

The direct test pins the trigger calculation, insertion trial, initialized weights,
post-insertion convergence, exact outputs, and the fixed-width comparator. The
repository validator also requires `trace.json` to match fresh Python output.

## Sources

- Ash, T. (1989), “Dynamic Node Creation in Backpropagation Networks,”
  *Connection Science* 1(4), 365–375.
  [DOI 10.1080/09540098908915647](https://doi.org/10.1080/09540098908915647)
- [Automated review draft](../../reviews/ash-1989-dynamic-node-construction.md)

The private source PDF is not redistributed. Its publisher copy permits research,
teaching, and private study while forbidding systematic redistribution.
