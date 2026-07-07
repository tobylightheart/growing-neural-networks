# Evolving spiking neural network—a survey

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated bundle-first draft for the `evolving-spiking-networks` bundle. It was selected because the initial six-paper STDP background milestone is complete, the project policy now prefers the eSNN branch for daily review work, and this survey is the bundle's first lineage anchor before Wysoski2010, Kasabov2013, and Wang2014 detail reviews.

This draft is grounded in the existing bundle metadata, Crossref metadata for DOI `10.1007/s12530-013-9074-9`, the Springer DOI landing page and abstract, and a verified local private PDF path. The cron environment did not have usable PDF text-extraction tooling (`pdftotext`, `pypdf`, `PyPDF2`, `pdfminer`, or `fitz` were unavailable), so this should be treated as a cautious reading guide rather than a full close reading of the PDF. A Semantic Scholar DOI lookup was attempted but returned HTTP 429 rate limiting.

## One-sentence summary

Schliebs and Kasabov survey the evolving Spiking Neural Network (eSNN) architecture as an extension of the Evolving Connectionist Systems (ECoS) paradigm, emphasizing eSNN operation, extensions for spatio-temporal data, feature and parameter optimisation, applications, open problems, and future directions.

## Why it matters for this project

The earlier STDP bundle gave the site a cautious account of **synaptic selectivity**: timing rules can make synapses or fixed spiking units specialize, but those papers do not by themselves define a structural growth algorithm. This survey starts the next branch: methods that explicitly present spiking networks as evolving systems.

For the literature review, Schliebs2013 is useful as a map rather than as a single mechanism claim. It can help the site introduce the eSNN vocabulary, relate eSNNs to the broader ECoS lineage, and decide which later method papers need close treatment before the site makes stronger claims about spike-timing-dependent construction, structural adaptation, or online spatio-temporal pattern recognition.

## Bibliographic metadata checked

- Crossref indexes the article as Stefan Schliebs and Nikola Kasabov, "Evolving spiking neural network—a survey", *Evolving Systems* 4(2):87-98, 2013.
- DOI: `10.1007/s12530-013-9074-9`.
- Crossref records online publication on 2013-02-10 and print publication in June 2013.
- The Springer landing page exposes matching citation metadata, a Springer PDF URL, and an abstract describing the paper as a comprehensive literature survey of eSNNs since their introduction in 2006 as an extension of Kasabov's 1998 ECoS paradigm.
- The private library PDF path was verified under `../growing-neural-networks-library/pdfs/Constructive_Spiking/`, but the PDF and extracted full text were not copied into Git.

## Core idea

The checked Springer abstract says the paper surveys the eSNN architecture since its introduction in 2006, summarises the functioning of the method, discusses extensions, and presents applications. It especially highlights extensions for spatio-temporal data and for feature and parameter optimisation of eSNN models to improve classification or prediction and support knowledge discovery.

For this web book, that makes the paper a bridge between three levels of explanation:

1. **Lineage:** eSNN is positioned as an extension of the ECoS paradigm rather than an isolated spiking trick.
2. **Mechanism family:** the paper surveys evolving spiking-network methods and extensions, but this automated draft should not claim the exact growth, merging, pruning, or parameter-update rules until a human or extracted-text review checks the full paper.
3. **Roadmap value:** the survey helps prioritize later bundle anchors that should provide concrete algorithmic details, especially Wysoski2010, Kasabov2013, Wang2014, and Roy2017.

## What grows, what changes, and what should not be overstated

The paper belongs in the metadata as a survey anchor for **evolving spiking neural networks** and **spiking constructive learning**. It is appropriate to use it as evidence that eSNN is a named architecture family with extensions for spatio-temporal processing and feature/parameter optimisation.

This automated draft should not yet be used to assert exact implementation details such as:

- the precise neuron-recruitment trigger used in any one eSNN variant;
- whether a particular extension adds neurons, synapses, parameters, prototypes, rules, or all of these;
- what is frozen after insertion;
- how thresholds, repositories, or similarity measures are computed; or
- which applications demonstrate which structural mechanism.

Those claims should be pulled from a later close reading of this survey or, preferably, from the individual method papers that the survey points toward.

## Connection to the completed STDP bundle

The completed STDP milestone supports a careful contrast: STDP papers can explain timing-dependent synaptic selectivity, competition, and biological/plasticity-model caveats. Schliebs2013 shifts the review toward systems that are described as evolving spiking networks. That matters because a constructive spiking system needs both a **selection/adaptation rule** and a **structural or representational update story**.

A future synthesis can therefore use this survey to introduce the question: when does a spiking model merely adapt synaptic weights, and when does it evolve its representational structure? The answer should be grounded in the method papers rather than inferred from the word "evolving" alone.

## Implementation implications for future modules

A future eSNN teaching module should probably not start by implementing the whole survey. A safer static module could instead present a comparison table or staged trace with placeholders for details that later reviews will fill in:

- input spike encoding or temporal feature representation;
- a condition for creating or selecting an output neuron/prototype;
- parameter or threshold adaptation;
- optional spatio-temporal extensions;
- explicit distinction between changing weights, changing parameters, and changing structure; and
- links from each mechanism claim back to a specific reviewed method paper.

That approach would keep the site educational while avoiding unsupported implementation detail.

## Relationship to neighboring bundle papers

- **Wysoski, Benuskova, and Kasabov 2010:** planned next application anchor for audiovisual information processing.
- **Kasabov, Dhoble, Nuntalid, and Indiveri 2013:** planned detail review for dynamic evolving spiking neural networks in online spatio- and spectro-temporal recognition.
- **Wang, Belatreche, Maguire, and McGinnity 2014:** planned detail review for online supervised spiking learning with adaptive structure.
- **Roy and Basu 2017:** bridge toward structural-plasticity mechanisms that should not duplicate the eSNN branch.
- **Lightheart 2018 thesis source:** thesis-aligned taxonomy context for spike-timing-dependent construction and evolving spiking systems.

## Open questions for human review

- Which exact eSNN algorithm variants does the survey define, and which does it only cite?
- What structural objects are added or adapted in the surveyed variants: neurons, synapses, rule nodes, prototypes, thresholds, repositories, or parameters?
- Which extensions handle spatio-temporal data, and what assumptions do they make about input encoding?
- How do the feature/parameter optimisation methods interact with growth or structural adaptation?
- Which later papers should become the canonical source for implementation-level claims in a static module?
