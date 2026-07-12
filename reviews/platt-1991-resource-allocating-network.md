# A Resource-Allocating Network for Function Interpolation

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated bundle-first draft for the `classic-constructive-foundations` bundle. It was selected after the eSNN active branch completed its planned first-anchor review sequence and the bundle plan explicitly allowed daily review work to branch back to the high-priority classic constructive foundations.

This draft is grounded in the existing bundle metadata, Crossref title/DOI metadata for DOI `10.1162/neco.1991.3.2.213`, Semantic Scholar DOI metadata, and a verified local private PDF path under `../growing-neural-networks-library/pdfs/Constructive/`. The cron environment did not have usable PDF text-extraction tooling (`pdftotext`, `pypdf`, `PyPDF2`, `pdfminer`, or `fitz` were unavailable), and raw byte/string inspection did not expose reliable body text, so this is a cautious reading guide rather than a full close reading of the article.

## One-sentence summary

Platt's 1991 Neural Computation paper is a classic constructive-function-approximation anchor: the checked metadata identifies it as a resource-allocating network paper for function interpolation, and Semantic Scholar's TLDR characterizes the method as allocating a new computational unit when an unusual pattern is presented.

## Why it matters for this project

The public review already has Dynamic Node Creation and Cascade-Correlation as early constructive foundations. Platt1991 adds a complementary classic branch: instead of starting from hidden-unit backpropagation or candidate-unit correlation, it frames construction as resource allocation for function interpolation.

That makes it useful for three site-level comparisons:

1. **Growth trigger language:** the Semantic Scholar TLDR supports a cautious statement that the method allocates a computational unit for unusual patterns, pending full-text verification of the exact novelty or distance test.
2. **Task setting:** Crossref verifies the article as a Neural Computation paper on function interpolation, making it a natural bridge from classic constructive neural networks to interpolation/function-approximation settings.
3. **Mechanism contrast:** after human review, this record can help distinguish resource-allocation growth from Cascade-Correlation's candidate-unit installation and Dynamic Node Creation's hidden-node insertion during backpropagation.

## Bibliographic metadata checked

- Crossref title lookup returned John Platt, "A Resource-Allocating Network for Function Interpolation", *Neural Computation* 3(2), June 1991, DOI `10.1162/neco.1991.3.2.213`.
- Semantic Scholar DOI lookup returned the matching title, year 1991, venue *Neural Computation*, author John C. Platt, DOI `10.1162/neco.1991.3.2.213`, DBLP key `journals/neco/Platt91`, and Semantic Scholar paper id `15e2989c299b63efc42f0b93bf63848a92b88c63`.
- Semantic Scholar's publisher-elided metadata did not expose an abstract, but did expose a TLDR describing allocation of a new computational unit for unusual patterns, faster learning than backpropagation networks, and comparable synapse count.
- A DOI landing check was attempted but the DOI resolver/publisher path returned HTTP 403 in this cron environment, so no publisher landing-page details beyond Crossref/Semantic Scholar are used here.
- The private library PDF path was verified under `../growing-neural-networks-library/pdfs/Constructive/`; the PDF and extracted full text were not copied into Git.

## Core idea for the review graph

Use Platt1991 as a classic constructive-foundation anchor for resource allocation. The metadata-supported public claim is modest: the paper belongs in the classic constructive lineage because it is a resource-allocating network paper for function interpolation. The Semantic Scholar TLDR supports a cautious reading-guide claim that unusual patterns can trigger allocation of a new computational unit.

This draft should not yet be cited for exact implementation details such as the mathematical form of the novelty criterion, the shape or parameters of allocated units, the interpolation update equations, stopping conditions, pruning behavior, or benchmark claims. Those details require reliable full-text extraction or human review.

## Relationship to neighboring bundle papers

- **Ash 1989:** Dynamic Node Creation gives the bundle a backpropagation-network hidden-unit growth anchor.
- **Fahlman and Lebiere 1990:** Cascade-Correlation gives the bundle a candidate-unit/correlation/freeze anchor.
- **Prechelt 1997:** planned next classic constructive survey anchor for the CasCor family.
- **Lightheart 2018 thesis source:** taxonomy context for comparing classic constructive growth with spiking construction.

## Open questions for human review

- What exact signal defines an "unusual" pattern in the resource-allocation rule?
- What computational unit is allocated, and what parameters are initialized or adapted?
- Does the method include pruning, merging, or capacity-control steps, or only growth?
- How does the paper compare learning speed and synapse count with backpropagation networks?
- Which later constructive algorithms inherit or revise Platt's resource-allocation framing?
