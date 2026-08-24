const LABELS = { freeze: 'Freeze established feature', fine_tune: 'Fine-tune all features', prune: 'Prune after fine-tuning' };

function policySummary(name, policy) {
  const result = policy.result;
  const detail = name === 'prune'
    ? `Removed node ${policy.removed_node}; proxy ${policy.proxy_values.join(' vs ')}`
    : `Established feature changed: ${policy.established_feature_changed ? 'yes' : 'no'}`;
  return { name, label: LABELS[name], width: result.width, error: result.average_squared_error, detail, rule: policy.rule };
}

function render(trace) {
  const summaries = Object.entries(trace.policies).map(([name, policy]) => policySummary(name, policy));
  document.getElementById('policy-cards').innerHTML = summaries.map(item => `
    <article class="card ${item.name}">
      <p class="tag">${item.label}</p>
      <strong class="metric">width ${item.width}</strong>
      <strong class="metric">average error ${item.error.toFixed(6)}</strong>
      <p>${item.rule}</p><small>${item.detail}</small>
    </article>`).join('');
  const logs = summaries.map(item => -Math.log10(item.error));
  const max = Math.max(...logs);
  document.getElementById('bars').innerHTML = summaries.map((item, index) => `
    <div class="bar-row"><span>${item.label}</span><div class="track"><i class="${item.name}" style="width:${(logs[index] / max) * 100}%"></i></div><strong>${item.error.toFixed(6)}</strong></div>`).join('');
  document.getElementById('interpretation').innerHTML = trace.interpretation.map(line => `<li>${line}</li>`).join('');
}

if (typeof module !== 'undefined' && module.exports) module.exports = { policySummary };
if (typeof window !== 'undefined') fetch('trace.json').then(response => response.json()).then(render).catch(error => {
  document.getElementById('policy-cards').textContent = `Could not load trace: ${error.message}`;
});
