# GNN-3 Verify the GWR mechanism seam

**Priority:** high
**Blocked by:** nothing
**Touches:** `docs/reviews/gwr-mechanism-source-verification.md`

## Context

The active `growing-topology-and-neural-gas` branch has one public Marsland2002 draft, but that draft is intentionally limited to metadata and the indexed abstract. It withholds the mismatch measure, insertion trigger, initialization, adaptation, and growth-stopping behavior. The private library contains a matching 1,297,945-byte PDF, while no reliable extracted-text artifact currently exists. The portfolio review gate recommended a bounded source-verification worksheet as the next information-gain step, and the user approved turning that proposal into a reviewable task.

## Goal

Create a source-verification worksheet for the core Growing When Required mechanism seam, grounded in the matching private Marsland2002 PDF and existing public provenance. Record what the source directly supports, what remains unresolved, and where each finding came from without changing public review status or making publication-ready claims.

## Acceptance criteria

- [ ] Create `docs/reviews/gwr-mechanism-source-verification.md`, clearly labelled as an automated source-verification aid that is not human-reviewed and is not itself a public literature claim.
- [ ] Record the exact source identity and provenance used: Marsland, Shapiro, and Nehmzow (2002), DOI `10.1016/S0893-6080(02)00078-3`, the verified private PDF path, and any public metadata or abstract source consulted.
- [ ] Include structured worksheet entries for: mismatch/activity measure; insertion trigger and thresholds; new-node and edge initialization; winner/neighbour adaptation; habituation; edge aging/deletion or topology maintenance; and the condition under which growth stops or resumes.
- [ ] For every entry, record an evidence status (`directly verified`, `abstract-supported`, or `unresolved`), a concise paraphrase, and a pinpoint locator such as page, section, equation, figure, or algorithm step. Leave unsupported cells explicitly unresolved rather than inferring them.
- [ ] Record the extraction/inspection method and a brief reliability check. Do not commit the PDF, extracted full text, long quotations, or temporary extraction artifacts.
- [ ] If the private source cannot be read reliably, source identity cannot be confirmed, or a mechanism cell requires interpretive judgment rather than source transcription, stop without completing the task and report the exact blocker for human review.
- [ ] Do not change `reviews/marsland-2002-grows-when-required.md`, paper/review status, bundle priority, registry data, teaching artifacts, or the sibling lab.
- [ ] `python3 scripts/growing-neural-networks-cron/validate_data.py`, `python3 scripts/check_missing_library_assets.py`, and `git diff --check` pass.

## Relevant files

- `reviews/marsland-2002-grows-when-required.md`
- `docs/reviews/strategic-progress-audit-2026-07-25.md`
- `docs/pdf-library-review-plan.md`
- `docs/agent/maintenance-playbook.md`
- `data/paper-assets.json`
- Private read-only source: `../growing-neural-networks-library/pdfs/Constructive/Marsland S, Shapiro J, Nehmzow U (2002) - A self-organising network that grows when required.pdf`

## Decisions already made

- This is a bounded evidence worksheet, not a close-review publication, public review upgrade, implementation task, or new research direction.
- The worksheet may use the private PDF for grounding, but the PDF and extracted full text remain outside Git; only short paraphrases and pinpoint locators may be committed.
- Uncertainty is an output: unresolved cells are preferable to guessed equations, thresholds, or algorithm steps.
- Execution must fail closed when reliable source access or human interpretation is required.

## Out of scope

Updating the public Marsland review, changing paper or bundle records, comparing GWR broadly against Ash/Fahlman/Fritzke, implementing GWR in the lab, creating a teaching artifact, evaluating quantitative results, or making publication claims.
