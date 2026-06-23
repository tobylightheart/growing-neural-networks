# Scheduled Growth Workflow

This document proposes a repeatable Hermes cron workflow for maturing the constructive / growing neural networks literature-review website.

The goal is not to let automation blindly rewrite the review. The goal is to create a steady pipeline:

1. discover candidate papers;
2. triage and deduplicate them;
3. draft public paper reviews;
4. synthesize reviewed papers into concept/algorithm pages;
5. build or improve interactive modules and exercises;
6. validate and commit each safe increment.

The user can push to GitHub manually after reviewing local commits.

## Design principles

- Keep jobs small and auditable.
- Prefer one focused commit per job run.
- Never overwrite substantial review prose without preserving prior content.
- Always run `python3 scripts/validate_data.py` before committing data changes.
- Use `git status` before and after edits.
- If the working tree is dirty at job start, inspect it and avoid clobbering user work.
- Record discovery provenance in `data/sources.json`.
- Use conservative statuses: `discovered`, `triaged`, `queued`, `skimmed`, `review-draft`, `reviewed`, `synthesized`.
- Automation may create drafts, queues, stubs, and modules; final scholarly judgement remains human-reviewable.

## Proposed cadence

Assuming Adelaide time and the user's preference for automatic jobs during cheap electricity hours, schedule jobs between roughly 10:00 and 15:00 Adelaide time.

Adelaide is usually UTC+9:30 or UTC+10:30 depending on daylight saving. Hermes cron uses the scheduler environment's timezone for named times and standard cron syntax for fixed times. Use explicit UTC cron only after checking the active scheduler timezone.

Initial low-risk cadence:

| Job | Cadence | Purpose |
| --- | --- | --- |
| Discover papers | weekly | Search arXiv/Semantic Scholar/web for candidate papers and add only new metadata as `discovered` or `triaged`. |
| Triage queue | weekly | Deduplicate, classify, and prioritize discovered papers. |
| Draft one review | weekly | Pick one queued/skimed paper and write a public Markdown review draft. |
| Synthesis pass | fortnightly | Update concept/algorithm pages from reviewed papers. |
| Module/exercise pass | fortnightly | Add or refine one interactive module or exercise. |
| Validation/checkup | daily or twice weekly | Run validators and report issues without making speculative edits. |

## Job 1: Literature discovery

Purpose: grow the candidate pool without flooding the curated review.

Recommended schedule: weekly, early in the day.

Inputs:

- Existing `data/papers.json` and future paper chunks from `data/catalog.json`.
- Existing `data/sources.json`.
- Search phrases, initially:
  - `constructive neural network`
  - `constructive learning algorithm neural network`
  - `growing neural network`
  - `incremental neural network construction`
  - `dynamic node construction neural network`
  - `cascade correlation neural network`
  - `resource allocating network neural`
  - `growing when required neural network`
  - `constructive backpropagation`

Expected actions:

1. Search at most 2-3 phrases per run to avoid noisy bulk imports.
2. Use Semantic Scholar for citation counts and related work when possible.
3. Add only clearly relevant new records to `data/papers.json`, with status `discovered` or `triaged`.
4. Add/update a source record in `data/sources.json` with the query, date, added IDs, rejected IDs, and notes.
5. Run `python3 scripts/validate_data.py`.
6. Commit if data changed.

Suggested commit message:

```text
research: add discovered constructive learning papers
```

Self-contained cron prompt:

```text
Work in /workspace/growing-neural-networks. Load and follow the growing-neural-networks and arxiv skills. Discover candidate papers for the constructive/growing neural networks literature review. Use at most three focused searches this run from the project's discovery phrases. Check existing paper IDs and external links to avoid duplicates. Add only clearly relevant new papers to data/papers.json with conservative metadata and status "discovered" or "triaged". Record the search provenance in data/sources.json. Do not write long reviews. Run python3 scripts/validate_data.py. If validation passes and files changed, commit with a concise research: message. If nothing useful is found, make no commit and report that no changes were made.
```

## Job 2: Triage queue

Purpose: turn raw discoveries into a useful reading queue.

Recommended schedule: weekly, after discovery.

Expected actions:

1. Review `discovered` papers.
2. Deduplicate near-identical records.
3. Assign families/themes using existing `data/themes.json` where possible.
4. Promote relevant records to `triaged` or `queued`.
5. Mark out-of-scope records in source notes rather than deleting them silently.
6. Create review stubs only for high-priority queued papers.
7. Validate and commit.

Self-contained cron prompt:

```text
Work in /workspace/growing-neural-networks. Load the growing-neural-networks skill. Triage the literature queue. Inspect papers with status "discovered" in the manifest-driven data files. Improve classification using existing themes/families, deduplicate obvious duplicates, and promote clearly relevant papers to "triaged" or "queued". For at most two high-priority queued papers, create a short public review stub under reviews/ with questions to answer. Do not invent bibliographic facts; leave blank fields blank or add notes requiring verification. Run python3 scripts/validate_data.py. Commit validated changes with a concise research: or chore: message.
```

## Job 3: Draft one paper review

Purpose: steadily convert the queue into readable public review pages.

Recommended schedule: weekly.

Selection rule:

1. Prefer `queued` papers with `importance: canonical`.
2. Then prefer `skimmed` papers.
3. Then oldest historical foundations.
4. Avoid drafting more than one substantial review per run.

Expected review structure:

```markdown
# Paper title

## One-sentence summary
## Why it matters
## Core idea
## Algorithm sketch
## What grows
## What freezes
## Relationship to earlier work
## Relationship to later work
## Implementation notes
## Open questions
```

Self-contained cron prompt:

```text
Work in /workspace/growing-neural-networks. Load the growing-neural-networks skill. Pick exactly one paper from data/papers.json or future catalog chunks with status "queued" or "skimmed", preferring canonical historical papers. Research enough to write a careful public Markdown review draft, using web/arXiv/Semantic Scholar sources where available. Do not hallucinate unavailable bibliographic facts. Update the paper status to "review-draft" unless the review is genuinely complete. Keep the review readable through pages/review.html. Run python3 scripts/validate_data.py. Commit validated changes with message "review: draft <short paper id>".
```

## Job 4: Synthesis pass

Purpose: move from paper-by-paper notes toward a real literature review.

Recommended schedule: fortnightly.

Expected actions:

1. Inspect reviewed/review-draft papers.
2. Update `data/algorithms.json` and `data/themes.json` if new mechanisms have stabilized.
3. Draft or update concept essays under `essays/` once that directory exists.
4. Link papers, algorithms, themes, modules, and exercises.
5. Avoid large rewrites; prefer one synthesis theme per run.

Self-contained cron prompt:

```text
Work in /workspace/growing-neural-networks. Load the growing-neural-networks skill. Perform a small synthesis pass for the interactive literature review. Choose one concept or algorithm family that has enough reviewed or draft-reviewed papers. Improve metadata links among papers, algorithms, themes, modules, and exercises. If useful, create or update one concise essay under essays/. Do not rewrite unrelated pages. Run python3 scripts/validate_data.py and relevant JS/Python syntax checks. Commit validated changes with a concise docs: or synthesis: message.
```

## Job 5: Module/exercise pass

Purpose: keep the site evolving toward an interactive textbook.

Recommended schedule: fortnightly, alternating with synthesis.

Expected actions:

1. Pick one module or exercise idea from `data/modules.json` or `data/exercises.json`.
2. Build a small, static, no-build artifact.
3. Follow the established module pattern:
   - `modules/<module-id>/module.json`
   - `modules/<module-id>/index.html`
   - `modules/<module-id>/demo.js`
   - `modules/<module-id>/styles.css`
   - `modules/<module-id>/README.md`
4. Update `data/modules.json` to `available` only when the route works.
5. Validate data and check JS syntax.
6. Commit.

Self-contained cron prompt:

```text
Work in /workspace/growing-neural-networks. Load the growing-neural-networks skill. Build or refine exactly one interactive module or exercise for the constructive/growing neural networks site. Prefer planned modules in data/modules.json. Follow the static no-build module pattern used by modules/residual-correlation-playground/. Keep the interaction small and pedagogical. Update module/exercise metadata only when the artifact exists. Run python3 scripts/validate_data.py and node --check on changed JS files. If possible, serve with python3 -m http.server and verify relevant routes with urllib. Commit validated changes with message "feat: add <module/exercise name>" or "feat: improve <module/exercise name>".
```

## Job 6: Validation/checkup

Purpose: catch drift and broken data even on days when no content is generated.

This can be an agent job or a script-only watchdog. Script-only is cheaper and quieter.

Potential script-only command:

```bash
cd /workspace/growing-neural-networks || exit 1
python3 scripts/validate_data.py || exit 1
node --check assets/js/site.js || exit 1
node --check assets/js/data-loader.js || exit 1
node --check assets/js/markdown.js || exit 1
node --check assets/js/papers.js || exit 1
node --check assets/js/review.js || exit 1
node --check assets/js/static-pages.js || exit 1
```

For a watchdog, emit nothing on success and emit an error only on failure.

## Recommended dependency graph

Do not make every job fully autonomous at once. Start with:

1. validation/checkup;
2. discovery;
3. triage;
4. draft one review.

Add synthesis and module/exercise jobs after the data model has stabilized.

## Suggested Hermes cron creation commands

These are examples; adjust times after confirming scheduler timezone.

```bash
hermes cron create "0 1 * * 1"      # Monday UTC-ish: discovery
hermes cron create "30 1 * * 1"     # triage, after discovery
hermes cron create "0 2 * * 3"      # Wednesday: draft review
hermes cron create "0 2 * * 5"      # Friday: validation/checkup
hermes cron create "0 3 * * 1"      # fortnightly/manual: synthesis or module pass
```

When creating via the Hermes tool API, set:

- `workdir`: `/workspace/growing-neural-networks`
- `skills`: `["growing-neural-networks"]`, plus `["arxiv"]` for discovery
- `enabled_toolsets`: usually `["web", "terminal", "file", "skills"]`
- omit `deliver` to deliver back to the current conversation, or set an explicit platform target later

## Safer initial rollout

Recommended first real scheduled jobs:

1. Weekly discovery job, repeat 4 times.
2. Weekly review-draft job, repeat 4 times.
3. Twice-weekly validation job, quiet on success if implemented as script-only.

After four weeks, inspect:

- how many papers were added;
- how noisy the discovery results were;
- whether statuses are useful;
- whether review drafts are readable;
- whether the site still validates cleanly;
- whether module/exercise automation should be enabled.

## Open decisions before scheduling

- Exact schedule and timezone.
- Delivery target: current chat, WhatsApp, Telegram, local only, or another channel.
- Whether discovery jobs should commit automatically or only write candidate files for review.
- Whether review drafts should be committed automatically or delivered for approval first.
- Whether to use one broad job or several narrow jobs. Narrow jobs are recommended.
