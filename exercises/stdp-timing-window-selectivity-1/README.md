# When does a timing window grow selectivity?

Bundle: `stdp-hidden-pattern-construction`

This exercise is a small static artifact for the active STDP bundle. It was created only after the bundle had more than three related public review drafts and a thesis-synthesis bridge:

- Masquelier, Guyonneau & Thorpe 2008 — hidden repeating-pattern selectivity.
- Masquelier, Guyonneau & Thorpe 2009 — competitive STDP in a fixed pool.
- Song, Miller & Abbott 2000 — competitive Hebbian/STDP selectivity.
- Legenstein, Naeger & Maass 2005 — single-neuron STDP learnability limits.
- Caporale & Dan 2008 — biological STDP-rule caveats.
- Morrison, Diesmann & Gerstner 2008 — phenomenological STDP model choices for simulation.
- Lightheart thesis synthesis — constructive-spiking bridge and parameter-calculation framing.

## What it demonstrates

The page uses a deliberately simplified pair-based STDP timing window. Learners move presynaptic spike times around a postsynaptic spike and compare the net potentiation/depression score.

The core teaching point is conservative: timing-dependent updates can grow **synaptic selectivity** for predictive inputs, but a constructive or growing neural-network algorithm still needs a separate structural trigger or recruitment rule before claiming neuron/synapse growth.

The interface now also calls out Morrison, Diesmann & Gerstner (2008) so the simplified curve is framed as one teaching sketch among many phenomenological STDP model choices, not as the only biologically or simulation-valid rule.

## Static no-build pattern

Files:

- `exercise.json` — local metadata mirror.
- `index.html` — static shell.
- `demo.js` — browser-only interaction and canvas drawing.
- `styles.css` — local layout.
- `README.md` — rationale and maintenance notes.

No bundler, package install, or generated assets are required.
