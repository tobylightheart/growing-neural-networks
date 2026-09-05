# Depth and Width from Existing Weights

A source-linked comparison of three ways to build a larger network out of one
already trained: Net2Net (Chen et al. 2016), G_stack depthwise stacking
(Du et al. 2024), and progressive neural networks (Rusu et al. 2016).

The axis the module keeps straight is what the *promise* is:

- **Net2Net** preserves the function exactly at the instant of expansion —
  replicated units, outgoing weights divided by the replication count — and then
  deliberately breaks it with noise so the copies can diverge.
- **G_stack** preserves nothing. A trained small model is composed with itself g
  times as an initialization and the grown model is pre-trained further; the
  claim is about compute, not about function.
- **Progressive networks** never expand the old network at all. Each task gets a
  new column, every earlier column is frozen, and reuse happens through lateral
  connections — so every earlier task's function is preserved permanently, paid
  for with parameters that grow with the number of tasks.

The Net2WiderNet panel is a live function-preservation check on a two-unit
rectified-linear toy network: toggle the division by the replication count, or
add the paper's copy noise, and watch the guarantee hold or break. Those
numbers are asserted in `tests/browser_demos.test.js`.

The final panel links the pre-transformer lineage in this book — the
topology-growth and capacity-growth modules — and states the through-line
narrowly: the old work asked *when* to add capacity, the modern work asks what
the addition is initialized from and what it may not disturb.

All mechanism copy is an automated reading of the public arXiv and ar5iv sources
and is explicitly not human-reviewed. The G_stack paper's fitted growth-timing
equation is deliberately not asserted anywhere.
