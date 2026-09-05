# Net2Net: Accelerating Learning via Knowledge Transfer

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated draft written on 2026-09-05 while adding the depth-and-width expansion
anchors named in portfolio goal G-028. Sources read online that day: the public
arXiv abstract page for `arXiv:1511.05641` and the ar5iv HTML rendering. No PDF
or extracted text was copied into Git. The quoted sentences are the paper's own;
they have not been checked against page images or by a human.

## One-sentence summary

Net2Net moves a trained network into a wider or deeper one through
function-preserving transformations, so the larger network starts from exactly
the function the smaller one had learned rather than from random initialization.

## Mechanism as read

1. **Net2WiderNet.** New units are copies of existing ones, chosen by a random
   mapping: "the random selection is performed with replacement, so each column
   of W is copied potentially many times". The function survives because the
   next layer divides: "we must account for the replication by dividing the
   weight by replication factor given by 1/|{x|g(x)=g(j)}|, so all the units have
   the exactly the same value as the unit in the original net."
2. **Why exactness is then deliberately broken.** "One should add a small amount
   of noise to all but the first copy of each column of weights. This results in
   the student network representing only approximately the same function as the
   teacher, but this approximation is necessary to ensure that the student can
   learn to use its full capacity." Perfect copies would move together forever;
   the noise is what makes the added width real.
3. **Net2DeeperNet.** A layer becomes two, with the inserted matrix "initialized
   to an identity matrix, but remains free to learn to take on any value later".
4. **The activation constraint.** Deepening "is only applicable when phi is
   chosen such that phi(I phi(v)) = phi(v) for all vectors v. This property holds
   for the rectified linear activation." For maxout, a near-identity matrix with
   replicated columns is needed, and for the logistic sigmoid the paper states it
   is not possible to insert a layer this way.
5. **Nothing is frozen.** After the transfer, training continues over the whole
   network; the guarantee is about the instant of expansion, not about what
   happens afterwards.

## Why it matters for this project

Net2Net gives the book the cleanest available definition of *function-preserving*
growth, which is the property the classic constructive algorithms mostly did not
have. Dynamic Node Creation inserts a node and keeps training everything;
Cascade-Correlation protects an installed unit's inputs but changes the function
the moment it installs. Net2Net says exactly what it would mean for growth to
cost nothing at the moment it happens — and the noise caveat says why you would
not actually want that.

## Open questions for human review

- What does the paper measure about how quickly the noise-perturbed copies
  diverge, and does the initial advantage survive long training?
- How does the random mapping choice interact with convolutional structure in
  the Inception experiments?
- Do the reported ImageNet results depend on the transfer, or mainly on the
  larger final architecture?
