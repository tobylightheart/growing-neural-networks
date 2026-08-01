# Tasks

> **Agents:** read this file at the start of every session, then consult
> `.tasks/LOG.jsonl` for the authoritative queue. Use the external
> `task-cycle` skill to file, start, complete, and debrief work.

## Current focus

No task is currently queued. `GNL-4` added a minimal deterministic Grow When
Required mechanism slice with independently specified trace checkpoints. It
remains an inspectable toy rather than a paper reproduction, parameter-default
recommendation, or public-review update.

The repository task-ID prefix is `GNL`.

## Queue

See `.tasks/LOG.jsonl`. An incomplete task has a corresponding Markdown file in
`.tasks/`; completed task files are deleted after their debrief is committed.

## Structure

```text
.tasks/
├── LOG.jsonl
├── debriefs/
└── GNL-N-....md
```

## Quick reference

| What | Where |
|---|---|
| Full task queue | `.tasks/LOG.jsonl` |
| Active task files | `.tasks/*.md` |
| Completed debriefs | `.tasks/debriefs/` |
| Templates and procedure | external `task-cycle` skill |
