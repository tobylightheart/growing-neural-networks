# A Self-Organising Network That Grows When Required

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated bundle-first draft for the `growing-topology-and-neural-gas` bundle. It was selected on 2026-07-23 after the urgent eSNN branch completed its explicit five-anchor metadata/private-asset improvement sequence and the priority review found concrete ready evidence for this next branch: Marsland2002 already had a discovered paper record and a collected private PDF.

This draft is grounded in Crossref metadata for DOI `10.1016/S0893-6080(02)00078-3`, PubMed record `12416693` and its indexed abstract, a DOI route reaching Elsevier PII `S0893608002000783`, and a verified private PDF path under `../growing-neural-networks-library/pdfs/Constructive/`. Semantic Scholar title lookup returned HTTP 429. The private file is a 1,297,945-byte PDF-1.3 document, but the cron environment lacked usable extraction tooling (`pdftotext`, `mutool`, `pdfinfo`, `pypdf`, `PyPDF2`, `pdfminer`, and `fitz`), and limited Flate/string inspection did not recover reliable body text. This is therefore a cautious reading guide, not a close full-text review; neither the PDF nor extracted full text is committed.

## One-sentence summary

Marsland, Shapiro, and Nehmzow present a self-organising network whose public indexed abstract says it adds nodes when the current network does not sufficiently match an input, allowing growth to respond to changing data rather than follow only a fixed insertion schedule.

## Why it matters for this project

The site's classic constructive branch mainly asks when a supervised learner should add hidden capacity. Marsland2002 opens a distinct topology/prototype-growth branch: the public abstract frames node insertion around inadequate representation of the current input and explicitly motivates dynamic input distributions.

That distinction is useful for the review graph:

1. **Different object of growth:** the paper concerns nodes in a self-organising map-like representation rather than hidden units recruited to reduce supervised residual error.
2. **Different trigger framing:** PubMed's abstract contrasts input-mismatch-driven growth with schemes that insert nodes only on a predefined iteration schedule.
3. **Different environment:** the abstract emphasizes changing input distributions and novelty-detection tasks, giving the garden a cautious route from constructive growth to adaptation under distribution change.

These are abstract-supported orientation claims. Exact growth thresholds, node initialization, edge/topology updates, adaptation variables, and learning equations still require reliable full-text or human review.

## Bibliographic metadata checked

- Crossref indexes Stephen Marsland, Jonathan Shapiro, and Ulrich Nehmzow, “A self-organising network that grows when required,” *Neural Networks* 15(8-9):1041-1058.
- DOI: `10.1016/S0893-6080(02)00078-3`.
- Crossref records October 2002 print publication metadata.
- PubMed record `12416693` independently matches the title, authors, journal, volume, issue, pages, year, DOI, and PII, and marks the record as having an abstract.
- The DOI route returned HTTP 200 at Elsevier's linking hub for PII `S0893608002000783`.
- The private PDF path was verified with a PDF-1.3 header and size 1,297,945 bytes; it remains outside Git.
- Semantic Scholar returned HTTP 429, so no Semantic Scholar facts are used here.

## Abstract-supported mechanism outline

The PubMed-indexed abstract supports the following limited outline:

- the network can add nodes to its map space;
- insertion is proposed when the current network does not sufficiently match an input;
- the intended behavior is rapid growth when new data appears and cessation of growth once the data is represented;
- the motivation includes dynamic input distributions and preservation of neighborhood relations; and
- the reported evaluation includes comparison with Growing Neural Gas and novelty-detection tasks.

This outline does **not** establish the implementation details. In particular, this automated draft does not assert:

- how “sufficiently match” is calculated;
- the numerical growth threshold or schedule;
- how a new node and its connections are initialized;
- the exact adaptation, habituation, aging, deletion, or topology-maintenance rules;
- experimental protocols, benchmark identities beyond what the abstract states, or quantitative outcomes; or
- whether the method's guarantees or behavior generalize beyond the reported settings.

## Relationship to neighboring papers

- **Fritzke 1995 / Growing Neural Gas:** the exact-title private source is now reconciled as an eight-page PostScript file, distinct from the mismatched Fritzke 1994 PDFs found earlier. Its automated source worksheet supports the periodic accumulated-error insertion contrast with GWR's activity-plus-habituation gate, but remains not human-reviewed and typography-limited.
- **Ash 1989 / Dynamic Node Creation:** both concern conditional node growth, but Ash1989 is a supervised backpropagation branch while Marsland2002 is a self-organising topology/prototype branch.
- **Fahlman and Lebiere / Cascade-Correlation:** Cascade-Correlation recruits candidates using residual-error correlation; Marsland2002 should not be described with that supervised candidate-training mechanism.
- **Lightheart 2018 thesis taxonomy:** provides broader constructive-learning vocabulary for comparing what grows and what signal triggers growth.

## Open questions for human review

- What precise activity or distance statistic defines an inadequate input match?
- How are insertion and adaptation thresholds set or updated?
- Which graph connections are created, aged, removed, or preserved when a node is added?
- Does habituation play a role in growth and learning, and if so, how?
- How does the method differ algorithmically from Growing Neural Gas beyond insertion timing?
- Which experimental findings are robust enough to support public comparative claims?