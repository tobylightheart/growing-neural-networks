# Where Do the New Parameters Live?

A source-linked comparison of three ways to extend a frozen pre-trained model:
bottleneck adapters (Houlsby et al. 2019), LoRA (Hu et al. 2021), and Mixture of
LoRA Experts (Wu et al. 2024).

The module keeps three questions apart that a parameter count collapses:

- **Where the new parameters live** — new layers inside the block, a low-rank
  delta on a matrix that already exists, or nowhere new at all.
- **What removal costs** — deleting a module, subtracting a merged delta, or
  masking a branch and renormalizing the gate.
- **What stays frozen** — the pre-trained weights in the first two cases; the
  pre-trained weights *and* every trained LoRA in MoLE, where only the gate is
  trained.

Two interactions: the papers' own parameter-cost formulas applied to a width,
bottleneck, rank and layer count; and MoLE's inference-time branch masking with
proportional redistribution of the surviving gate weights.

Where a paper does not state a cost — MoLE's gate — the module reports it as not
stated rather than inventing a formula. All mechanism copy is an automated
reading of the public arXiv and ar5iv sources and is explicitly not
human-reviewed; the linked review drafts record what was read and what was not.
