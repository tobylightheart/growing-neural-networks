const tauPlus = 20;
const tauMinus = 24;
const aPlus = 1.0;
const aMinus = 0.82;

const scenarios = [
  {
    id: 'predictive-pattern',
    label: 'Predictive pattern',
    times: [-18, -11, -4, 17],
    note: 'Several afferents fire before the postsynaptic spike, matching the hidden-pattern intuition behind synaptic selectivity.'
  },
  {
    id: 'late-distractor',
    label: 'Late distractor',
    times: [7, 14, 23, 31],
    note: 'Inputs that arrive after the postsynaptic spike are not good predictors in this simplified pair rule.'
  },
  {
    id: 'mixed-window',
    label: 'Mixed window',
    times: [-32, -8, 6, 28],
    note: 'A mixed trace can strengthen some inputs while weakening others, which is why selectivity is not the same as unbounded growth.'
  }
];

const sources = [
  {
    title: 'Masquelier, Guyonneau & Thorpe 2008',
    path: '../../pages/review.html?id=masquelier-2008-repeating-patterns-stdp',
    note: 'Grounds the hidden repeating-pattern setting and the cautious claim that a neuron can become selective for early predictive afferents.'
  },
  {
    title: 'Masquelier, Guyonneau & Thorpe 2009',
    path: '../../pages/review.html?id=masquelier-2009-competitive-stdp-spike-pattern-learning',
    note: 'Adds a fixed-pool competition story: multiple STDP neurons can differentiate without claiming structural neuron growth.'
  },
  {
    title: 'Song, Miller & Abbott 2000',
    path: '../../pages/review.html?id=song-2000-competitive-hebbian-stdp',
    note: 'Grounds competitive timing-based synaptic strengthening and weakening as background for selectivity.'
  },
  {
    title: 'Legenstein, Naeger & Maass 2005',
    path: '../../pages/review.html?id=legenstein-2005-neuron-learn-stdp',
    note: 'Contributes learnability limits: a local STDP learner is useful but not magic.'
  },
  {
    title: 'Caporale & Dan 2008',
    path: '../../pages/review.html?id=caporale-2008-stdp-hebbian-learning-rule',
    note: 'Warns that a clean timing curve is a simplification of richer biological STDP contexts.'
  },
  {
    title: 'Morrison, Diesmann & Gerstner 2008',
    path: '../../pages/review.html?id=morrison-2008-phenomenological-synaptic-plasticity',
    note: 'Grounds the model-choice caveat: simulation STDP rules can depend on traces, bounds, and implementation details beyond the toy pair window.'
  },
  {
    title: 'Lightheart 2018 thesis synthesis',
    path: '../../pages/review.html?id=lightheart-2018-constructive-spiking-thesis',
    note: 'Provides the constructive-spiking bridge: timing can help parameter calculation for constructed components, but growth triggers remain separate.'
  }
];

const claimChecks = [
  {
    label: 'Supported by current reviews',
    verdict: 'Timing can increase synaptic selectivity for predictive afferents.',
    detail: 'Masquelier2008, Song2000, and the follow-up competitive STDP review give enough public grounding for a selectivity exercise, especially when the score is framed as a toy teaching signal.',
    tone: 'supported'
  },
  {
    label: 'Use as a caveat',
    verdict: 'A pair-based curve is only one simplified STDP sketch.',
    detail: 'Caporale2008 and Morrison2008 are included to remind readers that biological and simulation STDP rules may use traces, bounds, state variables, and model-specific choices.',
    tone: 'caution'
  },
  {
    label: 'Not yet supported by this artifact',
    verdict: 'Do not claim that the timing window itself adds neurons or synapses.',
    detail: 'The constructive-spiking thesis bridge allows timing-dependent parameter calculation, but structural growth still needs a separate trigger, recruitment step, or reviewed adaptive-structure method.',
    tone: 'blocked'
  }
];

const state = {
  times: [...scenarios[0].times]
};

const scenarioRow = document.querySelector('#scenario-row');
const sliderHost = document.querySelector('#slider-host');
const scoreEl = document.querySelector('#selectivity-score');
const noteEl = document.querySelector('#selectivity-note');
const canvas = document.querySelector('#stdp-canvas');
const ctx = canvas.getContext('2d');
const feedback = document.querySelector('#feedback');
const interpretation = document.querySelector('#interpretation');
const sourceHost = document.querySelector('#source-links');
const claimHost = document.querySelector('#claim-cards');

function stdp(deltaT) {
  if (deltaT < 0) return aPlus * Math.exp(deltaT / tauPlus);
  if (deltaT > 0) return -aMinus * Math.exp(-deltaT / tauMinus);
  return 0;
}

function totalSelectivity() {
  return state.times.reduce((sum, time) => sum + stdp(time), 0);
}

function formatSigned(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}`;
}

function renderScenarios() {
  scenarioRow.innerHTML = scenarios.map((scenario, index) => `<button class="scenario-button${index === 0 ? ' active' : ''}" data-scenario="${scenario.id}">${scenario.label}</button>`).join('');
  scenarioRow.querySelectorAll('button[data-scenario]').forEach(button => {
    button.addEventListener('click', () => {
      const scenario = scenarios.find(item => item.id === button.dataset.scenario);
      state.times = [...scenario.times];
      scenarioRow.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button));
      feedback.className = 'feedback';
      feedback.textContent = scenario.note;
      interpretation.value = '';
      renderSliders();
      update();
    });
  });
}

function renderSliders() {
  sliderHost.innerHTML = state.times.map((time, index) => `<label class="time-slider">Input ${index + 1}
    <input type="range" min="-40" max="40" step="1" value="${time}" data-time-index="${index}">
    <span id="time-label-${index}">${time} ms · ${formatSigned(stdp(time))}</span>
  </label>`).join('');
  sliderHost.querySelectorAll('input[data-time-index]').forEach(input => {
    input.addEventListener('input', () => {
      const index = Number(input.dataset.timeIndex);
      state.times[index] = Number(input.value);
      document.querySelector(`#time-label-${index}`).textContent = `${state.times[index]} ms · ${formatSigned(stdp(state.times[index]))}`;
      scenarioRow.querySelectorAll('button').forEach(button => button.classList.remove('active'));
      feedback.className = 'feedback';
      feedback.textContent = '';
      update();
    });
  });
}

function renderSources() {
  sourceHost.innerHTML = sources.map(source => `<article class="source-card">
    <h3>${source.title}</h3>
    <p>${source.note}</p>
    <a href="${source.path}">Open review</a>
  </article>`).join('');
}

function renderClaimChecks() {
  claimHost.innerHTML = claimChecks.map(claim => `<article class="claim-card ${claim.tone}">
    <span>${claim.label}</span>
    <h3>${claim.verdict}</h3>
    <p>${claim.detail}</p>
  </article>`).join('');
}

function toCanvasX(deltaT) {
  return 90 + ((deltaT + 40) / 80) * 420;
}

function toCanvasY(value) {
  return 215 - value * 140;
}

function drawAxes() {
  ctx.strokeStyle = '#71695f';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(90, 215);
  ctx.lineTo(510, 215);
  ctx.moveTo(300, 70);
  ctx.lineTo(300, 360);
  ctx.stroke();

  ctx.fillStyle = '#2b2925';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText('Simplified pair update', 90, 42);
  ctx.font = '13px system-ui, sans-serif';
  ctx.fillText('pre before post → potentiation', 100, 385);
  ctx.fillText('pre after post → depression', 320, 385);
  ctx.fillText('Δt (ms)', 455, 238);
  ctx.fillText('Δw', 310, 85);
}

function drawCurve() {
  ctx.strokeStyle = '#356859';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let t = -40; t <= 40; t += 1) {
    const x = toCanvasX(t);
    const y = toCanvasY(stdp(t));
    if (t === -40) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawSpikes() {
  state.times.forEach((time, index) => {
    const x = toCanvasX(time);
    const updateValue = stdp(time);
    ctx.fillStyle = updateValue >= 0 ? '#356859' : '#a55b4b';
    ctx.beginPath();
    ctx.arc(x, toCanvasY(updateValue), 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2b2925';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`input ${index + 1}`, x - 20, 430 + index * 24);
    ctx.fillStyle = updateValue >= 0 ? '#356859' : '#a55b4b';
    ctx.fillText(`${time} ms → ${formatSigned(updateValue)}`, x - 20, 446 + index * 24);
  });

  ctx.strokeStyle = '#2b2925';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(650, 116);
  ctx.lineTo(650, 306);
  ctx.stroke();
  ctx.fillStyle = '#2b2925';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.fillText('post spike', 620, 96);
}

function drawSummary() {
  const total = totalSelectivity();
  const conclusion = total > 0.8
    ? 'Strong selectivity pressure for early predictors.'
    : total > 0
      ? 'Mild net strengthening; inspect which inputs drive it.'
      : 'Net weakening or noise; not a good constructive signal by itself.';

  ctx.fillStyle = '#fffaf1';
  ctx.fillRect(560, 330, 310, 160);
  ctx.strokeStyle = '#ded6c8';
  ctx.strokeRect(560, 330, 310, 160);
  ctx.fillStyle = '#2b2925';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText('Interpretation guardrail', 585, 365);
  ctx.font = '14px system-ui, sans-serif';
  wrapText(conclusion, 585, 396, 255, 21);
  wrapText('Treat this score as synaptic selectivity evidence, not as proof that the network added structure.', 585, 444, 255, 21);
}

function wrapText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  words.forEach((word, index) => {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && index > 0) {
      ctx.fillText(line, x, y);
      line = `${word} `;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, x, y);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fffdf8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawAxes();
  drawCurve();
  drawSpikes();
  drawSummary();
}

function update() {
  const total = totalSelectivity();
  scoreEl.textContent = formatSigned(total);
  noteEl.textContent = total > 0 ? 'Net potentiation under this simplified curve.' : 'Net depression or no positive selectivity signal.';
  draw();
}

function checkInterpretation() {
  if (interpretation.value === 'selectivity') {
    feedback.className = 'feedback correct';
    feedback.innerHTML = '<strong>Correct.</strong> The safest bundle-backed claim is that timing can grow synaptic selectivity for predictive inputs. A constructive algorithm must still specify how a component is added or recruited.';
  } else if (!interpretation.value) {
    feedback.className = 'feedback';
    feedback.textContent = 'Choose an interpretation before checking.';
  } else {
    feedback.className = 'feedback incorrect';
    feedback.innerHTML = '<strong>Not quite.</strong> The active STDP reviews support timing-based synaptic selectivity, while Caporale2008, Morrison2008, and Legenstein2005 add caveats. Do not turn the toy timing curve into a structural-growth proof or a complete biological/simulation model.';
  }
}

function reset() {
  state.times = [...scenarios[0].times];
  interpretation.value = '';
  feedback.className = 'feedback';
  feedback.textContent = '';
  renderSliders();
  scenarioRow.querySelectorAll('button').forEach(button => button.classList.toggle('active', button.dataset.scenario === scenarios[0].id));
  update();
}

renderScenarios();
renderSliders();
renderSources();
renderClaimChecks();
update();
document.querySelector('#check-answer').addEventListener('click', checkInterpretation);
document.querySelector('#reset-answer').addEventListener('click', reset);
