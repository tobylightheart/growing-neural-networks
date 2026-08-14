# Integrated review and lab remit

The literature garden and runnable lab share this repository and one primary
GitHub Pages site. They remain distinct **content layers**, not separate
projects.

## Review layer

Primary role: literature garden.

It owns:

- paper records, reviews, bibliographic provenance, and review bundles;
- historical synthesis and cautious conceptual taxonomies;
- static modules and exercises that are part of the review narrative;
- PDF wanted lists and private-library planning.

It should not become a catalogue of unconnected implementations.

## Runnable layer

Primary role: inspectable lab bench under `labs/`.

It owns:

- pure-Python reference and toy implementations;
- tiny datasets and deterministic algorithm traces;
- static browser experiments that demonstrate mechanisms;
- direct tests and validators showing that examples run.

It should not duplicate the paper catalogue. Literature claims stay short and
link to review-layer material with repository-local routes.

## Boundary rule

When adding something new, ask:

- Is the main value a paper, review, taxonomy, or synthesis? Put it in the
  review data, `reviews/`, `modules/`, or `exercises/` as appropriate.
- Is the main value runnable code, a mechanism trace, or a toy experiment? Put
  it under `labs/` and register it in `data/experiments.json`.
- Is it both? Keep the source review/synthesis in the review layer and the
  runnable artifact in `labs/`, linked both ways.

Every available lab follows the repository-wide validation contract in
`scripts/validate_lab.py` and must keep its claim boundary explicit.
