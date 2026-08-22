# A Resource-Allocating Network for Function Interpolation

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated bundle-first draft for the `classic-constructive-foundations` bundle. It was selected after the eSNN active branch completed its planned first-anchor review sequence and the bundle plan explicitly allowed daily review work to branch back to the high-priority classic constructive foundations.

This draft is grounded in the existing bundle metadata, Crossref title/DOI metadata for DOI `10.1162/neco.1991.3.2.213`, Semantic Scholar DOI metadata, and the verified private PDF at `../growing-neural-networks-library/pdfs/Constructive/Platt J (1991) - A Resource-Allocating Network for Function Interpolation.pdf`. On 2026-08-23, an automated close read used `pypdf` against that PDF. Its custom font encoding produces damaged typography and control characters in extracted equations, but the surrounding prose, equation numbering, and pseudocode consistently expose the mechanism below. These findings remain **not human-reviewed**, and the mathematical symbols should be checked against page images before formal reuse.

## 2026-08-23 close-read findings

1. **Two-part growth signal.** Equations (2.7) and (2.8) call an input-output pair novel only when the input is farther than the current distance scale `ε(t)` from the nearest stored center **and** output error exceeds desired accuracy `δ`. The paper says both gates are needed for compactness: distance alone allocates instead of correcting small errors, while error alone can allocate fine-scale units for coarse features.
2. **Coarse-to-fine distance schedule.** Equation (2.9) decays `ε(t)` from `ε_max` toward `ε_min`. The prose describes this as first creating a coarse representation, then refining it with narrower units, and eventually stopping allocation when the learned function meets the desired accuracy and length scale.
3. **Allocation initialization.** Equations (2.4)–(2.6) center the new local unit on the current input, initialize its output-side weight to the current residual so the network immediately corrects that sample, and set width proportional to nearest-center distance (with a first-unit special case in the pseudocode).
4. **Training when allocation does not happen.** Equations (2.11) and (2.12) apply Widrow-Hoff LMS updates to output weights and the offset and move local-unit centers by gradient descent. Existing units are therefore adapted rather than frozen; their locality is the stated protection against a new unit interfering broadly with earlier ones.

## One-sentence summary

Platt's 1991 Neural Computation paper is a classic constructive-function-approximation anchor: the checked metadata identifies it as a resource-allocating network paper for function interpolation, and Semantic Scholar's TLDR characterizes the method as allocating a new computational unit when an unusual pattern is presented.

## Why it matters for this project

The public review already has Dynamic Node Creation and Cascade-Correlation as early constructive foundations. Platt1991 adds a complementary classic branch: instead of starting from hidden-unit backpropagation or candidate-unit correlation, it frames construction as resource allocation for function interpolation.

That makes it useful for three site-level comparisons:

1. **Growth trigger language:** the Semantic Scholar TLDR supports a cautious statement that the method allocates a computational unit for unusual patterns, pending full-text verification of the exact novelty or distance test.
2. **Task setting:** Crossref verifies the article as a Neural Computation paper on function interpolation, making it a natural bridge from classic constructive neural networks to interpolation/function-approximation settings.
3. **Mechanism contrast:** after human review, this record can help distinguish resource-allocation growth from Cascade-Correlation's candidate-unit installation and Dynamic Node Creation's hidden-node insertion during backpropagation.

## Bibliographic metadata checked

- Crossref title lookup returned John Platt, "A Resource-Allocating Network for Function Interpolation", *Neural Computation* 3(2):213-225, June 1991, DOI `10.1162/neco.1991.3.2.213`, published by MIT Press Journals.
- Semantic Scholar DOI lookup returned the matching title, year 1991, venue *Neural Computation*, author John C. Platt, DOI `10.1162/neco.1991.3.2.213`, DBLP key `journals/neco/Platt91`, PubMed id `31167310`, and Semantic Scholar paper id `15e2989c299b63efc42f0b93bf63848a92b88c63`.
- Semantic Scholar's publisher-elided metadata did not expose an abstract, but did expose a TLDR describing allocation of a new computational unit for unusual patterns, faster learning than backpropagation networks, and comparable synapse count. Treat the TLDR as a search/triage aid rather than as a substitute for close reading.
- Semantic Scholar also exposed a green open-access PDF pointer, but this review remains grounded in the already-collected private library PDF and public metadata; no PDF or extracted text was copied into Git.
- A DOI landing check was attempted again on 2026-07-17, but the DOI resolver redirected to MIT Press/Cloudflare and returned HTTP 403 in this cron environment, so no publisher landing-page details beyond Crossref/Semantic Scholar are used here.
- The private library PDF path was verified under `../growing-neural-networks-library/pdfs/Constructive/`; the file has a PDF-1.4 header and TeX/Ghostscript/DVI-derived metadata (`paperWeb.dvi`/`ran.pdf`). Lightweight Flate/string inspection exposed no recoverable body text, so the PDF and extracted full text were not copied into Git.

## Core idea for the review graph

Use Platt1991 as a classic constructive-foundation anchor for resource allocation. The primary-PDF close read supports a more specific claim: RAN allocates a local unit when a presented pair is both spatially novel at the current resolution and inaccurately predicted. When either novelty gate fails, it adapts existing output parameters and local centers instead of allocating.

The decision logic, initialization roles, and adaptation/freeze contrast are supported by the automated close read, but exact symbol typography, experimental parameter values, benchmark conclusions, and any claim of paper-faithful reproduction still require page-image or human verification. No pruning or merging mechanism was identified in the inspected algorithm section.

## Relationship to neighboring bundle papers

- **Ash 1989:** Dynamic Node Creation gives the bundle a backpropagation-network hidden-unit growth anchor.
- **Fahlman and Lebiere 1990:** Cascade-Correlation gives the bundle a candidate-unit/correlation/freeze anchor.
- **Prechelt 1997:** planned next classic constructive survey anchor for the CasCor family.
- **Lightheart 2018 thesis source:** taxonomy context for comparing classic constructive growth with spiking construction.

## Open questions for human review

- Confirm the extracted symbols and inequalities in equations (2.4)–(2.12) against the page images.
- Does any section outside the inspected algorithm text introduce deletion, merging, or other capacity control beyond stopping allocation?
- How does the paper compare learning speed and synapse count with backpropagation networks?
- Which later constructive algorithms inherit or revise Platt's resource-allocation framing?
