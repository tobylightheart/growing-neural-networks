const initialComponents = [
  { id: 'A', set: 'simulated', activity: 0.72, connections: 0.62, x: 470, y: 235 },
  { id: 'B', set: 'simulated', activity: 0.48, connections: 0.42, x: 590, y: 310 },
  { id: 'C', set: 'simulated', activity: 0.28, connections: 0.35, x: 500, y: 390 },
  { id: 'D', set: 'surrounding', activity: 0.12, connections: 0.18, x: 215, y: 150 },
  { id: 'E', set: 'surrounding', activity: 0.18, connections: 0.32, x: 760, y: 135 },
  { id: 'F', set: 'surrounding', activity: 0.55, connections: 0.78, x: 810, y: 475 },
  { id: 'G', set: 'surrounding', activity: 0.08, connections: 0.12, x: 205, y: 470 }
];

let components = structuredClone(initialComponents);
let selectedId = 'D';

const canvas = document.querySelector('#sets-canvas');
const ctx = canvas.getContext('2d');
const candidateSelect = document.querySelector('#candidate');
const toleranceSlider = document.querySelector('#tolerance');
const toleranceValue = document.querySelector('#tolerance-value');
const ledger = document.querySelector('#ledger');
const plausibilityLabel = document.querySelector('#plausibility-label');
const plausibilityDetail = document.querySelector('#plausibility-detail');
const applyButton = document.querySelector('#apply-operation');
const resetButton = document.querySelector('#reset-demo');

function operation() {
  return document.querySelector('input[name="operation"]:checked').value;
}

function disruption(component) {
  return component.activity * component.connections;
}

function reading(component, tolerance = Number(toleranceSlider.value)) {
  const score = disruption(component);
  if (score <= tolerance * 0.45) return { label: 'Low disruption', css: 'good', note: 'quiet, sparse transfer candidate' };
  if (score <= tolerance) return { label: 'Borderline', css: 'warn', note: 'plausibility depends on model sensitivity' };
  return { label: 'High disruption', css: 'bad', note: 'likely to cause an implausible activity shift' };
}

function fmt(value) {
  return value.toFixed(2);
}

function eligibleComponents() {
  const op = operation();
  return components.filter(component => op === 'expand' ? component.set === 'surrounding' : component.set === 'simulated');
}

function syncSelect() {
  const eligible = eligibleComponents();
  if (!eligible.some(component => component.id === selectedId)) {
    selectedId = eligible[0]?.id ?? components[0].id;
  }
  candidateSelect.innerHTML = eligible.map(component => `<option value="${component.id}">${component.id}: ${component.set}</option>`).join('');
  candidateSelect.value = selectedId;
}

function drawSet(cx, cy, rx, ry, title, subtitle, color) {
  ctx.save();
  ctx.fillStyle = color.fill;
  ctx.strokeStyle = color.stroke;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = color.text;
  ctx.font = 'bold 24px system-ui, sans-serif';
  ctx.fillText(title, cx - rx + 34, cy - ry + 46);
  ctx.font = '15px system-ui, sans-serif';
  ctx.fillText(subtitle, cx - rx + 34, cy - ry + 72);
  ctx.restore();
}

function drawConnections(simulated) {
  ctx.save();
  ctx.lineWidth = 1.5;
  for (let i = 0; i < simulated.length; i++) {
    for (let j = i + 1; j < simulated.length; j++) {
      const a = simulated[i];
      const b = simulated[j];
      const strength = (a.connections + b.connections) / 2;
      ctx.globalAlpha = 0.18 + strength * 0.42;
      ctx.strokeStyle = '#356859';
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawComponent(component) {
  const isSelected = component.id === selectedId;
  const r = 18 + component.activity * 18;
  const read = reading(component);
  ctx.save();
  ctx.fillStyle = read.css === 'good' ? '#dbece3' : read.css === 'warn' ? '#f3dfb5' : '#f1c7b8';
  ctx.strokeStyle = isSelected ? '#23211d' : read.css === 'bad' ? '#9a4d2f' : '#356859';
  ctx.lineWidth = isSelected ? 4 : 2;
  ctx.beginPath();
  ctx.arc(component.x, component.y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(component.id, component.x, component.y + 6);
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillText(fmt(disruption(component)), component.x, component.y + r + 18);
  ctx.restore();
}

function drawTransferHint(selected) {
  const op = operation();
  const target = op === 'expand' ? { x: 520, y: 310 } : { x: selected.x < 490 ? 205 : 790, y: selected.y < 310 ? 130 : 490 };
  ctx.save();
  ctx.strokeStyle = '#9a4d2f';
  ctx.fillStyle = '#9a4d2f';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(selected.x, selected.y);
  ctx.lineTo(target.x, target.y);
  ctx.stroke();
  ctx.setLineDash([]);
  const angle = Math.atan2(target.y - selected.y, target.x - selected.x);
  ctx.translate(target.x, target.y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-14, -7);
  ctx.lineTo(-14, 7);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function renderCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fffaf1';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSet(490, 310, 250, 205, 'Nsim / Ssim', 'components participating in ANN operation', {
    fill: 'rgba(53, 104, 89, 0.12)', stroke: '#356859', text: '#23211d'
  });
  drawSet(490, 310, 440, 275, 'Nsur / Ssur', 'surrounding or hypothetical components', {
    fill: 'rgba(154, 77, 47, 0.05)', stroke: '#c9b59e', text: '#6f6a60'
  });

  const simulated = components.filter(component => component.set === 'simulated');
  drawConnections(simulated);
  const selected = components.find(component => component.id === selectedId);
  if (selected) drawTransferHint(selected);
  components.forEach(drawComponent);

  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.fillText('Transfer, do not magically create', 48, 44);
  ctx.fillStyle = '#6f6a60';
  ctx.font = '15px system-ui, sans-serif';
  ctx.fillText('Construction can implement expansion when memory creation makes a surrounding component simulated.', 48, 68);
}

function renderLedger() {
  ledger.innerHTML = components.map(component => {
    const read = reading(component);
    return `<tr class="${component.id === selectedId ? 'selected-row' : ''}">
      <td>${component.id}</td>
      <td>${component.set}</td>
      <td>${fmt(component.activity)}</td>
      <td>${fmt(component.connections)}</td>
      <td>${fmt(disruption(component))}</td>
      <td class="${read.css}">${read.label}</td>
    </tr>`;
  }).join('');
}

function renderSummary() {
  const selected = components.find(component => component.id === selectedId);
  const read = reading(selected);
  toleranceValue.textContent = fmt(Number(toleranceSlider.value));
  plausibilityLabel.textContent = read.label;
  plausibilityDetail.textContent = `${selected.id}: ${read.note}; estimated disruption ${fmt(disruption(selected))}.`;
}

function render() {
  syncSelect();
  renderSummary();
  renderCanvas();
  renderLedger();
}

function placeAfterTransfer(component, nextSet) {
  if (nextSet === 'simulated') {
    const simulated = components.filter(item => item.set === 'simulated' && item.id !== component.id).length;
    const positions = [[430, 290], [560, 260], [560, 380], [440, 390], [505, 325]];
    [component.x, component.y] = positions[simulated % positions.length];
  } else {
    const left = component.id.charCodeAt(0) % 2 === 0;
    component.x = left ? 195 + Math.random() * 80 : 740 + Math.random() * 100;
    component.y = 130 + Math.random() * 360;
  }
}

applyButton.addEventListener('click', () => {
  const selected = components.find(component => component.id === selectedId);
  const nextSet = operation() === 'expand' ? 'simulated' : 'surrounding';
  selected.set = nextSet;
  placeAfterTransfer(selected, nextSet);
  const nextEligible = eligibleComponents().find(component => component.id !== selected.id);
  if (nextEligible) selectedId = nextEligible.id;
  render();
});

resetButton.addEventListener('click', () => {
  components = structuredClone(initialComponents);
  selectedId = operation() === 'expand' ? 'D' : 'A';
  render();
});

candidateSelect.addEventListener('change', () => {
  selectedId = candidateSelect.value;
  render();
});

toleranceSlider.addEventListener('input', render);
document.querySelectorAll('input[name="operation"]').forEach(input => input.addEventListener('change', () => {
  const eligible = eligibleComponents();
  selectedId = eligible[0]?.id ?? selectedId;
  render();
}));

canvas.addEventListener('click', event => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  const hit = components.find(component => Math.hypot(component.x - x, component.y - y) <= 34);
  if (hit && eligibleComponents().some(component => component.id === hit.id)) {
    selectedId = hit.id;
    render();
  }
});

render();
