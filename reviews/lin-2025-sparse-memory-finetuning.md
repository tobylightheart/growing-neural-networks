# Continual Learning via Sparse Memory Finetuning — automated review draft

> Status: Automated draft, not yet human-reviewed.

## Citation

Jessy Lin, Luke Zettlemoyer, Gargi Ghosh, Wen-Tau Yih, Aram Markosyan,
Vincent-Pierre Berges, and Barlas Oğuz. *Continual Learning via Sparse Memory
Finetuning*. arXiv:2510.15103v1 (2025).

## Mechanism

For a new batch, the method counts memory-slot accesses and ranks each slot by a
TF–IDF score: its access frequency in the batch multiplied by the log of
(background batches + 1) divided by (background batches accessing the slot + 1).
Only the top-t value slots receive gradients; every accessed slot still
contributes to the forward pass. The rest of the memory and model stay frozen.

## Result, attributed

The authors report similar new-knowledge acquisition with substantially less
forgetting on their question-answering setup: NaturalQuestions F1 fell 89% after
full finetuning, 71% with LoRA, and 11% with sparse memory finetuning. This is the
paper's result under its data, model, slot-selection, and optimizer choices. It
is not our result, and sparse updates do not by themselves guarantee minimal
interference.

## Claim boundary

The formula, implementation sketch, experimental setup, and result were read
from the public arXiv metadata and ar5iv full-text rendering on 2026-09-06. The
module implements only the tiny deterministic ranking calculation, not
finetuning or the continual-learning experiment.

- [arXiv record](https://arxiv.org/abs/2510.15103)
- [public HTML](https://ar5iv.labs.arxiv.org/html/2510.15103)
