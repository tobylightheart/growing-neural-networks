# Compressed Cron Design

> **Historical design:** these fixed-purpose jobs are paused and superseded by
> portfolio-generated, expiring task-cycle slots. Current project instructions
> live in `AGENTS.md` and `docs/agent/`.

This is the proposed fast schedule for the constructive/growing neural networks interactive literature-review site.

The prompts live in the Hermes skill:

```text
growing-neural-networks-cron
```

That skill is the source of truth for the recurring job prompts. This file records the schedule design inside the project repository so the automation is reviewable alongside the site.

## Goals

- Move quickly without turning the repo into an unreviewable mess.
- Let jobs commit automatically, but never push.
- Mark automated review drafts as not human-reviewed.
- Keep validation daily.
- Keep discovery/triage weekly.
- Draft paper reviews daily.
- Run synthesis and module/exercise work 2-3 times per week.
- Use UTC slots around 01:00, 02:00, and 03:00.

## Delivery target

In Hermes cron terminology, the delivery target is where the cron job's final report is sent.

Options include:

- omit `deliver`: send the report back to the current/origin conversation;
- `local`: store output only, with no external delivery;
- `telegram`, `discord`, `whatsapp`, etc.: send to a configured platform/home channel;
- an explicit platform target if using a topic/thread/channel.

For this project, the safest starting default is to omit `deliver` while debugging from this conversation, or use `local` if notifications become noisy.

## Recommended schedule: pragmatic three-slot version

This version keeps everything near 01:00, 02:00, and 03:00 UTC.

| UTC time | Cadence | Job | Notes |
| --- | --- | --- | --- |
| 01:00 | Daily | Validation/checkup | Does not create content unless fixing a tiny obvious issue. |
| 02:00 | Daily | Review draft/improvement | Commits automated drafts; marks them not human-reviewed. |
| 03:00 | Monday | Discovery + light triage | Weekly search/import/provenance pass. |
| 03:00 | Tuesday | Synthesis pass | Concept/algorithm/timeline synthesis. |
| 03:00 | Wednesday | Module/exercise pass | Build or improve one interactive artifact. |
| 03:00 | Thursday | Synthesis pass | Second weekly synthesis pass. |
| 03:00 | Friday | Module/exercise pass | Second weekly module/exercise pass. |
| 03:00 | Saturday | Synthesis pass | Optional third synthesis pass. |
| 03:00 | Sunday | Module/exercise pass or rest/checkup | Optional third module pass; can be paused if too noisy. |

This is fast: 7 review passes, 1 discovery/triage pass, 2-3 synthesis passes, 2-3 module/exercise passes, and 7 validations per week.

## Alternative: richer same-day paired version

If we allow a 04:00 UTC slot, the workflow becomes cleaner:

| UTC time | Cadence | Job |
| --- | --- | --- |
| 01:00 | Daily | Validation/checkup |
| 02:00 | Daily | Review draft/improvement |
| 03:00 Monday | Weekly | Discovery |
| 04:00 Monday | Weekly | Triage |
| 03:00 Tue/Thu/Sat | 3x weekly | Synthesis |
| 04:00 Tue/Thu/Sat | 3x weekly | Module/exercise |

This better matches the desire for discovery+triage and synthesis+module to happen on the same day at different times. It is also easier to debug because jobs have cleaner responsibilities.

## Initial recommendation

Start with the richer same-day paired version, but create the jobs paused or run them manually first.

Manual dry-run order:

1. validation/checkup;
2. daily review draft;
3. discovery;
4. triage;
5. synthesis;
6. module/exercise.

Only enable recurrence after each job has been manually run once and inspected.

## Proposed cron job specs

When creating jobs through Hermes, use:

```text
workdir: /workspace/growing-neural-networks
skills: ["growing-neural-networks", "growing-neural-networks-cron"]
enabled_toolsets: ["terminal", "file", "web", "skills"]
```

For discovery, include `arxiv`:

```text
skills: ["growing-neural-networks", "growing-neural-networks-cron", "arxiv"]
```

### Validation/checkup

```text
name: gnn-validation-daily
schedule: 0 1 * * *
prompt: Use the Prompt: validation checkup section from the growing-neural-networks-cron skill.
```

### Review draft/improvement

```text
name: gnn-review-daily
schedule: 0 2 * * *
prompt: Use the Prompt: daily review draft section from the growing-neural-networks-cron skill.
```

### Discovery

```text
name: gnn-discovery-weekly
schedule: 0 3 * * 1
prompt: Use the Prompt: weekly discovery and light triage section from the growing-neural-networks-cron skill.
```

### Triage-only, if using 04:00 slot

```text
name: gnn-triage-weekly
schedule: 0 4 * * 1
prompt: Use the Prompt: weekly triage-only section from the growing-neural-networks-cron skill.
```

### Synthesis

```text
name: gnn-synthesis-3x-weekly
schedule: 0 3 * * 2,4,6
prompt: Use the Prompt: synthesis pass section from the growing-neural-networks-cron skill.
```

### Module/exercise

If using only 03:00 slots, use Wednesday/Friday/Sunday:

```text
name: gnn-module-exercise-3x-weekly
schedule: 0 3 * * 3,5,0
prompt: Use the Prompt: module/exercise pass section from the growing-neural-networks-cron skill.
```

If using the richer paired version, use Tuesday/Thursday/Saturday at 04:00:

```text
name: gnn-module-exercise-3x-weekly
schedule: 0 4 * * 2,4,6
prompt: Use the Prompt: module/exercise pass section from the growing-neural-networks-cron skill.
```

## Notes for tomorrow's manual runs

- Create jobs either paused or with conservative repeat counts while debugging.
- Run manually with `cronjob(action="run", job_id="...")` after creation.
- Inspect the resulting commit after each run.
- If a job makes too broad a change, patch `growing-neural-networks-cron` before enabling it.
- If notifications are noisy, set `deliver: local` or create fewer jobs initially.
