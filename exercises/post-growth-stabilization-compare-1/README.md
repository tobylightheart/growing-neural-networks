# What should stay stable after growth?

A no-build interactive comparison exercise for the Growing Neural Networks literature-review site.

## Purpose

This exercise turns the `post-growth-stabilization` synthesis theme into a small matching activity. Learners compare four constructive-learning families by asking what each design most directly protects after adding structure:

- Cascade-Correlation: frozen installed features.
- Dynamic Node Construction: continued trainable-weight adaptation.
- Recurrent Cascade-Correlation: topology and temporal-dynamics constraints.
- Simulation Expansion / Contraction: low-disruption movement across the simulation boundary.

## Files

- `exercise.json` — local metadata mirror for the exercise.
- `index.html` — static shell.
- `demo.js` — matching logic and qualitative comparison chart.
- `styles.css` — local layout and feedback styling.

## Verification

From the repository root:

```bash
python3 scripts/growing-neural-networks-cron/validate_data.py
node --check exercises/post-growth-stabilization-compare-1/demo.js
python3 -m http.server 8000
```

Then visit `http://localhost:8000/exercises/post-growth-stabilization-compare-1/index.html`.
