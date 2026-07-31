# Debrief: GNN-3 Verify the GWR mechanism seam

**Completed:** 2026-07-31
**Commit:** 7cee613171d0769f952f48c9b11e5643f6fa3a07

## Design decisions

- Used ephemeral `uv` environments for `pypdf` and PyMuPDF rather than adding repository dependencies or copying extraction output into the private library. This made the source readable while preserving the brief's file boundary.
- Treated adequate-representation growth cessation separately from global loop termination. The source directly supports the former but leaves step 11's stopping criterion application-defined; merging them would overstate the algorithm.
- Recorded configurable thresholds and edge age as non-universal rather than choosing defaults from one experiment. Experimental settings are evidence of use, not algorithm-wide constants.
- Preferred the numbered equations for node placement over the nearby shorthand that calls insertion “between” the two best matches: Eq. (8) explicitly defines the new weight as the midpoint of the winner and current input, while Eqs. (9)–(10) define the topology change.

## Descoped / deferred

- The public Marsland review remains unchanged. Promote worksheet findings into public review prose only after human review of the source-backed paraphrases.
- Quantitative result assessment and broad GWR/GNG or GWR/constructive-family comparison remain outside this slice. Revisit only under a separately approved synthesis or close-review task.
- No universal `a_T`, `a_max`, or global stopping default was supplied because the source does not define one across applications.

## Observations

- The existing public draft's extraction limitation is historical rather than a corrupt-source problem: `pypdf 6.14.2` recovered coherent text from all 18 pages without adding a project dependency.
- The PDF text layer rendered the minus sign in Eq. (6) as the character `2`. A visual render of journal page 1045 confirmed `a = exp(-||ξ - w_s||)`. Future equation-level extraction from this file should visually verify symbols rather than trust plain text alone.
- The source separates three ideas that are easy to collapse: low activity, sufficient prior firing/habituation, and termination of the input loop. Keeping those distinct is essential for any future implementation.

## Follow-ups

No task filed. Public review promotion remains deliberately gated on human review rather than being queued automatically.
