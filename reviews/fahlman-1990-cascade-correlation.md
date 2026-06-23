# The Cascade-Correlation Learning Architecture

## One-sentence summary

Cascade-Correlation is a constructive supervised learning algorithm that begins with a minimal network and adds hidden units one at a time, choosing candidates that best correlate with the network's remaining error.

## Why it matters

Fahlman and Lebiere's Cascade-Correlation paper is one of the canonical examples of a neural network that grows its own structure. It is historically important because it directly attacks two limitations of ordinary backpropagation practice: choosing the architecture before training, and repeatedly perturbing already-useful hidden features while trying to learn new ones.

The algorithm offers a clear design pattern for constructive learning:

- start with the smallest useful architecture;
- train the current output weights;
- search for a new hidden unit that explains residual error;
- install that unit;
- freeze part of the learned structure;
- repeat until the task is solved or growth stops helping.

## Core idea

Instead of deciding in advance how many hidden units a network should have, Cascade-Correlation grows the hidden layer. Candidate units are trained separately. The winning candidate is the one whose activation is most correlated with the residual error at the outputs. Once installed, its incoming weights are frozen. Future units can connect to previous units, forming a cascade.

## Algorithm sketch

1. Begin with direct input-to-output connections and no hidden units.
2. Train the output weights to reduce task error.
3. Create a pool of candidate hidden units.
4. Train candidate input weights to maximize correlation with residual output error.
5. Select the best candidate.
6. Add it permanently to the network.
7. Freeze its incoming weights.
8. Train output-side weights again.
9. Repeat until an error threshold, unit limit, or stopping criterion is reached.

## What grows

The network grows hidden units and connections. Later hidden units can receive connections from both original inputs and previously installed hidden units, which creates the characteristic cascade topology.

## What freezes

The incoming weights of installed hidden units are frozen. This turns each installed unit into a stable feature detector. Output weights remain trainable so the network can reuse all accumulated features.

## Interpretation

One useful way to read Cascade-Correlation is as a feature-construction method. Each new unit is a learned feature aimed at the current residual. The network is not merely adding capacity; it is adding a feature whose job is to explain what the previous structure could not.

This makes the paper interesting alongside later ideas such as residual learning, boosting, and progressive architectures, although those connections need to be made carefully rather than treated as direct equivalences.

## Implementation notes

The existing exploratory Python code in this repository is useful as a record of the pitfalls involved in implementing the method from scratch. In particular:

- backpropagation sign conventions are easy to get wrong;
- sigmoid derivatives should not be applied repeatedly to the same error term;
- learning rate and initialization choices strongly affect toy problems such as XOR;
- a faithful Cascade-Correlation implementation needs to separate output training from candidate-unit training.

## Open questions for the review

- How should Cascade-Correlation be compared with Dynamic Node Construction?
- Which later constructive algorithms directly inherit the candidate-unit idea?
- How often is freezing essential, and when do later methods relax it?
- Can the residual-correlation criterion be visualized with a simple toy dataset?
