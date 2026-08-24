# Capacity control after growth

**Not human-reviewed.** This is a deterministic teaching comparison, not a
reproduction of any cited experiment.

The script trains the same one-hidden-unit XOR checkpoint, inserts one unit, and
forks that exact grown network into three policies:

- **freeze** preserves the established feature's incoming weights while training
  the inserted feature and output layer;
- **fine-tune** continues ordinary backpropagation through both features;
- **prune** fine-tunes, deletes the lower-ranked hidden unit under a deliberately
  simple diagonal-curvature group proxy, and runs 100 recovery sweeps.

Run it and its exact checks:

```bash
python3 capacity_control.py
python3 tests/test_capacity_control.py
```

## What the sources support

- Reed, *Pruning algorithms—a survey* (1993), DOI
  [10.1109/72.248452](https://doi.org/10.1109/72.248452), is the survey anchor
  for treating deletion as part of network design rather than telling a
  growth-only story. The local PDF is image-only under the available extraction
  path, so no detailed mechanism claim is taken from it here.
- LeCun, Denker, and Solla, *Optimal Brain Damage* (1990), motivates saliency as
  predicted objective change, uses second derivatives, and makes a diagonal
  approximation. The artifact borrows only that curvature-aware intuition; its
  node-group proxy is not OBD.
- Hassibi, Stork, and Wolff, *Optimal Brain Surgeon and general network pruning*
  (1993), DOI [10.1109/ICNN.1993.298572](https://doi.org/10.1109/ICNN.1993.298572),
  uses the inverse Hessian and compensating weight changes and explicitly warns
  that diagonal assumptions can select the wrong deletion. This artifact does
  not implement OBS; the large post-prune error makes that limitation visible.
- Dora, Sundaram, and Sundararajan, *A two stage learning algorithm for a
  Growing-Pruning Spiking Neural Network for pattern classification problems*
  (2015), DOI [10.1109/IJCNN.2015.7280592](https://doi.org/10.1109/IJCNN.2015.7280592),
  supplies the constructive-spiking counterpoint: its first stage grows/adapts a
  hidden layer and its second prunes low-dominance hidden neurons before output
  mapping. The present sigmoid XOR artifact does not reproduce its spike,
  latency, dominance, coding, or benchmark mechanisms.

See [`source-verification.md`](source-verification.md) for the extraction record
and exact claim boundary.

## Pinned deviations

The LCG seed, XOR order, 600/400/100 sweep schedule, learning rate, momentum,
one-unit insertion, diagonal group proxy, and whole-node deletion are teaching
choices. Freeze means only the established hidden feature's incoming weights
are held fixed; output weights remain trainable. Prune means structural node
removal, whereas OBD and OBS are formulated around parameter/weight deletion.

The deterministic result is deliberately uncomfortable: fine-tuning fits best
while retaining width two; freezing is close while preserving the established
feature; pruning returns to width one but damages XOR fit. That is evidence
against the slogan “more neurons are always better” *and* against the opposite
slogan “smaller is automatically equivalent.” Capacity is a trade-off to
control, not a monotonic score.
