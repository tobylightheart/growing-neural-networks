# Growing Neural Gas mechanism source-verification worksheet

> **Status: automated source-verification aid, not human-reviewed.** This supports a teaching artifact; it is not a human-ratified review or a reproduction of reported experiments.

## Reconciled source identity

The repository contradicted itself: `data/review-bundles.json` marked Fritzke 1995 `available-in-library`, while its action note, the PDF-library plan, and the Marsland review still called it an asset gap. The private library now contains the exact-title source:

- Bernd Fritzke, “A Growing Neural Gas Network Learns Topologies,” in *Advances in Neural Information Processing Systems 7*, MIT Press, 1995.
- Read-only path: `../growing-neural-networks-library/pdfs/Constructive/Fritzke B (1995) - A Growing Neural Gas Network Learns Topologies.ps`.
- Identity: eight-page DSC PostScript generated from TeX on 1995-02-05; 721,014 bytes; SHA-256 `826bdc0bd45c8da30a237d52845835bae291d9a6b0adece022222dea372c376d`.
- The title, author, venue statement, abstract, section headings, and complete numbered algorithm are present in the file. This is not one of the different Fritzke 1994 PDFs found by the earlier scan.

The exact-title PostScript file was evidently added after the 2026-07-20 filename search. Status is therefore **available in the private library**, with an extraction-quality caveat—not a missing asset.

## Inspection limits

No PostScript renderer or `ps2ascii` was available. A local, uncommitted Python extraction decoded PostScript literal strings. It recovered coherent prose and all numbered algorithm steps, but TeX/dvips splits words and damages symbols and ligatures. Source locators below use section and algorithm-step numbers plus PostScript page numbers. Equations, Greek symbols, typography, and experimental values still need visual/human checking. No private source or extracted full text is committed.

## Mechanism boundary used by the lab

Directly supported by section 3, PostScript pages 3–4, algorithm steps 0–10:

1. Start with two randomly positioned units; draw inputs from a distribution (steps 0–1).
2. Select nearest and second-nearest units (step 2).
3. Increment ages of edges incident to the nearest unit; add its squared input distance to local error (steps 3–4).
4. Move the nearest unit and its direct graph neighbors toward the input using distinct fractions (step 5).
5. Create or reset the nearest/second-nearest edge; remove edges older than `a_max` and newly isolated units (steps 6–7).
6. Every `λ` signals, insert halfway between the maximum-error unit and its maximum-error neighbor, replace their edge, reduce their errors, and initialize the new error (step 8).
7. Decay all errors and continue until an application stopping criterion (steps 9–10).

The explanatory prose following step 10 states that prototype adaptation moves units toward supported input regions; competitive-Hebbian edges track an induced Delaunay topology; local edge aging removes obsolete connections; and accumulated squared distance targets insertion to high-error regions.

## Deviations and unsupported claims

The lab fixes two initial positions and a twelve-sample 2-D stream rather than random sampling; uses demonstration rates, age limit, insertion interval, and error factors; rounds stored state; and stops after the finite trace. It does **not** reproduce the paper's distributions, parameter sets, figures, topology-quality results, or comparisons. It does not claim that these demo values are Fritzke defaults. The exact update order is paper-grounded; numerical outcomes are only outcomes of the pinned toy trace.
