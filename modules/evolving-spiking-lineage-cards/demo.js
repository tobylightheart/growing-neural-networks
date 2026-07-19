const claimAxes = [
  {
    id: 'parameter-calculation',
    label: 'Parameter calculation',
    description: 'Thesis vocabulary for setting useful initial parameters when a new component is constructed.',
    statuses: {
      lightheart: 'direct vocabulary support from the public thesis-taxonomy review.',
      schliebs: 'lineage context only; do not infer variant-specific parameter formulas from the survey card.',
      wysoski: 'application context only; the audiovisual review draft does not verify exact parameter rules.',
      kasabov: 'pending detail review; exact deSNN/dynamic parameter calculations need full-text or human checking.',
      wang: 'pending detail review; keyword metadata is not enough to teach exact adaptive-structure parameters.',
      roy: 'not yet verified; keep structural-plasticity parameter or threshold rules pending.'
    }
  },
  {
    id: 'local-performance-trigger',
    label: 'Local performance trigger',
    description: 'Thesis vocabulary for growth or pruning decisions driven by component-level performance rather than only global error.',
    statuses: {
      lightheart: 'direct vocabulary support from the public thesis-taxonomy review.',
      schliebs: 'lineage context only; survey-level eSNN vocabulary is safe, exact trigger mechanics are not.',
      wysoski: 'application context only; no reviewed local-trigger claim should be made from the current draft.',
      kasabov: 'pending detail review; creation/adaptation triggers remain unverified.',
      wang: 'pending detail review; supervised adaptive-structure trigger details remain unverified.',
      roy: 'pending detail review; structural-update triggers remain unverified.'
    }
  },
  {
    id: 'pruning-and-merging',
    label: 'Pruning and merging',
    description: 'Thesis vocabulary for capacity-control operations that remove or combine components after growth.',
    statuses: {
      lightheart: 'direct vocabulary support from the public thesis-taxonomy review.',
      schliebs: 'context only; use the survey as lineage framing, not as verified pruning instructions.',
      wysoski: 'not yet verified for this card; keep audiovisual mechanism details pending.',
      kasabov: 'pending detail review; dynamic-synapse or adaptation details should stay guarded.',
      wang: 'context only from title/keywords; exact neuronal pruning criteria remain unverified.',
      roy: 'bridge context only; exact deletion/rewiring rules remain pending full-text or human review.'
    }
  }
];

const cards = [
  {
    id: 'lightheart',
    paperId: 'lightheart-2018-constructive-spiking-thesis',
    title: 'Lightheart 2018',
    role: 'Thesis taxonomy bridge',
    roleSummary: 'Connects eSNN cards to construction, pruning, merging, and parameter-calculation vocabulary.',
    year: 2018,
    x: 150,
    y: 390,
    color: '#4f6f9f',
    safe: 'Safe claim: use as the public thesis-taxonomy bridge for spike-timing-dependent construction, parameter calculation, local performance triggers, and pruning/merging vocabulary.',
    caution: 'Do not let thesis-derived vocabulary replace source-specific full-text claims about later eSNN variants or structural-plasticity algorithms.'
  },
  {
    id: 'schliebs',
    paperId: 'schliebs-2013-evolving-spiking-survey',
    title: 'Schliebs & Kasabov 2013',
    role: 'Survey anchor',
    roleSummary: 'Grounds vocabulary and lineage before details.',
    year: 2013,
    x: 160,
    y: 210,
    color: '#6d5bd0',
    safe: 'Safe claim: use as the active bundle survey anchor for eSNN vocabulary, ECoS context, extensions, applications, and open-problem framing.',
    caution: 'Do not treat a survey card as a verified step-by-step growth rule for any later method.'
  },
  {
    id: 'wysoski',
    paperId: 'wysoski-2010-evolving-spiking-audiovisual',
    title: 'Wysoski et al. 2010',
    role: 'Application anchor',
    roleSummary: 'Shows the lineage in an audiovisual processing setting.',
    year: 2010,
    x: 390,
    y: 360,
    color: '#356859',
    safe: 'Safe claim: cite as a reviewed eSNN-family audiovisual information-processing application anchor.',
    caution: 'Keep exact construction/adaptation mechanics pending because the automated draft verified metadata, not full algorithm text.'
  },
  {
    id: 'kasabov',
    paperId: 'kasabov-2013-dynamic-evolving-spiking',
    title: 'Kasabov et al. 2013',
    role: 'Dynamic method placeholder',
    roleSummary: 'Names the dynamic eSNN/deSNN detail-review slot.',
    year: 2013,
    x: 620,
    y: 220,
    color: '#8b5e34',
    safe: 'Safe claim: identify it as the dynamic evolving-spiking/deSNN detail anchor for online spatio- and spectro-temporal pattern recognition.',
    caution: 'Do not assert creation triggers, dynamic-synapse details, or adaptation steps until full-text or human review verifies them.'
  },
  {
    id: 'wang',
    paperId: 'wang-2014-adaptive-structure-snn',
    title: 'Wang et al. 2014',
    role: 'Adaptive-structure placeholder',
    roleSummary: 'Names supervised adaptive-structure work without overclaiming.',
    year: 2014,
    x: 850,
    y: 350,
    color: '#b85c38',
    safe: 'Safe claim: use as the supervised adaptive-structure spiking-network placeholder in the active eSNN lineage.',
    caution: 'Keep neuronal creation, pruning, and adaptation triggers marked pending despite keyword metadata mentioning pruning and online learning.'
  },
  {
    id: 'roy',
    paperId: 'roy-2017-online-structural-plasticity-snn',
    title: 'Roy & Basu 2017',
    role: 'Structural-plasticity bridge',
    roleSummary: 'Links the active eSNN bundle to structural-plasticity follow-up work.',
    year: 2017,
    x: 620,
    y: 430,
    color: '#8d4f7d',
    safe: 'Safe claim: use as the shared online unsupervised structural-plasticity bridge between the active eSNN bundle and the structural-plasticity bundle.',
    caution: 'Do not assert exact creation, deletion, rewiring, thresholding, or adaptation rules until full-text or human review verifies them.'
  }
];

const state = { selected: cards[0].id, selectedAxis: claimAxes[0].id };
const canvas = document.querySelector('#lineage-canvas');
const ctx = canvas.getContext('2d');
const roleName = document.querySelector('#role-name');
const roleSummary = document.querySelector('#role-summary');
const paperButtons = document.querySelector('#paper-buttons');
const paperTitle = document.querySelector('#paper-title');
const paperSummary = document.querySelector('#paper-summary');
const reviewLink = document.querySelector('#review-link');
const readinessGrid = document.querySelector('#readiness-grid');
const axisButtons = document.querySelector('#axis-buttons');
const axisNote = document.querySelector('#axis-note');

function activeCard() {
  return cards.find(card => card.id === state.selected) || cards[0];
}
function activeAxis() {
  return claimAxes.find(axis => axis.id === state.selectedAxis) || claimAxes[0];
}
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
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
function drawArrow(from, to) {
  ctx.save();
  ctx.strokeStyle = '#cdbf9e';
  ctx.fillStyle = '#cdbf9e';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(from.x + 82, from.y + 48);
  ctx.bezierCurveTo(from.x + 150, from.y + 18, to.x - 110, to.y - 20, to.x - 82, to.y + 48);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(to.x - 82, to.y + 48, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
function drawCard(card) {
  const selected = card.id === state.selected;
  ctx.save();
  ctx.shadowColor = selected ? 'rgba(35, 33, 29, 0.22)' : 'rgba(35, 33, 29, 0.08)';
  ctx.shadowBlur = selected ? 18 : 8;
  ctx.shadowOffsetY = 6;
  roundRect(card.x - 95, card.y - 55, 190, 118, 18);
  ctx.fillStyle = selected ? '#fff8e7' : '#fffdf8';
  ctx.strokeStyle = selected ? card.color : '#ded6c8';
  ctx.lineWidth = selected ? 5 : 2;
  ctx.fill();
  ctx.stroke();
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = card.color;
  ctx.font = 'bold 14px system-ui, sans-serif';
  ctx.fillText(card.role.toUpperCase(), card.x - 75, card.y - 24);
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 20px system-ui, sans-serif';
  wrapText(card.title, card.x - 75, card.y + 8, 150, 22);
  ctx.fillStyle = '#6b6356';
  ctx.font = '14px system-ui, sans-serif';
  ctx.fillText(String(card.year), card.x - 75, card.y + 46);
  ctx.restore();
}
function drawCanvas() {
  const selected = activeCard();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fffaf1';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 30px system-ui, sans-serif';
  ctx.fillText('Cautious eSNN/STDC lineage bridge', 52, 62);
  ctx.fillStyle = '#5f5a51';
  ctx.font = '16px system-ui, sans-serif';
  ctx.fillText('Connect the cards, but keep exact growth-rule claims behind the review guardrail.', 54, 92);

  drawArrow(cards[0], cards[1]);
  drawArrow(cards[1], cards[2]);
  drawArrow(cards[1], cards[3]);
  drawArrow(cards[3], cards[4]);
  drawArrow(cards[4], cards[5]);
  cards.forEach(drawCard);

  ctx.save();
  roundRect(82, 500, 876, 92, 20);
  ctx.fillStyle = '#f6ead2';
  ctx.strokeStyle = selected.color;
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
  const axis = activeAxis();
  ctx.fillStyle = selected.color;
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText(`${selected.role}: ${axis.label}`, 110, 532);
  ctx.fillStyle = '#3f3a32';
  ctx.font = '15px system-ui, sans-serif';
  wrapText(axis.statuses[selected.id], 110, 560, 805, 21);
  ctx.restore();
}
function renderButtons() {
  paperButtons.innerHTML = cards.map(card => `
    <button type="button" class="paper-button" data-card="${card.id}" role="tab" aria-selected="${card.id === state.selected}">
      <span>${card.title}</span><small>${card.role}</small>
    </button>`).join('');
  paperButtons.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      state.selected = button.dataset.card;
      render();
    });
  });
}
function renderAxes() {
  axisButtons.innerHTML = claimAxes.map(axis => `
    <button type="button" class="axis-button" data-axis="${axis.id}" role="tab" aria-selected="${axis.id === state.selectedAxis}">
      ${axis.label}
    </button>`).join('');
  axisButtons.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      state.selectedAxis = button.dataset.axis;
      render();
    });
  });
}
function renderReadiness() {
  readinessGrid.innerHTML = cards.map(card => `
    <article class="readiness-card">
      <h3>${card.title}</h3>
      <p><strong>Ready:</strong> ${card.safe}</p>
      <p><strong>Pending:</strong> ${card.caution}</p>
    </article>`).join('');
}
function render() {
  const card = activeCard();
  const axis = activeAxis();
  roleName.textContent = card.role;
  roleSummary.textContent = card.roleSummary;
  paperTitle.textContent = card.title;
  paperSummary.textContent = card.safe;
  reviewLink.href = `../../pages/review.html?id=${card.paperId}`;
  axisNote.innerHTML = `<strong>${axis.label}:</strong> ${axis.description}<br><strong>${card.title} status:</strong> ${axis.statuses[card.id]}`;
  [...paperButtons.querySelectorAll('button')].forEach(button => {
    button.classList.toggle('active', button.dataset.card === state.selected);
    button.setAttribute('aria-selected', String(button.dataset.card === state.selected));
  });
  [...axisButtons.querySelectorAll('button')].forEach(button => {
    button.classList.toggle('active', button.dataset.axis === state.selectedAxis);
    button.setAttribute('aria-selected', String(button.dataset.axis === state.selectedAxis));
  });
  drawCanvas();
}
function init() {
  renderButtons();
  renderAxes();
  renderReadiness();
  render();
}
init();
