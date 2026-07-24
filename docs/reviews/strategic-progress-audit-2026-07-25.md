# Strategic progress audit — 2026-07-25

## Scope and method

This is a repository audit, not a literature claim or a change in project priority. It compares the current literature garden with its stated remit, bundle plan, public artifacts, task records, and companion lab. Evidence inspected includes `AGENTS.md`, `README.md`, `TASKS.md`, `LITERATURE_REVIEW_ROADMAP.md`, the bundle plan and maintenance playbook, the paper/module/exercise registries, representative reviews and artifact notes, the current task record, the latest 30 commits, and the sibling `growing-neural-networks-lab` repository as read-only context. The task's suggested `notebook/` path does not exist in this repository.

Statements labelled **Repository evidence** report what tracked files or history show. Statements labelled **Reviewer interpretation** are strategic judgments drawn from that evidence. No private PDF content was re-reviewed for this audit.

## Executive assessment

**Repository evidence.** The garden contains 18 paper records, all linked to 18 public Markdown reviews and all currently marked `review-draft`; five modules and four exercises are registered as available. The bundle plan has one urgent/active branch (`growing-topology-and-neural-gas`), three high/seeded branches, and three planned branches. Its active branch now has a Marsland2002 draft and a cautious metadata bridge to supervised hidden-unit growth, while the Fritzke1995 asset remains unresolved. The latest 30 commits include review work, cross-paper synthesis, and six teaching-artifact changes rather than only validation or bookkeeping.

**Reviewer interpretation.** The programme is advancing overall understanding, especially by establishing a common comparison vocabulary—what grows, what triggers growth, how a new component is parameterized, and what is stabilized afterward—and by applying it across classic constructive, spiking, and topology-growth branches. It is not generally stuck. The main strategic risk is that the project has reached the limit of what repeated metadata/private-asset rechecks can teach: every public review remains an automated draft, several exact mechanisms remain explicitly withheld, and bundle synthesis plus lab integration lag behind paper-record coverage. The next phase should cash in the foundation already built rather than continue cycling anchor provenance by default.

## Recent-effort classification

The following classification assigns each of the latest 30 commits one primary strategic role. It is based on commit intent and changed files, not line count; a commit can have secondary value in another category.

| Primary role | Commits | Share | Evidence and assessment |
| --- | ---: | ---: | --- |
| Advancing core understanding | 13 | 43.3% | Five new review drafts and eight synthesis commits. These added the Platt, Prechelt, Roy, Wang, and Marsland review anchors and built comparison axes across classic construction, eSNN/structural plasticity, topology growth, thesis taxonomy, and detector quality versus capacity choice. |
| Strengthening a necessary foundation | 9 | 30.0% | Eight bounded review improvements plus the topology-asset sync. Their dominant work was metadata, DOI/source provenance, private-path verification, claim boundaries, and readiness bookkeeping. This is necessary for trustworthy public synthesis, but usually adds less mechanism understanding than a close full-text review. |
| Improving usability or verification | 6 | 20.0% | Creation and refinement of the DNC-vs-Cascade-Correlation exercise and evolving-spiking lineage cards. These make distinctions testable in-browser and repeatedly expose source-boundary guardrails. |
| Maintenance or bookkeeping | 2 | 6.7% | Repository-local agent guidance and filing this audit task. |
| Marginal refinement | 0 | 0.0% | No recent commit is best classified as purely cosmetic or strategically negligible. Some repeated review rechecks approach diminishing returns, but each inspected commit still closed a named provenance/readiness step. |

**Reviewer interpretation.** A 43% core-understanding share and 20% teaching-artifact share are healthy. The 30% foundation share is defensible because it completed bounded bundle passes and enabled a branch transition. It becomes wheel-spinning if the same already-drafted anchors are rechecked again without new full-text access, human review, synthesis, or a specific unresolved provenance question.

## Are mechanisms becoming easier to understand?

### Demonstrated progress

**Repository evidence.** The public artifacts repeatedly use stable explanatory axes:

- the thesis taxonomy asks **when structure changes, what changes, and how new parameters are chosen**;
- the classic comparison exercise distinguishes DNC's bounded flattening-error cue from Cascade-Correlation's candidate/residual-correlation and freezing story, while withholding unverified equations and schedules;
- the eSNN lineage cards distinguish taxonomy vocabulary and lineage roles from exact neuron-creation, merge, pruning, rewiring, or adaptation mechanics;
- the Marsland2002 review and topology bridge distinguish supervised hidden-unit growth from unsupervised topology/prototype growth using what grows, learning setting, and publicly supported trigger framing;
- the latest thesis synthesis explicitly separates detector quality observables from automatic capacity choice.

**Reviewer interpretation.** These are meaningful conceptual gains. A reader can now compare families without being told that all “growing” networks share one algorithm, and can see why growth trigger, component initialization, and post-growth stabilization are separate questions. The strongest recent work is not the accumulation of records itself but the connective language and source-boundary interactions built on top of them.

### Remaining limits

**Repository evidence.** All 18 paper records remain `review-draft`. The active Marsland review withholds the exact mismatch statistic, insertion threshold, node/edge initialization, adaptation, aging, deletion, and quantitative results. The eSNN plan similarly withholds exact mechanics for Kasabov2013, Wang2014, and Roy2017. The classic comparison withholds DNC schedules/formulae, Platt novelty tests, and CasCor-family variant and empirical details. The roadmap is an early pivot document: its “current repository review” still describes a missing static site and broken exploratory Python even though the static garden now exists, and its target tree does not reflect the review-bundle architecture. `README.md` also calls `modules/` a “future home” despite five available modules.

**Reviewer interpretation.** The garden is now good at orienting readers and policing claim boundaries, but weaker at teaching exact algorithm mechanics outside Cascade-Correlation. It has a widening set of cautious placeholders whose value depends on later close review or human verification. Stale high-level roadmap/status prose also makes the achieved phase and remaining destination harder to assess than the data files do.

## Review–lab reinforcement

**Repository evidence.** The sibling lab has two available deterministic, dependency-light experiments: a perceptron-on-AND fixed-capacity baseline and a Cascade-Correlation-style XOR trace. The XOR lab links back to the garden's algorithms page and Cascade-Correlation module, shares a canonical committed trace across Python, tests, and browser output, and explicitly says it is a toy mechanism rather than a paper reproduction. The perceptron lab provides a fixed-capacity contrast but links only to the garden's general algorithms page. The garden itself covers 18 reviews and several branches—classic constructive, STDP, eSNN, structural plasticity, and growing topology—while the lab's only growing mechanism is Cascade-Correlation-style XOR.

**Reviewer interpretation.** The repositories reinforce one another well at the Cascade-Correlation seam: the garden supplies provenance and conceptual framing, while the lab makes residual-correlated feature addition inspectable and deterministic. The perceptron baseline is useful preparatory contrast, but its relationship to a specific garden argument is indirect. Across the programme as a whole, reinforcement is narrow rather than reciprocal: most reviewed branches have no runnable mechanism, and garden records do not consistently point readers to the relevant lab. This is a breadth/depth mismatch, not a reason to duplicate every review as an experiment.

## Demonstrated strengths

1. **Coherent bundle progression.** **Repository evidence:** the six-anchor STDP sequence, five-anchor eSNN sequence and recheck pass, four-anchor classic pass, and first Marsland topology draft are explicitly recorded; the active branch changed only after bounded milestones. **Interpretation:** this is disciplined expansion rather than bulk ingestion.
2. **Strong evidence boundaries.** **Repository evidence:** automated drafts identify themselves, private PDFs remain outside Git, and artifacts name the exact claims still pending full-text or human review. **Interpretation:** uncertainty is part of the teaching design rather than hidden in bookkeeping.
3. **Useful cross-family synthesis.** **Repository evidence:** recent commits connect supervised hidden-unit growth, topology/prototype growth, STDP selectivity, eSNN lineage, and structural plasticity through shared questions without asserting shared mechanics. **Interpretation:** this advances the remit more than an isolated sequence of paper summaries would.
4. **Teaching artifacts follow reviewed material.** **Repository evidence:** the DNC/Cascade-Correlation exercise and eSNN cards cite existing public drafts and include source-boundary checks. **Interpretation:** the site is becoming an interactive review, not just a bibliography.
5. **A credible runnable seam exists.** **Repository evidence:** the companion XOR trace is deterministic, tested, browser-visible, and explicitly scoped below reproduction claims. **Interpretation:** it is a sound pattern for selective future review–lab integration.

## Strategic gaps and wheel-spinning signals

1. **No public review has crossed the human-review boundary.** This leaves exact method comparisons intentionally incomplete and concentrates authority in one thesis-taxonomy bridge plus metadata/abstract-supported drafts.
2. **Synthesis is less visible and durable than bundle bookkeeping.** Several synthesis commits are small additions to metadata, bundle prose, artifact context, or one long thesis review. The bundle plan itself calls for dedicated STDP, eSNN, topology, and structural-plasticity synthesis outputs that are not yet present as clearly discoverable standalone review pages.
3. **The active topology branch is only one reviewed anchor deep.** Marsland2002 broadens the map, but Fritzke1995 remains an asset gap and exact GWR mechanics remain unavailable. A visualization now would risk teaching an abstract-level placeholder as an algorithm.
4. **The programme's runnable breadth is much narrower than its review breadth.** Only Cascade-Correlation has a direct garden-to-lab mechanism seam. There is no deterministic topology growth, pruning/capacity-control, STDP selectivity, or eSNN structure-decision trace in the lab.
5. **Status documents lag reality.** The roadmap and portions of the README still describe the pre-site transition. This does not invalidate the data-driven workflow, but it obscures strategic progress for readers who start at the top-level documents.
6. **Diminishing-return warning.** The eSNN plan records five consecutive per-anchor metadata/private-asset rechecks, often ending with the same extraction limitation and deferred exact mechanics. That sequence was bounded and completed, so it was foundation work rather than waste. Repeating it without a new evidence path would be wheel-spinning.

## Candidate next directions

These are unranked options for human portfolio planning, not filed tasks or changes to current priority.

- **Convert selected high-leverage drafts into close, human-reviewed mechanism anchors.** Focus on papers already used by public exercises or the active topology comparison, so exact triggers, parameterization, stabilization, and result boundaries can replace placeholders where they matter most.
- **Publish standalone bundle synthesis pages from the completed review runs.** Candidate scopes already supported by repository evidence include the eSNN-to-structural-plasticity lineage, STDP selectivity versus structural growth, and classic hidden-unit growth versus topology/prototype growth. Keep these syntheses explicit about which details remain draft-only.
- **Define a reciprocal garden–lab integration seam.** Let each selective lab identify its exact review, paper, comparison axis, and claim level, and let the garden point back to the runnable trace. This would strengthen discoverability without requiring one experiment per paper.
- **After adequate source verification, add one deterministic non-Cascade growth trace in the lab.** A small mismatch-triggered topology/prototype insertion trace would test whether the new active branch can be explained operationally; it should remain a toy mechanism unless the reviewed source supports a closer claim.
- **Develop the capacity-control counterweight.** The planned pruning bundle addresses a conceptual imbalance already named by the taxonomy: growth is well represented, while deletion, merging, and bounded capacity are mostly guardrails or future context. Review evidence should precede any interactive comparison.

## Bottom line

**Reviewer interpretation.** Recent work is strategically productive, not merely busy: the garden now offers a coherent and increasingly interactive map of several constructive-learning families. Its comparative vocabulary, cautious source boundaries, and Cascade-Correlation lab seam are demonstrated strengths. The next bottleneck is evidential and integrative rather than infrastructural. More routine rechecks or marginal card polish would yield less than human/full-text verification, standalone synthesis, and a deliberately reciprocal review–lab seam. Those choices require portfolio judgment; this audit does not select among them.
