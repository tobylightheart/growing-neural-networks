const lenses = {
  when: {
    label: 'When?',
    summary: 'Performance or event signals that trigger structural change.',
    caption: 'Determine when or if the network structure should change.',
    color: '#8b5e34'
  },
  what: {
    label: 'What?',
    summary: 'The structural operation: construct, prune, merge, or transfer.',
    caption: 'Select which components are affected by the structural operation.',
    color: '#356859'
  },
  how: {
    label: 'How?',
    summary: 'Parameter calculation for new or merged components.',
    caption: 'Choose useful weights, thresholds, fields, or other parameters.',
    color: '#6d5bd0'
  }
};

const algorithms = [
  {
    id: 'dynamic-node-creation',
    name: 'Dynamic Node Creation',
    family: 'classic constructive learning',
    signal: 'global',
    copy: 'Adds hidden nodes during backpropagation training when current capacity appears insufficient.',
    when: 'Training behaviour / capacity insufficiency indicates that hidden-unit growth is needed.',
    what: 'Add hidden neurons to the existing feed-forward network.',
    how: 'Initialize or train new hidden-unit parameters through the backpropagation workflow.',
    highlight: { when: 0.82, what: 0.55, how: 0.38 }
  },
  {
    id: 'cascade-correlation',
    name: 'Cascade-Correlation',
    family: 'classic constructive learning',
    signal: 'global',
    copy: 'Auditions candidate units against residual error, installs the strongest candidate, then freezes its incoming weights.',
    when: 'Residual error remains after output-layer training; candidate correlation supplies a growth criterion.',
    what: 'Install a new hidden feature connected to existing inputs/features and the output layer.',
    how: 'Train candidate incoming weights before installation; then freeze those incoming weights.',
    highlight: { when: 0.76, what: 0.74, how: 0.86 }
  },
  {
    id: 'growing-neural-gas',
    name: 'Growing Neural Gas',
    family: 'growing / topology learning',
    signal: 'local',
    copy: 'Uses local accumulated error to insert units into a topology-learning network.',
    when: 'Local component error accumulates and periodically triggers insertion.',
    what: 'Insert neurons and connections in regions with high local error.',
    how: 'Place new parameters using nearby high-error components and graph-neighbour information.',
    highlight: { when: 0.55, what: 0.86, how: 0.62 }
  },
  {
    id: 'evolving-spiking',
    name: 'Evolving Spiking Neural Network',
    family: 'spiking constructive learning',
    signal: 'local',
    copy: 'Calculates candidate neuron parameters from samples and adds or merges depending on similarity/novelty.',
    when: 'Candidate parameters are assessed for novelty or similarity to existing neurons.',
    what: 'Add a new spiking neuron or merge with a similar existing neuron.',
    how: 'Calculate neuron parameters directly from input/spike-related sample information.',
    highlight: { when: 0.52, what: 0.78, how: 0.9 }
  },
  {
    id: 'stdc',
    name: 'Spike-Timing-Dependent Construction',
    family: 'thesis taxonomy branch',
    signal: 'timing',
    copy: 'A constructive algorithm is STDC when spike times are inputs to, or control flow in, construction/pruning/parameter processes.',
    when: 'Spike events or spike-time relationships can trigger structural modification.',
    what: 'Construct, prune, merge, or transfer neurons/synapses in a spiking network or simulation.',
    how: 'Use spike timing, STDP estimates, proxy events, or temporal traces to choose parameters.',
    highlight: { when: 0.88, what: 0.72, how: 0.94 }
  },
  {
    id: 'simulation-expansion',
    name: 'Simulation Expansion',
    family: 'thesis simulation frame',
    signal: 'timing',
    copy: 'Interprets construction as moving hypothetical neurons/synapses into the simulated set and pruning as moving them out.',
    when: 'Simulation activity suggests that an unsimulated component should become represented, or vice versa.',
    what: 'Transfer neurons or synapses between surrounding, simulated, and memory sets.',
    how: 'Estimate parameters from observed activity, biological constraints, or proxy-neuron simulation.',
    highlight: { when: 0.65, what: 0.96, how: 0.78 }
  }
];

const state = { lens: 'when', algorithm: algorithms[0].id };
function describeMechanism(algorithmId, lensId) {
  const algorithm = algorithms.find(item => item.id === algorithmId);
  const lens = lenses[lensId];
  if (!algorithm || !lens) return null;
  return { algorithm: algorithm.name, lens: lens.label, description: algorithm[lensId] };
}
if (typeof module !== 'undefined') module.exports = { describeMechanism };

if (typeof document !== 'undefined') {
const canvas = document.querySelector('#taxonomy-canvas');
const ctx = canvas.getContext('2d');
const lensName = document.querySelector('#lens-name');
const lensSummary = document.querySelector('#lens-summary');
const algorithmSelect = document.querySelector('#algorithm-select');
const algorithmTitle = document.querySelector('#algorithm-title');
const algorithmCopy = document.querySelector('#algorithm-copy');
const comparisonRows = document.querySelector('#comparison-rows');
const tabs = [...document.querySelectorAll('.lens-tab')];

function activeAlgorithm() {
  return algorithms.find(item => item.id === state.algorithm) || algorithms[0];
}
function signalColor(signal) {
  if (signal === 'local') return '#356859';
  if (signal === 'timing') return '#6d5bd0';
  return '#8b5e34';
}
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}
function drawBox(x, y, w, h, title, body, options = {}) {
  ctx.save();
  roundRect(x, y, w, h, 18);
  ctx.fillStyle = options.fill || '#fffdf8';
  ctx.strokeStyle = options.stroke || '#ded6c8';
  ctx.lineWidth = options.width || 2;
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = options.titleColor || '#23211d';
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.fillText(title, x + 20, y + 40);
  ctx.fillStyle = '#5f5a51';
  ctx.font = '15px system-ui, sans-serif';
  wrapText(body, x + 20, y + 70, w - 40, 22);
  ctx.restore();
}
function wrapText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(/\s+/);
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y);
}
function drawArrow(x1, y1, x2, y2, color, strength = 1) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.35 + strength * 0.55;
  ctx.lineWidth = 2 + strength * 4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.bezierCurveTo((x1 + x2) / 2, y1, (x1 + x2) / 2, y2, x2, y2);
  ctx.stroke();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 14 * Math.cos(angle - 0.45), y2 - 14 * Math.sin(angle - 0.45));
  ctx.lineTo(x2 - 14 * Math.cos(angle + 0.45), y2 - 14 * Math.sin(angle + 0.45));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
function drawGauge(x, y, label, value, color, active) {
  ctx.save();
  ctx.fillStyle = '#f8f0e3';
  roundRect(x, y, 180, 58, 14);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.globalAlpha = active ? 0.95 : 0.35;
  roundRect(x, y, 180 * value, 58, 14);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = active ? 'white' : '#23211d';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.fillText(label, x + 14, y + 34);
  ctx.restore();
}
function drawCanvas() {
  const alg = activeAlgorithm();
  const lens = lenses[state.lens];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fffaf1';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 29px system-ui, sans-serif';
  ctx.fillText(alg.name, 52, 58);
  ctx.fillStyle = signalColor(alg.signal);
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.fillText(alg.family.toUpperCase(), 54, 86);

  const boxes = {
    when: { x: 60, y: 150, w: 280, h: 170, title: '1. When?', body: alg.when },
    what: { x: 380, y: 150, w: 280, h: 170, title: '2. What?', body: alg.what },
    how: { x: 700, y: 150, w: 280, h: 170, title: '3. How?', body: alg.how }
  };
  for (const [key, box] of Object.entries(boxes)) {
    const active = key === state.lens;
    drawBox(box.x, box.y, box.w, box.h, box.title, box.body, {
      fill: active ? '#f7e8c7' : '#fffdf8',
      stroke: active ? lens.color : '#ded6c8',
      width: active ? 5 : 2,
      titleColor: active ? lens.color : '#23211d'
    });
  }
  drawArrow(340, 235, 380, 235, '#8b5e34', state.lens === 'when' ? 1 : 0.55);
  drawArrow(660, 235, 700, 235, '#356859', state.lens === 'what' ? 1 : 0.55);

  drawBox(95, 390, 850, 132, lens.label + ' lens', lens.caption, {
    fill: '#fffdf8', stroke: lens.color, width: 3, titleColor: lens.color
  });
  drawGauge(140, 550, 'when signal', alg.highlight.when, lenses.when.color, state.lens === 'when');
  drawGauge(430, 550, 'what operation', alg.highlight.what, lenses.what.color, state.lens === 'what');
  drawGauge(720, 550, 'how parameters', alg.highlight.how, lenses.how.color, state.lens === 'how');
}
function renderControls() {
  const alg = activeAlgorithm();
  const lens = lenses[state.lens];
  lensName.textContent = lens.label;
  lensSummary.textContent = lens.summary;
  algorithmTitle.textContent = alg.name;
  algorithmCopy.textContent = alg.copy;
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.lens === state.lens));
  drawCanvas();
}
function renderComparison() {
  comparisonRows.innerHTML = algorithms.map(alg => `
    <tr>
      <td>${alg.name}</td>
      <td>${alg.when}</td>
      <td>${alg.what}</td>
      <td>${alg.how}</td>
    </tr>`).join('');
}
function init() {
  algorithmSelect.innerHTML = algorithms.map(alg => `<option value="${alg.id}">${alg.name}</option>`).join('');
  algorithmSelect.addEventListener('change', event => { state.algorithm = event.target.value; renderControls(); });
  tabs.forEach(tab => tab.addEventListener('click', () => { state.lens = tab.dataset.lens; renderControls(); }));
  renderComparison();
  renderControls();
}
init();
}
