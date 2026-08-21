const DATASET = [
  [[0, 0], 0], [[0, 1], 1], [[1, 0], 1], [[1, 1], 0]
];
const ROUND_DIGITS = 12;

class Lcg {
  constructor(seed = 1989) { this.state = seed >>> 0; }
  uniform(low, high) {
    this.state = (Math.imul(1664525, this.state) + 1013904223) >>> 0;
    return low + (high - low) * (this.state / 2 ** 32);
  }
}

function sigmoid(value) {
  if (value >= 0) {
    const z = Math.exp(-value);
    return 1 / (1 + z);
  }
  const z = Math.exp(value);
  return z / (1 + z);
}

function rounded(value) {
  const result = Number(Number(value).toFixed(ROUND_DIGITS));
  return Object.is(result, -0) ? 0 : result;
}

class Network {
  constructor(width, seed = 1989) {
    this.rng = new Lcg(seed);
    this.hiddenWeights = [];
    this.outputWeights = [];
    this.hiddenVelocity = [];
    this.outputVelocity = [];
    for (let index = 0; index < width; index += 1) this.addHiddenNode();
  }

  addHiddenNode() {
    const incoming = Array.from({ length: 3 }, () => this.rng.uniform(-0.1666, 0.1666));
    const outgoing = this.rng.uniform(-0.1666, 0.1666);
    this.hiddenWeights.push(incoming);
    this.hiddenVelocity.push([0, 0, 0]);
    if (!this.outputWeights.length) {
      this.outputWeights = [outgoing, this.rng.uniform(-0.1666, 0.1666)];
      this.outputVelocity = [0, 0];
    } else {
      this.outputWeights.splice(-1, 0, outgoing);
      this.outputVelocity.splice(-1, 0, 0);
    }
    return { incoming: incoming.map(rounded), outgoing: rounded(outgoing) };
  }

  predict(inputs) {
    const augmented = [...inputs, 1];
    const hidden = this.hiddenWeights.map(weights => sigmoid(
      weights.reduce((sum, weight, index) => sum + weight * augmented[index], 0)
    ));
    const outputSum = hidden.reduce((sum, value, index) => sum + value * this.outputWeights[index], this.outputWeights.at(-1));
    return { hidden, output: sigmoid(outputSum) };
  }

  trainSweep(learningRate, momentum) {
    for (const [inputs, target] of DATASET) {
      const { hidden, output } = this.predict(inputs);
      const outputDelta = (target - output) * output * (1 - output);
      const hiddenDeltas = hidden.map((value, index) => (
        value * (1 - value) * this.outputWeights[index] * outputDelta
      ));
      const outputInputs = [...hidden, 1];
      outputInputs.forEach((value, index) => {
        const change = learningRate * outputDelta * value + momentum * this.outputVelocity[index];
        this.outputWeights[index] += change;
        this.outputVelocity[index] = change;
      });
      const augmented = [...inputs, 1];
      hiddenDeltas.forEach((delta, node) => {
        augmented.forEach((value, index) => {
          const change = learningRate * delta * value + momentum * this.hiddenVelocity[node][index];
          this.hiddenWeights[node][index] += change;
          this.hiddenVelocity[node][index] = change;
        });
      });
    }
  }

  errors() {
    const outputs = DATASET.map(([inputs]) => this.predict(inputs).output);
    const squared = outputs.map((output, index) => (DATASET[index][1] - output) ** 2);
    return {
      average: squared.reduce((sum, value) => sum + value, 0) / squared.length,
      maximum: Math.max(...squared),
      outputs
    };
  }
}

function serializeParameters(network) {
  return {
    hidden: network.hiddenWeights.map(row => row.map(rounded)),
    output: network.outputWeights.map(rounded)
  };
}

function runDnc(options = {}) {
  const {
    window = 250, triggerThreshold = 0.002, maxTrials = 12000,
    learningRate = 0.5, momentum = 0.9, averageCutoff = 0.002,
    maximumCutoff = 0.01, maxInsertions = 1, seed = 1989
  } = options;
  if (window < 1 || triggerThreshold < 0) throw new Error('window must be positive and trigger threshold non-negative');
  const network = new Network(1, seed);
  const initialParameters = serializeParameters(network);
  let current = network.errors();
  const errors = [current.average];
  let topologyStartTrial = 0;
  let topologyStartError = current.average;
  let insertion = null;
  const curve = [{ trial: 0, average_squared_error: rounded(current.average), width: 1 }];
  let trial = 0;

  for (trial = 1; trial <= maxTrials; trial += 1) {
    network.trainSweep(learningRate, momentum);
    current = network.errors();
    errors.push(current.average);
    if (trial % 25 === 0) curve.push({ trial, average_squared_error: rounded(current.average), width: network.hiddenWeights.length });
    const learned = current.average <= averageCutoff && current.maximum <= maximumCutoff;
    const eligible = trial - window >= topologyStartTrial;
    const slope = eligible ? (errors[trial - window] - current.average) / topologyStartError : null;
    if (!learned && !insertion && maxInsertions > 0 && eligible && slope < triggerThreshold) {
      const before = { average_squared_error: rounded(current.average), outputs: current.outputs.map(rounded) };
      const initialized = network.addHiddenNode();
      const after = network.errors();
      insertion = {
        trial, normalized_drop: rounded(slope), threshold: triggerThreshold, window,
        initialized_weights: initialized,
        before,
        immediately_after: { average_squared_error: rounded(after.average), outputs: after.outputs.map(rounded) }
      };
      topologyStartTrial = trial;
      topologyStartError = after.average;
      if (curve.at(-1).trial !== trial) curve.push({ trial, average_squared_error: rounded(after.average), width: 2 });
      else curve.at(-1).width = 2;
    }
    if (learned && insertion) break;
  }
  if (trial > maxTrials) trial = maxTrials;
  current = network.errors();
  if (curve.at(-1).trial !== trial) curve.push({ trial, average_squared_error: rounded(current.average), width: network.hiddenWeights.length });
  return {
    algorithm: 'dynamic-node-construction',
    review_status: 'automated reproduction; not human-reviewed',
    source_formula: '(a[t-window] - a[t]) / a[topology_start] < trigger_threshold, with t-window >= topology_start',
    policy: {
      dataset_order: DATASET.map(([inputs]) => inputs), seed, learning_rate: learningRate,
      momentum, initial_weight_range: [-0.1666, 0.1666], window,
      trigger_threshold: triggerThreshold, average_cutoff: averageCutoff,
      maximum_cutoff: maximumCutoff, max_insertions: maxInsertions
    },
    initial_parameters: initialParameters,
    insertion,
    summary: {
      trials: trial, insertions: insertion ? 1 : 0, final_width: network.hiddenWeights.length,
      average_squared_error: rounded(current.average), maximum_squared_error: rounded(current.maximum),
      outputs: current.outputs.map(rounded),
      learned: current.average <= averageCutoff && current.maximum <= maximumCutoff
    },
    curve,
    final_parameters: serializeParameters(network)
  };
}

function runFixedWidth({ width = 2, trials, seed = 1989, learningRate = 0.5, momentum = 0.9 }) {
  const network = new Network(width, seed);
  const curve = [];
  let current = network.errors();
  for (let trial = 0; trial <= trials; trial += 1) {
    if (trial) {
      network.trainSweep(learningRate, momentum);
      current = network.errors();
    }
    if (trial % 25 === 0 || trial === trials) curve.push({ trial, average_squared_error: rounded(current.average), width });
  }
  return {
    algorithm: 'fixed-width-backpropagation',
    review_status: 'automated comparison; not human-reviewed',
    policy: { width, trials, seed, learning_rate: learningRate, momentum },
    summary: {
      trials, final_width: width, average_squared_error: rounded(current.average),
      maximum_squared_error: rounded(current.maximum), outputs: current.outputs.map(rounded)
    },
    curve,
    final_parameters: serializeParameters(network)
  };
}

function runExperiment(window = 250, triggerThreshold = 0.002) {
  const dnc = runDnc({ window, triggerThreshold });
  const fixedWidthBaseline = runFixedWidth({ width: 2, trials: dnc.summary.trials });
  return {
    question: "What changes when Ash's error-curve plateau trigger adds one hidden node?",
    review_status: 'not human-reviewed',
    dnc,
    fixed_width_baseline: fixedWidthBaseline
  };
}

function curvePath(curve, width, height, maxTrial) {
  const floor = 1e-5;
  const yMin = Math.log10(floor);
  const yMax = Math.log10(0.3);
  return curve.map((point, index) => {
    const x = 45 + (point.trial / maxTrial) * (width - 65);
    const logError = Math.max(yMin, Math.log10(point.average_squared_error));
    const y = 15 + ((yMax - logError) / (yMax - yMin)) * (height - 40);
    return `${index ? 'L' : 'M'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function render(result) {
  const svg = document.getElementById('plot');
  const width = 820; const height = 360;
  const maxTrial = Math.max(result.dnc.summary.trials, result.fixed_width_baseline.summary.trials);
  const insertion = result.dnc.insertion;
  const insertionX = insertion ? 45 + (insertion.trial / maxTrial) * (width - 65) : null;
  svg.innerHTML = `
    <line x1="45" y1="15" x2="45" y2="335" class="axis"/><line x1="45" y1="335" x2="800" y2="335" class="axis"/>
    <text x="8" y="22">0.3</text><text x="8" y="335">1e-5</text><text x="745" y="354">trial ${maxTrial}</text>
    <path d="${curvePath(result.dnc.curve, width, height, maxTrial)}" class="dnc-line"/>
    <path d="${curvePath(result.fixed_width_baseline.curve, width, height, maxTrial)}" class="baseline-line"/>
    ${insertion ? `<line x1="${insertionX}" y1="15" x2="${insertionX}" y2="335" class="insertion-line"/><text x="${Math.min(insertionX + 5, 700)}" y="35">insert at ${insertion.trial}</text>` : ''}`;
  const summary = result.dnc.summary;
  document.getElementById('summary').textContent = `DNC: ${summary.final_width} hidden nodes, ${summary.insertions} insertion, ${summary.trials} trials\nfinal outputs: ${summary.outputs.map(value => value.toFixed(3)).join(' / ')}\nfixed-width error at same trial: ${result.fixed_width_baseline.summary.average_squared_error}`;
  document.getElementById('trigger').textContent = insertion
    ? `(${insertion.window}-trial drop / error at topology start) = ${insertion.normalized_drop}, below ${insertion.threshold}. Ordinary backpropagation then continues for ${summary.trials - insertion.trial} sweeps.`
    : 'No insertion occurred under these controls before the trial limit.';
}

function initializeBrowser() {
  const form = document.getElementById('controls');
  const run = () => {
    const window = Number(document.getElementById('window').value);
    const threshold = Number(document.getElementById('threshold').value);
    render(runExperiment(window, threshold));
  };
  form.addEventListener('submit', event => { event.preventDefault(); run(); });
  run();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Lcg, Network, runDnc, runFixedWidth, runExperiment, rounded };
}
if (typeof document !== 'undefined') initializeBrowser();
