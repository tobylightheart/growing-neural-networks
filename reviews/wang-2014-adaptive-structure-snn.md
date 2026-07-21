# An online supervised learning method for spiking neural networks with adaptive structure

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated bundle-first draft for the `evolving-spiking-networks` bundle, improved on 2026-07-21. It was selected because the bundle remains the current urgent/active review branch, its first five-paper sequence is already drafted, and the bundle plan explicitly called for improving another existing eSNN anchor after the Schliebs2013, Wysoski2010, and Kasabov2013 rechecks.

This draft is grounded in the existing bundle metadata, a 2026-07-21 Crossref DOI recheck, a successful Semantic Scholar DOI recheck, a verified private PDF path under `../growing-neural-networks-library/pdfs/Constructive_Spiking/`, a DOI/Elsevier redirect check, and local PDF header/size/embedded-marker checks. The cron environment still did not have usable PDF text-extraction tooling (`pdftotext`, `pypdf`, `PyPDF2`, `pdfminer`, and `fitz` were unavailable), so this remains a cautious reading guide rather than a full close reading of the article.

## One-sentence summary

Wang, Belatreche, Maguire, and McGinnity present a Neurocomputing article on online supervised learning for spiking neural networks with adaptive structure, making it the active eSNN bundle's supervised adaptive-structure counterpart to the already drafted survey, application, and dynamic-eSNN anchors.

## Why it matters for this project

The public review has now moved from STDP as timing-dependent synaptic selectivity into papers that explicitly discuss evolving or adaptive spiking-network structure. Schliebs2013 supplies the survey lineage, Wysoski2010 gives an audiovisual application anchor, and Kasabov2013 provides a dynamic eSNN/deSNN placeholder. Wang2014 adds a differently framed supervised-learning paper whose title and metadata emphasize adaptive structure.

For the literature review, this paper should help separate at least three questions that are easy to blur together:

1. whether a spiking system adds, prunes, or adapts structural components;
2. whether its learning signal is supervised, unsupervised, or hybrid; and
3. whether the method should be grouped with eSNN/STDC lineage papers, broader structural-plasticity papers, or classic constructive-network analogues.

This automated pass can safely identify Wang2014 as an adaptive-structure supervised spiking-network anchor. It should not yet be used for detailed claims about the exact structural-update rule.

## Bibliographic metadata checked

- Crossref indexes the article as Jinling Wang, Ammar Belatreche, Liam Maguire, and Thomas Martin McGinnity, "An online supervised learning method for spiking neural networks with adaptive structure", *Neurocomputing* 144:526-536, 2014.
- DOI: `10.1016/j.neucom.2014.04.017`.
- Crossref records publication in November 2014 and a DOI landing URL at `https://doi.org/10.1016/j.neucom.2014.04.017`.
- Semantic Scholar DOI metadata matched the title, year, venue, DOI, DBLP key `journals/ijon/WangBMM14`, and paper ID `85f7fca6b83e730585228b3ffe8a6da0e182f869`; its abstract field was publisher-elided, but it returned a TLDR about one-pass training and comparable classification accuracy.
- On 2026-07-21, Semantic Scholar also reported 109 citations, 4 influential citations, and closed open-access-PDF status. These are volatile index metadata, not evidence for algorithm mechanics or paper quality.
- The DOI landing check redirected through Elsevier/ScienceDirect for PII `S0925231214005785`.
- The private library PDF path was reverified under `../growing-neural-networks-library/pdfs/Constructive_Spiking/`; the file is 1,333,327 bytes and begins with a PDF-1.7 header.
- Local PDF embedded metadata exposed the same DOI, title, authors, journal, volume, page range, cover date, and keywords: spiking neurons, online learning, neuronal pruning, supervised learning, unsupervised learning, and radial basis functions. The PDF and extracted full text were not copied into Git.

## Core idea for the review graph

Use this draft as a conservative placeholder for a supervised adaptive-structure branch inside the eSNN bundle:

1. **Lineage context:** Schliebs2013 maps evolving spiking neural networks and ECoS vocabulary.
2. **Application context:** Wysoski2010 shows an audiovisual eSNN application area.
3. **Dynamic method context:** Kasabov2013 anchors dynamic evolving spiking networks for online spatio- and spectro-temporal recognition.
4. **Supervised adaptive-structure context:** Wang2014 marks the point where the active bundle should ask how supervised error or class information interacts with structural adaptation.
5. **Next structural-plasticity bridge:** Roy2017 should be coordinated with the structural-plasticity bundle rather than duplicated as a separate eSNN-only record.

## What grows, changes, or remains uncertain

The checked metadata supports classifying this paper under spiking constructive learning, evolving/adaptive spiking-network structure, online learning, supervised learning, and structural-plasticity or growth-trigger themes. The PDF keywords also justify adding neuronal pruning and radial-basis-functions terminology to the close-reading checklist.

However, this automated draft should not be cited for unresolved details such as:

- the exact condition that creates, prunes, merges, or adapts structural elements;
- whether "adaptive structure" refers to neurons, synapses, receptive fields, radial-basis-function-like centers, pruning decisions, or several coupled mechanisms;
- whether any parameters or substructures are frozen after adaptation;
- which parts of the method are supervised versus unsupervised;
- the specific datasets and evaluation protocol; or
- how directly this paper should be compared with eSNN/deSNN/STDC algorithms from the Kasabov lineage.

Those claims need reliable full-text review.

## Relationship to neighboring bundle papers

- **Schliebs and Kasabov 2013:** survey anchor already reviewed; use it for high-level eSNN/ECoS lineage.
- **Wysoski, Benuskova, and Kasabov 2010:** application anchor already reviewed cautiously; use it for audiovisual context without importing unverified algorithm details.
- **Kasabov, Dhoble, Nuntalid, and Indiveri 2013:** dynamic eSNN/deSNN placeholder already reviewed cautiously; compare later against Wang2014 once both have full-text detail.
- **Roy and Basu 2017:** likely next bridge into explicit structural plasticity; coordinate across bundles to avoid duplicate records.
- **Lightheart 2018 thesis source:** thesis taxonomy context for spike-timing-dependent construction and evolving spiking systems.

## Open questions for human review

- What exact structural elements adapt in Wang2014, and are they added, pruned, reweighted, merged, or otherwise reorganized?
- How does the supervised signal enter the online learning rule?
- What role do neuronal pruning and radial basis functions play in the method?
- Does the paper provide a constructive-growth trigger that can be compared cleanly to Cascade-Correlation, Dynamic Node Creation, or eSNN rule-node creation?
- Which claims are general method claims, and which are limited to the experiments reported in the paper?
