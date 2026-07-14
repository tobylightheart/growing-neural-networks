# Investigation of the CasCor Family of Learning Algorithms

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated bundle-first draft for the `classic-constructive-foundations` bundle. It was selected because this bundle is the current urgent/active branch, Platt1991 was already drafted, and the bundle plan named Prechelt1997 as the next classic constructive survey anchor.

This draft is grounded in the existing bundle metadata, Crossref title/DOI metadata for DOI `10.1016/s0893-6080(96)00115-3`, a DOI landing redirect to Elsevier/ScienceDirect, and a verified local private PDF path under `../growing-neural-networks-library/pdfs/Constructive/`. Semantic Scholar lookup was attempted but returned HTTP 429. The cron environment did not have usable PDF text-extraction tooling (`pdftotext`, `pypdf`, `PyPDF2`, `pdfminer`, or `fitz` were unavailable), and raw byte/string inspection did not expose reliable body text, so this is a cautious reading guide rather than a full close reading of the article.

## One-sentence summary

Prechelt's 1997 *Neural Networks* article is a classic survey/comparison anchor for the Cascade-Correlation family of constructive learning algorithms; the verified metadata supports using it to organize CasCor-family review work, but not yet to quote exact algorithm variants or empirical conclusions.

## Why it matters for this project

The public review already has Cascade-Correlation as a core constructive-learning method and Platt1991 as a resource-allocation contrast. Prechelt1997 helps turn the classic branch from isolated method cards into a family-level grounding branch for supervised constructive algorithms.

Use it cautiously for three site-level purposes:

1. **Family-level context:** the title and venue metadata support treating this as an investigation of the CasCor family, useful for connecting the original Cascade-Correlation record to later variants.
2. **Comparison scaffold:** this record can organize open questions about which CasCor variants change candidate training, installation, freezing, stopping, and capacity-control behavior.
3. **Teaching sequence:** once human-reviewed, it should help the site distinguish a single canonical Cascade-Correlation algorithm from a broader family of constructive-learning choices.

## Bibliographic metadata checked

- Crossref title lookup and DOI lookup returned Lutz Prechelt, "Investigation of the CasCor Family of Learning Algorithms", *Neural Networks* 10(5):885-896, July 1997, DOI `10.1016/s0893-6080(96)00115-3`.
- The DOI resolver returned an Elsevier linking page for `S0893608096001153` in this cron environment.
- Semantic Scholar search was attempted for the exact title/query but returned HTTP 429, so no Semantic Scholar abstract, TLDR, or paper id is recorded yet.
- The private library PDF path was verified under `../growing-neural-networks-library/pdfs/Constructive/`; the PDF and extracted full text were not copied into Git.
- Local extraction checks found no `pdftotext` executable and no importable `pypdf`, `PyPDF2`, `pdfminer`, or `fitz` package. A raw byte/string scan did not expose reliable title, author, DOI, or body text snippets.

## Core idea for the review graph

Use Prechelt1997 as a survey anchor for the Cascade-Correlation family inside the classic constructive foundations bundle. The metadata-supported public claim is deliberately modest: this is a *Neural Networks* article investigating the CasCor family, making it relevant to the site's Cascade-Correlation lineage and to comparison with Dynamic Node Creation and resource-allocation approaches.

This draft should not yet be cited for exact claims about the number or names of CasCor variants, candidate-unit objective functions, freezing policies, stopping criteria, benchmark outcomes, statistical conclusions, or recommended algorithm choices. Those details require reliable full-text extraction or human review.

## Relationship to neighboring bundle papers

- **Fahlman and Lebiere 1990:** original Cascade-Correlation anchor; Prechelt1997 should eventually clarify the larger family around this method.
- **Ash 1989:** Dynamic Node Creation remains the backpropagation-network hidden-unit-growth contrast.
- **Platt 1991:** Resource-Allocating Network remains the function-interpolation/resource-allocation contrast.
- **Lightheart 2018 thesis source:** taxonomy context for comparing classic constructive growth families with spiking construction.

## Open questions for human review

- Which CasCor variants are included in Prechelt's family comparison?
- Which algorithmic choices vary across the family: candidate objective, candidate pool, freezing, recurrent connections, stopping, or post-growth training?
- What empirical tasks and performance measures are used?
- Does the paper recommend a default CasCor variant or identify failure modes?
- How should the family-level conclusions change the public Cascade-Correlation demo and the planned classic constructive comparison exercise?
