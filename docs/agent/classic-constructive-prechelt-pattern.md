# Classic constructive Prechelt/CasCor promotion pattern

Use this note when the bundle-first review loop selects `classic-constructive-foundations` and the next anchor is a publisher-gated classic/survey paper with a verified private PDF but no usable text extraction.

## Proven working pattern from 2026-07-14

Target promoted: `prechelt-1997-cascor-family`.

Source checks that were enough for a cautious automated draft:

1. Verify the private PDF exists under `../growing-neural-networks-library/` and record its path only in `data/paper-assets.json`; do not copy PDF or extracted text into Git.
2. Use Crossref title/DOI lookup for bibliographic facts. For Prechelt1997, Crossref verified:
   - Title: `Investigation of the CasCor Family of Learning Algorithms`
   - DOI: `10.1016/s0893-6080(96)00115-3`
   - Author: Lutz Prechelt
   - Venue: `Neural Networks 10(5):885-896`
   - Print date: July 1997
3. Check DOI resolver/landing page. A DOI redirect to an Elsevier/ScienceDirect linking page is useful provenance, but do not infer full-text claims from the landing page alone.
4. Attempt Semantic Scholar, but if it rate-limits, leave `semantic_scholar` blank and record the rate limit in notes rather than inventing a paper id.
5. Check extraction tooling (`pdftotext`, `pypdf`, `PyPDF2`, `pdfminer`, `fitz`) and raw bytes/strings. If no reliable body text appears, write a reading-guide draft.

## Safe claim boundary

For CasCor-family survey anchors, metadata supports statements like:

- the paper is a Neural Networks article investigating the CasCor family;
- it belongs in the Cascade-Correlation/classic constructive foundations branch;
- it can serve as a scaffold for future human review of variant choices and empirical comparisons.

Avoid exact claims about:

- number or names of CasCor variants;
- candidate-unit objectives or candidate-pool details;
- freezing/stopping/post-growth policies;
- benchmark outcomes, statistical conclusions, or recommended variants.

## Bookkeeping reminder

When the active classic bundle's anchor is promoted, update both `data/review-bundles.json` and `docs/pdf-library-review-plan.md` to say the review draft now exists, but do not churn priority/status if `classic-constructive-foundations` remains the highest-value active branch.
