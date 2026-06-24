const storageKey = 'gnn-theme';
const root = document.documentElement;

function systemPrefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function storedTheme() {
  try {
    const value = window.localStorage.getItem(storageKey);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

function effectiveTheme() {
  return storedTheme() || (systemPrefersDark() ? 'dark' : 'light');
}

export function applyTheme(theme = effectiveTheme()) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  return theme;
}

export function toggleTheme() {
  const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
  try { window.localStorage.setItem(storageKey, next); } catch {}
  applyTheme(next);
  updateThemeButtons();
  return next;
}

function updateThemeButtons() {
  const theme = effectiveTheme();
  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    button.textContent = theme === 'dark' ? '☀ Light' : '☾ Dark';
    button.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  });
}

export function initThemeToggle(container = document.body) {
  applyTheme();
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';
  button.dataset.themeToggle = 'true';
  button.addEventListener('click', toggleTheme);
  container.append(button);
  updateThemeButtons();
  return button;
}

applyTheme();

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!storedTheme()) {
      applyTheme();
      updateThemeButtons();
    }
  });
}
