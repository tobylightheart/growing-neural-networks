# PDF Library Review Plan

Updated: 2026-07-23

This project now uses a bundle-first content loop. The private paper library is large enough that adding paper records one-by-one without a topic plan would make the public site noisy. Bundles define the order in which papers should be promoted from the private library into public metadata, reviews, synthesis notes, modules, and exercises.

Machine-readable files:

- `data/review-bundles.json` — active bundle plan and review priorities.
- `data/missing-library-assets.json` — prominent wanted/collected assets that are not yet formal public paper records.
- `data/paper-assets.json` — asset status for papers already promoted into `data/papers.json`.

Private PDFs remain outside Git under `/workspace/growing-neural-networks-library/`.

## Current priority

The active review bundle is now:

1. `growing-topology-and-neural-gas`

Why this first:

- The first six-anchor STDP review milestone is complete, so that bundle should stay warm for bounded synthesis and exercises rather than continue to monopolize daily review work.
- The classic constructive branch has now completed its current four-anchor draft/improvement pass: Ash1989, Fahlman1990, Platt1991, and Prechelt1997 all have public automated drafts or checked review improvements with verified private PDF paths. Keep it high and seeded as a grounding branch for cautious synthesis and the planned DNC-vs-Cascade-Correlation/resource-allocation comparison.
- The eSNN branch drafted its planned first sequence through Schliebs2013, Wysoski2010, Kasabov2013, Wang2014, and Roy2017, then completed one bounded metadata/private-asset recheck for each anchor. Keep it high and seeded for cautious lineage synthesis and future human/full-text work rather than automatically cycling the same anchors again.
- The growing-topology branch now has concrete ready evidence: Marsland2002 had an existing discovered paper record and a verified collected private PDF. Its 2026-07-23 review draft opens the next coherent branch from supervised hidden-unit growth into topology/prototype growth; Fritzke1995 remains an asset gap and should not be attached to a mismatched PDF.

The completed STDP promotion sequence was:

1. Masquelier, Guyonneau, and Thorpe 2008 — repeating patterns in continuous spike trains.
2. Masquelier, Guyonneau, and Thorpe 2009 — competitive STDP-based spike-pattern learning.
3. Song, Miller, and Abbott 2000 — competitive Hebbian STDP.
4. Legenstein, Naeger, and Maass 2005 — what a neuron can learn with STDP.
5. Caporale and Dan 2008 — STDP as a Hebbian learning rule.
6. Morrison, Diesmann, and Gerstner 2008 — phenomenological STDP models.

The promoted Masquelier2008, Masquelier2009, Song2000, Legenstein2005, Caporale2008, and Morrison2008 review drafts now support a limited metadata bridge: STDP can be discussed as growing synaptic selectivity for hidden temporal patterns; the 2009 competitive setup can be discussed as fixed-pool differentiation rather than neuron growth; Song2000 grounds the competitive Hebbian/STDP background; Legenstein2005 adds a caution about what one STDP-equipped neuron can learn; Caporale2008 keeps the site from reducing biological STDP to a single simple timing-window rule; and Morrison2008 grounds simulation-oriented phenomenological STDP model choices. The first timing-window exercise can use this bridge, but broader structural-growth claims still need a public review of a method that actually adds or removes neurons/synapses.

Current cautious STDP synthesis axis: distinguish **constructive growth of structure** from **STDP growth of selectivity**. The STDP bundle has enough public draft material to link the six promoted STDP papers in metadata and teaching artifacts, but not enough yet to claim a reviewed structural-growth mechanism for STDP hidden-pattern construction.

The daily review sequence has now drafted Schliebs and Kasabov 2013 as the eSNN survey anchor, Wysoski, Benuskova, and Kasabov 2010 as a cautious audiovisual application anchor, Kasabov et al. 2013 as a cautious dynamic eSNN/deSNN detail-review placeholder, Wang et al. 2014 as the adaptive-structure supervised spiking-network placeholder, and Roy and Basu 2017 as the shared structural-plasticity bridge. Roy2017 should now be treated as one existing paper record shared with the structural-plasticity bundle rather than duplicated. The classic constructive branch then drafted/improved its current Ash1989/Fahlman1990/Platt1991/Prechelt1997 grounding set. The eSNN branch subsequently completed bounded metadata/private-asset rechecks for Schliebs2013, Wysoski2010, Kasabov2013, Wang2014, and Roy2017. Because that explicit five-anchor pass is complete, the 2026-07-23 priority review moved eSNN to high/seeded for lineage synthesis and activated `growing-topology-and-neural-gas`, where Marsland2002 already had a discovered record and collected private asset. The Marsland2002 automated draft is grounded in Crossref, PubMed metadata and abstract, the DOI/Elsevier route, and a private PDF check; exact method equations, thresholds, update details, and experiment claims remain pending reliable full-text or human review.

eSNN synthesis guardrail: Schliebs2013 is enough for a cautious `evolving-spiking-network-lineage` metadata bridge that names the eSNN/STDC lineage and points back to the thesis taxonomy, Wysoski2010 can serve as a cautious audiovisual application anchor, Kasabov2013 can be named as the dynamic evolving-spiking detail anchor, Wang2014 can be named as the supervised adaptive-structure anchor, and Roy2017 can be named as the online unsupervised structural-plasticity bridge. It is still not enough for exact algorithm-step claims about Kasabov2013, Wang2014, or Roy2017 growth rules. Keep those method details as review tasks until each anchor has a full-text or human review. For the high seeded classic branch, Platt1991 can be named as a resource-allocating/function-interpolation anchor and Prechelt1997 can be named as a CasCor-family survey anchor, but exact novelty tests, allocation/update equations, CasCor-family variant details, and empirical comparison conclusions remain pending full-text or human review.

Classic constructive synthesis axis: compare these papers by the **decision signal for adding capacity** and the **stabilization promise after growth**, not by unverified formulae. Public review drafts support the cautious contrast that Ash1989/DNC adds hidden nodes during backpropagation when an error curve flattens, Fahlman1990/Cascade-Correlation uses residual-error correlation and freezes installed input weights, Platt1991 adds a resource-allocation/function-interpolation branch whose exact novelty test still needs close review, and Prechelt1997 is a family-level CasCor survey anchor whose variant and benchmark details remain pending. This is the safe connective tissue for the `dnc-vs-cascor-growth-1` exercise and for future classic-bundle module cards.

Topology-growth synthesis axis: use **what structure grows**, **learning setting**, and **publicly supported growth signal** to connect the active branch to the classic foundation without treating all constructive methods as variants of one algorithm. Marsland2002 is an unsupervised self-organising/topology-growth anchor whose indexed abstract supports adding nodes when the current network does not sufficiently match an input. Ash1989 and Fahlman1990 are supervised hidden-unit-growth contrasts, using a flattening error curve and residual-error correlation respectively in their public review drafts. These records now link to one another in metadata; exact GWR mismatch measures, thresholds, insertion/update rules, and quantitative comparisons remain pending human/full-text review.

## Bundle list

### 1. STDP, hidden spike patterns, and constructive synapse initialization

ID: `stdp-hidden-pattern-construction`
Priority: high
Status: seeded

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
Status: seeded

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
- Platt 1991, Resource-Allocating Network for function interpolation.
- Giles et al. 1995, recurrent Cascade-Correlation limitations.
- Lightheart 2018 thesis synthesis.

Possible next additions/follow-ups:

- Prechelt 1997 is now drafted; use it as a cautious CasCor-family survey anchor rather than adding a duplicate record.
- The already-collected Cascade-Correlation PDF asset filename was verified on 2026-07-16; keep the DNC-vs-CasCor comparison cautious until human review checks exact formulae, candidate criteria, and benchmark details.
- Broader constructive neural-network surveys.

### 4. Growing topology and neural gas methods

ID: `growing-topology-and-neural-gas`
Priority: urgent
Status: active

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
