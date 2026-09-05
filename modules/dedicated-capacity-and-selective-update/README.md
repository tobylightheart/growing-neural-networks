# Capacity You Can Write, Directions You Can Read

A source-linked, not-human-reviewed module for portfolio goal G-029.

The left-hand lineage is **capacity**: product-key memory adds a very large table
of trainable values, sparse top-k routing makes only a small part active, the
scaled implementation reaches 128B memory parameters, and sparse memory
finetuning chooses a still smaller set of values to update.

The contrast is an SAE **read-out**: it trains an auxiliary sparse autoencoder to
decompose an existing model activation into feature directions. Clamping a
feature can steer the base model, but the SAE did not add that feature or enlarge
the base model's learned capacity.

The interactive TF-IDF ranking implements the equation in Lin et al. (2025) over
a deliberately tiny set of slot-access counts. It teaches the selection policy;
it does not train a model or reproduce the paper's continual-learning results.

Every mechanism and result statement is an automated reading of the linked
public full text and is not human-reviewed. In particular, reduced forgetting is
the sparse-memory-finetuning paper's result under its own tasks, models, and
optimizer choices—not a generic guarantee that sparse updates minimize
interference.
