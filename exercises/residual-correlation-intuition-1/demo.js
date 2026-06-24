const rows = [
  { x: [0, 0], target: 0, output: 0.38 },
  { x: [0, 1], target: 1, output: 0.48 },
  { x: [1, 0], target: 1, output: 0.53 },
  { x: [1, 1], target: 0, output: 0.42 }
].map(row => ({ ...row, residual: row.target - row.output }));

const candidates = [
  {
    id: 'ridge',
    name: 'Candidate A: XOR-ish ridge',
    activations: [-0.91, 0.72, 0.69, -0.58],
    explanation: 'This candidate has the strongest absolute correlation with the residuals, so it is the best unit to install.'
  },
  {
    id: 'flat',
    name: 'Candidate B: almost flat',
    activations: [0.08, 0.13, 0.11, 0.09],
    explanation: 'This candidate barely varies across the four cases, so it explains little residual structure.'
  },
  {
    id: 'anti',
    name: 'Candidate C: reversed pattern',
    activations: [0.64, -0.51, -0.55, 0.45],
    explanation: 'This candidate is useful, but its absolute correlation is slightly lower than Candidate A in this setup.'
  }
];

const residualRows = document.querySelector('#residual-rows');
const options = document.querySelector('#candidate-options');
const feedback = document.querySelector('#feedback');
const answerState = document.querySelector('#answer-state');
const answerNote = document.querySelector('#answer-note');
const checkButton = document.querySelector('#check-answer');
const resetButton = document.querySelector('#reset-answer');
const canvas = document.querySelector('#exercise-canvas');
const ctx = canvas.getContext('2d');

function mean(values) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function correlation(a, b) {
  const ma = mean(a);
  const mb = mean(b);
  let numerator = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < a.length; i++) {
    const xa = a[i] - ma;
    const xb = b[i] - mb;
    numerator += xa * xb;
    da += xa * xa;
    db += xb * xb;
  }
  const denom = Math.sqrt(da * db);
  return denom < 1e-9 ? 0 : numerator / denom;
}

function fmt(value) {
  return value.toFixed(3);
}

function residuals() {
  return rows.map(row => row.residual);
}

function enrichCandidates() {
  const r = residuals();
  candidates.forEach(candidate => {
    candidate.correlation = correlation(candidate.activations, r);
    candidate.score = Math.abs(candidate.correlation);
  });
}

function bestCandidate() {
  return candidates.reduce((best, candidate) => candidate.score > best.score ? candidate : best, candidates[0]);
}

function renderTable() {
  residualRows.innerHTML = rows.map(row => `<tr>
    <td>${row.x[0]}</td>
    <td>${row.x[1]}</td>
    <td>${row.target}</td>
    <td>${fmt(row.output)}</td>
    <td class="${row.residual < 0 ? 'negative' : 'good'}">${fmt(row.residual)}</td>
  </tr>`).join('');
}

function renderOptions() {
  options.innerHTML = candidates.map(candidate => `<label class="candidate-option">
    <input type="radio" name="candidate" value="${candidate.id}">
    <span>
      <span class="candidate-name">${candidate.name}</span><br>
      <span class="candidate-values">activations: [${candidate.activations.map(fmt).join(', ')}]</span>
    </span>
    <span class="correlation-pill">|r| ${fmt(candidate.score)}</span>
  </label>`).join('');
}

function selectedCandidate() {
  const selected = document.querySelector('input[name="candidate"]:checked');
  return selected ? candidates.find(candidate => candidate.id === selected.value) : null;
}

function checkAnswer() {
  const selected = selectedCandidate();
  const best = bestCandidate();
  feedback.className = 'feedback';
  if (!selected) {
    answerState.textContent = 'No choice';
    answerNote.textContent = 'Select one candidate first.';
    feedback.textContent = 'Choose A, B, or C, then check your answer.';
    return;
  }

  const correct = selected.id === best.id;
  feedback.classList.add(correct ? 'correct' : 'incorrect');
  answerState.textContent = correct ? 'Correct' : 'Try again';
  answerNote.textContent = `${selected.name} has r = ${fmt(selected.correlation)} and |r| = ${fmt(selected.score)}.`;
  feedback.innerHTML = correct
    ? `<strong>${selected.name}</strong> is the best choice. ${selected.explanation}`
    : `<strong>${selected.name}</strong> is not the best next unit. ${selected.explanation} Compare it with <strong>${best.name}</strong>, whose |r| is ${fmt(best.score)}.`;
}

function resetAnswer() {
  document.querySelectorAll('input[name="candidate"]').forEach(input => { input.checked = false; });
  feedback.className = 'feedback';
  feedback.textContent = '';
  answerState.textContent = 'Not checked';
  answerNote.textContent = 'Pick a candidate below.';
}

function colorFor(value) {
  return value >= 0 ? '#356859' : '#9a4d2f';
}

function drawAxes(x, y, w, h, title) {
  ctx.strokeStyle = '#ded6c8';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);
  ctx.strokeStyle = '#cfc4b1';
  ctx.beginPath();
  ctx.moveTo(x, y + h / 2);
  ctx.lineTo(x + w, y + h / 2);
  ctx.stroke();
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 16px system-ui, sans-serif';
  ctx.fillText(title, x, y - 12);
}

function drawCandidate(candidate, index) {
  const x = 44 + index * 312;
  const y = 86;
  const w = 270;
  const h = 250;
  drawAxes(x, y, w, h, candidate.name.replace('Candidate ', ''));

  const group = w / rows.length;
  rows.forEach((row, i) => {
    const zero = y + h / 2;
    const rx = x + i * group + 18;
    const ax = rx + 26;
    const residualHeight = row.residual * h * 0.82;
    const activationHeight = candidate.activations[i] * h * 0.42;

    ctx.fillStyle = colorFor(row.residual);
    ctx.fillRect(rx, zero - Math.max(residualHeight, 0), 20, Math.abs(residualHeight));
    ctx.globalAlpha = 0.58;
    ctx.fillStyle = colorFor(candidate.activations[i]);
    ctx.fillRect(ax, zero - Math.max(activationHeight, 0), 20, Math.abs(activationHeight));
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#6f6a60';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(row.x.join(''), rx, y + h + 18);
  });

  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 19px system-ui, sans-serif';
  ctx.fillText(`r = ${fmt(candidate.correlation)}`, x + 18, y + h + 52);
  ctx.fillText(`|r| = ${fmt(candidate.score)}`, x + 142, y + h + 52);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fffaf1';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 24px system-ui, sans-serif';
  ctx.fillText('Compare each candidate activation pattern to the residual error', 44, 42);
  ctx.fillStyle = '#356859';
  ctx.fillRect(44, 56, 16, 16);
  ctx.fillStyle = '#6f6a60';
  ctx.font = '14px system-ui, sans-serif';
  ctx.fillText('residual bars', 66, 69);
  ctx.globalAlpha = 0.58;
  ctx.fillStyle = '#356859';
  ctx.fillRect(178, 56, 16, 16);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#6f6a60';
  ctx.fillText('candidate activation bars', 200, 69);
  candidates.forEach(drawCandidate);
}

enrichCandidates();
renderTable();
renderOptions();
draw();
checkButton.addEventListener('click', checkAnswer);
resetButton.addEventListener('click', resetAnswer);
