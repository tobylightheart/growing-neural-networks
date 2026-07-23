# Agent maintenance playbook

This is the in-repository successor to the former project-specific Hermes skill. `AGENTS.md` is the authoritative entry point.


# Growing Neural Networks repository maintenance

Use this skill when working in `/workspace/growing-neural-networks`, especially for scheduled bundle-first literature-review jobs.

## Bundle-first daily review/promotion workflow

1. **Protect user work first.** Run `git status --short` in `/workspace/growing-neural-networks`. If unrelated or likely user edits are present, stop and report rather than overwriting.
2. **Read planning/data files before choosing work:**
   - `data/review-bundles.json`
   - `docs/pdf-library-review-plan.md`
   - `data/missing-library-assets.json`
   - `data/papers.json`
   - `data/paper-assets.json`
   - `data/sources.json`
3. **Do a lightweight bundle-priority review.** Prefer concrete evidence over churn. Update `data/review-bundles.json` and `docs/pdf-library-review-plan.md` only when evidence clearly warrants it: a milestone is complete, no collected anchors remain, a seeded/active bundle now has ready records/assets, or `next_actions` explicitly says to branch.
4. **Current priority policy:**
   - `stdp-hidden-pattern-construction` completed its six-anchor milestone; keep it warm for bounded synthesis/follow-up, not as the default daily review branch.
   - Prefer `evolving-spiking-networks` as the urgent/active review branch when its records/assets are ready.
   - Keep `classic-constructive-foundations` high as a seeded grounding branch.
   - Do not invent new priority/status values outside each JSON schema.
5. **Choose exactly one paper action.** Select the highest-priority active or seeded bundle with a concrete next action. Prefer a collected local/private asset or an existing discovered record needing a review. Promote/draft at most one paper per run; if no collected paper is ready, improve exactly one existing review from the selected bundle.
6. **Ground cautiously.** Use local/private PDFs only as grounding sources. Do not copy PDFs or extracted full text into Git. If extraction tools are unavailable/unreliable, write a cautious reading-guide draft and record the limitation in review text and asset notes.
7. **Do not invent bibliographic facts.** Use bundle metadata, DOI/Crossref/Semantic Scholar/publisher metadata, DOI redirects, local file checks, and embedded PDF metadata. Leave uncertain fields blank or mark them pending.
8. **Review markdown requirements:**
   - Put `> Status: Automated draft, not yet human-reviewed.` near the top.
   - Include a `Review status` section with selected bundle, evidence sources, and extraction limitations.
   - Separate metadata-supported claims from full-text/algorithm claims needing human review.
9. **Bookkeeping for promoted/drafted papers:**
   - Update `data/papers.json` with review path, verified metadata, status, links, and cautious notes.
   - Update `data/paper-assets.json` with `local_private_only: true`, private paths under `../growing-neural-networks-library/`, source URL, `last_checked`, and extraction limitations.
   - Add/update `data/sources.json` provenance for the run.
   - Update bundle `next_actions` and anchor statuses where applicable.
   - Resolve matching `data/missing-library-assets.json` items only when such an item exists.
10. **Validate and smoke-test:**
    - `python3 scripts/growing-neural-networks-cron/validate_data.py`
    - JSON syntax checks for edited JSON, e.g. `python3 -m json.tool <file> >/dev/null`
    - `python3 scripts/check_missing_library_assets.py`
    - `git diff --check` and, after staging, `git diff --cached --check`
    - If review routes changed, smoke-test raw review Markdown and `pages/review.html?id=<paper-id>` with a local `python3 -m http.server` when practical. If the first fixed port is busy, retry on a dynamically chosen free local port rather than skipping the smoke test.
11. **Commit locally, never push.** Use `review: draft <paper-id>`, `review: improve <paper-id>`, or `review: update bundle priorities`. If both priorities and review content changed, use the review message and mention priority updates in the body.

## Bundle bookkeeping pitfalls

- If repository edits through `patch`/`write_file` are denied because `/workspace/growing-neural-networks` is outside `HERMES_WRITE_SAFE_ROOT`, stop and report the deployment misconfiguration. The current guard resolves relative paths before checking roots, so repository-relative paths do not bypass it; changing a persistent terminal shell's environment also does not alter non-terminal file tools. Configure the container with both durable state and project roots (on Linux, `/opt/data:/workspace`) and recreate it. Do not work around the guard with ad-hoc shell rewriting.
- When a paper appears as an anchor in multiple bundles (for example, a bridge paper shared by an active bundle and a planned follow-up bundle), promote it as **one shared paper record**. Update every bundle anchor that names the same `paper_id` to `existing-paper`, and make the `next_actions` explicitly say not to create a duplicate record.
- When the active bundle's `next_actions` say to coordinate with another bundle, treat that as concrete priority evidence: keep priorities stable unless the schema evidence demands otherwise, but update both bundles' next actions/statuses after the shared paper is promoted.
- When an urgent/active bundle has completed its explicitly planned first review sequence (for example all named anchors now have `existing-paper` records and review drafts), it is concrete evidence to demote that bundle to a warm seeded/high synthesis or full-text-improvement branch and promote the next ready high-value seeded bundle. Update both `data/review-bundles.json` and `docs/pdf-library-review-plan.md`; do not leave the docs claiming the old active bundle.
- For new paper records, use only theme IDs that already exist in `data/themes.json` unless the task is explicitly to extend the taxonomy. `validate_data.py` rejects invented theme IDs; prefer established broad themes such as `historical-foundations`, `growth-trigger`, `capacity-control`, or `constructive-learning` for cautious automated drafts.
- For publisher-gated classic papers with a verified private PDF but no extraction tooling, a safe promotion pattern is: Crossref title/DOI lookup for bibliographic facts, Semantic Scholar DOI lookup for paper id/TLDR when available, DOI landing check noting HTTP failures without treating them as facts, private path existence/size check, and a reading-guide review that explicitly withholds algorithm equations/triggers until full-text or human review.
- If the active bundle's concrete next action is **asset verification for an already-reviewed anchor** (for example verifying an already-collected classic PDF filename), treat that as the day's single paper action: improve the existing review/asset bookkeeping rather than forcing a new promotion. Update `data/paper-assets.json` from `located`/`missing` to `collected`/`extraction-failed` only after verifying the private path, record public/source checks in `data/sources.json`, and mark the bundle next action resolved in both `data/review-bundles.json` and `docs/pdf-library-review-plan.md`.
- When the highest-priority active/seeded bundle has **no collected-needs-paper-record or available-in-library anchors left**, still perform exactly one bounded paper action from that bundle instead of branching speculatively: choose an existing review whose metadata/assets can be concretely improved, re-run public DOI/Crossref/Semantic Scholar plus private-path checks, update `data/papers.json`, `data/paper-assets.json`, the review Markdown, `data/sources.json`, and only minimal bundle/docs next-action notes. Do not change bundle priority/status just because the current bundle is in polish mode; reserve priority churn for explicit schema evidence or next-action instructions.
- A completed bounded pass in the active bundle **is** concrete priority evidence when both the bundle file and plan say all current anchors are drafted/improved. In that case, update `data/review-bundles.json` and `docs/pdf-library-review-plan.md` together, keep the completed branch warm/seeded/high, and move the next policy-preferred ready branch to active/urgent using only existing schema values. Example pattern from 2026-07-18: after `classic-constructive-foundations` completed its Ash1989/Fahlman1990/Platt1991/Prechelt1997 four-anchor pass, it was coherent to mark it `high`/`seeded` and return `evolving-spiking-networks` to `urgent`/`active` for bounded eSNN review improvements.
- When a bundle returns to active status for **improvement rather than promotion**, pick one existing anchor and improve concrete metadata/asset/review provenance instead of inventing new anchors. A safe eSNN survey-improvement pattern is: Crossref DOI lookup, Semantic Scholar DOI lookup if available, DOI landing redirect, private PDF existence/header/size check, extraction-tooling check, then update the paper record, asset notes, review Markdown, sources provenance, and bundle next action with cautious language about unresolved full-text mechanics.
- For eSNN application-anchor improvements (for example Wysoski2010), keep the public role narrow: it can support “eSNN audiovisual/application anchor” and lineage placement, but not exact encoding, repository matching, growth/pruning thresholds, datasets, or quantitative result claims without reliable full-text or human review. Safe bookkeeping pattern: recheck Crossref DOI metadata, retry Semantic Scholar DOI metadata but record rate limits neutrally, verify DOI landing/redirect route, verify private PDF existence/header/size under `../growing-neural-networks-library/`, check extraction tools, update review/asset/paper/source notes, and advance next_actions toward the next existing eSNN anchor rather than duplicating records.

## Bundle-first synthesis pass

Use this for scheduled synthesis/connective-tissue runs in `/workspace/growing-neural-networks` when the goal is to improve links among already-reviewed bundle material rather than promote a new paper or create a new artifact.

1. Start with `git status --short`; stop if likely user work is present.
2. Read `data/review-bundles.json`, `docs/pdf-library-review-plan.md`, `data/papers.json`, `data/themes.json`, `data/modules.json`, and `data/exercises.json` before selecting a bundle.
3. Prefer the active bundle when it has enough public `review-draft` or reviewed records for a cautious bridge. For the eSNN branch, Schliebs2013/Wysoski2010/Kasabov2013/Wang2014/Roy2017 support metadata and teaching-connective claims about lineage roles, but not exact growth/pruning/rewiring/adaptation triggers until full-text or human review verifies them. Use Roy2017 as one shared bridge record with the structural-plasticity bundle rather than duplicating it.
4. Make exactly one focused connective improvement: metadata links, a short docs/page section, bundle progress note, or cautious comparison axis. Do not create many new themes, new broad taxonomies, or unsupported claims from private PDFs.
- For module metadata connective updates, keep `data/modules.json` and the module-local `module.json` synchronized; if the module UI has cards, update its README/HTML/JS guardrails together so the public route and metadata tell the same story. For exercise connective updates, do the same with `data/exercises.json` plus the exercise-local `exercise.json`, README, and route copy.
- When adding a taxonomy/thesis bridge into an existing card-based module, make the card ordering, initial UI defaults, arrow/edge wiring, README guardrail, route copy, and synchronized metadata all reflect the same bridge role. Safe example: in `evolving-spiking-lineage-cards`, Lightheart2018 can be the thesis-taxonomy vocabulary bridge before Schliebs2013/Wysoski2010/Kasabov2013/Wang2014/Roy2017, but it must be labeled as vocabulary/connective context rather than evidence for exact later eSNN growth/pruning/rewiring mechanisms.
- When adding newly reviewed anchors to an existing teaching artifact, distinguish **quiz/interaction claims** from **bundle-context links**. If newer anchors only support cautious context (for example Platt1991 resource allocation or Prechelt1997 CasCor-family guardrails), update metadata/source links and guardrail prose without changing the interactive claims to assert unverified novelty tests, equations, variant details, or empirical conclusions.
- For active-bundle card/bridge modules, a safe refinement is to add a **claim-axis selector** rather than a new algorithm demo: expose thesis or taxonomy axes (for example `parameter-calculation`, `local-performance-trigger`, `pruning-and-merging`) and label each paper card as direct support, cautious context, or pending full-text/human review. Keep `data/modules.json` and the local `module.json` concepts synchronized, and update README/HTML/JS/CSS guardrails together so the route does not imply stronger claims than the metadata.
7. Validate with `python3 scripts/growing-neural-networks-cron/validate_data.py`, `python3 -m json.tool` for edited JSON, `python3 scripts/check_missing_library_assets.py`, `node --check` for changed JS, `git diff --check`, and after staging `git diff --cached --check`. If static module/page routes changed, smoke-test them through `python3 -m http.server`; if a fixed port is busy, retry using a dynamically chosen local port rather than skipping the smoke test.
7. Commit locally with `synthesis: <concise bridge>` or `docs: <concise note>`; never push from a cron run.

## Bundle-first module/exercise pass

Use this for scheduled static module/exercise runs in `/workspace/growing-neural-networks`.

1. Start with `git status --short`; stop if likely user work is present.
2. Read `data/review-bundles.json`, `docs/pdf-library-review-plan.md`, `data/modules.json`, `data/exercises.json`, `data/papers.json`, and `data/themes.json` before selecting work.
3. Prefer `planned_outputs` from the active or seeded bundle. Build only when public reviews/synthesis are sufficient for cautious claims. For `stdp-hidden-pattern-construction`, require at least three related public reviews before creating timing-window/repeating-pattern exercises.
4. If no bundle-backed artifact is ready, refine one existing artifact or add a conservative planned record; do not invent a standalone demo.
5. Static available artifacts use a directory containing metadata JSON (`module.json` or `exercise.json`), `index.html`, `demo.js`, `styles.css`, and `README.md`. Only mark records `available` in `data/modules.json` or `data/exercises.json` after the artifact exists.
6. For the active `classic-constructive-foundations` bundle, the planned DNC vs Cascade-Correlation comparison is ready once public Ash1989 and Fahlman1990 review drafts exist; keep DNC trigger/equation/schedule claims as explicit guardrails unless full-text/human review verifies them. See `docs/agent/module-exercise-artifact-notes.md` for the safe claim axis and artifact pattern.
7. Run `python3 scripts/growing-neural-networks-cron/validate_data.py`, `node --check` on changed JS, `python3 -m compileall -q scripts` if Python changed, `python3 scripts/check_missing_library_assets.py`, `git diff --check`, and after staging `git diff --cached --check`. Also run `python3 -m json.tool` on edited JSON files. Smoke-test changed static routes with `python3 -m http.server` plus `urllib.request` when practical; if the first port is busy, retry on another local port or use a short `ThreadingHTTPServer(('127.0.0.1', 0), ...)` script that binds a dynamic local port and shuts down in `finally`.
8. Commit locally with `feat: add/improve <module-or-exercise>` or `docs: plan <module-or-exercise>`; never push from the cron run.

## Useful source checks

- For classic constructive/CasCor-family publisher-gated anchors, see `docs/agent/classic-constructive-prechelt-pattern.md` for the cautious promotion pattern, safe claim boundary, and bookkeeping reminder from the Prechelt1997 run.
- Crossref title/DOI lookup with Python `urllib.request` when web tools are unavailable.
- Semantic Scholar DOI lookup: `https://api.semanticscholar.org/graph/v1/paper/DOI:<doi>?fields=paperId,title,year,venue,authors,externalIds,abstract,tldr,openAccessPdf,url`.
- DOI redirect/landing check with Python `urllib.request.urlopen`.
- Private PDF existence/size and embedded metadata checks via Python byte/string scans when extraction tools are unavailable.
- If `pdftotext` and Python PDF libraries are unavailable but a private PDF is verified, a cautious non-committed Flate-stream inspection can sometimes recover snippets for review improvement: scan `stream ... endstream` blocks, `zlib.decompress` them, extract PDF literal strings, strip nulls, and use only short mechanism/bibliographic snippets in public notes while clearly labeling the extraction as limited and human-review-needed. Do not commit extracted full text.
- Check `pdftotext` and Python packages (`pypdf`, `PyPDF2`, `pdfminer`, `fitz`) before claiming extraction is unavailable.

## Final report checklist

State selected bundle, priority/status changes considered and made, paper chosen, source checks performed, files changed, checks run, and commit hash. If no changes were warranted, report why or use `[SILENT]` only when the cron prompt allows and there is genuinely nothing new.
