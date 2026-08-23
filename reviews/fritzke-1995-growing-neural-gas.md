# A Growing Neural Gas Network Learns Topologies

> **Status: automated draft, not human-reviewed.**

## Review status

This bounded draft supports the deterministic 2-D teaching trace and reconciles the source inventory. It uses the exact-title private eight-page PostScript proceedings file, not either of the different Fritzke 1994 PDFs found by the earlier scan. A custom literal-string extraction recovered coherent prose and the complete numbered algorithm, but TeX/dvips splitting damages typography, symbols, and ligatures. The private source and extracted full text remain outside Git.

Source identity: Bernd Fritzke, “A Growing Neural Gas Network Learns Topologies,” in *Advances in Neural Information Processing Systems 7*, MIT Press, 1995. Private file: 721,014 bytes, SHA-256 `826bdc0bd45c8da30a237d52845835bae291d9a6b0adece022222dea372c376d`.

## One-sentence summary

Fritzke's Growing Neural Gas incrementally moves input-space prototypes, maintains competitive-Hebbian neighborhood edges with local aging, and periodically inserts a new prototype in the graph region with the greatest accumulated squared-distance error.

## Mechanism verified from section 3

The numbered algorithm on PostScript pages 3–4 directly supports this order:

1. initialize two prototypes and sample an input;
2. select nearest and second-nearest units;
3. age edges incident to the winner and accumulate its squared input distance;
4. move the winner and its direct graph neighbors toward the input using distinct rates;
5. create or reset the winner–runner edge, then remove over-age edges and isolated units;
6. every `λ` inputs, insert halfway between the maximum-error node and its maximum-error neighbor, replace their edge, and reduce/initialize local errors;
7. decay all errors and repeat until an application stopping criterion.

The following prose explains that prototype movement tracks supported input regions, competitive-Hebbian edges approximate an induced Delaunay topology, local edge aging removes obsolete connections, and accumulated error directs insertion toward poorly represented regions.

## Relationship to GWR and supervised growth

- **GWR:** Marsland et al. gate insertion on the current input's low match activity plus winner habituation. GNG instead inserts on a fixed `λ` schedule and uses accumulated local error to choose where.
- **DNC / Cascade-Correlation:** those methods add hidden features inside supervised predictors. GNG adds and moves prototypes in input space while growing a neighborhood graph; its error is quantization distance, not supervised residual error.

See the linked [topology-growth comparison](../modules/topology-growth-comparison/) and [deterministic 2-D GNG trace](../labs/gng-topology-growth/).

## Limits and deviations

The automated extraction is reliable enough to recover algorithm order and prose, but equations, symbols, typography, and experimental parameter values still need visual/human checking. The teaching trace fixes initial prototypes, input order, numerical parameters, tie-breaking, rounding, and finite duration. It does not reproduce the paper's distributions, figure settings, topology results, or comparisons, and it makes no benchmark or generalization claim.

For file identity, locators, and extraction details, see the [source-verification worksheet](../docs/reviews/gng-mechanism-source-verification.md).
