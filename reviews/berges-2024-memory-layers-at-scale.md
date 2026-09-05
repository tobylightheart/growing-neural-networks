# Memory Layers at Scale — automated review draft

> Status: Automated draft, not yet human-reviewed.

## Citation

Vincent-Pierre Berges, Barlas Oğuz, Daniel Haziza, Wen-tau Yih, Luke
Zettlemoyer, and Gargi Ghosh. *Memory Layers at Scale*. arXiv:2412.09764v2
(2024).

## Why it matters here

This paper scales the product-key lineage to contemporary language models. It
replaces selected Transformer feed-forward layers with sparse key–value memory,
shares one memory pool across as many as three memory layers, shards value
embeddings across GPUs, and supplies bandwidth-oriented kernels. The abstract
reports up to 128B memory parameters, one trillion pretraining tokens, and base
models up to 8B parameters.

The capacity is dedicated learned storage: keys and values are parameters, only
top-k entries participate for a token, and sparse and dense layers are presented
as complementary. This remains different from an SAE read-out trained after the
fact over an existing activation space.

## Claim boundary

Architecture and result statements were read from the public arXiv metadata and
ar5iv full-text rendering on 2026-09-06. The 128B and benchmark claims are the
paper's reported results; this module does not reproduce them.

- [arXiv record](https://arxiv.org/abs/2412.09764)
- [public HTML](https://ar5iv.labs.arxiv.org/html/2412.09764)
