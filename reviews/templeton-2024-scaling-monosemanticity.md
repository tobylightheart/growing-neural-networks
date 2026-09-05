# Scaling Monosemanticity — automated review draft

> Status: Automated draft, not yet human-reviewed.

## Citation

Adly Templeton, Tom Conerly, Jonathan Marcus, Jack Lindsey, Trenton Bricken,
Brian Chen, Adam Pearce, Craig Citro, Emmanuel Ameisen, Andy Jones, Hoagy
Cunningham, Nicholas L Turner, Callum McDougall, Monte MacDiarmid, Alex Tamkin,
Esin Durmus, Tristan Hume, Francesco Mosconi, C. Daniel Freeman, Theodore R.
Sumers, Edward Rees, Joshua Batson, Adam Jermyn, Shan Carter, Chris Olah, and Tom
Henighan. *Scaling Monosemanticity: Extracting Interpretable Features from
Claude 3 Sonnet*. Transformer Circuits, 2024.

## Why it is a read-out, not added model capacity

The work trains a sparse autoencoder (SAE) over Claude 3 Sonnet activations. Its
encoder maps an existing activation to a larger sparse feature layer; its decoder
reconstructs the original activation. The learned decoder directions and sparse
coefficients provide an approximate decomposition of activity already produced
by the base model. That auxiliary dictionary can be large, but it does not add
writable memory slots to Claude or show that the base model acquired new facts.

The authors also clamp selected feature activations during the base model's
forward pass and report specific, interpretable changes in output. This is a
causal probe and steering intervention through the read-out's coordinates, not
construction of new base-model capacity.

## Claim boundary

Read from the public Transformer Circuits article on 2026-09-06. The article
calls the work preliminary and notes the lack of a gold-standard dictionary
quality metric. No SAE is trained or steering result reproduced here.

- [public article](https://transformer-circuits.pub/2024/scaling-monosemanticity/)
