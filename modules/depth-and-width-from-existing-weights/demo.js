// Depth and width from existing weights: Net2Net, G_stack, and progressive nets.
// Every claim asserted here is quoted in the linked review drafts. Where a paper
// gives no guarantee, this module returns `false` rather than implying one.

function relu(value) { return Math.max(0, value); }

function forward(net, inputs) {
  let activations = inputs;
  net.layers.forEach(layer => {
    activations = layer.map(unit => relu(unit.w.reduce((sum, weight, index) => sum + weight * activations[index], unit.b)));
  });
  return net.out.w.reduce((sum, weight, index) => sum + weight * activations[index], net.out.b);
}

// Net2WiderNet: replicate units under a random mapping g, then divide each
// replicated unit's outgoing weight by its replication count so every unit
// "has the exactly the same value as the unit in the original net".
function net2Wider(net, mapping, { normalize = true, noise = 0 } = {}) {
  const lastIndex = net.layers.length - 1;
  const source = net.layers[lastIndex];
  const counts = mapping.reduce((tally, from) => {
    tally[from] = (tally[from] || 0) + 1;
    return tally;
  }, {});
  const seen = {};
  const widened = mapping.map(from => {
    seen[from] = (seen[from] || 0) + 1;
    const isCopy = seen[from] > 1;
    const unit = source[from];
    // "add a small amount of noise to all but the first copy of each column"
    const perturbation = isCopy ? noise : 0;
    return { w: unit.w.map(weight => weight + perturbation), b: unit.b };
  });
  const outgoing = mapping.map(from => (normalize ? net.out.w[from] / counts[from] : net.out.w[from]));
  return {
    layers: [...net.layers.slice(0, lastIndex), widened],
    out: { w: outgoing, b: net.out.b }
  };
}

// Net2DeeperNet: insert a layer initialized to the identity. Applicable only
// when phi(I phi(v)) = phi(v); true for the rectified linear activation, and
// the paper states it is not possible for the logistic sigmoid.
const DEEPENABLE_ACTIVATIONS = { relu: true, maxout: 'identity-like-with-replicated-columns', sigmoid: false, tanh: false };

function activationSupportsDeepening(activation) {
  return DEEPENABLE_ACTIVATIONS[activation] === true;
}

function net2Deeper(net) {
  const width = net.layers[net.layers.length - 1].length;
  const identity = Array.from({ length: width }, (_, row) => ({
    w: Array.from({ length: width }, (_, column) => (row === column ? 1 : 0)),
    b: 0
  }));
  return { layers: [...net.layers, identity], out: net.out };
}

// G_stack: M composed with itself g times, where M is a small base model
// trained on d tokens. Duplication is not function-preserving; the grown model
// is then trained further.
function stackDepth({ baseLayers, growthFactor }) {
  return baseLayers * growthFactor;
}

const RECOMMENDED_GROWTH_FACTOR = { min: 2, max: 4, used: 4 };

function growthFactorAdvised(g) {
  return g >= RECOMMENDED_GROWTH_FACTOR.min && g <= RECOMMENDED_GROWTH_FACTOR.max;
}

// Progressive networks: one column per task, previous columns frozen, lateral
// connections from every earlier column into the new one.
function lateralBlocks(columns) {
  return (columns * (columns - 1)) / 2;
}

const EXPANSIONS = {
  'net2net': {
    id: 'net2net',
    label: 'Net2Net',
    paper: 'chen-2016-net2net',
    reuse: 'the trained weights become the new, larger network',
    functionPreserving: true,
    preservedOn: 'the same task, exactly at the moment of expansion',
    frozen: [],
    afterGrowth: 'ordinary training continues on every parameter, old and new'
  },
  'g-stack': {
    id: 'g-stack',
    label: 'G_stack depthwise stacking',
    paper: 'du-2024-stacking-your-transformers',
    reuse: 'the small model is duplicated g times to initialize a deeper one',
    functionPreserving: false,
    preservedOn: null,
    frozen: [],
    afterGrowth: 'the grown model is pre-trained further; the point is a cheaper start, not an unchanged function'
  },
  'progressive': {
    id: 'progressive',
    label: 'Progressive neural network',
    paper: 'rusu-2016-progressive-neural-networks',
    reuse: 'earlier columns are read through lateral connections, never rewritten',
    functionPreserving: true,
    preservedOn: 'every earlier task, permanently, because its column is frozen',
    frozen: ['all parameters of every earlier column'],
    afterGrowth: 'only the new column and its lateral connections train'
  }
};

function expansionProfile(method) {
  const profile = EXPANSIONS[method];
  if (!profile) throw new Error(`unknown expansion: ${method}`);
  return profile;
}

function compareExpansions() {
  return Object.values(EXPANSIONS);
}

if (typeof module !== 'undefined') {
  module.exports = {
    forward,
    net2Wider,
    net2Deeper,
    activationSupportsDeepening,
    DEEPENABLE_ACTIVATIONS,
    stackDepth,
    growthFactorAdvised,
    RECOMMENDED_GROWTH_FACTOR,
    lateralBlocks,
    expansionProfile,
    compareExpansions,
    EXPANSIONS
  };
}

if (typeof document !== 'undefined') {
  const baseNet = {
    layers: [[
      { w: [1, -2], b: 0.5 },
      { w: [0.5, 1], b: -0.25 }
    ]],
    out: { w: [1.5, -0.5], b: 0.1 }
  };
  const mapping = [0, 1, 0];

  const widenInputs = {
    x1: document.querySelector('#input-x1'),
    x2: document.querySelector('#input-x2'),
    noise: document.querySelector('#copy-noise'),
    normalize: document.querySelector('#normalize-outgoing')
  };

  function updateWiden() {
    const x = [Number(widenInputs.x1.value), Number(widenInputs.x2.value)];
    const noise = Number(widenInputs.noise.value);
    const normalize = widenInputs.normalize.checked;
    const widened = net2Wider(baseNet, mapping, { normalize, noise });
    const before = forward(baseNet, x);
    const after = forward(widened, x);
    const drift = after - before;

    document.querySelector('#input-x1-value').textContent = x[0].toFixed(2);
    document.querySelector('#input-x2-value').textContent = x[1].toFixed(2);
    document.querySelector('#copy-noise-value').textContent = noise.toFixed(3);
    document.querySelector('#base-output').textContent = before.toFixed(6);
    document.querySelector('#wide-output').textContent = after.toFixed(6);

    const verdict = document.querySelector('#widen-verdict');
    const exact = Math.abs(drift) < 1e-12;
    verdict.className = `verdict ${exact ? 'preserved' : 'changed'}`;
    verdict.innerHTML = exact
      ? '<strong>Function preserved</strong><span>The replicated unit\'s outgoing weight was divided by its replication count, so the wider net computes exactly what the narrow one did.</span>'
      : `<strong>Function changed by ${drift.toFixed(6)}</strong><span>${normalize ? 'Noise on the copied column makes the student only approximately the teacher — the paper adds it deliberately, so the copies can diverge and use the new capacity.' : 'Without dividing by the replication count, the duplicated unit is counted twice and the output moves.'}</span>`;
  }

  const stackInputs = {
    baseLayers: document.querySelector('#base-layers'),
    growthFactor: document.querySelector('#growth-factor')
  };

  function updateStack() {
    const baseLayers = Number(stackInputs.baseLayers.value);
    const growthFactor = Number(stackInputs.growthFactor.value);
    document.querySelector('#base-layers-value').textContent = baseLayers;
    document.querySelector('#growth-factor-value').textContent = growthFactor;
    document.querySelector('#stack-depth').textContent = stackDepth({ baseLayers, growthFactor });
    document.querySelector('#stack-advice').textContent = growthFactorAdvised(growthFactor)
      ? `g = ${growthFactor} sits inside the paper's reported optimal range of 2 to 4; their runs fix g = 4.`
      : `g = ${growthFactor} sits outside the paper's reported optimal range of 2 to 4.`;
  }

  const columnInput = document.querySelector('#task-columns');

  function updateColumns() {
    const columns = Number(columnInput.value);
    document.querySelector('#task-columns-value').textContent = columns;
    document.querySelector('#lateral-blocks').textContent = lateralBlocks(columns);
    document.querySelector('#column-line').textContent = columns === 1
      ? 'One column is just a network. The structure only starts costing anything once a second task arrives.'
      : `Column ${columns} reads every one of the ${columns - 1} frozen columns before it. The paper names this growth in parameters with the number of tasks as the approach's downside.`;
  }

  Object.values(widenInputs).forEach(input => input.addEventListener('input', updateWiden));
  Object.values(stackInputs).forEach(input => input.addEventListener('input', updateStack));
  columnInput.addEventListener('input', updateColumns);
  updateWiden();
  updateStack();
  updateColumns();
}
