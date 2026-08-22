function evaluateSignals(values) {
  const dncGrow = values.dnc.windowReady && values.dnc.normalizedDrop < values.dnc.threshold;
  const cascorGrow = values.cascor.outputStalled && values.cascor.residualRemains && values.cascor.bestCorrelation > 0;
  const ranGrow = values.ran.distance > values.ran.epsilon && values.ran.error > values.ran.delta;
  return { dnc: dncGrow, cascor: cascorGrow, ran: ranGrow };
}

if (typeof module !== 'undefined') module.exports = { evaluateSignals };

if (typeof document !== 'undefined') {
  const inputs = {
    dncDrop: document.querySelector('#dnc-drop'),
    cascorScore: document.querySelector('#cascor-score'),
    cascorStalled: document.querySelector('#cascor-stalled'),
    ranDistance: document.querySelector('#ran-distance'),
    ranError: document.querySelector('#ran-error')
  };

  function renderDecision(id, grow, yes, no) {
    const element = document.querySelector(`#${id}-decision`);
    element.className = `decision ${grow ? 'grow' : 'adapt'}`;
    element.innerHTML = `<strong>${grow ? 'Add capacity' : 'Keep adapting'}</strong><span>${grow ? yes : no}</span>`;
  }

  function update() {
    const values = {
      dnc: { normalizedDrop: Number(inputs.dncDrop.value), threshold: 0.05, windowReady: true },
      cascor: { outputStalled: inputs.cascorStalled.checked, residualRemains: true, bestCorrelation: Number(inputs.cascorScore.value) },
      ran: { distance: Number(inputs.ranDistance.value), epsilon: 0.5, error: Number(inputs.ranError.value), delta: 0.2 }
    };
    const decisions = evaluateSignals(values);

    document.querySelector('#dnc-drop-value').textContent = values.dnc.normalizedDrop.toFixed(3);
    document.querySelector('#cascor-score-value').textContent = values.cascor.bestCorrelation.toFixed(2);
    document.querySelector('#ran-distance-value').textContent = values.ran.distance.toFixed(2);
    document.querySelector('#ran-error-value').textContent = values.ran.error.toFixed(2);

    renderDecision('dnc', decisions.dnc,
      'The current topology has made too little normalized progress over a complete history window.',
      'Progress is still large enough; ordinary backpropagation continues on the current topology.');
    renderDecision('cascor', decisions.cascor,
      'The fit has stalled; install the best residual-correlated candidate and freeze its incoming weights.',
      inputs.cascorStalled.checked ? 'No useful candidate is available yet.' : 'Output training has not reached its stopping criterion.');
    renderDecision('ran', decisions.ran,
      'The sample passes both novelty gates; allocate a local unit at this input.',
      'At least one novelty gate fails; update existing centers, output weights, and offset instead.');

    const names = Object.entries(decisions).filter(([, grow]) => grow).map(([name]) => ({ dnc: 'DNC', cascor: 'CasCor', ran: 'RAN' }[name]));
    document.querySelector('#summary-line').textContent = names.length
      ? `${names.join(', ')} ${names.length === 1 ? 'adds' : 'add'} capacity under the current probes. The same observations do not carry the same meaning across methods.`
      : 'None adds capacity under the current probes; each continues its own form of parameter adaptation.';
  }

  Object.values(inputs).forEach(input => input.addEventListener('input', update));
  update();
}
