# Which candidate should be installed?

A small static exercise for the constructive/growing neural networks literature review. It asks learners to choose the candidate unit that Cascade-Correlation should install next by comparing absolute residual-correlation scores.

## Learning goal

Learners should see that candidate selection uses correlation magnitude, not raw sign: a strongly negative correlation can still be useful because the output-layer weight can invert the candidate's activation.

## Files

- `exercise.json` — local metadata mirror for the exercise.
- `index.html` — standalone GitHub Pages-compatible page.
- `demo.js` — deterministic residual/candidate calculations and canvas visualization.
- `styles.css` — exercise-specific layout and feedback styles.

## Verification

From the repository root:

```bash
python3 scripts/validate_data.py
node --check exercises/residual-correlation-intuition-1/demo.js
python3 -m http.server 8765
python3 - <<'PY'
from urllib.request import urlopen
for path in [
    '/pages/exercises.html',
    '/exercises/residual-correlation-intuition-1/index.html',
    '/exercises/residual-correlation-intuition-1/demo.js',
]:
    with urlopen(f'http://127.0.0.1:8765{path}', timeout=5) as response:
        print(path, response.status, response.headers.get_content_type())
PY
```
