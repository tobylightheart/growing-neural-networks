
import { renderShell, pageTitle } from './site.js';
import { loadAlgorithms, loadThemes, loadModules, loadExercises } from './data-loader.js';

export async function initAlgorithmsPage() {
  renderShell('Algorithms');
  pageTitle('Algorithms');
  const algorithms = await loadAlgorithms();
  document.querySelector('[data-algorithms]').innerHTML = algorithms.map(algorithm => `<article class="paper-card">
    <h3>${algorithm.name}</h3>
    <div class="meta">${algorithm.family || algorithm.id}</div>
    <p>${algorithm.summary}</p>
    <div class="badges">${(algorithm.themes || []).map(t => `<span class="badge">${t}</span>`).join('')}</div>
  </article>`).join('');
}

export async function initConceptsPage() {
  renderShell('Concepts');
  pageTitle('Concepts');
  const themes = await loadThemes();
  document.querySelector('[data-concepts]').innerHTML = themes.map(theme => `<article class="paper-card">
    <h3>${theme.name}</h3>
    <div class="meta">${theme.id}</div>
    <p>${theme.description}</p>
  </article>`).join('');
}

export async function initModulesPage() {
  renderShell('Modules');
  pageTitle('Modules');
  const modules = await loadModules();
  document.querySelector('[data-modules]').innerHTML = modules.length ? modules.map(module => `<article class="module-card">
    <h3>${module.title}</h3>
    <div class="meta">${module.type} · ${module.status}</div>
    <p>${module.summary}</p>
    <div class="badges">${(module.concepts || []).map(t => `<span class="badge">${t}</span>`).join('')}</div>
    ${module.entry && module.status === 'available' ? `<p><a class="button secondary" href="../${module.entry}">Open module</a></p>` : '<p class="meta">Planned module</p>'}
  </article>`).join('') : '<div class="empty">Interactive modules will appear here as they are added.</div>';
}

export async function initExercisesPage() {
  renderShell('Exercises');
  pageTitle('Exercises');
  const exercises = await loadExercises();
  document.querySelector('[data-exercises]').innerHTML = exercises.length ? exercises.map(exercise => `<article class="exercise-card">
    <h3>${exercise.title}</h3>
    <div class="meta">${exercise.type} · ${exercise.status}</div>
    <p>${exercise.summary || exercise.prompt || ''}</p>
  </article>`).join('') : '<div class="empty">Exercises will appear here once the first interactive lessons are added.</div>';
}

export function initScriptsPage() {
  renderShell('Scripts');
  pageTitle('Scripts');
}
