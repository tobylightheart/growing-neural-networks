const test = require('node:test');
const assert = require('node:assert/strict');

const lineage = require('../modules/evolving-spiking-lineage-cards/demo.js');
const simulation = require('../modules/simulation-expansion-contraction/demo.js');
const taxonomy = require('../modules/constructive-taxonomy/demo.js');
const growth = require('../modules/cascade-correlation-growth/demo.js');
const playground = require('../modules/residual-correlation-playground/demo.js');
const comparison = require('../exercises/dnc-vs-cascor-growth-1/demo.js');
const stdp = require('../exercises/stdp-timing-window-selectivity-1/demo.js');
const stabilization = require('../exercises/post-growth-stabilization-compare-1/demo.js');
const intuition = require('../exercises/residual-correlation-intuition-1/demo.js');
const dnc = require('../labs/dynamic-node-construction-xor/demo.js');
const capacitySignals = require('../modules/capacity-growth-signals/demo.js');
const capacityControl = require('../labs/capacity-control-after-growth/demo.js');
const frozenBase = require('../modules/frozen-base-parameter-addition/demo.js');

test('lineage resolves a source-specific claim status', () => {
  const status = lineage.claimStatus('lightheart', 'parameter-calculation');
  assert.equal(status.card, 'Lightheart 2018');
  assert.match(status.status, /direct vocabulary support/);
});

test('lineage synthesis preserves the base eSNN decision order and learning boundary', () => {
  assert.equal(lineage.lineageSynthesis.reviewStatus, 'not human-reviewed');
  assert.match(lineage.lineageSynthesis.baseEsnnSetting, /supervised/);
  assert.match(lineage.lineageSynthesis.sequence[0], /current input spike order/);
  assert.match(lineage.lineageSynthesis.sequence[1], /same-class neurons/);
  assert.match(lineage.lineageSynthesis.sequence[2], /merge.*otherwise add/);
  assert.match(lineage.lineageSynthesis.unsupervisedBridge, /separate branch/);
});

test('simulation transfer changes only the selected set', () => {
  const components = [{ id: 'A', set: 'simulated' }, { id: 'D', set: 'surrounding' }];
  const transferred = simulation.transferComponent(components, 'D', 'simulated');
  assert.deepEqual(transferred.map(item => item.set), ['simulated', 'simulated']);
  assert.equal(components[1].set, 'surrounding');
  assert.equal(simulation.assessTransfer({ activity: 0.1, connections: 0.2 }, 0.1), 'low');
});

test('taxonomy exposes the chosen mechanism lens', () => {
  const mechanism = taxonomy.describeMechanism('cascade-correlation', 'how');
  assert.equal(mechanism.lens, 'How?');
  assert.match(mechanism.description, /candidate incoming weights/i);
});

test('cascade-correlation picks the strongest absolute candidate', () => {
  const candidates = growth.candidateCorrelations(0.5);
  assert.equal(growth.selectWinner(candidates).id, 'A');
});

test('residual playground calculates activations and correlation', () => {
  const rows = [{ x: [0, 0] }, { x: [1, 0] }];
  assert.deepEqual(playground.candidateActivations(rows, { w1: 1, w2: 0, bias: 0 }), [0, Math.tanh(1)]);
  assert.equal(playground.mechanismCorrelation([1, 2, 3], [2, 4, 6]), 1);
});

test('DNC/CasCor exercise grades mechanism distinctions', () => {
  assert.equal(comparison.gradeClaims({ 'candidate-correlation': 'cascor', 'freeze-inputs': 'cascor' }), 2);
});

test('capacity-growth comparison keeps the three triggers distinct', () => {
  assert.deepEqual(capacitySignals.evaluateSignals({
    dnc: { normalizedDrop: 0.02, threshold: 0.05, windowReady: true },
    cascor: { outputStalled: false, residualRemains: true, bestCorrelation: 0.9 },
    ran: { distance: 0.7, epsilon: 0.5, error: 0.1, delta: 0.2 }
  }), { dnc: true, cascor: false, ran: false });
  assert.deepEqual(capacitySignals.evaluateSignals({
    dnc: { normalizedDrop: 0.08, threshold: 0.05, windowReady: true },
    cascor: { outputStalled: true, residualRemains: true, bestCorrelation: 0.7 },
    ran: { distance: 0.7, epsilon: 0.5, error: 0.3, delta: 0.2 }
  }), { dnc: false, cascor: true, ran: true });
});

test('capacity-control demo reports fit and retained width together', () => {
  assert.deepEqual(capacityControl.policySummary('prune', {
    rule: 'remove one', removed_node: 0, proxy_values: [0.1, 0.2],
    result: { width: 1, average_squared_error: 0.25 }
  }), {
    name: 'prune', label: 'Prune after fine-tuning', width: 1, error: 0.25,
    detail: 'Removed node 0; proxy 0.1 vs 0.2', rule: 'remove one'
  });
});

test('STDP timing rewards predictive spikes and penalizes late spikes', () => {
  assert.ok(stdp.timingUpdate(-5) > 0);
  assert.ok(stdp.timingUpdate(5) < 0);
  assert.ok(stdp.selectivityScore([-18, -11, -4, 17]) > 0);
});

test('stabilization exercise grades algorithm-specific strategies', () => {
  assert.equal(stabilization.gradeStrategies({
    'cascade-correlation': 'freeze-feature',
    'dynamic-node-construction': 'continue-backprop',
    'recurrent-cascade-correlation': 'preserve-topology',
    'simulation-expansion-contraction': 'low-disruption-expansion'
  }), 4);
});

test('residual intuition ranks the XOR-like candidate first', () => {
  const rows = [
    { target: 0, output: 0.38 }, { target: 1, output: 0.48 },
    { target: 1, output: 0.53 }, { target: 0, output: 0.42 }
  ];
  const candidates = [
    { id: 'ridge', activations: [-0.91, 0.72, 0.69, -0.58] },
    { id: 'flat', activations: [0.08, 0.13, 0.11, 0.09] }
  ];
  assert.equal(intuition.rankCandidates(candidates, rows)[0].id, 'ridge');
});

test('DNC browser mechanism reproduces the exact plateau and insertion trace', () => {
  const result = dnc.runExperiment();
  assert.equal(result.dnc.insertion.trial, 686);
  assert.equal(result.dnc.insertion.normalized_drop, 0.001998044348);
  assert.deepEqual(result.dnc.summary.outputs, [
    0.033720967672, 0.958029912093, 0.957999804458, 0.057768772224
  ]);
  assert.equal(result.dnc.summary.insertions, 1);
  assert.equal(result.fixed_width_baseline.summary.final_width, 2);
});

test('frozen-base module keeps the three parameter sites distinct', () => {
  assert.equal(frozenBase.parameterSite('adapter'), 'new layers inside the block');
  assert.equal(frozenBase.parameterSite('lora'), 'low-rank delta on an existing matrix');
  assert.equal(frozenBase.parameterSite('mole'), 'gate over modules that already exist');
  assert.deepEqual(frozenBase.frozenComponents('mole'), ['pre-trained model weights', 'every trained LoRA']);
});

test('frozen-base costs follow each paper\'s own formula, and MoLE reports none', () => {
  // Houlsby et al.: 2md + d + m per adapter, two adapters per Transformer layer.
  assert.equal(frozenBase.adapterParameters({ d: 768, m: 64 }), 198272);
  // Hu et al.: r(d + k) per adapted matrix; the paper adapts Wq and Wv.
  assert.equal(frozenBase.loraParameters({ d: 768, r: 8 }), 24576);
  assert.equal(frozenBase.moleAddedParameters(), null);
  const rows = frozenBase.compareMethods({ d: 768, m: 64, r: 8, layers: 12 });
  assert.deepEqual(rows.map(row => row.addedParameters), [2379264, 294912, null]);
});

test('frozen-base removal costs differ by where the parameters were put', () => {
  assert.equal(frozenBase.removalCost('adapter').kind, 'delete-module');
  assert.equal(frozenBase.removalCost('lora').kind, 'subtract-delta');
  assert.equal(frozenBase.removalCost('mole').kind, 'mask-and-renormalize');
});

test('MoLE gate masks a branch and redistributes the rest proportionally', () => {
  const open = frozenBase.gateWeights([1, 1, 0]);
  assert.equal(open[0], open[1]);
  assert.ok(open[2] < open[0]);
  const masked = frozenBase.gateWeights([1, 1, 0], [true, true, false]);
  assert.deepEqual(masked, [0.5, 0.5, 0]);
  assert.equal(masked.reduce((sum, value) => sum + value, 0), 1);
});
