# Dynamic evolving spiking neural networks for on-line spatio- and spectro-temporal pattern recognition

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated bundle-first draft for the `evolving-spiking-networks` bundle. It was selected because the bundle is the current urgent/active review branch, the Schliebs2013 survey and Wysoski2010 application anchor already have public automated drafts, and the bundle plan explicitly named Kasabov2013 as the next dynamic eSNN/deSNN detail anchor before Wang2014.

This draft is grounded in the existing bundle metadata, Crossref metadata for DOI `10.1016/j.neunet.2012.11.014`, a prior successful Semantic Scholar DOI metadata check, a verified private PDF path under `../growing-neural-networks-library/pdfs/Constructive_Spiking/`, and local PDF embedded metadata visible through string inspection. A bounded recheck on 2026-07-20 confirmed the Crossref record, DOI/Elsevier route, and private file again; Semantic Scholar returned HTTP 429, `pdftotext` was unavailable, and prior local extraction checks exposed only bibliographic/keyword metadata rather than reliable body text. Treat this as a cautious reading guide, not a full close reading of the article.

## One-sentence summary

Kasabov, Dhoble, Nuntalid, and Indiveri present a dynamic evolving spiking-neural-network paper for online spatio- and spectro-temporal pattern recognition, making it the current bundle's strongest candidate for moving from survey/application context toward method-level eSNN/deSNN claims.

## Why it matters for this project

The completed STDP bundle supports cautious language about timing-dependent synaptic selectivity. Schliebs2013 then introduces evolving spiking neural networks as a broader lineage, and Wysoski2010 shows that the branch includes audiovisual information-processing applications. Kasabov2013 is more directly positioned as the dynamic eSNN/deSNN detail anchor: its title, Crossref record, and PDF metadata all point at online spatio- and spectro-temporal pattern recognition.

For the public literature review, this paper should be used to focus the next synthesis question: which parts of an evolving spiking system are structurally created or adapted online, and which parts are encoding, synaptic dynamics, or parameter updates? This automated draft can name the bibliographic anchor and its role, but it should not yet assert exact algorithm steps until a human or reliable full-text extraction pass checks the body of the paper.

## Bibliographic metadata checked

- Crossref indexes the article as Nikola Kasabov, Kshitij Dhoble, Nuttapod Nuntalid, and Giacomo Indiveri, "Dynamic evolving spiking neural networks for on-line spatio- and spectro-temporal pattern recognition", *Neural Networks* 41:188-201, 2013.
- DOI: `10.1016/j.neunet.2012.11.014`.
- Crossref records print publication in May 2013 and a DOI landing URL at `https://doi.org/10.1016/j.neunet.2012.11.014`.
- Semantic Scholar DOI metadata matched the title, year, venue, DOI, PubMed identifier, and author list, and returned paper ID `337878293b38b0db01f32a444b4dc072f0c6fbb8`.
- On 2026-07-20, Crossref again returned the matching title, four authors, *Neural Networks* volume 41, pages 188-201, and May 2013 print date; the DOI returned HTTP 200 after resolving to Elsevier PII `S0893608012003139`.
- The 2026-07-20 Semantic Scholar retry returned HTTP 429, so the earlier successful metadata result was retained rather than silently replaced.
- The private library PDF path was reverified under `../growing-neural-networks-library/pdfs/Constructive_Spiking/`; the file is 1,322,170 bytes and begins with a PDF-1.7 header.
- Local PDF embedded metadata exposed the same DOI, title, author list, and keyword/subject terms including spatio-temporal pattern recognition, spiking neural networks, dynamic synapses, evolving connectionist systems, rank-order coding, spike-time-based learning, moving-object recognition, and EEG pattern recognition. The PDF and extracted full text were not copied into Git.

## Core idea for the review graph

This paper should become the eSNN bundle's method-detail bridge between survey vocabulary and later implementation or teaching material:

1. **Lineage context:** Schliebs2013 maps eSNN as part of the evolving connectionist systems family.
2. **Application context:** Wysoski2010 gives an application-oriented audiovisual information-processing anchor.
3. **Dynamic method context:** Kasabov2013 is the first reviewed anchor in this branch whose metadata explicitly combines dynamic evolving spiking networks with online spatio- and spectro-temporal recognition.
4. **Next comparison:** Wang2014 should follow as the supervised adaptive-structure anchor, so the site can compare dynamic eSNN/deSNN framing against another adaptive structural spiking-learning approach.

## What grows, changes, or remains uncertain

The checked metadata supports classifying this paper under evolving spiking neural networks, spiking constructive learning, online learning, spatio-temporal pattern recognition, and structural-plasticity/growth-trigger themes. Its PDF keywords also justify tracking dynamic synapses, evolving connectionist systems, rank-order coding, and spike-time-based learning as terms to verify during close reading.

However, this automated draft should not be cited for unresolved details such as:

- the exact condition for creating or selecting neurons, prototypes, repositories, or rule nodes;
- whether the paper's "dynamic" component means dynamic synapses, dynamic network structure, adaptive thresholds, or several coupled mechanisms;
- which variables are frozen after insertion, if any;
- the detailed learning equations or similarity thresholds;
- the specific moving-object or EEG experimental protocols; or
- whether the method should be described as eSNN, deSNN, STDC, or a combination without qualification.

Those claims need reliable full-text review.

## Bounded improvement note (2026-07-20)

This pass improves provenance rather than claiming new algorithm details. It confirms that the public bibliographic record, DOI route, and private asset still agree, while making the extraction limitation current. The next close-reading pass should begin with the method's distinction among dynamic synapses, evolving network structure, rank-order encoding, and spike-time-based learning; none of those relationships is inferred here from title or keyword metadata alone.

## Relationship to neighboring bundle papers

- **Schliebs and Kasabov 2013:** survey anchor already reviewed; use it for the high-level eSNN/ECoS lineage and vocabulary.
- **Wysoski, Benuskova, and Kasabov 2010:** application anchor already reviewed cautiously; use it for audiovisual application context without importing unverified algorithm details.
- **Wang, Belatreche, Maguire, and McGinnity 2014:** next review target for supervised spiking learning with adaptive structure.
- **Roy and Basu 2017:** bridge toward structural-plasticity mechanisms; coordinate later to avoid duplicate records across the evolving-spiking and structural-plasticity bundles.
- **Lightheart 2018 thesis source:** thesis taxonomy context for spike-timing-dependent construction and evolving spiking systems.

## Open questions for human review

- Which exact evolving spiking-network variant does the paper define, and how does it relate to eSNN, deSNN, and STDC terminology?
- What is structurally created or adapted online: neurons, synapses, delays, thresholds, prototypes, rules, or only parameters?
- How are rank-order coding and spike-time-based learning used in the method?
- What do the moving-object and EEG examples demonstrate, and which claims are task-specific?
- Which algorithmic details should be extracted into a future public comparison table or static teaching module?
