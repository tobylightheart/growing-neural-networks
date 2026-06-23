
import { renderShell, pageTitle, el } from './site.js';
import { loadPapers, loadThemes } from './data-loader.js';

function badge(text, cls = '') {
  return `<span class="badge ${cls}">${text}</span>`;
}

export function paperCard(paper) {
  const authors = (paper.authors || []).join(', ');
  const tags = [...(paper.families || []), ...(paper.themes || []).slice(0, 3)];
  const reviewLink = paper.review ? `review.html?id=${encodeURIComponent(paper.id)}` : '#';
  return `<article class="paper-card">
    <h3>${paper.title}</h3>
    <div class="meta">${authors} · ${paper.year || 'n.d.'}${paper.venue ? ` · ${paper.venue}` : ''}</div>
    <div class="badges">
      ${paper.status ? badge(paper.status, 'status') : ''}
      ${paper.importance ? badge(paper.importance, 'strong') : ''}
      ${tags.map(tag => badge(tag)).join('')}
    </div>
    <p class="summary">${paper.summary || ''}</p>
    <p>
      ${paper.review ? `<a class="button secondary" href="${reviewLink}">Read review</a>` : ''}
      ${paper.links?.paper ? `<a class="button secondary" href="${paper.links.paper}">Paper</a>` : ''}
    </p>
  </article>`;
}

function matches(paper, query, status) {
  const blob = [paper.title, ...(paper.authors || []), paper.year, paper.venue, paper.summary, ...(paper.themes || []), ...(paper.families || [])]
    .join(' ').toLowerCase();
  return (!query || blob.includes(query.toLowerCase())) && (!status || paper.status === status);
}

export async function initPapersPage() {
  renderShell('Papers');
  pageTitle('Papers');
  const papers = await loadPapers();
  await loadThemes().catch(() => []);
  const root = document.querySelector('[data-papers]');
  const search = document.querySelector('[data-paper-search]');
  const status = document.querySelector('[data-paper-status]');
  const count = document.querySelector('[data-paper-count]');

  function render() {
    const filtered = papers.filter(p => matches(p, search.value, status.value));
    count.textContent = `${filtered.length} paper${filtered.length === 1 ? '' : 's'}`;
    root.innerHTML = filtered.length ? filtered.map(paperCard).join('') : '<div class="empty">No papers match those filters yet.</div>';
  }
  search.addEventListener('input', render);
  status.addEventListener('change', render);
  render();
}

export async function initTimelinePage() {
  renderShell('Timeline');
  pageTitle('Timeline');
  const papers = await loadPapers();
  const root = document.querySelector('[data-timeline]');
  root.innerHTML = papers.map(paper => `<div class="timeline-item">
    <div class="timeline-year">${paper.year || 'n.d.'}</div>
    <h3><a href="review.html?id=${encodeURIComponent(paper.id)}">${paper.title}</a></h3>
    <div class="meta">${(paper.authors || []).join(', ')}</div>
    <p>${paper.summary || ''}</p>
  </div>`).join('');
}

export async function initReadingQueuePage() {
  renderShell('Queue');
  pageTitle('Reading Queue');
  const papers = await loadPapers();
  const queued = papers.filter(paper => !['reviewed', 'synthesized'].includes(paper.status));
  const root = document.querySelector('[data-queue]');
  root.innerHTML = queued.length ? queued.map(paperCard).join('') : '<div class="empty">No queued papers yet. Add discoveries to data/papers.json with status values such as discovered, triaged, queued, or skimmed.</div>';
}
