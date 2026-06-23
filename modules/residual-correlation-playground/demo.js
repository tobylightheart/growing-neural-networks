
const data = [
  { x: [0, 0], target: 0, output: 0.38 },
  { x: [0, 1], target: 1, output: 0.48 },
  { x: [1, 0], target: 1, output: 0.53 },
  { x: [1, 1], target: 0, output: 0.42 }
].map(row => ({ ...row, residual: row.target - row.output }));

const sliders = {
  w1: document.querySelector('#w1'),
  w2: document.querySelector('#w2'),
  bias: document.querySelector('#bias')
};
const outputs = {
  w1: document.querySelector('#w1-value'),
  w2: document.querySelector('#w2-value'),
  bias: document.querySelector('#bias-value')
};
const rows = document.querySelector('#rows');
const canvas = document.querySelector('#playground');
const ctx = canvas.getContext('2d');
const absCorrelation = document.querySelector('#abs-correlation');
const winnerNote = document.querySelector('#winner-note');

function tanh(z) { return Math.tanh(z); }
function mean(values) { return values.reduce((a, b) => a + b, 0) / values.length; }
function correlation(a, b) {
  const ma = mean(a), mb = mean(b);
  let numerator = 0, da = 0, db = 0;
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
function params() {
  return {
    w1: Number(sliders.w1.value),
    w2: Number(sliders.w2.value),
    bias: Number(sliders.bias.value)
  };
}
function activations({ w1, w2, bias }) {
  return data.map(row => tanh(w1 * row.x[0] + w2 * row.x[1] + bias));
}
function fmt(n) { return n.toFixed(3); }
function colorFor(value) {
  return value >= 0 ? '#356859' : '#9a4d2f';
}
function drawAxes(x, y, w, h, title) {
  ctx.strokeStyle = '#ded6c8';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = '#6f6a60';
  ctx.font = '15px system-ui, sans-serif';
  ctx.fillText(title, x, y - 12);
  ctx.strokeStyle = '#cfc4b1';
  ctx.beginPath();
  ctx.moveTo(x, y + h / 2);
  ctx.lineTo(x + w, y + h / 2);
  ctx.stroke();
}
function barChart(x, y, w, h, residuals, acts) {
  drawAxes(x, y, w, h, 'Residuals vs candidate activations');
  const group = w / data.length;
  data.forEach((row, i) => {
    const baseX = x + i * group + group * 0.2;
    const zero = y + h / 2;
    const rh = residuals[i] * h * 0.8;
    const ah = acts[i] * h * 0.35;
    ctx.fillStyle = colorFor(residuals[i]);
    ctx.fillRect(baseX, zero - Math.max(rh, 0), group * 0.22, Math.abs(rh));
    ctx.fillStyle = colorFor(acts[i]);
    ctx.globalAlpha = 0.55;
    ctx.fillRect(baseX + group * 0.28, zero - Math.max(ah, 0), group * 0.22, Math.abs(ah));
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#23211d';
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText(`[${row.x.join(',')}]`, baseX - 2, y + h + 20);
  });
  ctx.fillStyle = '#356859'; ctx.fillRect(x + w - 190, y + 12, 14, 14); ctx.fillText('residual', x + w - 170, y + 24);
  ctx.globalAlpha = 0.55; ctx.fillStyle = '#356859'; ctx.fillRect(x + w - 95, y + 12, 14, 14); ctx.globalAlpha = 1; ctx.fillStyle = '#23211d'; ctx.fillText('candidate', x + w - 75, y + 24);
}
function scatter(x, y, w, h, residuals, acts, corr) {
  drawAxes(x, y, w, h, 'Correlation scatter');
  ctx.strokeStyle = '#cfc4b1';
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h);
  ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2);
  ctx.stroke();
  data.forEach((row, i) => {
    const px = x + w / 2 + acts[i] * w * 0.42;
    const py = y + h / 2 - residuals[i] * h * 0.85;
    ctx.fillStyle = colorFor(residuals[i] * acts[i]);
    ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#23211d'; ctx.font = '12px system-ui, sans-serif'; ctx.fillText(row.x.join(''), px + 12, py + 4);
  });
  ctx.fillStyle = '#23211d';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText(`r = ${fmt(corr)}  |r| = ${fmt(Math.abs(corr))}`, x + 16, y + h - 18);
}
function drawUnit(x, y, p, acts, corr) {
  ctx.fillStyle = '#fffdf8';
  ctx.strokeStyle = '#ded6c8';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(x, y, 300, 180, 18); ctx.fill(); ctx.stroke();
  const nodes = [[x + 54, y + 52, 'x₁'], [x + 54, y + 128, 'x₂'], [x + 178, y + 90, 'tanh'], [x + 262, y + 90, 'r']];
  ctx.strokeStyle = '#356859';
  ctx.lineWidth = 2;
  [[0,2,p.w1], [1,2,p.w2], [2,3,corr]].forEach(([a,b,weight]) => {
    const A = nodes[a], B = nodes[b];
    ctx.globalAlpha = Math.min(1, 0.25 + Math.abs(weight) / 5);
    ctx.strokeStyle = weight >= 0 ? '#356859' : '#9a4d2f';
    ctx.beginPath(); ctx.moveTo(A[0] + 18, A[1]); ctx.lineTo(B[0] - 18, B[1]); ctx.stroke();
  });
  ctx.globalAlpha = 1;
  nodes.forEach(([nx, ny, label]) => {
    ctx.fillStyle = label === 'tanh' ? '#e5efe9' : '#f0ebe1';
    ctx.strokeStyle = '#356859';
    ctx.beginPath(); ctx.arc(nx, ny, label === 'tanh' ? 28 : 21, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#23211d'; ctx.font = 'bold 14px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(label, nx, ny + 5); ctx.textAlign = 'left';
  });
  ctx.fillStyle = '#6f6a60'; ctx.font = '13px system-ui, sans-serif';
  ctx.fillText(`w₁=${p.w1.toFixed(2)}  w₂=${p.w2.toFixed(2)}  b=${p.bias.toFixed(2)}`, x + 22, y + 162);
}
function renderTable(acts) {
  rows.innerHTML = data.map((row, i) => `<tr>
    <td>${row.x[0]}</td><td>${row.x[1]}</td><td>${row.target}</td><td>${fmt(row.output)}</td>
    <td class="${row.residual < 0 ? 'negative' : 'good'}">${fmt(row.residual)}</td>
    <td class="${acts[i] < 0 ? 'negative' : 'good'}">${fmt(acts[i])}</td>
  </tr>`).join('');
}
function render() {
  const p = params();
  Object.keys(sliders).forEach(key => outputs[key].textContent = Number(sliders[key].value).toFixed(2));
  const acts = activations(p);
  const residuals = data.map(row => row.residual);
  const corr = correlation(acts, residuals);
  absCorrelation.textContent = Math.abs(corr).toFixed(3);
  winnerNote.textContent = Math.abs(corr) > 0.85 ? 'Strong candidate: this activation tracks the residual pattern.' : Math.abs(corr) > 0.5 ? 'Promising candidate, but not decisive.' : 'Weak candidate: try reshaping the activation pattern.';
  renderTable(acts);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fffaf1'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  barChart(52, 78, 510, 220, residuals, acts);
  scatter(620, 78, 245, 220, residuals, acts, corr);
  drawUnit(310, 370, p, acts, corr);
  ctx.fillStyle = '#23211d'; ctx.font = 'bold 22px system-ui, sans-serif'; ctx.fillText('Candidate feature audition', 52, 38);
  ctx.fillStyle = '#6f6a60'; ctx.font = '15px system-ui, sans-serif'; ctx.fillText('The candidate that best aligns with residual error is the one Cascade-Correlation wants to install.', 52, 60);
}
const presets = {
  'xor-ish': { w1: 3.6, w2: 3.6, bias: -1.8 },
  negative: { w1: -3.8, w2: -3.8, bias: 1.9 },
  flat: { w1: 0, w2: 0, bias: 0 },
  random: () => ({ w1: Math.random() * 12 - 6, w2: Math.random() * 12 - 6, bias: Math.random() * 12 - 6 })
};
document.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => {
  const preset = presets[button.dataset.preset];
  const values = typeof preset === 'function' ? preset() : preset;
  Object.entries(values).forEach(([key, value]) => sliders[key].value = value);
  render();
}));
Object.values(sliders).forEach(slider => slider.addEventListener('input', render));
render();
