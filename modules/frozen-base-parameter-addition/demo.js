// Frozen-base parameter addition: adapters, LoRA, and MoLE.
// Every formula here is quoted from the linked review drafts. Where a paper does
// not state a cost, this module reports `null` rather than inventing one.

const PLACEMENTS = {
  adapter: {
    id: 'adapter',
    label: 'Bottleneck adapter',
    site: 'new layers inside the block',
    detail: 'Two adapters per Transformer layer, after the attention output projection and after the feed-forward sub-layer.',
    frozen: ['pre-trained Transformer weights'],
    alsoTrained: ['adapter weights and biases', 'per-task layer-norm parameters', 'final classification layer'],
    removal: 'delete-module',
    removalDetail: 'Deleting the adapter restores the original block exactly; nothing in the pre-trained weights was touched.',
    inference: 'extra-sequential-layers'
  },
  lora: {
    id: 'lora',
    label: 'LoRA',
    site: 'low-rank delta on an existing matrix',
    detail: 'A rank-r product BA beside each adapted weight matrix; the paper adapts Wq and Wv and freezes the MLP modules.',
    frozen: ['pre-trained Transformer weights'],
    alsoTrained: ['the low-rank factors A and B'],
    removal: 'subtract-delta',
    removalDetail: 'Unmerged, the delta is dropped like a module. Merged into W, removal means subtracting BA — arithmetic on the weights, not deletion of a part.',
    inference: 'none-when-merged'
  },
  mole: {
    id: 'mole',
    label: 'Mixture of LoRA Experts',
    site: 'gate over modules that already exist',
    detail: 'Each layer of each trained LoRA is an expert; a learnable gate inside each layer weights their outputs.',
    frozen: ['pre-trained model weights', 'every trained LoRA'],
    alsoTrained: ['the gating function only'],
    removal: 'mask-and-renormalize',
    removalDetail: 'An unwanted LoRA is masked out at inference and the remaining gate weights are redistributed proportionally, without retraining.',
    inference: 'gate-plus-active-branches'
  }
};

function parameterSite(method) {
  const placement = PLACEMENTS[method];
  if (!placement) throw new Error(`unknown method: ${method}`);
  return placement.site;
}

// Houlsby et al.: "The total number of parameters added per layer, including
// biases, is 2md+d+m." `adaptersPerLayer` is 2 in the paper.
function adapterParameters({ d, m, adaptersPerLayer = 2, layers = 1 }) {
  return (2 * m * d + d + m) * adaptersPerLayer * layers;
}

// Hu et al.: h = W0x + BAx with B in R^{d x r} and A in R^{r x k}.
function loraParameters({ d, r, k = d, matricesPerLayer = 2, layers = 1 }) {
  return r * (d + k) * matricesPerLayer * layers;
}

// MoLE's gate is described as a learnable matrix over flattened concatenated
// expert outputs. The reviewed text does not state its parameter count, so this
// module refuses to report one.
function moleAddedParameters() {
  return null;
}

function compareMethods({ d, m, r, layers = 1 }) {
  return [
    { ...PLACEMENTS.adapter, addedParameters: adapterParameters({ d, m, layers }) },
    { ...PLACEMENTS.lora, addedParameters: loraParameters({ d, r, layers }) },
    { ...PLACEMENTS.mole, addedParameters: moleAddedParameters() }
  ];
}

// MoLE at inference: mask undesired LoRAs, then recalculate and distribute the
// remaining weights proportionally.
function gateWeights(logits, mask) {
  const active = logits.map((_, index) => (mask ? mask[index] !== false : true));
  const highest = Math.max(...logits.filter((_, index) => active[index]));
  const exponentials = logits.map((value, index) => (active[index] ? Math.exp(value - highest) : 0));
  const total = exponentials.reduce((sum, value) => sum + value, 0);
  return exponentials.map(value => (total > 0 ? value / total : 0));
}

function removalCost(method) {
  const placement = PLACEMENTS[method];
  if (!placement) throw new Error(`unknown method: ${method}`);
  return { kind: placement.removal, detail: placement.removalDetail };
}

function frozenComponents(method) {
  const placement = PLACEMENTS[method];
  if (!placement) throw new Error(`unknown method: ${method}`);
  return placement.frozen;
}

if (typeof module !== 'undefined') {
  module.exports = {
    PLACEMENTS,
    parameterSite,
    adapterParameters,
    loraParameters,
    moleAddedParameters,
    compareMethods,
    gateWeights,
    removalCost,
    frozenComponents
  };
}

if (typeof document !== 'undefined') {
  const inputs = {
    width: document.querySelector('#model-width'),
    bottleneck: document.querySelector('#adapter-bottleneck'),
    rank: document.querySelector('#lora-rank'),
    layers: document.querySelector('#layer-count')
  };
  const expertRows = Array.from(document.querySelectorAll('[data-expert]'));

  function formatCount(value) {
    return value === null ? 'not stated by the paper' : value.toLocaleString('en-US');
  }

  function updateCosts() {
    const d = Number(inputs.width.value);
    const m = Number(inputs.bottleneck.value);
    const r = Number(inputs.rank.value);
    const layers = Number(inputs.layers.value);

    document.querySelector('#model-width-value').textContent = d;
    document.querySelector('#adapter-bottleneck-value').textContent = m;
    document.querySelector('#lora-rank-value').textContent = r;
    document.querySelector('#layer-count-value').textContent = layers;

    const rows = compareMethods({ d, m, r, layers });
    rows.forEach(row => {
      const cell = document.querySelector(`#${row.id}-cost`);
      if (cell) cell.textContent = formatCount(row.addedParameters);
    });

    const adapter = rows[0].addedParameters;
    const lora = rows[1].addedParameters;
    const ratio = lora === 0 ? null : adapter / lora;
    document.querySelector('#cost-line').textContent = ratio === null
      ? 'Set a rank above zero to compare the two costs.'
      : `At d=${d}, m=${m}, r=${r} over ${layers} layer${layers === 1 ? '' : 's'}, adapters add ${formatCount(adapter)} parameters and LoRA adds ${formatCount(lora)} — a ratio of ${ratio.toFixed(2)}x. The counts move together with width; what does not move is where the parameters sit.`;
  }

  function updateGate() {
    const logits = expertRows.map(row => Number(row.querySelector('input[type="range"]').value));
    const mask = expertRows.map(row => row.querySelector('input[type="checkbox"]').checked);
    const weights = gateWeights(logits, mask);
    expertRows.forEach((row, index) => {
      row.querySelector('output').textContent = logits[index].toFixed(2);
      const bar = row.querySelector('.weight-bar span');
      bar.style.width = `${(weights[index] * 100).toFixed(1)}%`;
      row.querySelector('.weight-value').textContent = `${(weights[index] * 100).toFixed(1)}%`;
      row.classList.toggle('masked', !mask[index]);
    });
    const activeCount = mask.filter(Boolean).length;
    document.querySelector('#gate-line').textContent = activeCount === 0
      ? 'Every branch is masked, so the gate distributes nothing. MoLE assumes at least one expert stays active.'
      : `${activeCount} of ${mask.length} LoRA branches active. Masking does not retrain anything: the surviving weights are renormalized proportionally, and the base model and every LoRA stay frozen.`;
  }

  Object.values(inputs).forEach(input => input.addEventListener('input', updateCosts));
  expertRows.forEach(row => row.querySelectorAll('input').forEach(input => input.addEventListener('input', updateGate)));
  updateCosts();
  updateGate();
}
