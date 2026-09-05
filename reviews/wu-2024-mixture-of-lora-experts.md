# Mixture of LoRA Experts

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated draft written on 2026-09-05 while adding the frozen-base
parameter-addition anchors named in portfolio goal G-027. Sources read online
that day: the arXiv abstract page for `arXiv:2404.13628` and the ar5iv HTML
rendering of the paper. No PDF or extracted text was copied into Git.

Quoted sentences below come from the paper's method and analysis sections. They
have not been checked against page images or by a human, and no experimental
result of the paper is asserted here beyond what its abstract claims.

## One-sentence summary

MoLE composes several already-trained LoRAs by learning a gating function over
them — one gate per layer, all LoRAs and the base model frozen — instead of
merging them arithmetically, which the paper argues loses either the base
model's generative ability or each LoRA's distinct identity.

## Mechanism as read

1. **What an expert is.** Not a whole LoRA: "MoLE treats each layer of trained
   LoRAs as a distinct expert and implements hierarchical weight control by
   integrating a learnable gating function within each layer."
2. **What the gate computes.** Softmax weights over the layer's expert outputs,
   from a learnable parameter matrix applied to the flattened, concatenated
   expert outputs. The analysis section compares matrix-wise, layer-wise,
   block-wise and network-wise granularity, reporting layer-wise and block-wise
   as the better choices.
3. **Hierarchical control** is two losses: a balancing loss "minimized when the
   dispatching is ideally balanced", which stops one LoRA dominating, and a
   domain-specific loss (CLIP-based guidance for vision-language, cross-entropy
   for NLP).
4. **What is frozen.** Everything except the gate: "We freeze all trained LoRAs
   and pre-trained model parameters, optimizing only the gating function's
   parameters."
5. **Removal at inference.** Branches can be dropped without retraining —
   "without altering the gating weights, achieve a more flexible LoRA
   composition by masking out undesired LoRAs and recalculating and distributing
   weights proportionally".

## Why it matters for this project

MoLE is the third distinct answer to "where do the new parameters live", and the
only one where *no new capacity is added at all*. The capacity already exists as
a set of trained LoRAs; what is learned is a selection rule over them. That makes
it the published relative of routing-plus-construction: a gate decides which
existing module answers, and the interesting question becomes what happens when
none of them should.

It also makes composition, rather than adaptation, the unit of study — which is
the axis on which the frozen-base literature stops resembling classic
constructive learning and starts resembling module libraries.

## Open questions for human review

- What is the gate's own parameter cost as a function of the number of experts
  and the layer width? The flattened-concatenation description implies it is not
  negligible, and this draft deliberately asserts no formula.
- Does masking at inference preserve the balancing loss's guarantees, or only the
  weights' normalization?
- How does MoLE compare against simply training one LoRA on the union of the
  tasks — the baseline that would tell us composition is buying something?
