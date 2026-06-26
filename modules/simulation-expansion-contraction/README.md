# Simulation Expansion and Contraction

A standalone, no-build JavaScript module illustrating the thesis-derived distinction between construction/pruning in memory and expansion/contraction of the simulated neural set.

The module uses a toy set diagram and a simple disruption heuristic:

```text
disruption = activity × connection density
```

This is not intended as a biological measurement. It is a pedagogical proxy for the principle that transferring low-activity, sparsely connected components into or out of a simulation is easier to interpret as biologically plausible than abruptly adding or removing high-impact components.

## Provenance

Concepts are paraphrased from the public thesis source at `/workspace/thesis-constructive-spiking/03_simulation_expansion/simulation_expansion_and_stdp.tex`, especially the definitions of simulated/surrounding sets, expansion/contraction, construction/pruning, and the low-disruption plausibility principle.
