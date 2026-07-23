# Agent instructions

This repository is the authoritative execution environment for the runnable
Growing Neural Networks lab. Do not depend on a project-specific Hermes skill.

## Start every work session

1. Run `git status --short --branch`; stop rather than overwrite unrelated work.
2. Read `TASKS.md`, `.tasks/LOG.jsonl`, and the selected task file.
3. Follow the generic `task-cycle` skill.
4. Read `docs/remit.md`, `docs/roadmap.md`, and
   `docs/agent/maintenance.md` as required by the task.

## Repository remit

This is the pure-Python/static companion to the literature garden. It owns tiny
datasets, runnable mechanisms, deterministic traces, browser demonstrations,
tests, validators, and concise links back to the main garden. It must not become
a second paper catalogue or bulk-PDF workflow.

Keep dependencies light: no NumPy, PyTorch, or TensorFlow unless the repository
explicitly adopts them later. Prefer deterministic outputs and committed trace
artifacts that exactly match runnable script output.

## Validation

For changed work, run:

```bash
python3 scripts/validate_lab.py
python3 <each affected experiment test path>
python3 -m json.tool <changed-json>
node --check <changed-javascript>
git diff --check
```

Smoke-test changed static routes over HTTP. A short Python
`ThreadingHTTPServer(('127.0.0.1', 0), ...)` is the preferred free-port pattern.

## Unattended execution

A portfolio cron slot may complete at most one pending, unblocked task. Stop on
a dirty worktree, existing `in_progress` task, ambiguity, user decisions, or a
`Touches` expansion. Commit locally after validation; never push.
