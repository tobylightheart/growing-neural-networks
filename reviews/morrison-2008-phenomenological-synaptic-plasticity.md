# Phenomenological Models of Synaptic Plasticity Based on Spike Timing

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated bundle-first draft for the `stdp-hidden-pattern-construction` bundle. It was selected because the active bundle's next action asked to promote Morrison2008 for broader phenomenological STDP model background after the Masquelier, Song, Legenstein, and Caporale draft reviews were already present.

This draft is grounded in existing bundle and wanted-asset metadata, Crossref metadata for DOI `10.1007/s00422-008-0233-1`, Semantic Scholar DOI lookup metadata including the indexed abstract and open-access PDF link, and a verified local private PDF path. The cron environment did not have usable PDF text-extraction tooling (`pdftotext`, `pypdf`, `PyPDF2`, `pdfminer`, and `fitz` were unavailable), so this should be treated as a cautious reading guide rather than a full close reading of the PDF.

## One-sentence summary

Morrison, Diesmann, and Gerstner review phenomenological short- and long-term synaptic-plasticity models, especially STDP rules compatible with integrate-and-fire simulations, as a framework for classifying plasticity rules by what spike-timing, membrane, synaptic-weight, and filtered-history variables they can use.

## Why it matters for this project

The active STDP bundle now has reviews for hidden repeating-pattern detection, competitive STDP pattern learning, competitive Hebbian/STDP selectivity, single-neuron STDP learnability limits, and biological STDP-rule caveats. Morrison2008 adds the simulation-modelling layer: how to choose a phenomenological plasticity rule when the learner is an integrate-and-fire network intended for larger-scale simulation.

For constructive or growing spiking networks, this is background rather than direct evidence of structural growth. The paper is useful because a constructive system that recruits neurons or synapses still needs a rule for how those synapses adapt after recruitment. Morrison2008 helps frame that rule as a modelling choice with explicit dependencies and limitations, not as a generic claim that STDP itself creates network structure.

## Bibliographic metadata checked

- Crossref indexes the article as Abigail Morrison, Markus Diesmann, and Wulfram Gerstner, "Phenomenological models of synaptic plasticity based on spike timing", *Biological Cybernetics* 98(6):459-478, 2008.
- DOI: `10.1007/s00422-008-0233-1`.
- Crossref records online publication on 2008-05-20 and print publication in June 2008.
- Semantic Scholar resolves the DOI to paper ID `fb73b7aadf39ccb2c64e3dc152c18cd97507f4ee`, with PubMed ID `18491160`, PubMed Central ID `2799003`, DBLP key `journals/bc/MorrisonDG08`, and an open-access Springer PDF link.
- The private library PDF path was verified, but the PDF and extracted full text were not copied into Git.

## Core idea

The checked Semantic Scholar abstract describes the paper as a review of phenomenological models of synaptic plasticity, with emphasis on STDP and on rules suitable for integrate-and-fire type neuron models. That scope is important for this web book because many educational spiking demos use simple integrate-and-fire dynamics and then need a plasticity rule that can be explained without detailed biophysical state.

The abstract also identifies the modelling constraints: in these phenomenological rules, synaptic updates can depend only on spike timing, potentially membrane potential, synaptic weight, and low-pass filtered versions of these variables. This gives the site a precise way to talk about STDP model design: a rule is not just "biologically inspired"; it encodes a chosen state representation and a chosen set of dependencies.

For the constructive-learning taxonomy, the safest interpretation is therefore that Morrison2008 supports a **plasticity-rule classification axis**. It can help compare simple pair-based timing windows, weight-dependent rules, filtered-trace rules, teacher-related rules, and reward-related rules. It should not be cited as a paper that itself grows neurons or synapses.

## What grows, what changes, and what should not be overstated

For this project's metadata, the paper belongs under **STDP background, synaptic selectivity, and parameter-calculation context**. It supports cautious claims about how synaptic weights may be updated in simulation models, and about how phenomenological rules can be classified and evaluated against experimental and theoretical expectations.

It does **not** provide evidence, from the checked metadata alone, that Morrison, Diesmann, and Gerstner propose a constructive neural-network architecture. A later synthesis should keep the separation clear:

1. a constructive mechanism may decide when to recruit, add, prune, or initialize components;
2. an STDP or other synaptic-plasticity model may then adapt connection strengths;
3. the chosen plasticity rule determines what local or filtered variables are available to learning;
4. teacher-based and reward-based variants can be discussed as modelling families; and
5. claims about structural growth require a separate source that actually defines the structural rule.

## Connection to hidden spike-pattern construction

The Masquelier papers in this bundle use STDP to make one neuron or a fixed competitive pool selective for hidden temporal patterns. Song2000 explains competitive timing-based synaptic strengthening and weakening. Legenstein2005 constrains what a single STDP-trained neuron can learn. Caporale2008 guards against over-simplifying biological STDP as one universal curve.

Morrison2008 complements those papers by asking how phenomenological plasticity rules can be represented in simulation. That makes it a useful bridge between the hidden-pattern literature and future static exercises: learners can see that a demo's timing-window equation is one modelling choice among several, and that constructive spiking algorithms must state both their growth/recruitment rule and their post-recruitment synaptic adaptation rule.

## Implementation implications for future modules

A future STDP exercise or module could use this review to add a model-choice panel:

- pair-based spike-timing update as the simplest pedagogical baseline;
- optional weight dependence to show how saturation or competition may change;
- filtered pre/post traces as a way to introduce low-pass state variables;
- teacher or reward signals as separate supervised/reinforcement extensions; and
- a persistent warning that these are synaptic-update models, not structural-growth rules by themselves.

This would pair well with the hidden-pattern exercise because it would let readers alter the plasticity-rule assumptions while keeping the distinction between synaptic selectivity and network construction visible.

## Relationship to neighboring bundle papers

- **Caporale and Dan 2008:** biological STDP-rule background and caveats.
- **Song, Miller, and Abbott 2000:** competitive Hebbian/STDP selectivity in modelling studies.
- **Legenstein, Naeger, and Maass 2005:** learnability limits and positive cases for a single STDP-trained neuron.
- **Masquelier, Guyonneau, and Thorpe 2008:** STDP-based selectivity for the start of a hidden repeating pattern.
- **Masquelier, Guyonneau, and Thorpe 2009:** competitive population-level STDP pattern learning.
- **Lightheart 2018 thesis source:** thesis-aligned use of spike timing as background for constructive spiking mechanisms.

## Open questions for human review

- Which specific phenomenological STDP models receive the most detailed comparison in the full paper?
- How does the paper evaluate compatibility with experimental data versus theoretical expectations?
- What exact teacher-based and reward-based rule families should be represented in the site's taxonomy?
- Which equations are suitable for a static educational module without copying full-text material?
- How should future synthesis phrase the difference between synaptic-update model choice and structural growth/recruitment?
