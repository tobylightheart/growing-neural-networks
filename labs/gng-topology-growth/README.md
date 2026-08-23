# Growing Neural Gas topology growth

A dependency-free deterministic 2-D trace of Fritzke's Growing Neural Gas (GNG) update order. Twelve fixed samples expose prototype movement, competitive-Hebbian edge creation/reset, local edge aging, and three periodic error-driven node insertions.

> **Not human-reviewed.** This is a paper-grounded teaching slice, not a reproduction of Fritzke's experiments or results.

## Source and boundary

The mechanism follows Fritzke (1995), section 3, steps 0–10: choose the nearest two prototypes; age winner edges; accumulate winner error; move the winner and its graph neighbors; create/reset the winner–runner edge; remove over-age edges and isolated nodes; every `λ` inputs insert between the largest-error node and its largest-error neighbor; reduce and decay errors.

The verified private source is the exact-title eight-page PostScript proceedings file (721,014 bytes; SHA-256 `826bdc0bd45c8da30a237d52845835bae291d9a6b0adece022222dea372c376d`). It had been added after an earlier filename scan, resolving the repository's contradictory “available”/“gap” statuses. The custom text extraction is readable but typography-damaged. See [`docs/reviews/gng-mechanism-source-verification.md`](../../docs/reviews/gng-mechanism-source-verification.md).

Pinned deviations: fixed initial prototypes and sample order instead of random draws; twelve steps instead of a performance-criterion run; demonstration parameters rather than paper figure settings; deterministic tie-breaking; six-decimal state rounding. No benchmark, learned-topology quality, or paper-result claim is made.

## Run

```bash
python3 gng_topology_growth.py
python3 tests/test_gng.py
```

The independent test pins exact states after steps 1, 4, and 12, all three insertion events, an age-before-reset event, summary counts, and repeatability. Repository validation additionally requires `trace.json` to equal fresh script output.

## Compare

Open [GNG, GWR, and hidden-feature growth](../../modules/topology-growth-comparison/) to keep their structural roles and growth triggers separate.
