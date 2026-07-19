# Evolving spiking neural networks for audiovisual information processing

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated bundle-first draft for the `evolving-spiking-networks` bundle. It was selected because the first STDP six-anchor milestone is complete, Schliebs and Kasabov 2013 already provides a public survey anchor for the eSNN lineage, and the current bundle plan names Wysoski, Benuskova, and Kasabov 2010 as the next application anchor before more detailed Kasabov2013 and Wang2014 method reviews.

This draft is grounded in the existing bundle metadata, Crossref metadata for DOI `10.1016/j.neunet.2010.04.009`, a verified private PDF path under `../growing-neural-networks-library/pdfs/Constructive_Spiking/`, DOI landing-page routing to Elsevier, and limited PDF byte/embedded-metadata checks. The 2026-07-19 improvement pass found that the cron environment still lacks usable PDF text-extraction tooling (`pdftotext`, `pypdf`, `PyPDF2`, `pdfminer`, and `fitz` were unavailable), and Semantic Scholar again returned HTTP 429 rate limiting during DOI lookup, so this remains a cautious reading guide rather than a full close reading of the paper.

## One-sentence summary

Wysoski, Benuskova, and Kasabov present an eSNN-family application paper on audiovisual information processing, making it a useful bridge between the Schliebs2013 survey overview and later method-specific reviews of dynamic evolving or adaptive-structure spiking networks.

## Why it matters for this project

The completed STDP bundle explains timing-dependent **synaptic selectivity**, and Schliebs2013 introduces eSNN as a broader evolving spiking-network lineage. This paper is valuable because it moves that lineage into an application setting: audiovisual information processing.

For this web book, the important conservative role is not to overclaim the exact learning rule from the title alone. Instead, Wysoski2010 should be used as an application anchor showing where eSNN-style methods were applied, while detailed claims about neuron recruitment, repository matching, pruning, threshold adaptation, or feature encoding should wait for extracted-text or human review.

## Bibliographic metadata checked

- Crossref indexes the article as Simei Gomes Wysoski, Lubica Benuskova, and Nikola Kasabov, "Evolving spiking neural networks for audiovisual information processing", *Neural Networks* 23(7):819-835, 2010.
- DOI: `10.1016/j.neunet.2010.04.009`.
- Crossref records print publication in September 2010 and a DOI landing URL at `https://doi.org/10.1016/j.neunet.2010.04.009`.
- The private library PDF path was verified under `../growing-neural-networks-library/pdfs/Constructive_Spiking/`; on 2026-07-19 the file existed with a `%PDF-1.4` header and size 2,360,988 bytes.
- Local PDF embedded metadata/byte checks exposed mostly Elsevier artwork/conversion metadata, not reliable article body text or abstract content. The PDF and any extracted text were not copied into Git.
- Semantic Scholar DOI lookup was retried on 2026-07-19 but again returned HTTP 429 rate limiting in this cron environment.
- DOI resolution returned HTTP 200 and redirected to Elsevier's `linkinghub.elsevier.com/retrieve/pii/S0893608010000924` landing route.

## Core idea for the review graph

The paper should sit between a survey-level lineage record and later mechanism-level reviews:

1. **Survey context:** Schliebs2013 can introduce the eSNN family and the broader ECoS/evolving-system framing.
2. **Application context:** Wysoski2010 shows that the eSNN branch includes audiovisual information-processing applications, not only toy timing-window examples.
3. **Mechanism context still pending:** Kasabov2013 and Wang2014 should remain the next targets for more detailed claims about dynamic evolving spiking networks and adaptive structure.

That ordering keeps the site from treating every eSNN-related title as direct evidence for structural growth. The review graph can say this is an eSNN application anchor, while leaving implementation-level claims open until a close reading is possible.

## What grows, changes, or remains uncertain

The existing bundle metadata identifies this paper with evolving spiking neural networks, spiking constructive learning, online learning, and audiovisual pattern recognition. It is reasonable to link it to the broad `spiking-network-structure` growth axis as a review target.

However, this automated draft should not yet be cited for specifics such as:

- the exact condition for adding a neuron or rule node;
- whether the paper changes neurons, synapses, prototypes, thresholds, or only parameters;
- how audiovisual features are encoded as spikes;
- whether any created component is frozen, merged, pruned, or adapted after insertion; or
- the evaluation protocol and datasets used for the audiovisual task.

Those points require a reliable full-text extraction pass or human review of the PDF.

## 2026-07-19 automated improvement note

Today's bundle-first pass kept `evolving-spiking-networks` as the urgent active branch and improved this existing Wysoski2010 application-anchor draft rather than promoting a duplicate eSNN paper. Source checks re-verified Crossref bibliographic metadata, DOI/Elsevier routing, and the private local PDF path. Semantic Scholar remains unavailable from cron because the DOI lookup returned HTTP 429, and the local environment still lacks `pdftotext`, `pypdf`, `PyPDF2`, `pdfminer`, and `fitz`. As a result, this review can safely support the public graph role "eSNN audiovisual application anchor", but it should not yet support exact claims about encoding, repository matching, growth/pruning thresholds, datasets, or quantitative results.

## Relationship to neighboring bundle papers

- **Schliebs and Kasabov 2013:** survey anchor already reviewed; use it for the high-level eSNN lineage and vocabulary.
- **Kasabov, Dhoble, Nuntalid, and Indiveri 2013:** next detail review target for dynamic evolving spiking neural networks in online spatio- and spectro-temporal recognition.
- **Wang, Belatreche, Maguire, and McGinnity 2014:** later detail review target for supervised spiking learning with adaptive structure.
- **Roy and Basu 2017:** bridge toward structural plasticity; should be coordinated so the same paper is not duplicated across bundles.
- **Lightheart 2018 thesis source:** thesis taxonomy context for spike-timing-dependent construction and evolving spiking systems.

## Open questions for human review

- What specific eSNN variant is used for the audiovisual task, and how does it differ from the survey description?
- What exactly is constructed or adapted during learning?
- Which parts of the audiovisual pipeline are spiking, evolving, or fixed preprocessing?
- Are there explicit growth, merge, prune, or capacity-control thresholds?
- Which evaluation results should be summarized in a public comparison table once the paper has been human-reviewed?
