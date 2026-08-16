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

test('lineage resolves a source-specific claim status', () => {
  const status = lineage.claimStatus('lightheart', 'parameter-calculation');
  assert.equal(status.card, 'Lightheart 2018');
  assert.match(status.status, /direct vocabulary support/);
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