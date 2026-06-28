const strategies = [
  {
    id: 'freeze-feature',
    label: 'Freeze the new feature once installed',
    short: 'feature weights',
    explanation: 'Previously installed hidden features become a stable scaffold while the output layer adapts.'
  },
  {
    id: 'continue-backprop',
    label: 'Keep adapting old and new weights with backpropagation',
    short: 'trainable weights',
    explanation: 'Growth changes capacity, but stabilization comes from continued gradient-based adjustment rather than hard freezing.'
  },
  {
    id: 'preserve-topology',
    label: 'Constrain growth so recurrent topology remains usable',
    short: 'topology',
    explanation: 'Recurrent variants must care about whether new connections disturb temporal dynamics and graph constraints.'
  },
  {
    id: 'low-disruption-expansion',
    label: 'Expand the simulated set with low disruption',
    short: 'simulation boundary',
    explanation: 'The thesis-derived framing asks which surrounding components can enter or leave simulation without implausible disruption.'
  }
];

const algorithms = [
  {
    id: 'cascade-correlation',
    name: 'Cascade-Correlation',
    paper: 'Fahlman & Lebiere (1990)',
    prompt: 'A candidate hidden unit is trained against residual error, installed, and then its incoming weights are fixed.',
    answer: 'freeze-feature',
    hint: 'Look for the family whose installed hidden units become frozen features.',
    protected: { 'feature weights': 3, 'trainable weights': 1, topology: 1, 'simulation boundary': 0 }
  },
  {
    id: 'dynamic-node-construction',
    name: 'Dynamic Node Construction',
    paper: 'Ash (1989)',
    prompt: 'New units can be added when performance stalls, while training continues to tune network parameters.',
    answer: 'continue-backprop',
    hint: 'This contrast case is about construction without Cascade-Correlation-style permanent feature freezing.',
    protected: { 'feature weights': 1, 'trainable weights': 3, topology: 0, 'simulation boundary': 0 }
  },
  {
    id: 'recurrent-cascade-correlation',
    name: 'Recurrent Cascade-Correlation',
    paper: 'Giles et al. limitations thread',
    prompt: 'Adding units to recurrent networks raises extra questions about temporal loops, permitted links, and stable dynamics.',
    answer: 'preserve-topology',
    hint: 'Ask what recurrent growth has to preserve that a feed-forward growth exercise can mostly ignore.',
    protected: { 'feature weights': 1, 'trainable weights': 1, topology: 3, 'simulation boundary': 0 }
  },
  {
    id: 'simulation-expansion-contraction',
    name: 'Simulation Expansion / Contraction',
    paper: 'Constructive spiking thesis integration',
    prompt: 'A model distinguishes components already simulated from surrounding components that could be carefully introduced or removed.',
    answer: 'low-disruption-expansion',
    hint: 'This one protects plausibility at the boundary between simulated and surrounding components.',
    protected: { 'feature weights': 0, 'trainable weights': 0, topology: 1, 'simulation boundary': 3 }
  }
];

const score = document.querySelector('#score');
const scoreNote = document.querySelector('#score-note');
const strategyList = document.querySelector('#strategy-list');
const cardHost = document.querySelector('#algorithm-cards');
const feedback = document.querySelector('#feedback');
const checkButton = document.querySelector('#check-answer');
const hintButton = document.querySelector('#show-hints');
const resetButton = document.querySelector('#reset-answer');
const canvas = document.querySelector('#stability-canvas');
const ctx = canvas.getContext('2d');

function renderStrategies() {
  strategyList.innerHTML = strategies.map(strategy => `<li><strong>${strategy.label}</strong><br><span>${strategy.explanation}</span></li>`).join('');
}

function optionMarkup(selected = '') {
  const options = ['<option value="">Choose a stabilization strategy…</option>'];
  strategies.forEach(strategy => {
    options.push(`<option value="${strategy.id}"${selected === strategy.id ? ' selected' : ''}>${strategy.label}</option>`);
  });
  return options.join('');
}

function renderCards() {
  cardHost.innerHTML = algorithms.map(algorithm => `<section class="algorithm-card" data-algorithm="${algorithm.id}">
    <div>
      <p class="paper-line">${algorithm.paper}</p>
      <h3>${algorithm.name}</h3>
      <p>${algorithm.prompt}</p>
      <p class="hint" hidden>${algorithm.hint}</p>
    </div>
    <label>Best match
      <select data-answer-for="${algorithm.id}">${optionMarkup()}</select>
    </label>
    <p class="result-line" aria-live="polite"></p>
  </section>`).join('');
}

function getSelection(algorithmId) {
  return document.querySelector(`[data-answer-for="${algorithmId}"]`).value;
}

function selectedStrategyLabel(strategyId) {
  const strategy = strategies.find(item => item.id === strategyId);
  return strategy ? strategy.label : 'No strategy selected';
}

function updateScore(showResults = false) {
  let correct = 0;
  algorithms.forEach(algorithm => {
    const card = document.querySelector(`[data-algorithm="${algorithm.id}"]`);
    const result = card.querySelector('.result-line');
    const selected = getSelection(algorithm.id);
    const isCorrect = selected === algorithm.answer;
    if (isCorrect) correct += 1;
    card.classList.toggle('correct', showResults && isCorrect);
    card.classList.toggle('incorrect', showResults && selected && !isCorrect);
    if (!showResults) {
      result.textContent = '';
    } else if (!selected) {
      result.textContent = 'Choose a strategy before checking this card.';
    } else if (isCorrect) {
      result.textContent = `Correct: ${selectedStrategyLabel(selected)}.`;
    } else {
      result.textContent = `Not quite: you chose “${selectedStrategyLabel(selected)}”. Try comparing what this algorithm freezes, tunes, constrains, or introduces.`;
    }
  });
  score.textContent = `${correct} / ${algorithms.length}`;
  scoreNote.textContent = correct === algorithms.length ? 'All matched. Now compare the chart.' : 'Use each strategy once, then check again.';
  return correct;
}

function checkAnswers() {
  const correct = updateScore(true);
  feedback.className = `feedback ${correct === algorithms.length ? 'correct' : 'incorrect'}`;
  feedback.innerHTML = correct === algorithms.length
    ? '<strong>Good comparison.</strong> The common word “growth” hides different stabilization decisions: frozen features, continued tuning, recurrent topology constraints, and low-disruption simulation expansion.'
    : '<strong>Keep comparing.</strong> For each card, ask: after the growth event, what is deliberately protected from disruptive change?';
}

function showHints() {
  document.querySelectorAll('.hint').forEach(hint => { hint.hidden = false; });
  feedback.className = 'feedback';
  feedback.textContent = 'Hints are visible on each card. They point to the protected quantity, not to a value judgment about the algorithm.';
}

function resetAnswers() {
  document.querySelectorAll('select[data-answer-for]').forEach(select => { select.value = ''; });
  document.querySelectorAll('.hint').forEach(hint => { hint.hidden = true; });
  feedback.className = 'feedback';
  feedback.textContent = '';
  updateScore(false);
}

function colorForScore(value) {
  if (value >= 3) return '#356859';
  if (value === 2) return '#789e89';
  if (value === 1) return '#d9b36f';
  return '#efe8dc';
}

function drawMatrix() {
  const columns = strategies.map(strategy => strategy.short);
  const left = 250;
  const top = 96;
  const cellW = 174;
  const cellH = 74;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fffaf1';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 25px system-ui, sans-serif';
  ctx.fillText('What is most protected after growth?', 44, 42);
  ctx.fillStyle = '#6f6a60';
  ctx.font = '15px system-ui, sans-serif';
  ctx.fillText('Qualitative guide: 3 = primary stabilization target, 0 = not the main target in this exercise.', 44, 66);

  ctx.font = 'bold 14px system-ui, sans-serif';
  columns.forEach((column, index) => {
    ctx.fillStyle = '#23211d';
    ctx.fillText(column, left + index * cellW + 14, top - 18);
  });

  algorithms.forEach((algorithm, rowIndex) => {
    const y = top + rowIndex * cellH;
    ctx.fillStyle = '#23211d';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.fillText(algorithm.name, 44, y + 36);
    columns.forEach((column, columnIndex) => {
      const value = algorithm.protected[column];
      const x = left + columnIndex * cellW;
      ctx.fillStyle = colorForScore(value);
      ctx.fillRect(x, y, cellW - 12, cellH - 12);
      ctx.strokeStyle = '#ded6c8';
      ctx.strokeRect(x, y, cellW - 12, cellH - 12);
      ctx.fillStyle = value >= 2 ? '#fffdf8' : '#23211d';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.fillText(String(value), x + 72, y + 40);
    });
  });

  ctx.fillStyle = '#6f6a60';
  ctx.font = '14px system-ui, sans-serif';
  ctx.fillText('Treat this as a study prompt: verify precise mechanisms in the linked reviews before making strong claims.', 44, 456);
}

renderStrategies();
renderCards();
drawMatrix();
updateScore(false);
checkButton.addEventListener('click', checkAnswers);
hintButton.addEventListener('click', showHints);
resetButton.addEventListener('click', resetAnswers);
document.querySelectorAll('select[data-answer-for]').forEach(select => select.addEventListener('change', () => updateScore(false)));
