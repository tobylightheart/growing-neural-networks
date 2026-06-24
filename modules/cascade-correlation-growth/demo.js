const phases = [
  {
    title: '1. Train output layer',
    short: 'Train output weights on the current network.',
    copy: 'Only output weights are adjusted first. If residual error remains, the algorithm starts looking for a new feature.'
  },
  {
    title: '2. Audition candidates',
    short: 'Train candidate units against residual error.',
    copy: 'Candidate units receive inputs from existing features and compete by residual correlation, not by direct task accuracy.'
  },
  {
    title: '3. Install the winner',
    short: 'Add the strongest candidate to the network.',
    copy: 'The candidate with the largest absolute correlation becomes a new hidden unit connected into the output layer.'
  },
  {
    title: '4. Freeze the feature',
    short: 'Freeze incoming weights and continue.',
    copy: 'The installed unit keeps its incoming weights fixed. Later growth can use this stable feature as another input.'
  }
];

const baseCandidates = [
  { id: 'A', pattern: [-0.72, 0.78, 0.69, -0.63], base: 0.82 },
  { id: 'B', pattern: [0.25, -0.2, 0.31, -0.28], base: -0.43 },
  { id: 'C', pattern: [0.61, -0.69, -0.58, 0.66], base: -0.79 }
];
const residualPattern = [-0.45, 0.55, 0.5, -0.48];

const state = { phase: 0 };
const canvas = document.querySelector('#growth-canvas');
const ctx = canvas.getContext('2d');
const phaseNumber = document.querySelector('#phase-number');
const phaseSummary = document.querySelector('#phase-summary');
const phaseTitle = document.querySelector('#phase-title');
const phaseCopy = document.querySelector('#phase-copy');
const phaseList = document.querySelector('#phase-list');
const rows = document.querySelector('#candidate-rows');
const difficulty = document.querySelector('#difficulty');
const difficultyValue = document.querySelector('#difficulty-value');

function fmt(value) { return value.toFixed(2); }
function clamp(value, low, high) { return Math.max(low, Math.min(high, value)); }
function scaledCorrelation(candidate) {
  const d = Number(difficulty.value);
  const stretch = 0.72 + d * 0.42;
  return clamp(candidate.base * stretch, -0.98, 0.98);
}
function candidates() {
  return baseCandidates.map(candidate => ({ ...candidate, corr: scaledCorrelation(candidate) }));
}
function winner(items) {
  return items.reduce((best, item) => Math.abs(item.corr) > Math.abs(best.corr) ? item : best, items[0]);
}
function colorFor(value) { return value >= 0 ? '#356859' : '#9a4d2f'; }
function phaseVisible(index) { return state.phase >= index; }
function drawNode(x, y, label, options = {}) {
  ctx.fillStyle = options.fill || '#f0ebe1';
  ctx.strokeStyle = options.stroke || '#356859';
  ctx.lineWidth = options.width || 2;
  ctx.beginPath();
  ctx.arc(x, y, options.radius || 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, x, y + 5);
  ctx.textAlign = 'left';
}
function drawArrow(x1, y1, x2, y2, value = 1, dashed = false) {
  ctx.save();
  ctx.strokeStyle = colorFor(value);
  ctx.fillStyle = colorFor(value);
  ctx.globalAlpha = 0.35 + Math.min(0.6, Math.abs(value) * 0.55);
  ctx.lineWidth = 2 + Math.abs(value) * 2;
  ctx.setLineDash(dashed ? [7, 7] : []);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 12 * Math.cos(angle - 0.45), y2 - 12 * Math.sin(angle - 0.45));
  ctx.lineTo(x2 - 12 * Math.cos(angle + 0.45), y2 - 12 * Math.sin(angle + 0.45));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
function drawNetwork(best) {
  ctx.fillStyle = '#fffdf8';
  ctx.strokeStyle = '#ded6c8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(42, 70, 560, 300, 20);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillText('Growing network', 70, 110);

  drawNode(110, 180, 'x₁');
  drawNode(110, 280, 'x₂');
  drawNode(505, 230, 'out', { fill: '#e5efe9', radius: 32 });
  drawArrow(140, 180, 470, 220, 0.42);
  drawArrow(140, 280, 470, 240, -0.32);

  if (phaseVisible(2)) {
    drawNode(310, 230, `h${best.id}`, { fill: phaseVisible(3) ? '#dbeadf' : '#f7e8c7', radius: 34, width: phaseVisible(3) ? 4 : 2 });
    drawArrow(138, 180, 275, 218, best.pattern[1]);
    drawArrow(138, 280, 275, 242, best.pattern[2]);
    drawArrow(344, 230, 470, 230, best.corr);
    if (phaseVisible(3)) {
      ctx.fillStyle = '#356859';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillText('frozen incoming weights', 222, 310);
      ctx.strokeStyle = '#356859';
      ctx.strokeRect(260, 195, 100, 72);
    }
  } else {
    ctx.fillStyle = '#6f6a60';
    ctx.font = '15px system-ui, sans-serif';
    ctx.fillText('No hidden units installed yet', 225, 235);
  }
}
function drawResidualPanel() {
  ctx.fillStyle = '#fffdf8';
  ctx.strokeStyle = '#ded6c8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(640, 70, 275, 300, 20);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillText('Residual error', 670, 110);
  const labels = ['00', '01', '10', '11'];
  residualPattern.forEach((value, i) => {
    const x = 675 + i * 54;
    const zero = 245;
    const height = value * Number(difficulty.value) * 175;
    ctx.fillStyle = colorFor(value);
    ctx.fillRect(x, zero - Math.max(height, 0), 30, Math.abs(height));
    ctx.fillStyle = '#6f6a60';
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText(labels[i], x + 4, 276);
  });
  ctx.strokeStyle = '#cfc4b1';
  ctx.beginPath();
  ctx.moveTo(660, 245);
  ctx.lineTo(890, 245);
  ctx.stroke();
}
function drawCandidates(items, best) {
  ctx.fillStyle = '#fffdf8';
  ctx.strokeStyle = '#ded6c8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(42, 410, 873, 170, 20);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillText('Candidate audition pool', 70, 450);
  items.forEach((item, index) => {
    const x = 120 + index * 260;
    const active = phaseVisible(1);
    drawNode(x, 510, `c${item.id}`, { fill: item.id === best.id && phaseVisible(2) ? '#f7e8c7' : '#f0ebe1', stroke: active ? colorFor(item.corr) : '#cfc4b1' });
    ctx.fillStyle = active ? colorFor(item.corr) : '#6f6a60';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText(active ? `r = ${fmt(item.corr)}` : 'waiting', x + 45, 516);
    if (item.id === best.id && phaseVisible(2)) {
      ctx.fillStyle = '#356859';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillText('installed', x - 26, 565);
    }
  });
}
function renderTable(items, best) {
  rows.innerHTML = items.map(item => {
    const auditioned = phaseVisible(1);
    const selected = phaseVisible(2) && item.id === best.id;
    const decision = !auditioned ? 'not auditioned yet' : selected ? 'install this unit' : 'keep as loser';
    return `<tr>
      <td>candidate ${item.id}</td>
      <td>[${item.pattern.map(fmt).join(', ')}]</td>
      <td class="${selected ? 'best' : ''}">${auditioned ? fmt(item.corr) : '—'}</td>
      <td class="${selected ? 'best' : 'pending'}">${decision}</td>
    </tr>`;
  }).join('');
}
function renderPhases() {
  phaseList.innerHTML = phases.map((phase, index) => {
    const cls = index === state.phase ? 'active' : index < state.phase ? 'done' : '';
    return `<li class="${cls}">${phase.title}</li>`;
  }).join('');
}
function render() {
  const items = candidates();
  const best = winner(items);
  difficultyValue.textContent = Number(difficulty.value).toFixed(2);
  phaseNumber.textContent = `${state.phase + 1} / ${phases.length}`;
  phaseSummary.textContent = phases[state.phase].short;
  phaseTitle.textContent = phases[state.phase].title;
  phaseCopy.textContent = phases[state.phase].copy;
  renderPhases();
  renderTable(items, best);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fffaf1';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawNetwork(best);
  drawResidualPanel();
  drawCandidates(items, best);
}

document.querySelector('#previous-step').addEventListener('click', () => {
  state.phase = (state.phase + phases.length - 1) % phases.length;
  render();
});
document.querySelector('#next-step').addEventListener('click', () => {
  state.phase = (state.phase + 1) % phases.length;
  render();
});
difficulty.addEventListener('input', render);
render();
