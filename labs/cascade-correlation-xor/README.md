# Cascade-Correlation on XOR

This lab demonstrates a small cascade-correlation-style idea: when a linear output model cannot solve XOR, add a hidden feature whose activation is correlated with the residual error, freeze that feature, and retrain the output layer.

The implementation is deliberately compact and deterministic. It is not a full reproduction of the original Cascade-Correlation algorithm; it is a toy mechanism trace suitable for reading and modification.

## Run

```bash
python3 cascade_correlation_xor.py
python3 tests/test_xor.py
```

## What to look for

- The baseline linear model stalls on XOR.
- A small candidate search finds a useful hidden feature.
- The candidate block reports the deterministic search size, selected unit's refit MSE, and selection score so the choice can be audited rather than treated as a black box.
- After adding the feature, the classifier reaches the XOR truth table.
- The `comparison` block reports the baseline-to-grown MSE reduction and confirms that the hidden feature is frozen before the output refit.
- The `comparison` block also reports the smallest margin from the 0.5 classification threshold, so a passing truth table still shows whether outputs are safely separated.
- The script's `growth_trace` rows align each XOR example with its baseline output, residual, hidden activation, grown output, threshold margin, and final prediction so the mechanism can be inspected without re-deriving the numbers.
- `trace.json` is a committed snapshot of the script output for static-site inspection; `scripts/validate_lab.py` fails if it drifts from the runnable Python trace.
- The browser demo loads `trace.json` directly, so the page renders the same canonical values that the Python script and validator check.

## Companion context

This lab asks an explanatory question: **what changes when a stalled fixed linear readout gains one selected, frozen hidden feature?** Its comparison baseline is the XOR linear readout already present in the committed trace.

For broader context, use the literature garden's [algorithm overview](https://tobylightheart.github.io/growing-neural-networks/pages/algorithms.html) and [Cascade-Correlation Growth Walkthrough](https://tobylightheart.github.io/growing-neural-networks/modules/cascade-correlation-growth/). The walkthrough links back to this runnable trace.

The integration is explanatory rather than a reproduction claim: this deterministic lab is a toy mechanism trace, not a full reproduction of Fahlman & Lebiere (1990). It keeps the literature note short and focuses on the existing runnable mechanics.
