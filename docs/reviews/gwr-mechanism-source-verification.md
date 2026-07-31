# GWR mechanism source-verification worksheet

> **Status: Automated source-verification aid, not yet human-reviewed.**
>
> This private-source worksheet supports later review. It is not itself a public
> literature claim, a reproduction, or authority to change the public paper
> review's status.

## Scope

This worksheet checks the core mechanism seam in Marsland, Shapiro, and
Nehmzow's Grow When Required (GWR) network: match/activity, insertion,
initialisation, adaptation, habituation, topology maintenance, and cessation or
resumption of growth. It does not evaluate experiments or compare GWR broadly
with other algorithms.

## Source identity and provenance

- **Paper:** Stephen Marsland, Jonathan Shapiro, and Ulrich Nehmzow, “A
  self-organising network that grows when required,” *Neural Networks* 15
  (2002), 1041–1058.
- **DOI:** `10.1016/S0893-6080(02)00078-3`.
- **Private source used read-only:**
  `../growing-neural-networks-library/pdfs/Constructive/Marsland S, Shapiro J, Nehmzow U (2002) - A self-organising network that grows when required.pdf`.
- **Private-file identity:** 1,297,945 bytes; SHA-256
  `655ab0137eed65cb10f27479c82b6633db6c90123c8a47b918092fd4e322d375`.
- **Identity checks:** PDF page 1 / journal page 1041 displays the title,
  authors, journal, page range, and PII `S0893-6080(02)00078-3`; the embedded
  PDF title contains the same PII. The repository's previously checked
  Crossref/PubMed provenance in
  `reviews/marsland-2002-grows-when-required.md` associates this identity with
  the DOI above and PubMed record `12416693`.
- **Public evidence consulted:** the existing automated Marsland review and its
  recorded Crossref/PubMed abstract provenance. No new bibliographic or result
  claim is introduced here.

## Inspection and reliability

The PDF is unencrypted and has 18 pages. Text was extracted to temporary files
outside Git with `pypdf 6.14.2`; all pages yielded substantial text (80,615
characters total, with no page below 500 characters), and section and algorithm
reading order were coherent. PDF pages 4–5 / journal pages 1044–1045 were also
rendered temporarily with `PyMuPDF 1.28.0` and checked visually against the
numbered algorithm. This visual pass resolved a text-layer ambiguity in the
minus sign of Eq. (6). No PDF, extracted full text, page image, or temporary
inspection artifact is committed.

Locator convention below uses the printed journal page number, followed by the
section, algorithm step, or equation where available.

## Mechanism worksheet

### 1. Mismatch and activity measure

- **Evidence status:** directly verified.
- **Source-supported paraphrase:** For each input, GWR selects the closest and
  second-closest node weight vectors by Euclidean distance. The best match's
  activity is the exponential of the negative Euclidean distance,
  `a = exp(-||ξ - w_s||)`, so a closer match gives activity nearer one.
- **Pinpoint locator:** p. 1045, Section 3.1, steps 2–5, Eqs. (3)–(6).
- **Boundary:** This is a distance-derived activity score, not accumulated
  supervised residual error.

### 2. Insertion trigger and thresholds

- **Evidence status:** directly verified.
- **Source-supported paraphrase:** A node is inserted only when both conditions
  hold: best-match activity is below the activity threshold `a_T`, and the
  winner's firing/habituation variable is below the firing threshold `h_T`.
  The second condition distinguishes a frequently used, trained winner from a
  recently created node that should receive more adaptation instead of causing
  another insertion.
- **Pinpoint locator:** pp. 1044–1045, Section 3; p. 1045, Section 3.1 step 6.
- **Threshold note:** The paper treats `a_T` as tunable generalisation: values
  nearer one cause finer representation and more nodes. For the exponentially
  decreasing firing variable, the described implementation sets `h_T` so that
  a node is considered trained after five firings. The core algorithm does not
  prescribe one universal numerical `a_T`; later experiments use or sweep
  different values.
- **Pinpoint locator for threshold note:** pp. 1044–1045, paragraph immediately
  before Section 3.1; examples/sweep on pp. 1050–1051, 1053, and 1056–1057.

### 3. Network, new-node, and edge initialisation

- **Evidence status:** directly verified.
- **Source-supported paraphrase:** The network starts with two nodes sampled
  randomly from the input distribution and an empty connection set. On an
  insertion, the new node's weight is the midpoint between the current input
  and the best-matching node's weight. The new node is connected to both the
  best and second-best matching nodes, and the previous edge between those two
  matches is removed.
- **Pinpoint locator:** p. 1045, Section 3.1 initialisation and step 6,
  Eqs. (1)–(2) and (7)–(10).
- **Edge-age note:** Section 3 states that created edge connections start at age
  zero. The best/second-best edge is created if absent or reset to age zero if
  present.
- **Pinpoint locator for edge age:** p. 1044, Section 3; p. 1045, Section 3.1
  step 4, Eq. (5).

### 4. Winner and neighbour adaptation

- **Evidence status:** directly verified.
- **Source-supported paraphrase:** If insertion does not occur, the winning node
  and its connected neighbours move toward the input. Their update sizes use
  separate winner and neighbour learning rates and are scaled by their own
  firing variables; the paper constrains the neighbour rate below the winner
  rate.
- **Pinpoint locator:** p. 1045, Section 3.1 step 7, Eqs. (11)–(12).
- **Boundary:** Adaptation is the alternative branch to insertion in the
  numbered algorithm; this worksheet does not infer an extra adaptation step
  for an iteration in which a node is inserted.

### 5. Habituation / firing variables

- **Evidence status:** directly verified.
- **Source-supported paraphrase:** A firing variable starts high for a new node
  and decreases toward a lower value with repeated activation. The winner's
  variable decreases faster than its neighbours' variables. These variables
  both guard insertion and scale later weight adaptation, reducing movement of
  frequently used nodes.
- **Pinpoint locator:** p. 1044, Section 3 habituation discussion; p. 1045,
  Section 3.1 step 9, Eqs. (14)–(16).
- **Boundary:** The paper presents the exponential habituation variable as an
  alternative to a simple firing counter. This worksheet records the numbered
  algorithm's habituation form without claiming that its constants are
  universal defaults.

### 6. Edge aging, deletion, and topology maintenance

- **Evidence status:** directly verified.
- **Source-supported paraphrase:** Each input connects the best and second-best
  matches, or resets their existing edge's age. Edges incident to the winner
  are aged; edges older than the configured maximum are deleted, and nodes left
  without neighbours are deleted. This permits both edges and nodes to be
  created and destroyed during learning.
- **Pinpoint locator:** p. 1044, Section 3 competitive-Hebbian edge paragraph;
  p. 1045, Section 3.1 steps 4, 8, and 10, Eqs. (5) and (13).
- **Boundary:** The core algorithm names a maximum edge age but does not define
  one universal value for every use.

### 7. When growth stops or resumes

- **Evidence status:** directly verified.
- **Source-supported paraphrase:** Growth pauses when represented inputs no
  longer satisfy the two-part insertion condition. It can resume immediately
  when changed input produces low activity at a sufficiently habituated winner.
  This growth behavior is distinct from terminating the learning loop itself.
- **Pinpoint locator:** p. 1042, final Introduction paragraph before Section 2;
  pp. 1044–1045, Section 3 insertion description and Section 3.1 step 6.
- **Loop-termination boundary:** Step 11 continues while inputs remain unless
  “some stopping criterion” is reached; the core algorithm does not specify a
  single mandatory global termination criterion.
- **Pinpoint locator for loop termination:** p. 1045, Section 3.1 step 11.

## Explicitly unresolved or non-universal cells

- **Universal numerical `a_T`: unresolved by design.** The source treats it as
  task-dependent and reports different experimental settings rather than one
  algorithm-wide constant. Locations checked: pp. 1044–1045 and experimental
  sections on pp. 1050–1051, 1053, and 1056–1057.
- **Universal maximum edge age: unresolved by design.** Section 3 names the
  configurable constant `a_max`; the core mechanism does not establish one
  value for every setting. Locations checked: pp. 1044–1045.
- **Mandatory global stopping rule: unresolved.** Step 11 leaves the stopping
  criterion to the application. Growth cessation due to adequate matching is
  supported, but it must not be restated as termination of learning. Locations
  checked: pp. 1042 and 1045.

These unresolved cells do not block the worksheet: the source itself exposes
parameterisation or application choice rather than an extraction failure. Any
future public review update should receive human review before presenting these
mechanism paraphrases as reviewed claims.
