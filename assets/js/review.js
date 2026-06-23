
import { renderShell, pageTitle } from './site.js';
import { fetchText, findPaper, loadPapers } from './data-loader.js';
import { renderMarkdown } from './markdown.js';

function metadataHTML(paper) {
  const badges = [...(paper.families || []), ...(paper.themes || [])]
    .map(tag => `<span class="badge">${tag}</span>`).join('');
  return `<div class="review-header">
    <p class="kicker">Paper review</p>
    <h1>${paper.title}</h1>
    <p class="meta">${(paper.authors || []).join(', ')} · ${paper.year || 'n.d.'}${paper.venue ? ` · ${paper.venue}` : ''}</p>
    <div class="badges">
      ${paper.status ? `<span class="badge status">${paper.status}</span>` : ''}
      ${paper.importance ? `<span class="badge strong">${paper.importance}</span>` : ''}
      ${badges}
    </div>
    ${paper.growth_mechanism ? `<p><strong>Growth mechanism:</strong> ${paper.growth_mechanism}</p>` : ''}
  </div>`;
}

export async function initReviewPage() {
  renderShell('Papers');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const root = document.querySelector('[data-review]');
  if (!id) {
    pageTitle('Review not selected');
    root.innerHTML = '<div class="notice">No paper id was provided. Return to the papers page and choose a review.</div>';
    return;
  }
  const papers = await loadPapers();
  const paper = findPaper(papers, id);
  if (!paper) {
    pageTitle('Review not found');
    root.innerHTML = `<div class="notice">No paper with id <code>${id}</code> was found.</div>`;
    return;
  }
  pageTitle(paper.title);
  if (!paper.review) {
    root.innerHTML = metadataHTML(paper) + '<div class="notice">This paper does not have a public review yet.</div>';
    return;
  }
  const markdown = await fetchText(paper.review);
  root.innerHTML = metadataHTML(paper) + `<article class="review-body">${renderMarkdown(markdown)}</article>`;
}
