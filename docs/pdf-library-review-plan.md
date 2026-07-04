# PDF Library Review Plan

Updated: 2026-06-28

This project now uses a bundle-first content loop. The private paper library is large enough that adding paper records one-by-one without a topic plan would make the public site noisy. Bundles define the order in which papers should be promoted from the private library into public metadata, reviews, synthesis notes, modules, and exercises.

Machine-readable files:

- `data/review-bundles.json` — active bundle plan and review priorities.
- `data/missing-library-assets.json` — prominent wanted/collected assets that are not yet formal public paper records.
- `data/paper-assets.json` — asset status for papers already promoted into `data/papers.json`.

Private PDFs remain outside Git under `/workspace/growing-neural-networks-library/`.

## Current priority

The active bundle is:

1. `stdp-hidden-pattern-construction`

Why this first:

- It is highly aligned with the thesis chapters on hidden spike-pattern detection and competitive STDP learning.
- The previously missing STDP PDFs have now been added under `../growing-neural-networks-library/pdfs/Neuroscience/`.
- It gives the site a thesis-grounded spiking branch rather than repeatedly polishing the small existing public paper set.

The first promotion sequence should be:

1. Masquelier, Guyonneau, and Thorpe 2008 — repeating patterns in continuous spike trains.
2. Masquelier, Guyonneau, and Thorpe 2009 — competitive STDP-based spike-pattern learning.
3. Song, Miller, and Abbott 2000 — competitive Hebbian STDP.
4. Legenstein, Naeger, and Maass 2005 — what a neuron can learn with STDP.
5. Caporale and Dan 2008 — STDP as a Hebbian learning rule.
6. Morrison, Diesmann, and Gerstner 2008 — phenomenological STDP models.

The promoted Masquelier2008, Masquelier2009, Song2000, Legenstein2005, Caporale2008, and Morrison2008 review drafts now support a limited metadata bridge: STDP can be discussed as growing synaptic selectivity for hidden temporal patterns; the 2009 competitive setup can be discussed as fixed-pool differentiation rather than neuron growth; Song2000 grounds the competitive Hebbian/STDP background; Legenstein2005 adds a caution about what one STDP-equipped neuron can learn; Caporale2008 keeps the site from reducing biological STDP to a single simple timing-window rule; and Morrison2008 grounds simulation-oriented phenomenological STDP model choices. The first timing-window exercise can use this bridge, but broader structural-growth claims still need a public review of a method that actually adds or removes neurons/synapses.

Current cautious synthesis axis: distinguish **constructive growth of structure** from **STDP growth of selectivity**. The active bundle has enough public draft material to link the six promoted STDP papers in metadata and teaching artifacts, but not enough yet to claim a reviewed structural-growth mechanism for STDP hidden-pattern construction.

## Bundle list

### 1. STDP, hidden spike patterns, and constructive synapse initialization

ID: `stdp-hidden-pattern-construction`
Priority: urgent
Status: active

Role:

- Ground the thesis-derived STDP construction material in reviewed public sources.
- Explain the difference between STDP as a synaptic learning rule and constructive use of timing information to build/select components.
- Prepare a future interactive module around repeating spike patterns and timing windows.

Immediate anchors:

- Masquelier2008a
- Masquelier2008b
- Song2000
- Legenstein2005
- Caporale2008
- Morrison2008

### 2. Evolving spiking networks and STDC/eSNN methods

ID: `evolving-spiking-networks`
Priority: high
Status: planned

Role:

- Turn the thesis literature-review spine into public review records around eSNN/deSNN/STDC methods.
- Provide the lineage context for Wysoski, Kasabov, Schliebs, Wang, Dora, and Roy papers.

Likely first anchors:

- Schliebs and Kasabov 2013 survey.
- Wysoski, Benuskova, and Kasabov 2010.
- Kasabov et al. 2013.
- Wang et al. 2014.
- Roy and Basu 2017.

### 3. Classic constructive foundations

ID: `classic-constructive-foundations`
Priority: high
Status: seeded

Role:

- Keep the verified historical foundation clean after removing the unsupported Fahlman seed reference.
- Support the existing Cascade-Correlation and Dynamic Node Creation demos.

Existing anchors:

- Ash 1989, Dynamic Node Creation.
- Fahlman and Lebiere 1989/1990, Cascade-Correlation.
- Giles et al. 1995, recurrent Cascade-Correlation limitations.
- Lightheart 2018 thesis synthesis.

Possible next additions:

- Platt 1991 resource-allocating networks.
- Prechelt 1997 CasCor family.
- Broader constructive neural-network surveys.

### 4. Growing topology and neural gas methods

ID: `growing-topology-and-neural-gas`
Priority: medium
Status: planned

Role:

- Distinguish supervised hidden-unit growth from topology/prototype graph growth.
- Add a non-spiking topology branch to the taxonomy.

Likely anchors:

- Fritzke 1995, Growing Neural Gas.
- Growing Cell Structures / Dynamic Cell Structures.
- Marsland et al. 2002, grows when required.
- Self-organizing incremental neural-network papers.

### 5. Structural plasticity and binary synapses

ID: `structural-plasticity-and-binary-synapses`
Priority: medium
Status: planned

Role:

- Bridge constructive learning to biological structural adaptation.
- Connect Roy/Basu-style structural plasticity to the eSNN and STDP bundles.

Likely anchors:

- Roy and Basu 2017.
- Roy and Basu 2016.
- Hussain et al. 2013.
- Poirazi and Mel 2001 as biological background.

### 6. Pruning and capacity control

ID: `pruning-and-capacity-control`
Priority: medium
Status: planned

Role:

- Prevent the site from presenting constructive learning as unbounded growth.
- Pair growth with deletion, sparsification, and stabilization.

Likely anchors:

- Reed 1993, pruning algorithms survey.
- LeCun, Denker, and Solla 1990, Optimal Brain Damage.
- Hassibi and Stork 1993, Optimal Brain Surgeon.
- Dora et al. 2015, growing-pruning SNN.

### 7. Continual, reinforcement, and robot learning

ID: `continual-robot-learning`
Priority: low
Status: planned

Role:

- Collect later applications where constructive growth supports changing tasks, reinforcement learning, robotics, and continual learning.
- Defer until core constructive and spiking bundles are easier to navigate.

Likely anchors:

- Takita and Hagiwara 2005.
- Rivest and Precup 2003.
- Grossmann and Poli constructive robot-learning papers.
- Catastrophic forgetting background papers where useful.

## Cron implications

The automation should now work from bundles instead of a flat paper list.

Review job:

- Read `data/review-bundles.json` and `data/missing-library-assets.json`.
- Pick the highest-priority active/seeded bundle with a concrete next action.
- Promote or improve at most one paper per run.
- Prefer collected assets before web-only discovery.
- Never bulk-ingest the library.

Discovery/library-sync job:

- Run `python3 scripts/check_missing_library_assets.py`.
- Report newly collected assets and likely duplicate filenames.
- Add or adjust wanted-list entries only when they serve an existing bundle.
- Do not automatically add large batches of paper records.

Synthesis job:

- Prefer the active bundle.
- Create synthesis only after there is enough reviewed or draft-reviewed material.
- Avoid growing themes faster than reviewed papers.

Module/exercise job:

- Build only from `planned_outputs` in the bundle plan or existing planned module/exercise records.
- For the active STDP bundle, wait until at least three related reviews exist before making an interactive timing-window exercise.

## Human review checkpoints

Before changing bundle priority, check:

- Is the current active bundle blocked by missing assets?
- Are the first anchor reviews readable and source-grounded?
- Has the synthesis job created enough connective tissue for users to understand the bundle?
- Is there a planned module/exercise that follows from the reviewed material rather than from speculation?

This is intentionally lightweight. The point is not to turn the library into a database all at once; the point is to keep the public site maturing in coherent topic clusters.
