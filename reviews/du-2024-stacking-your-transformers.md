# Stacking Your Transformers: A Closer Look at Model Growth for Efficient LLM Pre-Training

> Status: Automated draft, not yet human-reviewed.

## Review status

Automated draft written on 2026-09-05 while adding the depth-and-width expansion
anchors named in portfolio goal G-028. Sources read online that day: the public
arXiv abstract page for `arXiv:2405.15319` (v2, NeurIPS 2024 Spotlight) and the
ar5iv HTML rendering. No PDF or extracted text was copied into Git.

**One deliberate omission.** The paper fits an equation for growth timing from
target parameters and compute budget. It rendered ambiguously in the source read
here, so no form of it is asserted in this review, in the data files, or in the
module. Treat growth timing as an open item for human reading rather than as
something this repository knows.

## One-sentence summary

The paper organizes model growth into four atomic operators over two directions
and finds that the simplest one — duplicating a trained small model's layers to
make a deeper model, called G_stack — accelerates LLM pre-training against
strong baselines.

## Mechanism as read

1. **Four atomic operators.** `G_direct` "directly duplicating and stacking old
   layers in a depthwise manner or splitting neurons in the same layer
   widthwisely"; `G_learn` "generating expanded parameters using a learnable
   mapping matrix to the existing parameters"; `G_zero` "setting the new
   parameters to zero"; `G_random` "randomly initializing the new parameters".
2. **Two directions.** Depthwise (more layers) and widthwise (wider layers), so
   each operator has two forms.
3. **G_stack.** The depthwise `G_direct`: the target model is "M∘M∘⋯∘M (g times),
   where M is a small base model trained with d tokens". The small model's
   training is a real phase whose result is carried forward, not discarded.
4. **Growth factor.** "The optimal growth factor g lies between 2 and 4"; the
   experiments fix g = 4.
5. **No preservation, no freezing.** Stacking a trained model on itself does not
   preserve its function, and nothing is frozen afterwards: the grown model is
   pre-trained further. The claim is about reaching a given loss for less
   compute, not about the grown model matching the small one at the moment of
   growth.

## Why it matters for this project

This is the modern instance of the book's oldest question — when do you add
capacity, and what do you initialize it from — asked at a scale where the answer
is measured in FLOPs rather than in hidden units. It is also the contrast that
makes Net2Net's guarantee legible: both reuse trained weights, but only one of
them promises the function survives the operation, and the one that does not is
the one that reports the training speedup.

## Open questions for human review

- The growth-timing equation, read properly from the PDF, and how sensitive the
  results are to it.
- How the four operators compare once compute is equalized, rather than at the
  paper's chosen settings.
- Whether the depthwise advantage over widthwise growth is architectural or an
  artifact of the tested scales.
