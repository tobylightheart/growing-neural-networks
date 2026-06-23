
import { siteBase } from './site.js';

const cache = new Map();

export async function fetchJSON(path) {
  const url = siteBase() + path;
  if (!cache.has(url)) {
    cache.set(url, fetch(url).then(response => {
      if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
      return response.json();
    }));
  }
  return cache.get(url);
}

export async function fetchText(path) {
  const url = siteBase() + path;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
  return response.text();
}

export async function loadCatalog() {
  return fetchJSON('data/catalog.json');
}

export async function loadPapers() {
  const catalog = await loadCatalog();
  const paperFiles = catalog.papers || ['data/papers.json'];
  const chunks = await Promise.all(paperFiles.map(file => fetchJSON(file)));
  return chunks.flat().sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999) || a.title.localeCompare(b.title));
}

export async function loadAlgorithms() {
  const catalog = await loadCatalog();
  return fetchJSON(catalog.algorithms || 'data/algorithms.json');
}

export async function loadThemes() {
  const catalog = await loadCatalog();
  return fetchJSON(catalog.themes || 'data/themes.json');
}

export async function loadModules() {
  const catalog = await loadCatalog();
  return fetchJSON(catalog.modules || 'data/modules.json');
}

export async function loadExercises() {
  const catalog = await loadCatalog();
  return fetchJSON(catalog.exercises || 'data/exercises.json');
}

export function findPaper(papers, id) {
  return papers.find(paper => paper.id === id);
}
