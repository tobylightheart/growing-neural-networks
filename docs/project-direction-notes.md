# Project Direction Notes

Updated: 2026-06-28

These notes capture a zoomed-out direction check for the project after moving the content loop to bundle-first review planning.

## Current thesis

The project is worth continuing. Its strongest identity is not simply "a website about growing neural networks" and not merely an automated paper database. The most distinctive shape is:

> An interactive literature atlas for constructive and growing neural networks.

This lets the site combine:

- historically grounded paper reviews;
- thesis-linked spiking-network synthesis;
- algorithm taxonomies;
- small static visual explainers;
- exercises and modules;
- visible metadata/provenance quality signals.

That hybrid is valuable because most existing resources are either old scattered PDFs, conventional literature reviews, isolated code demos, or modern neural architecture search material that does not preserve the older constructive-learning lineage.

## Recommended posture

Do not hard-pivot yet. Let the bundle-first loop mature through one complete bundle before making a large strategic change.

Near-term checkpoint:

1. Let the `stdp-hidden-pattern-construction` bundle reach roughly 3–6 promoted review drafts.
2. Add one cautious synthesis note or page section connecting STDP, repeating spike patterns, and constructive spiking mechanisms.
3. Then evaluate whether the automated reviews are useful, source-grounded, and navigable enough.

If the first bundle feels coherent, continue with the next high-priority bundle. If it feels generic or noisy, improve the review template and synthesis rules before expanding.

## Strong parts to preserve

### Bundle-first structure

The bundle-first plan is the right default. A flat paper queue would create noise. Bundles give the project a narrative structure and keep cron-generated work from drifting.

### Thesis as spine, not product

The public thesis source gives the project a distinctive point of view, especially around constructive spiking networks. Keep using it as a spine, but avoid turning the site into a thesis conversion. Public-facing content should remain broader, more explorable, and more interactive.

### Static web-book constraints

The GitHub Pages-compatible static site plus JSON data model is a good constraint. It keeps the project durable and easy for automation to update while leaving room for future visualizations, reading paths, status dashboards, and paper graphs.

### Epistemic hygiene

The removal of the unsupported Fahlman seed reference exposed an important quality standard: uncertainty should be visible, not hidden. Keep marking automated drafts, uncertain metadata, local-only assets, and unverified claims clearly.

## Improvements worth considering

### 1. Add reader journeys

Add a small set of curated paths so a new reader knows where to start. Possible paths:

- Start here: what is constructive learning?
- Classic path: Dynamic Node Creation -> Cascade-Correlation -> Resource-Allocating Networks -> pruning.
- Spiking path: STDP -> repeating patterns -> evolving spiking networks -> structural plasticity.
- Topology path: Growing Cell Structures -> Growing Neural Gas -> grows-when-required networks.
- Implementation path: from XOR to self-growing networks.

These can be simple static pages at first and later be generated from bundle metadata.

### 2. Add a conceptual map page

A lightweight conceptual map may be the highest-leverage UI improvement. It should show major growth mechanisms rather than every paper:

- error-driven unit growth;
- topology/prototype growth;
- timing-driven construction;
- synapse/structure adaptation;
- pruning and stabilization;
- continual/reinforcement/robot-learning applications.

Each node can link to bundles, papers, modules, exercises, and open questions. This would make the whole project’s structure visible.

### 3. Make mechanism distinctions explicit

Prevent readers from conflating different kinds of "growth". Useful comparison axes:

- What grows? hidden units, synapses, prototypes, topology, modules, receptive fields.
- What triggers growth? residual error, novelty, correlation, timing coincidence, competition, capacity pressure.
- What stabilizes growth? freezing, pruning, regularization, consolidation, structural constraints.
- What learning regime is assumed? supervised, unsupervised, reinforcement, continual, online.

These axes could become the central intellectual contribution of the site.

### 4. Surface artifact maturity states

Make content maturity visible in the UI and metadata. Candidate states:

- seed;
- queued;
- automated draft;
- source-grounded draft;
- human-reviewed;
- synthesized;
- module-backed;
- exercise-backed.

This gives automation a clear progression: collected asset -> promoted paper -> review draft -> synthesis -> module -> exercise.

### 5. Treat uncertainty as first-class metadata

Useful uncertainty/provenance labels:

- unverified seed;
- metadata uncertain;
- source checked;
- PDF collected privately;
- review not human-reviewed;
- bibliography mismatch;
- local-only source.

This is especially important for older AI literature where metadata can be messy.

## Possible pivots, but not yet

### Interactive textbook

Pros: best for teaching and reader comprehension.
Cons: requires more deliberate authoring and less autonomous content generation.

### Historical literature atlas

Pros: best for researchers; emphasizes timeline, influence graph, taxonomy, and metadata completeness.
Cons: could become too catalog-like and less approachable.

### Algorithm playground collection

Pros: most interactive and demo-friendly.
Cons: risks losing the literature-review depth.

Current recommendation: keep the hybrid identity of an interactive literature atlas. It can contain textbook-like paths, database-like metadata, and playground-like modules without collapsing into only one of those forms.

## Things to avoid for now

- Do not bulk-ingest the 200+ PDF library.
- Do not overbuild the UI before enough coherent bundle content exists.
- Do not let cron jobs create too many new themes.
- Do not chase modern neural architecture search too soon; it may dilute the historical/spiking spine.
- Do not let the thesis become the whole site.

## Suggested next milestone

Complete the first bundle checkpoint for `stdp-hidden-pattern-construction`:

- 3–6 STDP-related review drafts;
- one synthesis note connecting STDP pattern detection to constructive spiking mechanisms;
- one comparison table across STDP mechanism variants;
- one planned interactive module or exercise, not necessarily implemented yet.

Then review quality before expanding the same loop to the next bundle.
