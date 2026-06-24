# Staged thesis integration plan

Source thesis repository: `/workspace/thesis-constructive-spiking/`

Website repository: `/workspace/growing-neural-networks/`

Status: plan captured before editing the thesis repository. The thesis source is public; integrate selectively into the interactive web book rather than converting the whole document.

## Integration principle

Use the thesis to broaden the site from classic supervised constructive MLPs into spiking, event-driven constructive learning.

Core narrative:

1. Dynamic Node Creation adds hidden units when global training/capacity signals indicate the current network is insufficient.
2. Cascade-Correlation selects candidate features by residual-error correlation, installs the winner, and freezes incoming weights.
3. The thesis extends the constructive-learning taxonomy into spiking simulations where spike timing, local performance, proxy neurons, STDP estimates, structural plasticity, construction cancellation, pruning, and simulation expansion become growth and parameter-selection signals.

Do not make file location semantically authoritative. Thesis-derived content should become themes, source records, synthesis notes, paper entries, and modules that cross-link with existing papers.

## Stage 1: Source/provenance and vocabulary

Goal: make the thesis visible to the site data model without dumping full chapters.

Add or update:

- `data/sources.json`
  - source id: `lightheart-constructive-spiking-thesis`
  - type: `thesis`
  - local/public source: `/workspace/thesis-constructive-spiking/`
  - note: derived notes are public web-book material; raw thesis source remains in the sibling thesis repo.

- `data/themes.json`
  - `spike-timing-dependent-construction`
  - `spiking-neural-networks`
  - `parameter-calculation`
  - `local-performance-trigger`
  - `structural-plasticity`
  - `pruning-and-merging`
  - `simulation-expansion`
  - `synapse-construction`
  - `continual-learning`
  - `one-shot-construction`
  - `lateral-inhibition`

Validation requirement:

```bash
python3 scripts/validate_data.py
```

## Stage 2: Chapter 2 taxonomy synthesis

Primary file:

```text
/workspace/thesis-constructive-spiking/02_review_and_analysis/review_and_analysis_of_literature.tex
```

High-value sections:

- Constructive Neural Network Theory
- Definitions of Components and Processes
- Algorithm Sequence and ANN Integration
- Spike-Timing-Dependent Construction
- STDC in Literature
- Parameter Calculation
- Performance Evaluation
- Research Frontiers, Limitations and Gaps

Derived site artifact:

```text
reviews/lightheart-thesis-constructive-taxonomy.md
```

This should be a concise public synthesis, not a verbatim chapter copy. It should introduce:

- constructive algorithm
- constructive neural network
- construction / pruning / merging
- performance evaluation process
- parameter calculation process
- global vs local performance
- STDC as a spiking-specific constructive category

Figures to consider first because they are SVG/conceptual:

```text
02_review_and_analysis/figures/constructive_neural_network_basic.svg
02_review_and_analysis/figures/constructive_neural_network_merge.svg
02_review_and_analysis/figures/constructive_neural_network_rbc.svg
02_review_and_analysis/figures/constructive_neural_network_esnn.svg
02_review_and_analysis/figures/constructive_neural_network_sp_nnld.svg
```

Possible module record:

```text
modules/constructive-taxonomy/
```

Initial status can be `planned`; build later as a simple visual glossary.

## Stage 3: Bibliography expansion from thesis `.bib`

Bibliography source:

```text
/workspace/thesis-constructive-spiking/99_backmatter/references_tl_thesis02.bib
```

Already represented:

- `Ash1989` -> `ash-1989-dynamic-node-construction`
- `Fahlman1990` -> `fahlman-1990-cascade-correlation`

High-priority new paper records:

- `Fritzke1995` — Growing Neural Gas
- `Wysoski2010` — evolving spiking neural networks
- `Schliebs2013` — eSNN / evolving systems survey
- `Kasabov2013` — dynamic evolving spiking neural networks / deSNN
- `Takita2005` — refractoriness-based pulse neural network
- `Roy2016a`, `Roy2016b`, `Roy2017` — structural plasticity
- `Wang2014`, `Wang2015a`, `Wang2015b`, `Wang2017` — adaptive/evolving spiking networks
- `Masquelier2008` hidden spike-pattern detection with STDP

Rules:

- Add one matching `data/paper-assets.json` record per new paper.
- Do not claim human review unless actually reviewed.
- Automated summaries must use `status: review-draft` and visibly mark draft reviews.
- Prefer Crossref/Semantic Scholar/publisher verification before committing bibliographic metadata.

## Stage 4: Simulation expansion and STDP construction

Primary file:

```text
03_simulation_expansion/simulation_expansion_and_stdp.tex
```

Core ideas:

- simulated vs surrounding network components;
- construction as expansion of the simulated set;
- contraction/pruning as moving components out of simulation;
- STDP-derived synapse parameter calculation.

Derived artifacts:

```text
reviews/lightheart-thesis-simulation-expansion.md
modules/simulation-expansion-contraction/
modules/stdp-window-construction/
```

Start with planned module records and a synthesis note. Build interactive demos only after the taxonomy note is stable.

Good figures:

```text
03_simulation_expansion/figures/ann_in_large_neural_system.svg
03_simulation_expansion/figures/simulation_expansion_contraction_rev02.svg
03_simulation_expansion/figures/simulated_surrounding_sets_rev01.svg
03_simulation_expansion/figures/fig_stdp_curve_ch3.pdf
```

## Stage 5: Proxy-neuron construction

Primary file:

```text
05_proxy_neuron/proxy_neuron_simulation_for_expansion.tex
```

Core idea:

A proxy neuron spike can act as an event-driven growth trigger and can help estimate useful synapse weights for a newly constructed neuron.

Derived artifacts:

```text
reviews/lightheart-thesis-proxy-neuron-construction.md
modules/proxy-neuron-trigger/
```

Interactive idea:

Show a presynaptic spike stream, a proxy threshold/spike, a construction delay, and the resulting constructed neuron/synapses.

Good figures:

```text
05_proxy_neuron/figures/proxy_neuron_simulation_rev02.svg
05_proxy_neuron/figures/network_architecture_proxy_sim_20180601.svg
```

## Stage 6: Hidden spike-pattern STDP construction

Primary file:

```text
06_hidden_spike_pattern/hidden_spike_pattern_detection.tex
```

Core ideas:

- hidden spike-pattern detection;
- constructed vs predefined postsynaptic neurons;
- STDP-estimated synapse-weight construction;
- success criteria: true positive rate, latency, false positives.

Derived artifacts:

```text
reviews/masquelier-2008-hidden-spike-patterns-stdp.md
modules/hidden-spike-pattern-stdp/
modules/stdp-construction-methods/
```

Use the thesis as reproduction/constructive-extension context for the external Masquelier paper rather than treating the thesis chapter as the only primary source.

## Stage 7: Competitive spike-pattern growth and continual learning

Primary file:

```text
07_competitive_spike_pattern/competitive_spike_pattern_detection.tex
```

This is the strongest long-term interactive module candidate.

Core ideas:

- continual one-shot learning of hidden spike patterns;
- multiple/newly appearing pattern sets;
- lateral inhibition;
- construction, cancellation, pruning;
- event-driven capacity control in spiking networks.

Derived artifacts:

```text
reviews/lightheart-thesis-competitive-spike-pattern-growth.md
modules/competitive-spike-pattern-growth/
exercises/growth-trigger-comparison-1/
```

Useful comparison exercise:

Compare three growth-trigger families:

1. residual-error correlation in Cascade-Correlation;
2. global error/capacity trigger in Dynamic Node Creation;
3. proxy-spike/event/local-performance triggers in thesis-derived spiking construction.

## Stage 8: Discussion synthesis

Primary file:

```text
08_discussion/discussion.tex
```

Use this for a short synthesis note after earlier stages exist:

```text
reviews/lightheart-constructive-spiking-thesis-synthesis.md
```

Focus on:

- contribution summary;
- relationship between constructive learning and continual learning;
- limitations and future directions;
- where thesis-derived spiking methods sit in the broader constructive-learning taxonomy.

## Asset handling

Prefer source SVG figures for the first web additions. Do not bulk-copy thesis figures into the website.

For any copied or converted asset:

- copy only the selected figure needed by a specific page/module;
- preserve attribution/provenance in module README or source metadata;
- prefer SVG when already available;
- convert PDF-only figures later in a focused asset task;
- avoid copying build artifacts or old draft figures.

## Validation and commit policy

For each incremental integration commit:

```bash
cd /workspace/growing-neural-networks
python3 scripts/validate_data.py
```

If JavaScript modules are added:

```bash
node --check modules/<module-id>/demo.js
```

For static site verification:

```bash
python3 -m http.server 8000
```

Then check key routes with `curl` or browser automation if available.

Keep each commit focused:

- one taxonomy/source metadata commit;
- one synthesis-note commit;
- one module-record commit;
- one module implementation commit.

Cron jobs may later pick up thesis-derived themes/papers, but they should not wholesale convert thesis content automatically.
