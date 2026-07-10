# Evolving Spiking Lineage Cards

A standalone, no-build JavaScript module for the active `evolving-spiking-networks` review bundle.

The module implements the bundle's planned paper-card output rather than a new algorithm demo. It uses the currently public automated review drafts for:

- Schliebs and Kasabov 2013 — survey/lineage vocabulary.
- Wysoski, Benuskova, and Kasabov 2010 — audiovisual application anchor.
- Kasabov et al. 2013 — dynamic eSNN/deSNN detail-review placeholder.
- Wang et al. 2014 — supervised adaptive-structure placeholder.

## Guardrail

This module intentionally separates safe bundle-level claims from pending method details. It should not present exact neuron-creation, pruning, merging, or adaptation triggers for Kasabov2013, Wang2014, or Roy2017 until a full-text or human review verifies them.

## Static pattern

Files are plain static assets:

- `module.json`
- `index.html`
- `demo.js`
- `styles.css`
- `README.md`
