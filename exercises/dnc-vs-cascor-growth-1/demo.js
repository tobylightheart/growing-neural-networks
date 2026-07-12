const choices = [
  { id: 'dnc', label: 'Dynamic Node Creation' },
  { id: 'cascor', label: 'Cascade-Correlation' },
  { id: 'both', label: 'Both classic constructive methods' },
  { id: 'guardrail', label: 'Not safe to assert from these drafts' }
];

const claims = [
  {
    id: 'hidden-growth',
    text: 'The method grows representational capacity by adding hidden structure instead of fixing all hidden units in advance.',
    answer: 'both',
    hint: 'This is the shared constructive-learning idea that makes the comparison possible.',
    explanation: 'Both records are classic hidden-unit-growth anchors, even though their growth procedures differ.'
  },
  {
    id: 'candidate-correlation',
    text: 'Candidate units are trained and selected by how strongly their activations correlate with residual output error.',
    answer: 'cascor',
    hint: 'Look for the method named after a cascade of correlation-trained features.',
    explanation: 'The Fahlman/Lebiere record grounds residual-error correlation and candidate-unit training as Cascade-Correlation-specific teaching claims.'
  },
  {
    id: 'backprop-growth',
    text: 'The public draft frames growth as adding nodes to a backpropagation network when current capacity appears insufficient.',
    answer: 'dnc',
    hint: 'The title names node creation inside backpropagation networks.',
    explanation: 'The Ash record supports this conservative DNC summary while keeping exact trigger schedules open for review.'
  },
  {
    id: 'freeze-inputs',
    text: 'After a new hidden feature is installed, its incoming weights are frozen while later training uses it as a stable feature.',
    answer: 'cascor',
    hint: 'Which reviewed method explicitly turns installed candidates into frozen features?',
    explanation: 'Freezing installed input weights is a distinctive Cascade-Correlation stabilization claim in the public metadata.'
  },
  {
    id: 'exact-dnc-equation',
    text: 'The exact DNC insertion equation and full post-insertion training schedule are verified by the automated draft.',
    answer: 'guardrail',
    hint: 'The DNC record is useful, but it still marks some details as pending human full-text verification.',
    explanation: 'The exercise must not overclaim the Ash draft: precise equations and schedules remain review tasks.'
  },
  {
    id: 'contrast',
    text: 'A useful first contrast is continued backpropagation-style adaptation versus a candidate-install-and-freeze feature loop.',
    answer: 'both',
    hint: 'This is a comparison statement: it needs both records to make the contrast.',
    explanation: 'The contrast is safe as a teaching axis because it names the reviewed CasCor freeze loop and the cautious DNC backpropagation-growth framing.'
  }
];

const score = document.querySelector('#score');
const scoreNote = document.querySelector('#score-note');
const claimList = document.querySelector('#claim-list');
const feedback = document.querySelector('#feedback');
const checkButton = document.querySelector('#check-answer');
const hintButton = document.querySelector('#show-hints');
const resetButton = document.querySelector('#reset-answer');
const canvas = document.querySelector('#comparison-canvas');
const ctx = canvas.getContext('2d');

function choiceOptions(selected = '') {
  return ['<option value="">Choose a match…</option>']
    .concat(choices.map(choice => `<option value="${choice.id}"${selected === choice.id ? ' selected' : ''}>${choice.label}</option>`))
    .join('');
}

function choiceLabel(choiceId) {
  return choices.find(choice => choice.id === choiceId)?.label || 'No match selected';
}

function renderClaims() {
  claimList.innerHTML = claims.map((claim, index) => `<section class="claim-card" data-claim="${claim.id}">
    <div class="claim-number">${index + 1}</div>
    <div>
      <p>${claim.text}</p>
      <p class="hint" hidden>${claim.hint}</p>
      <label>Best supported match
        <select data-answer-for="${claim.id}">${choiceOptions()}</select>
      </label>
      <p class="result-line" aria-live="polite"></p>
    </div>
  </section>`).join('');
}

function selectedFor(claimId) {
  return document.querySelector(`[data-answer-for="${claimId}"]`).value;
}

function updateScore(showResults = false) {
  let correct = 0;
  claims.forEach(claim => {
    const selected = selectedFor(claim.id);
    const isCorrect = selected === claim.answer;
    const card = document.querySelector(`[data-claim="${claim.id}"]`);
    const resultLine = card.querySelector('.result-line');
    if (isCorrect) correct += 1;
    card.classList.toggle('correct', showResults && isCorrect);
    card.classList.toggle('incorrect', showResults && selected && !isCorrect);
    if (!showResults) {
      resultLine.textContent = '';
    } else if (!selected) {
      resultLine.textContent = 'Choose a match before checking this claim.';
    } else if (isCorrect) {
      resultLine.textContent = `Correct: ${claim.explanation}`;
    } else {
      resultLine.textContent = `Not quite: you chose “${choiceLabel(selected)}”. ${claim.hint}`;
    }
  });
  score.textContent = `${correct} / ${claims.length}`;
  scoreNote.textContent = correct === claims.length ? 'All claims classified.' : 'Keep DNC, CasCor, and guardrails separate.';
  return correct;
}

function checkAnswers() {
  const correct = updateScore(true);
  feedback.className = `feedback ${correct === claims.length ? 'correct' : 'incorrect'}`;
  feedback.innerHTML = correct === claims.length
    ? '<strong>Good distinction.</strong> You separated shared constructive growth from Cascade-Correlation-specific candidate training and from DNC details that remain review guardrails.'
    : '<strong>Keep sorting.</strong> The safest route is to ask whether a statement is grounded in Ash1989, Fahlman1990, both, or neither automated draft.';
}

function showHints() {
  document.querySelectorAll('.hint').forEach(hint => { hint.hidden = false; });
  feedback.className = 'feedback';
  feedback.textContent = 'Hints are visible. They point to the source-grounding decision, not to a ranking of algorithms.';
}

function resetAnswers() {
  document.querySelectorAll('select[data-answer-for]').forEach(select => { select.value = ''; });
  document.querySelectorAll('.hint').forEach(hint => { hint.hidden = true; });
  feedback.className = 'feedback';
  feedback.textContent = '';
  updateScore(false);
}

function roundedRect(x, y, w, h, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

function drawText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  words.forEach(word => {
    const candidate = `${line}${word} `;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, y);
      line = `${word} `;
      y += lineHeight;
    } else {
      line = candidate;
    }
  });
  ctx.fillText(line.trim(), x, y);
}

function drawComparisonMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fffaf1';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 28px system-ui, sans-serif';
  ctx.fillText('DNC vs Cascade-Correlation: safe teaching axis', 36, 46);

  const boxes = [
    {
      title: 'Dynamic Node Creation',
      x: 42,
      y: 96,
      color: '#e8f0de',
      lines: ['Backpropagation network', 'Adds hidden nodes during training', 'Exact trigger/schedule still cautious']
    },
    {
      title: 'Shared constructive core',
      x: 322,
      y: 188,
      color: '#fff3ce',
      lines: ['Starts smaller than final model', 'Adds capacity when needed', 'Must manage post-growth stability']
    },
    {
      title: 'Cascade-Correlation',
      x: 602,
      y: 96,
      color: '#ddebf3',
      lines: ['Trains candidate units', 'Selects residual-correlation feature', 'Freezes installed input weights']
    }
  ];

  boxes.forEach(box => {
    roundedRect(box.x, box.y, 250, 172, 18, box.color, '#b8ad9c');
    ctx.fillStyle = '#23211d';
    ctx.font = 'bold 19px system-ui, sans-serif';
    ctx.fillText(box.title, box.x + 20, box.y + 36);
    ctx.font = '15px system-ui, sans-serif';
    box.lines.forEach((line, index) => drawText(`• ${line}`, box.x + 22, box.y + 72 + index * 30, 206, 20));
  });

  ctx.strokeStyle = '#8d806e';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(292, 178);
  ctx.lineTo(322, 235);
  ctx.moveTo(602, 178);
  ctx.lineTo(572, 235);
  ctx.stroke();

  roundedRect(100, 404, 700, 74, 16, '#f6ead8', '#d8c7aa');
  ctx.fillStyle = '#5c5347';
  ctx.font = '15px system-ui, sans-serif';
  drawText('Guardrail: this exercise classifies review-grounded claims. It should not be used as a source for unverified DNC equations or for claiming that all constructive algorithms freeze features.', 126, 436, 646, 21);
}

renderClaims();
drawComparisonMap();
updateScore(false);
checkButton.addEventListener('click', checkAnswers);
hintButton.addEventListener('click', showHints);
resetButton.addEventListener('click', resetAnswers);
document.querySelectorAll('select[data-answer-for]').forEach(select => select.addEventListener('change', () => updateScore(false)));
