# An Online Unsupervised Structural Plasticity Algorithm for Spiking Neural Networks

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated bundle-first draft for the `evolving-spiking-networks` bundle, coordinated with `structural-plasticity-and-binary-synapses`. It was selected because the active eSNN bundle's next action explicitly named Roy2017 as the bridge paper after Schliebs2013, Wysoski2010, Kasabov2013, and Wang2014, and the same paper appears in the structural-plasticity bundle. This review uses one shared paper record rather than duplicating the anchor across bundles.

This draft is grounded in the existing bundle metadata, Crossref metadata for DOI `10.1109/TNNLS.2016.2582517`, a DOI landing-page redirect to IEEE Xplore, and a verified private PDF path under `../growing-neural-networks-library/pdfs/Constructive_Spiking/`. Semantic Scholar metadata lookup was attempted but rate-limited. The cron environment did not have usable PDF text-extraction tooling (`pdftotext`, `pypdf`, `PyPDF2`, `pdfminer`, and `fitz` were unavailable), and byte/string inspection exposed no reliable body text, so this is a cautious reading guide rather than a full close reading of the article.

## One-sentence summary

Roy and Basu's 2017 IEEE TNNLS article is the current bundle bridge from evolving/adaptive spiking-network methods into explicit unsupervised structural plasticity, but this automated draft should not yet be used for exact algorithm-step claims.

## Why it matters for this project

The eSNN review branch has already established a cautious lineage through a survey anchor, an audiovisual application anchor, a dynamic evolving-spiking placeholder, and a supervised adaptive-structure placeholder. Roy2017 is valuable because its title and verified metadata explicitly foreground **online**, **unsupervised**, **structural plasticity** in spiking neural networks. That makes it a natural handoff point between:

1. the `evolving-spiking-networks` bundle, which needs concrete examples of structure-changing spiking systems; and
2. the `structural-plasticity-and-binary-synapses` bundle, which should compare artificial constructive rules with structural-plasticity framing.

For now, the public site can safely use Roy2017 as a bridge record showing that the review sequence has reached explicit structural-plasticity terminology. It should not yet state the precise synapse/neuron creation, deletion, rewiring, or thresholding rule until a human or full-text extraction pass verifies those details.

## Bibliographic metadata checked

- Crossref indexes the article as Subhrajit Roy and Arindam Basu, "An Online Unsupervised Structural Plasticity Algorithm for Spiking Neural Networks", *IEEE Transactions on Neural Networks and Learning Systems* 28(4):900-910, 2017.
- DOI: `10.1109/TNNLS.2016.2582517`.
- Crossref records April 2017 publication metadata and the DOI landing URL at `https://doi.org/10.1109/tnnls.2016.2582517`.
- The DOI landing check redirected to IEEE Xplore document `7508492`.
- The private library PDF path was verified under `../growing-neural-networks-library/pdfs/Constructive_Spiking/`; the PDF and any extracted text were not copied into Git.
- Semantic Scholar search was attempted during this cron run but returned HTTP 429, so no Semantic Scholar facts are used in this draft.

## Core idea for the review graph

Use this paper as the shared bridge record rather than creating separate eSNN and structural-plasticity records:

1. **From eSNN/adaptive-structure context:** Schliebs2013, Wysoski2010, Kasabov2013, and Wang2014 establish why the site is now asking how spiking systems adapt structure online.
2. **Into structural plasticity:** Roy2017 gives the next bundle a named, metadata-verified anchor for online unsupervised structural-plasticity language.
3. **Against classic constructive foundations:** after close review, this paper may help compare structural-plasticity rules with older constructive hidden-unit growth, but that comparison should remain tentative until the mechanism is verified.

## What grows, changes, or remains uncertain

The verified title and metadata support classifying Roy2017 under spiking constructive learning, structural plasticity, online learning, unsupervised learning, and growth-trigger themes. It is also reasonable to connect it to the eSNN branch as the next structural-plasticity bridge because both relevant bundles name the same anchor.

This automated draft should not be cited for unresolved details such as:

- whether the algorithm adds, removes, rewires, enables, disables, or reweights synapses;
- whether neurons or only synaptic structure change;
- what local statistics or activity thresholds drive structural updates;
- whether any weights, synapses, or substructures are frozen after updates;
- what datasets or benchmarks are used; or
- how directly the method should be compared with eSNN/deSNN/STDC methods or classic constructive neural-network growth.

Those claims need reliable full-text review.

## Relationship to neighboring bundle papers

- **Schliebs and Kasabov 2013:** survey anchor for eSNN and ECoS lineage.
- **Wysoski, Benuskova, and Kasabov 2010:** audiovisual application anchor already drafted cautiously.
- **Kasabov, Dhoble, Nuntalid, and Indiveri 2013:** dynamic eSNN/deSNN placeholder awaiting close method verification.
- **Wang, Belatreche, Maguire, and McGinnity 2014:** supervised adaptive-structure placeholder that points directly toward Roy2017 as a structural-plasticity bridge.
- **Roy and Basu 2016:** candidate follow-up/predecessor in the structural-plasticity bundle, not yet promoted.
- **Lightheart 2018 thesis source:** thesis taxonomy context for spike-timing-dependent construction and structural-plasticity themes.

## Open questions for human review

- What exact structural elements are changed by the algorithm?
- Is the method best described as structural plasticity, constructive growth, pruning, rewiring, or a combination?
- What activity or performance signal triggers structural updates?
- How does the unsupervised rule interact with any supervised evaluation protocol?
- Which claims are method-general, and which are limited to the experiments reported in the paper?
