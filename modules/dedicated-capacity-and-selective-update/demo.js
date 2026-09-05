// Dedicated capacity versus a sparse read-out. Automated reading, not human-reviewed.

const SURFACES = {
  'product-key-memory': { axis: 'capacity', writesBase: true, detail: 'Adds trainable key/value memory; a sparse top-k of slots participates per input.' },
  'scaled-memory': { axis: 'capacity', writesBase: true, detail: 'Scales the same dedicated key/value capacity to 128B reported memory parameters.' },
  'sparse-memory-finetuning': { axis: 'selective-update', writesBase: true, detail: 'Updates only selected value slots while the rest of the memory and model stay frozen.' },
  'sae-readout': { axis: 'read-out', writesBase: false, detail: 'Fits an auxiliary sparse dictionary over existing activations; steering clamps coordinates during a forward pass.' }
};

function surfaceProfile(id) {
  if (!SURFACES[id]) throw new Error(`unknown surface: ${id}`);
  return SURFACES[id];
}

// Lin et al. 2025, section 4: c(i)/sum_j c(j) * log((|B|+1)/(df(i)+1)).
function tfidfScore(batchCount, totalBatchCount, backgroundBatchCount, backgroundDocumentFrequency) {
  if (batchCount < 0 || totalBatchCount <= 0 || backgroundBatchCount < 0 || backgroundDocumentFrequency < 0) throw new Error('counts must be valid');
  return (batchCount / totalBatchCount) * Math.log((backgroundBatchCount + 1) / (backgroundDocumentFrequency + 1));
}

function rankMemorySlots(slots, backgroundBatchCount, topT) {
  const total = slots.reduce((sum, slot) => sum + slot.batchCount, 0);
  if (total <= 0) return slots.map(slot => ({ ...slot, score: 0, selected: false }));
  const ranked = slots.map((slot, index) => ({
    ...slot,
    originalIndex: index,
    score: tfidfScore(slot.batchCount, total, backgroundBatchCount, slot.backgroundDocumentFrequency)
  })).sort((a, b) => b.score - a.score || a.originalIndex - b.originalIndex);
  const selectedIds = new Set(ranked.slice(0, Math.max(0, topT)).map(slot => slot.id));
  return slots.map((slot, index) => {
    const scored = ranked.find(row => row.originalIndex === index);
    return { ...slot, score: scored.score, selected: selectedIds.has(slot.id) };
  });
}

if (typeof module !== 'undefined') module.exports = { SURFACES, surfaceProfile, tfidfScore, rankMemorySlots };

if (typeof document !== 'undefined') {
  const rows = Array.from(document.querySelectorAll('[data-slot]'));
  const topInput = document.querySelector('#top-t');
  function update() {
    const slots = rows.map(row => ({
      id: row.dataset.slot,
      batchCount: Number(row.querySelector('[data-kind="batch"]').value),
      backgroundDocumentFrequency: Number(row.querySelector('[data-kind="background"]').value)
    }));
    const topT = Number(topInput.value);
    document.querySelector('#top-t-value').textContent = topT;
    const ranked = rankMemorySlots(slots, 1000, topT);
    ranked.forEach((slot, index) => {
      const row = rows[index];
      row.querySelector('[data-kind="batch"] + output').textContent = slot.batchCount;
      row.querySelector('[data-kind="background"] + output').textContent = slot.backgroundDocumentFrequency;
      row.querySelector('.score').textContent = slot.score.toFixed(4);
      row.classList.toggle('selected', slot.selected);
      row.querySelector('.state').textContent = slot.selected ? 'gradient enabled' : 'forward only; gradient stopped';
    });
    const chosen = ranked.filter(slot => slot.selected).map(slot => slot.id).join(', ') || 'none';
    document.querySelector('#selection-line').textContent = `Selected for update: ${chosen}. Every accessed slot may still contribute to the forward pass.`;
  }
  rows.flatMap(row => Array.from(row.querySelectorAll('input'))).concat(topInput).forEach(input => input.addEventListener('input', update));
  update();
}
