function point(position){return [50+position[0]*500,390-position[1]*350]}
function eventText(row){
  if(!row)return 'Initial prototypes: no edges yet.';
  const parts=[`input [${row.input.join(', ')}] chose ${row.winner} then ${row.runner_up}; moved ${row.moved_prototypes.map(x=>x.node).join(', ')}`];
  if(row.aged_edges.length)parts.push(`aged ${row.aged_edges.map(x=>`${x.nodes.join('–')} to ${x.age}`).join(', ')}`);
  if(row.inserted)parts.push(`inserted node ${row.inserted.node} between ${row.inserted.between.join(' and ')}`);
  return parts.join(' · ')+'.';
}
function renderGraph(trace,index){
  const row=index?trace.step_trace[index-1]:null;
  const state=row?row.state_after:trace.initial_state;
  const aged=new Set((row?.aged_edges||[]).map(x=>x.nodes.join('-')));
  const inserted=row?.inserted?.node;
  const svg=document.querySelector('#plot');
  const edges=state.edges.map(edge=>{const a=state.nodes.find(n=>n.id===edge.nodes[0]);const b=state.nodes.find(n=>n.id===edge.nodes[1]);const [x1,y1]=point(a.position),[x2,y2]=point(b.position);return `<line class="edge ${aged.has(edge.nodes.join('-'))?'edge-aged':''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><title>edge ${edge.nodes.join('–')}, final age ${edge.age}</title></line>`}).join('');
  const sample=row?(()=>{const [x,y]=point(row.input);return `<rect class="sample" x="${x-7}" y="${y-7}" width="14" height="14"><title>current input</title></rect>`})():'';
  const nodes=state.nodes.map(node=>{const [x,y]=point(node.position);return `<g><circle class="node ${node.id===inserted?'inserted':''}" cx="${x}" cy="${y}" r="18"><title>prototype ${node.id}: [${node.position.join(', ')}]</title></circle><text class="label" x="${x}" y="${y}">${node.id}</text></g>`}).join('');
  svg.innerHTML=edges+sample+nodes;
  document.querySelector('#step-value').textContent=index;
  document.querySelector('#event').textContent=eventText(row);
  document.querySelector('#detail').textContent=row?`winner squared distance: ${row.winner_distance_squared}\nprototypes after: ${state.nodes.length}\nedges after: ${state.edges.length}\naged-before-reset events: ${row.aged_edges.length}`:`2 prototypes\n0 edges`;
}
fetch('trace.json').then(r=>{if(!r.ok)throw Error(`${r.status} ${r.statusText}`);return r.json()}).then(trace=>{
  const slider=document.querySelector('#step');slider.max=trace.step_trace.length;
  const show=()=>renderGraph(trace,Number(slider.value));
  slider.addEventListener('input',show);
  document.querySelector('#previous').addEventListener('click',()=>{slider.value=Math.max(0,Number(slider.value)-1);show()});
  document.querySelector('#next').addEventListener('click',()=>{slider.value=Math.min(Number(slider.max),Number(slider.value)+1);show()});show();
}).catch(error=>{document.querySelector('#event').textContent=`Could not load trace.json: ${error.message}`});
