# Cascade-Correlation Growth Walkthrough

A small static module that demonstrates one constructive growth cycle in Cascade-Correlation:

1. Train output weights on the current network.
2. Audition candidate hidden units against residual error.
3. Install the candidate with the strongest absolute residual correlation.
4. Freeze the installed unit so later growth builds on a stable feature.

The interaction is intentionally compact and GitHub Pages compatible: plain HTML, CSS, and JavaScript with no build step.

## Local verification

From the repository root:

```bash
python3 scripts/validate_data.py
node --check modules/cascade-correlation-growth/demo.js
python3 -m http.server 8000
```

Then visit `http://127.0.0.1:8000/modules/cascade-correlation-growth/index.html`.
