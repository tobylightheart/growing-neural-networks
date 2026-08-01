function fmt(value) {
  return Number(value).toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
}

function renderTrace(result) {
  const policy = result.policy;
  const summary = result.summary;
  document.getElementById('question').textContent = result.explanatory_question;
  document.getElementById('summary').textContent = `inputs: ${summary.inputs_seen}
adaptations: ${summary.adaptations}
insertions: ${summary.insertions}
growth resumed: ${summary.growth_resumed}
final topology: ${summary.final_node_count} nodes / ${summary.final_edge_count} edges`;
  document.getElementById('policy').textContent = `inputs: ${policy.input_order.map(row => row[0]).join(' → ')}
activity threshold: ${policy.activity_threshold}
firing threshold: ${policy.firing_threshold}
winner / neighbor rates: ${policy.winner_learning_rate} / ${policy.neighbor_learning_rate}
winner / neighbor habituation factors: ${policy.winner_habituation_factor} / ${policy.neighbor_habituation_factor}
maximum edge age: ${policy.maximum_edge_age}
tie breaking: ${policy.tie_breaking}
rounding: ${policy.round_digits} decimal places
status: ${policy.parameter_status}`;

  document.getElementById('steps').innerHTML = result.step_trace.map(row => {
    const tests = row.insertion_test;
    const cleanup = [
      row.deleted_edges.length ? `edges ${row.deleted_edges.map(edge => edge.join('–')).join(', ')}` : '',
      row.deleted_nodes.length ? `nodes ${row.deleted_nodes.join(', ')}` : '',
    ].filter(Boolean).join('; ') || 'none';
    return `<tr>
      <td>${row.iteration}</td>
      <td>${row.input.join(', ')}</td>
      <td>${row.winner} / ${row.runner_up}</td>
      <td>${fmt(row.activity)}</td>
      <td>${fmt(row.winner_firing_before)}</td>
      <td>activity: ${tests.activity_below_threshold}<br>firing: ${tests.winner_firing_below_threshold}</td>
      <td><strong>${row.branch}</strong>${row.inserted_node === null ? '' : ` node ${row.inserted_node}`}</td>
      <td>${row.state_after.nodes.length} / ${row.state_after.edges.length}</td>
      <td>${cleanup}</td>
    </tr>`;
  }).join('');

  document.getElementById('nodes').textContent = result.final_state.nodes
    .map(node => `node ${node.id}: w=[${node.weight.map(fmt).join(', ')}], firing=${fmt(node.firing)}`)
    .join('\n');
  document.getElementById('edges').textContent = result.final_state.edges
    .map(edge => `${edge.nodes.join('–')}: age ${edge.age}`)
    .join('\n');
}

function renderError(error) {
  const message = `Could not load trace.json: ${error.message}`;
  for (const id of ['question', 'summary', 'policy', 'nodes', 'edges']) {
    document.getElementById(id).textContent = message;
  }
  document.getElementById('steps').innerHTML = `<tr><td colspan="9">${message}</td></tr>`;
}

fetch('trace.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(renderTrace)
  .catch(renderError);
