# Constructive Algorithm Taxonomy

Interactive static module for the growing-neural-networks web book.

The module turns the thesis taxonomy into a reusable comparison frame:

```text
when does structure change? -> what changes? -> how are new parameters chosen?
```

It is intentionally comparative rather than algorithmically exact. The goal is to help readers see common process roles across Dynamic Node Creation, Cascade-Correlation, Growing Neural Gas, evolving spiking neural networks, spike-timing-dependent construction, and simulation expansion.

## Files

- `index.html` — standalone module page.
- `styles.css` — module-specific layout and canvas styling.
- `demo.js` — no-build browser visualization logic.
- `module.json` — metadata mirrored in `data/modules.json`.

## Verification

Run from the repository root:

```bash
python3 scripts/validate_data.py
node --check modules/constructive-taxonomy/demo.js
python3 -m http.server 8000
```

Then visit:

```text
http://127.0.0.1:8000/modules/constructive-taxonomy/index.html
```
