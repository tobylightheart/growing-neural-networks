# Agent instructions

This repository is the authoritative execution environment for the Growing
Neural Networks literature garden. Do not depend on a project-specific Hermes
skill.

## Start every work session

1. Run `git status --short --branch`. Stop rather than overwrite unrelated or
   likely user work.
2. Read `TASKS.md`, then `.tasks/LOG.jsonl`, then the selected task file.
3. Follow the generic `task-cycle` skill for task selection, state changes,
   debriefs, and commits.
4. Read only the project documents relevant to the selected task.

## Repository remit

This is an interactive, static HTML/JS/CSS literature review of constructive
and growing neural networks. It owns paper records, reviews, bibliographic
provenance, review bundles, synthesis, taxonomies, and review-backed teaching
artifacts. Runnable mechanism experiments belong in the sibling
`growing-neural-networks-lab` repository; cross-repository work must be split
into separate tasks and commits.

Keep PDFs and extracted full text outside Git under the private sibling library.
Never bulk-ingest that library. Automated reviews must say that they are drafts
and not human-reviewed. Distinguish metadata-supported claims from algorithm,
equation, and result claims requiring reliable full text or human review.

## Project guidance

- `docs/agent/maintenance-playbook.md` — detailed bundle-first review,
  synthesis, module/exercise, source-check, and bookkeeping workflows.
- `docs/agent/module-exercise-artifact-notes.md` — conservative static artifact
  pattern and DNC/Cascade-Correlation claim boundary.
- `docs/agent/classic-constructive-prechelt-pattern.md` — private-PDF and
  publisher-gated review pattern.
- `docs/pdf-library-review-plan.md` — current bundle priorities and next actions.
- `docs/paper-library.md` — private-library conventions.
- `docs/cron-workflow.md` and `docs/compressed-cron-design.md` are historical
  scheduling records; portfolio-generated task-cycle slots supersede their job
  recommendations.

Current priorities belong in project data and task records, not in `AGENTS.md`.
Do not invent schema values, bibliographic facts, themes, or paper identifiers.

## Validation

Run the checks relevant to changed files, including:

```bash
python3 scripts/growing-neural-networks-cron/validate_data.py
python3 scripts/check_missing_library_assets.py
python3 -m json.tool <changed-json>
node --check <changed-javascript>
git diff --check
```

When routes change, serve the repository locally and smoke-test the changed
HTML, JS, CSS, JSON, and review routes. Prefer a Python `ThreadingHTTPServer`
bound to port `0` when a deterministic free port is needed.

## Unattended execution

A portfolio cron slot may complete at most one pending, unblocked task. If the
worktree is dirty, another task is `in_progress`, the task needs user judgment,
or scope exceeds its `Touches`, stop and report. Commit locally after tests;
never push from unattended work.
