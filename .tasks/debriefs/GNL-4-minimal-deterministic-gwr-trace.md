# Debrief: GNL-4 Minimal deterministic GWR trace

**Completed:** 2026-08-01
**Commit:** 78981b02a2a5599f35578bd515234d748ab00ee6

## Design decisions

- Delivered the independently specified oracle and executable mechanism in one slice rather than preserving the review gate's oracle-only spike. This avoided a prose implementation phase while retaining expectations that do not call the implementation's update helpers.
- Used a multiplicative firing-variable decrease as an explicitly pedagogical policy. It preserves the reviewed roles—winner habituates faster than neighbours, and each node's firing scales adaptation—but deliberately does not import one experiment's habituation constants as universal GWR defaults.
- Preserved the source-supported numbered-step ordering. In particular, the best/second-best edge is created or reset before branch selection, insertion is an alternative to adaptation, winner edges are then aged, current neighbours are habituated, and over-age edges plus isolated nodes are removed last. This means a newly inserted neighbour is habituated once during its insertion step and the winner-to-new-node edge ends that step at age one.
- Kept both before/after topology snapshots in each of seven trace rows. This makes branch and cleanup transitions directly inspectable at the cost of a larger committed JSON artifact; the artifact remains small enough for the existing static trace contract.

## Descoped / deferred

- The paper's closed-form experimental habituation curve was not implemented. Revisit only if a later task needs a closer algorithm reproduction and can specify how role changes map to its time variable without disguising an application choice as source fact.
- No public Marsland review text, benchmark, parameter sweep, GWR/GNG comparison, or universal stopping/default recommendation was added. Each requires its own evidence and review boundary.
- No general-purpose GWR library or interactive parameter playground was created; the current mechanism slice should first be assessed for explanatory value.

## Observations

- Edge age is easy to misread: because the active winner edge is reset before all winner edges are aged, it appears as age one in the post-step trace rather than zero.
- The final input deliberately adapts a neighbour before its now-over-age edge is removed. That follows the numbered update order and gives the oracle a useful check that cleanup is not silently moved ahead of adaptation.
- Separating growth cessation from loop termination became concrete in the trace: two adaptation steps occur between insertions, and a later mismatch resumes growth without restarting the run.

## Follow-ups

### Considered and dropped

- A standalone oracle task — superseded by the approved combined implementation-and-oracle slice.
- Immediate parameter visualization — it would expand a deliberately pinned teaching trace before its explanatory value has been reviewed.
