# Constructive / Growing Neural Networks: Interactive Literature Review Roadmap

## Project pivot

The project should evolve from a pure implementation repo into a static, GitHub Pages friendly interactive literature review of constructive / growing neural networks.

Downloadable Python scripts remain valuable, but the main user experience should be static HTML, CSS, and JavaScript: timelines, paper cards, algorithm comparisons, concept maps, annotated diagrams, and runnable-in-browser explanations. The implementation code should become supporting evidence and downloadable examples, not the centre of the interface.

## Current repository review

### What exists

- `README.md`: frames the project as historical pure-Python implementations of Cascade-Correlation and Dynamic Node Creation.
- `PROJECT_SUMMARY.md`: captures prior implementation status, challenges, and next steps.
- `cascade_correlation/`: several exploratory Python implementations and tests.
- `cascade_correlation/CORRECT_IMPLEMENTATION.md`: a short reference note with a simple XOR network snippet.

### Current health

Observed on 2026-06-23:

- Git repository was not present initially; it has now been initialized on branch `main`.
- Repository is small: about 72 KB before `.git`.
- Python is exploratory rather than production-ready.
- `python3 -m compileall -q .` fails on `cascade_correlation/cascade_correlation.py` with an `IndentationError` at line 139.
- Existing XOR tests mostly run but do not learn XOR correctly; one test raises a `TypeError`.

### Useful assets to preserve

- The existing code is useful as historical implementation notes and downloadable experiment material.
- The learning notes about gradient pitfalls, initialization, and learning-rate sensitivity should be turned into explanatory pages.
- The paper list in `README.md` is a seed bibliography.

### Main gap

The repo currently has no static web interface, no bibliography data model, no literature-review structure, and no GitHub Pages deployment path.

## Target shape

A static site with no backend dependency:

```text
/
├── index.html                  # Entry point and narrative overview
├── assets/
│   ├── css/
│   │   └── main.css
│   └── js/
│       ├── app.js              # Static UI behaviour
│       ├── papers.js           # Paper data loader/rendering
│       └── visualizations.js   # Timeline/concept-map/algorithm diagrams
├── data/
│   ├── papers.json             # Bibliography and paper metadata
│   ├── algorithms.json         # Structured algorithm summaries
│   └── themes.json             # Topic clusters / review lenses
├── pages/
│   ├── timeline.html
│   ├── algorithms.html
│   ├── papers.html
│   ├── concepts.html
│   └── scripts.html
├── scripts/                    # Downloadable Python examples
│   ├── cascade_correlation_xor.py
│   └── dynamic_node_creation_demo.py
├── archive/
│   └── exploratory-python/     # Existing exploratory attempts after cleanup
└── docs/
    └── notes/                  # Source notes and review drafting material
```

This can be served directly from GitHub Pages without a build step. A later phase can add optional tooling, but the first working version should be plain static files.

## Content model

### `data/papers.json`

Each paper should be a structured object, for example:

```json
{
  "id": "fahlman-1990-cascade-correlation",
  "title": "The Cascade-Correlation Learning Architecture",
  "authors": ["Scott E. Fahlman", "Christian Lebiere"],
  "year": 1990,
  "venue": "NeurIPS",
  "family": "cascade-correlation",
  "themes": ["constructive-learning", "frozen-features", "supervised-learning"],
  "summary": "Introduces a network that starts minimal and adds hidden units trained to correlate with residual error.",
  "why_it_matters": "Canonical constructive algorithm; useful anchor for later growing-network work.",
  "algorithmic_idea": "Train candidate units, select the one most correlated with residual error, install it, freeze its input weights, and continue.",
  "links": {
    "paper": "",
    "notes": ""
  },
  "related": ["ash-1989-dynamic-node-construction"]
}
```

### Review lenses

Initial filters / facets:

- Historical period: early perceptrons, 1980s backprop era, 1990s constructive algorithms, modern neural architecture growth.
- Growth trigger: error threshold, residual correlation, novelty, information gain, topology constraints.
- What grows: units, layers, connections, modules, activation functions, subnetworks.
- What freezes: no freezing, frozen input weights, frozen hidden units, frozen modules.
- Learning setting: supervised, reinforcement, continual, developmental, neuroevolutionary.
- Relation to modern ideas: residual learning, boosting, neural architecture search, continual learning, progressive networks, mixture-of-experts.

## Incremental build plan

### Phase 0: Git baseline and preservation

Goal: make the project safe to reshape.

Tasks:

1. Initialize Git on branch `main`. Done.
2. Add `.gitignore`. Done.
3. Commit current state as a baseline before restructuring.
4. Record known breakages in `PROJECT_SUMMARY.md` or an issue-style note.
5. Decide whether exploratory Python stays in place temporarily or moves under `archive/exploratory-python/` in a later commit.

Acceptance criteria:

- `git status` is clean after the baseline commit.
- Existing files are preserved and recoverable.

### Phase 1: Static skeleton

Goal: first GitHub Pages-compatible site that works by opening `index.html` locally.

Tasks:

1. Create `index.html`, `assets/css/main.css`, and `assets/js/app.js`.
2. Add navigation shared across pages.
3. Create placeholder pages: timeline, papers, algorithms, concepts, scripts.
4. Add a lightweight visual identity: scholarly but interactive; subtle evolution/maturing metaphor rather than literal gardening.
5. Add README instructions for local preview and GitHub Pages setup.

Acceptance criteria:

- `python3 -m http.server` serves the site.
- Browser can navigate all pages.
- No build step required.

### Phase 2: Bibliography data and paper cards

Goal: turn the review into structured data.

Tasks:

1. Create `data/papers.json` with initial seed papers:
   - Ash 1989, Dynamic Node Construction.
   - Fahlman & Lebiere 1990, Cascade-Correlation.
   - Related constructive / growing-network papers discovered in a focused literature search.
2. Render paper cards from JSON in `pages/papers.html`.
3. Add client-side search and filters by year, family, theme, and growth mechanism.
4. Add citation fields clean enough to export later.

Acceptance criteria:

- Adding a paper requires editing JSON only.
- Search/filtering works offline after page load.

### Phase 3: Timeline and taxonomy

Goal: make the literature review navigable as a field map.

Tasks:

1. Render an interactive timeline from `papers.json`.
2. Create `data/themes.json` for topic clusters.
3. Create an algorithms comparison matrix.
4. Add concept pages for constructive learning, cascade correlation, dynamic node creation, pruning vs growing, freezing, and candidate-unit selection.

Acceptance criteria:

- Users can move from a high-level concept to relevant papers and algorithms.
- Timeline and taxonomy share the same data source.

### Phase 4: Algorithm explainers

Goal: explain the mechanics visually without depending on Python execution.

Tasks:

1. Create static JS visualizations for:
   - Start-minimal network.
   - Candidate unit training.
   - Residual-error correlation.
   - Freezing and cascading.
2. Add step-through diagrams for Cascade-Correlation and Dynamic Node Construction.
3. Link diagrams to downloadable Python scripts.

Acceptance criteria:

- A reader can understand each algorithm without running code.
- Visualizations run in browser with no external service.

### Phase 5: Downloadable Python scripts

Goal: preserve implementation value as reproducible side artifacts.

Tasks:

1. Move or rewrite working scripts under `scripts/`.
2. Keep scripts dependency-light; pure Python first, optional NumPy later only if clearly marked.
3. Add headers explaining the paper/algorithm each script illustrates.
4. Add smoke tests that verify scripts run.

Acceptance criteria:

- `python3 scripts/<name>.py` runs without crashing.
- Site links expose scripts as downloads.

### Phase 6: GitHub Pages deployment

Goal: make the review publishable.

Tasks:

1. Add GitHub Pages instructions to README.
2. If hosted from repo root, ensure all paths are relative.
3. Optionally add a GitHub Actions link checker / JSON validator.
4. Tag a first public milestone once the skeleton and seed bibliography are usable.

Acceptance criteria:

- Site works from GitHub Pages.
- Data JSON is valid.
- Internal links pass a simple check.

## Recommended next commit sequence

1. `chore: initialize repository baseline`
2. `docs: define literature review roadmap`
3. `feat: add static site skeleton`
4. `feat: add structured bibliography data`
5. `feat: render searchable paper cards`
6. `feat: add timeline and algorithm taxonomy`
7. `feat: add cascade-correlation explainer`
8. `chore: archive exploratory implementation attempts`
9. `feat: add downloadable reference scripts`
10. `docs: add GitHub Pages publishing guide`

## Skill update recommendation

The existing `growing-neural-networks` skill currently assumes the main task is implementing algorithms from scratch. It should be updated to trigger for:

- Maintaining this project as an interactive literature review.
- Adding papers to the structured bibliography.
- Building static HTML/JS/CSS explainers.
- Preserving Python scripts as downloadable educational artifacts.

It can still retain implementation pitfalls as supporting notes, but the primary workflow should become literature-review and static-site maintenance.
