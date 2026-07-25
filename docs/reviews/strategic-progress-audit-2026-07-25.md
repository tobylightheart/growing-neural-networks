# Strategic progress and integration audit — 2026-07-25

## Scope and method

This is a review of the repository, not a literature claim, experiment proposal,
or change in priority. Evidence inspected includes the remit, roadmap, maintenance
guidance, root site and README, both registries, both available labs (Python,
metadata, tests, traces, and browser presentations), the completed `GNL-1`
debrief, all 23 commits in repository history, and the sibling literature garden
as read-only context. The task refers generically to `experiments/` and
`algorithms/`; this repository implements those concerns through `labs/` plus
`data/experiments.json` and `data/algorithms.json`.

Statements labelled **Repository evidence** report tracked artifacts or history.
Statements labelled **Reviewer interpretation** are strategic judgments based on
that evidence.

## Executive assessment

**Repository evidence.** The lab has two available, dependency-free experiments:
a Cascade-Correlation-style XOR growth trace and a perceptron-on-AND
fixed-capacity trace. Both execute deterministically, emit committed JSON
snapshots, have direct tests, load the snapshots in static browser pages, declare
toy-mechanism/non-reproduction boundaries, and are covered by a validator that
executes scripts and tests and compares exact script output with each declared
trace artifact. Six of 23 commits primarily advanced mechanism understanding;
seven strengthened foundations, four improved usability or verification, and six
were task or repository maintenance.

**Reviewer interpretation.** The lab is technically sound and unusually strong
on replayability for its size. The XOR artifact directly serves the programme's
core question—what changes when capacity grows, why that component is selected,
and what is frozen afterward. The perceptron trace is a useful baseline but does
not yet form an explicit comparison with the growth trace. Consequently the lab
has depth around one constructive mechanism, not breadth across growing neural
networks. Integration is also mostly declarative and one-way: registry links
resolve to garden files, but the lab pages do not offer clickable garden links,
the garden does not point readers back to either runnable lab, and the garden has
no perceptron-specific record.

## Recent-effort classification

The repository has fewer than 30 commits, so this classification covers all 23.
Each commit is assigned one primary role by intent rather than line count.

| Primary role | Commits | Share | Evidence and assessment |
| --- | ---: | ---: | --- |
| Advancing core understanding | 6 | 26.1% | The seed implementation (`7253da5`), four substantive XOR mechanism/trace improvements (`ce8959e`, `990480b`, `bdb2349`, `d65363a`), and the perceptron lab (`07dafd8`) expose fixed capacity, residuals, candidate choice, insertion/freezing, output refitting, margins, and sample updates. |
| Necessary foundation | 7 | 30.4% | Metadata, script, trace, artifact, garden-link, and declared-test validation (`6a132ed`, `f7d6464`, `37dd850`, `11d2f7f`, `54474e0`, `bf117a0`, `05de96a`) established a credible static/runnable contract. |
| Usability or verification | 4 | 17.4% | Stronger XOR assertions, browser trace presentation, canonical static loading, and sigmoid stability (`0ff1677`, `cd0915d`, `049c4e7`, `a002a35`) made the mechanism safer and easier to inspect. |
| Maintenance or bookkeeping | 6 | 26.1% | Filing, refining, starting, and closing `GNL-1`, repository-local agent guidance, and filing this audit (`80e6d4d`, `35ae21a`, `7622781`, `948de43`, `dfd29b0`, `0202f22`). |
| Marginal refinement | 0 | 0.0% | No commit is purely cosmetic or without a defensible role, although the incremental pattern described below is near its point of diminishing return. |

**Reviewer interpretation.** The 47.8% combined share for foundations and
usability/verification was appropriate for establishing the first reusable lab
contract. It should now be treated as infrastructure already earned, not as a
reason to keep polishing one four-row XOR example. Between the seed commit and
`GNL-1`, eight commits refined XOR behavior or presentation and seven refined
validation. Those changes made determinism credible; another similar run of tiny
XOR fields or validator checks would be wheel-spinning unless it closes a
specific observed failure or enables a new explanatory comparison.

## Artifact-by-artifact assessment

| Existing artifact | Explanatory value | Reproducibility and verification | Relationship to the literature review | Assessment |
| --- | --- | --- | --- | --- |
| `labs/cascade-correlation-xor/` | Shows a linear readout stalling on XOR, a deterministic sigmoid-feature search, residual correlation, frozen feature installation, output refit, MSE reduction, and classification margins. | Strong: no randomness or external packages; script output exactly matches `trace.json`; tests replay outcomes and trace relationships; browser reads the canonical snapshot. | Directly corresponds to the garden's Cascade-Correlation algorithm discussion and growth walkthrough. Both correctly qualify the mechanism as simplified. | **Advances core understanding.** This is the lab's strongest review-facing artifact. Its candidate score is a toy, hand-designed combination of absolute residual correlation and refit MSE, not a faithful implementation of the original candidate-training procedure; that limitation should remain prominent whenever the trace is used as evidence. |
| `labs/perceptron-and/` | Makes thresholding and every error-driven update inspectable and demonstrates when fixed linear capacity is sufficient. | Strong: pinned order, initialization, rate, threshold, and epoch cap; exact snapshot; repeat-run and replay tests; canonical browser rendering. | Supplies conceptual contrast to constructive growth, but its registry points only to the garden's general algorithms page, where no perceptron-specific material exists. No page pairs AND with XOR or asks when fixed capacity fails. | **Useful foundation.** It becomes strategically stronger when used in an explicit fixed-versus-grown comparison; alone it is a well-made introductory demonstration adjacent to, rather than central to, the review. |
| `data/experiments.json` and `data/algorithms.json` | Provide a small machine-readable inventory and connect labs to algorithm IDs, claim scopes, routes, tests, and garden targets. | Strong within the current scale: uniqueness, cross-reference, file existence, claim scope, and sibling target existence are validated. | The Cascade-Correlation targets are specific and useful; the perceptron target is generic. The links are metadata only and are not rendered as navigation in either lab page. | **Necessary foundation.** The registry is proportionate, but “target exists” is weaker than semantic or reciprocal integration. |
| `scripts/validate_lab.py` | Does not explain mechanisms directly, but preserves trust in what the static pages present. | Strong: executes each available script and declared test under timeouts, parses JSON, validates local artifacts, and checks exact snapshots. | Checks that declared sibling paths exist, helping prevent stale cross-project references. It cannot establish that the garden discusses the named algorithm or links back. | **Usability/verification.** Mature enough for two labs; further generalization should follow concrete needs rather than lead them. |
| Root static index and lab browser pages | Make both traces discoverable without a framework and expose the most important values in readable tables. | Strong for static serving because browser values come from committed traces rather than duplicated constants. | Pages mention the garden in prose but provide no clickable route to the specific review/module despite registry metadata containing those targets. | **Usability with an integration gap.** The browser experience is internally coherent but ends at the repository boundary. |
| `docs/remit.md`, `docs/roadmap.md`, and maintenance guidance | Keep code, toy mechanisms, validation, and literature work in the correct repositories. | Clear, lightweight operating constraints are reflected in the implementation. | The boundary rule is sound and prevents a second paper catalogue. The roadmap remains implementation-led and lists five mechanism candidates without stating which review question or verified source seam each would serve. | **Necessary foundation.** The roadmap's breadth is aspirational; review integration should determine which candidate earns depth. |

## Explanatory value: depth versus breadth

### Demonstrated depth

**Repository evidence.** The XOR lab exposes baseline outputs, residuals, hidden
activations, candidate-search size, selection score, pre/post MSE, threshold
margins, and the fact that the installed feature is frozen. The perceptron lab
records all 24 sample visits over six epochs and enough policy state to replay
every update. Neither artifact relies on stochastic behavior or hidden package
state.

**Reviewer interpretation.** These are genuine mechanism traces rather than
result screenshots. A reader can answer “what changed?” and “did it improve the
observed toy objective?” from committed data. The fixed-capacity trace also
provides vocabulary needed before discussing constructive growth.

### Limited breadth and comparison depth

**Repository evidence.** Of two labs, only one changes network capacity. There
is no runnable insertion trigger over time, repeated growth, pruning, merging,
post-growth strategy comparison, topology adaptation, STDP selectivity, or
spiking structural plasticity. The XOR lab evaluates a fixed grid of 2,197
candidate parameter triples and installs exactly one feature; it does not train a
candidate pool by the original algorithm. The perceptron and XOR labs use
different datasets and presentations and are never compared on a shared question.

**Reviewer interpretation.** The current collection should be described as one
deeply instrumented constructive toy plus one baseline, not yet as broad coverage
of the field. Adding unrelated demonstrations from every roadmap branch would
not fix this. The higher-value move is a selective second seam that tests a
comparison already supported by the review, or a shared baseline/growth
comparison that makes the existing pair answer a sharper question.

## Review–lab integration

### What works

- **Repository evidence:** the remit assigns synthesis and provenance to the
  garden and runnable traces to the lab; neither lab overclaims reproduction.
- **Repository evidence:** Cascade-Correlation registry metadata points to both
  the garden algorithms page and its interactive growth module, and those garden
  artifacts discuss residual-driven candidate selection and freezing.
- **Reviewer interpretation:** this is a useful division of labor. The garden
  supplies historical and conceptual framing while the lab supplies exact,
  executable toy values.

### Missing seams

1. **No reciprocal navigation.** A search of the sibling garden finds references
   to this lab only in agent guidance and its own strategic audit. Its public
   algorithm/module surfaces do not link to the executable trace.
2. **Registry links are not reader-facing.** The lab pages say “use the main
   garden” but do not render the specific `main_garden_links`; a reader must know
   the sibling layout independently.
3. **The perceptron seam is nominal.** Its general algorithms-page target exists,
   but the garden contains no perceptron-specific record or explicit
   fixed-capacity comparison.
4. **The garden is much broader than the lab.** The sibling audit documents
   classic constructive, spiking, structural-plasticity, and topology-growth
   branches, while the lab operationalizes only the Cascade-Correlation branch.
5. **The roadmap does not require an explanatory question.** Candidate names and
   bullet features are listed, but there is no explicit gate that a new lab must
   identify the review claim, comparison axis, and claim level it serves.

## Strengths

1. **Determinism is a product property, not a slogan.** Scripts, tests, snapshots,
   and browser views share the same object, making drift detectable.
2. **Claim boundaries are consistently modest.** Both labs distinguish toy
   mechanisms from paper reproductions; the fixed-capacity example explicitly
   says it is not growth.
3. **The Cascade-Correlation trace answers useful explanatory questions.** It
   separates stalled baseline, candidate evidence, structural addition, frozen
   state, and post-addition readout fitting.
4. **The technology matches the remit.** Pure Python, tiny datasets, static files,
   and direct tests keep every mechanism inspectable and portable.
5. **The validation contract is reusable.** A future lab can declare a script,
   tests, metadata, and canonical trace without introducing a framework.

## Wheel-spinning signals

- **Incremental polish is concentrated on one toy.** Eight post-seed commits
  refined XOR behavior or presentation and seven refined validators before the
  second mechanism arrived. This was productive hardening, but the obvious
  generic checks and trace fields are now covered.
- **Metrics can outgrow explanation.** The XOR trace reports a very large error
  reduction factor and near-maximal margins on four training points. These are
  deterministic facts about the fitted toy, not evidence of generalization or
  fidelity to the published algorithm; adding more derived metrics would likely
  create precision without insight.
- **Roadmap breadth can become demo accumulation.** ADALINE, DNC, Growing Neural
  Gas, STDP, and stabilization are all plausible, but implementing them in list
  order would make the lab a mechanism sampler rather than a companion to the
  review.
- **Infrastructure work is ahead of scale.** Validation is already robust for two
  labs. New validator abstractions without a failing case or new artifact
  contract would have lower explanatory return than using the existing contract.
- **Integration claims exceed navigation.** Filesystem-valid sibling links and
  prose references create a technical relationship, but readers currently cannot
  traverse a reciprocal garden–lab path from either public surface.

## Candidate next directions

These are unranked options for human portfolio planning. They are not filed tasks
and do not change the current roadmap priority.

- **Make the existing Cascade-Correlation seam reciprocal.** Expose the specific
  garden context on the lab page and the runnable trace from the relevant garden
  module, with toy-versus-source claim levels visible at both ends.
- **Turn the two existing labs into an explicit capacity comparison.** Use a
  shared question or dataset progression to show when a fixed linear learner is
  adequate, when it stalls, and exactly what one added feature changes, without
  pretending AND and XOR alone establish a general result.
- **Add one review-backed non-Cascade structural trace.** After the garden has
  enough verified mechanism detail, a tiny topology/prototype insertion or
  dynamic-node construction trace could test whether trigger, initialization,
  adaptation, and stabilization can be explained operationally.
- **Investigate post-growth stabilization as a cross-family comparison.** A
  deterministic freeze-versus-fine-tune-versus-prune toy could connect a named
  review axis to observable consequences while reusing the lab's trace contract.
- **Require an integration note before future experiments.** For each candidate,
  name the garden artifact, explanatory question, comparison baseline, and claim
  scope before implementation; candidates without a concrete seam remain ideas,
  not automatic backlog work.

## Bottom line

**Reviewer interpretation.** The lab is advancing the programme, not merely
accumulating code. Its central achievement is a trustworthy, inspectable
Cascade-Correlation-style mechanism trace and the deterministic contract that
keeps Python, tests, JSON, and browser output aligned. The perceptron trace adds a
sound fixed-capacity baseline, but its explanatory payoff is not yet integrated
with the growth story. The next bottleneck is strategic integration rather than
reproducibility infrastructure: make an existing comparison explicit and
reciprocal, or select one new mechanism because the review can support a sharp
question. More fields, validator generalization, or isolated roadmap demos would
be lower-value refinement.
