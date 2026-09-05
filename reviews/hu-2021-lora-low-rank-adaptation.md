# LoRA: Low-Rank Adaptation of Large Language Models

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated draft written on 2026-09-05 while adding the frozen-base
parameter-addition anchors named in portfolio goal G-027. Sources read online
that day: the arXiv abstract page for `arXiv:2106.09685` and the ar5iv HTML
rendering of the paper. No PDF or extracted text was copied into Git; the paper
is open access and was read in place.

Quoted sentences below come from the paper's method section. They have not been
checked against page images or by a human. Result claims are quoted from the
abstract rather than verified against the tables.

## One-sentence summary

LoRA freezes the pre-trained weights and trains a rank-r product BA as the update
to selected weight matrices, cutting trainable parameters by orders of magnitude
and — unlike adapters — adding no inference latency, because the learned delta
can be folded back into the weight matrix.

## Mechanism as read

1. **Where the new parameters live.** On an existing matrix, not in a new layer:
   "W0 + dW = W0 + BA" with B in R^{d x r}, A in R^{r x k}, and rank r much
   smaller than min(d,k). The forward pass is "h = W0x + BAx" with W0 frozen.
2. **Starting from the base function exactly.** A is "initialized with random
   Gaussian" values and B starts at "zero", so BA is exactly zero at step one.
   The delta is "scaled by alpha/r, where alpha is a constant in r", and the
   paper notes that "tuning alpha is roughly the same as tuning the learning
   rate".
3. **Which matrices.** In the Transformer experiments the authors "limit our
   study to only adapting the attention weights" — Wq and Wv — and "freeze the
   MLP modules". Adapting query and value projections together is reported as
   the best of the single/paired choices they tried.
4. **Removal and task switching.** Because the delta has the same shape as the
   weight it modifies, "we can explicitly compute and store W = W0 + BA and
   perform inference as usual", giving "no additional latency during inference
   compared to a fine-tuned model by construction". Switching tasks on a merged
   model means "subtract BA and then add a different B'A'" — cheap, but an
   arithmetic step rather than deleting a module.
5. **Scale of the saving.** The abstract reports 10,000x fewer trainable
   parameters and 3x lower GPU memory than fine-tuning GPT-3 175B with Adam, at
   on-par or better quality on RoBERTa, DeBERTa, GPT-2 and GPT-3.

## Why it matters for this project

LoRA is the clean counter-example to the assumption that adding capability means
adding structure. Nothing is inserted into the computation graph at inference
time if the delta is merged; the network keeps its original shape and only its
numbers change. That makes it the natural contrast partner for adapters — same
frozen base, same "small number of new trainable parameters", completely
different answer to *where they live* and therefore to *what removal costs*.

For the book's constructive lineage it sharpens a distinction the classic papers
never had to make: growth that changes the architecture versus growth that
changes only the parameters of an unchanged architecture.

## Open questions for human review

- The rank-deficiency investigation in the paper is not read here; what does it
  actually establish about the intrinsic rank of adaptation?
- Merging removes inference latency but also removes modularity — what does the
  paper say about serving many tasks from one base with unmerged deltas?
- Adapting only Wq and Wv is an experimental scope choice; how much of the
  headline parameter saving depends on it?
