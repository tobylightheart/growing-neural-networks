# Parameter-Efficient Transfer Learning for NLP

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated draft written on 2026-09-05 while adding the frozen-base
parameter-addition anchors named in portfolio goal G-027. It is grounded in two
public sources read online that day: the arXiv abstract page for
`arXiv:1902.00751` and the ar5iv HTML rendering of the same paper. No PDF and no
extracted full text were copied into Git, and the private paper library holds no
copy of this paper — it is open access and was read in place.

The quoted mechanism sentences below come from the paper's own architecture
section. They have not been checked against page images or by a human, and the
experimental results are taken from the abstract rather than from the results
tables.

## One-sentence summary

Adapter modules add a few trainable parameters inside each Transformer block for
each new task, leaving the pre-trained weights fixed, and reach within 0.4% of
full fine-tuning on GLUE while adding 3.6% parameters per task.

## Mechanism as read

1. **Where the new parameters live.** Adapters are inserted *inside* the block,
   twice per Transformer layer: "after the projection following multi-headed
   attention and after the two feed-forward layers", applied "directly to the
   output of the sub-layer, after the projection back to the input size, but
   before adding the skip connection back". They are new layers, not a delta on
   an existing matrix.
2. **Shape.** "Adapters first project the original d-dimensional features into a
   smaller dimension, m, apply a nonlinearity, then project back to d
   dimensions", with "a skip-connection internally".
3. **Cost.** "The total number of parameters added per layer, including biases,
   is 2md+d+m." With m much smaller than d the overhead stays small; the
   abstract's headline figure is 3.6% of the model's parameters per task.
4. **What else is trained.** Besides the adapters, the paper trains "new layer
   normalization parameters per task" and the final classification layer. The
   frozen set is therefore the pre-trained Transformer weights, not literally
   every parameter outside the adapters.
5. **Starting from the base function.** "If the parameters of the projection
   layers are initialized to near-zero, the module is initialized to an
   approximate identity function"; the reported initialization draws from a
   zero-mean Gaussian with standard deviation 1e-2, truncated at two standard
   deviations. This is *approximate* identity, which is a real difference from
   LoRA's exactly-zero start.

## Why it matters for this project

This is the modern form of a question the classic constructive papers already
asked: when the current model is not good enough, what exactly gets added, and
what is protected from the update? Cascade-Correlation freezes an installed
unit's incoming weights and keeps growing the network it built; adapters invert
the emphasis by freezing everything that was already trained and letting the new
capacity be the only thing that moves.

It is also the closest published analogue to inserting a new module *inside* an
existing block rather than beside it, which is the structural option a
`set_program` over frozen base segments has to compare itself against.

## Open questions for human review

- How do the GLUE numbers behave as m shrinks, and where does the near-identity
  initialization stop being harmless?
- The paper trains new layer-norm parameters per task: how much of the reported
  performance depends on that rather than on the adapters themselves?
- What is the measured inference cost of the extra sequential layers? LoRA's
  abstract asserts adapters add inference latency; this paper's own measurement
  of that cost has not been read here.
