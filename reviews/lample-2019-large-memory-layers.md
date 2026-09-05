# Large Memory Layers with Product Keys — automated review draft

> Status: Automated draft, not yet human-reviewed.

## Citation

Guillaume Lample, Alexandre Sablayrolles, Marc'Aurelio Ranzato, Ludovic Denoyer,
and Hervé Jégou. *Large Memory Layers with Product Keys*. NeurIPS 2019;
arXiv:1907.05242v2.

## Why it matters here

The paper adds dedicated learned capacity as a key–value memory layer. A query is
split in two, searched against two sub-key sets, and the best product keys select
a sparse weighted sum of value vectors. The values carry most of the parameters;
the product-key construction avoids comparing the query with every implicit key.
All memory parameters are trainable, but only the selected slots are updated for
an input.

This is architectural capacity, not an interpretability read-out. The paper's
abstract reports up to a billion parameters and says a 12-layer memory-augmented
model outperformed its 24-layer Transformer baseline while running twice as fast
at inference. Those are the paper's experiments, not results reproduced here.

## Claim boundary

Mechanism and result details were read from the public arXiv metadata and ar5iv
full-text rendering on 2026-09-06. No PDF or extracted full text is committed.
This repository has not trained or benchmarked a product-key memory.

- [arXiv record](https://arxiv.org/abs/1907.05242)
- [public HTML](https://ar5iv.labs.arxiv.org/html/1907.05242)
