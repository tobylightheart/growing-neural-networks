# Evolving Spiking Lineage Cards

A standalone, no-build JavaScript module for the active `evolving-spiking-networks` review bundle.

The module implements the bundle's planned paper-card output rather than a new algorithm demo. It uses the public thesis-taxonomy review as connective vocabulary plus the currently public automated review drafts for:

- Lightheart 2018 — thesis taxonomy bridge for construction, pruning/merging, and parameter-calculation vocabulary.
- Schliebs and Kasabov 2013 — survey/lineage vocabulary.
- Wysoski, Benuskova, and Kasabov 2010 — audiovisual application anchor.
- Kasabov et al. 2013 — dynamic eSNN/deSNN detail-review placeholder.
- Wang et al. 2014 — supervised adaptive-structure placeholder.
- Roy and Basu 2017 — shared online structural-plasticity bridge.

## Guardrail

This module intentionally separates safe bundle-level claims from pending method details. It may use Lightheart2018 for taxonomy vocabulary, but it should not let thesis-derived vocabulary stand in for exact neuron-creation, pruning, merging, rewiring, or adaptation triggers for Kasabov2013, Wang2014, or Roy2017 until a full-text or human review verifies them.

The thesis comparison-axis selector is a guardrail, not a source of new mechanism claims. It lets readers test whether `parameter-calculation`, `local-performance-trigger`, and `pruning-and-merging` are directly supported by the public thesis review, present only as cautious lineage context, or still pending for each eSNN paper card.

The source-boundary check turns the completed five-anchor review pass into one small teaching decision: the reviews support Roy2017's shared bridge role, but they do not verify exact thresholds across the lineage or let thesis vocabulary stand in for later papers' method mechanics.

## Static pattern

Files are plain static assets:

- `module.json`
- `index.html`
- `demo.js`
- `styles.css`
- `README.md`
