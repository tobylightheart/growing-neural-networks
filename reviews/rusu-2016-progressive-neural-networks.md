# Progressive Neural Networks

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated draft written on 2026-09-05 while adding the depth-and-width expansion
anchors named in portfolio goal G-028. Sources read online that day: the public
arXiv abstract page for `arXiv:1606.04671` and the ar5iv HTML rendering. No PDF
or extracted text was copied into Git.

## One-sentence summary

A progressive network adds one randomly initialized column per task and freezes
every earlier column, wiring the old columns into the new one through lateral
connections, so transfer is possible in one direction only and forgetting is
structurally impossible.

## Mechanism as read

1. **A column per task.** For a second task "a new column with parameters
   Theta(2) is instantiated (with random initialization), where layer h_i^(2)
   receives input from both h_{i-1}^(2) and h_{i-1}^(1) via lateral connections."
2. **The layer equation.** h_i^(k) = f(W_i^(k) h_{i-1}^(k) + sum over j<k of
   U_i^(k:j) h_{i-1}^(j)) — each layer of the new column reads the corresponding
   layer of *every* earlier column, not only the most recent one.
3. **Adapters on the lateral path.** A variant projects the earlier activations
   and multiplies them "by a learned scalar, initialized by a random small
   value", which keeps the lateral path from dominating at the start.
4. **Why forgetting is impossible rather than merely unlikely.** "Because also
   the parameters {Theta(j); j<k} are kept frozen (i.e. are constants for the
   optimizer) when training Theta(k), there is no interference between tasks and
   hence no catastrophic forgetting." Each earlier task's function is preserved
   exactly and permanently — a different and stronger claim than Net2Net's
   preservation at the instant of growth.
5. **The stated cost.** "A downside of the approach is the growth in number of
   parameters with the number of tasks"; the lateral connections grow with the
   number of earlier columns, so the count grows faster than linearly.

## Why it matters for this project

Progressive networks are the frozen-column limit case for the book's freezing
axis. Cascade-Correlation freezes a unit's incoming weights and keeps training
the rest; adapters and LoRA freeze the base and train a small addition;
progressive networks freeze *everything* previously learned and pay for it in
parameters. Placing the three together turns "what stays frozen" from a detail
into the axis the modern literature actually varies.

The parameter cost is also the honest counterweight to the no-forgetting claim,
and it is the pressure that later work — adapters, LoRA, gated composition of
trained modules — is answering.

## Open questions for human review

- The exact parameter-growth expression as a function of columns, depth and
  width, which this draft states only qualitatively.
- How well the lateral connections actually transfer in their experiments, as
  opposed to being available in principle.
- What happens when task order changes: the architecture is asymmetric, and the
  read sections do not settle how much that matters.
