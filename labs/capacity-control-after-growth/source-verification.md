# Source verification: capacity control after growth

**Status:** automated, not human-reviewed. Checked 2026-08-25 against four
private-library files; bibliographic identifiers were independently queried via
Crossref. This note grounds boundaries, not a paper reproduction.

| Source | Local evidence | Safe use here | Withheld |
|---|---|---|---|
| Reed 1993, *Pruning algorithms—a survey* | 8-page, 687,620-byte PDF; text extraction yielded no usable body text | Survey anchor for the pruning/capacity-control branch | Taxonomy details, comparisons, and conclusions |
| LeCun, Denker & Solla 1990, *Optimal Brain Damage* | 8-page NIPS copy; 19,350 extracted characters. The text defines saliency as objective change from deletion, introduces second-derivative information, and states the diagonal approximation neglects cross terms | Curvature-aware saliency and diagonal-approximation boundary | Exact OBD implementation or empirical reproduction |
| Hassibi, Stork & Wolff 1993, *Optimal Brain Surgeon and general network pruning* | 7 pages; 23,449 extracted characters. The abstract and method text identify inverse-Hessian information, compensating adjustment, and the criticism of diagonal OBD | Warning that a diagonal proxy can choose the wrong deletion | OBS implementation, benchmark results, or superiority claim for this toy |
| Dora, Sundaram & Sundararajan 2015, growing-pruning SNN | 7 pages; 35,182 extracted characters. Abstract and method describe first-stage hidden-layer growth/adaptation, second-stage pruning of low-dominance neurons, and output mapping | Evidence that a constructive-spiking design can pair growth and pruning in staged capacity control | Transferring its latency, dominance, coding, learning rules, datasets, or results to XOR |

## Artifact boundary

The runnable code compares three policies from one deterministic grown sigmoid
network. Its group score,

```text
0.5 × output_weight² × mean((output_derivative × hidden_activation)²)
```

is an **OBD-inspired teaching proxy only**. It is not the diagonal of the full
parameter Hessian, does not perform OBD's parameter-wise procedure, and does not
compute or apply OBS's inverse-Hessian compensation. Whole-node deletion also
differs from their weight-level formulation.

The GPSNN citation supports the broader counterweight—growth can be followed by
a pruning stage—not the mechanism used here. The committed trace is therefore
labelled a deterministic teaching artifact and **not human-reviewed**, not a
historical-algorithm reproduction.
