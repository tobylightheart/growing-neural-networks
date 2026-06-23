
export const navItems = [
  { href: 'index.html', label: 'Home' },
  { href: 'pages/papers.html', label: 'Papers' },
  { href: 'pages/timeline.html', label: 'Timeline' },
  { href: 'pages/algorithms.html', label: 'Algorithms' },
  { href: 'pages/concepts.html', label: 'Concepts' },
  { href: 'pages/modules.html', label: 'Modules' },
  { href: 'pages/exercises.html', label: 'Exercises' },
  { href: 'pages/reading-queue.html', label: 'Queue' },
  { href: 'pages/scripts.html', label: 'Scripts' }
];

export function siteBase() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : '';
}

export function resolveSitePath(path) {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return siteBase() + path;
}

export function renderShell(activeLabel) {
  const base = siteBase();
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="nav-wrap">
      <a class="brand" href="${base}index.html">
        <strong>Growing Neural Networks</strong>
        <span>constructive learning literature review</span>
      </a>
      <nav class="site-nav" aria-label="Primary navigation">
        ${navItems.map(item => {
          const href = base + item.href;
          const current = item.label === activeLabel ? ' aria-current="page"' : '';
          return `<a href="${href}"${current}>${item.label}</a>`;
        }).join('')}
      </nav>
    </div>`;
  document.body.prepend(header);

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = 'A static, extensible field guide to constructive and growing neural networks.';
  document.body.append(footer);
}

export function pageTitle(title) {
  document.title = `${title} · Growing Neural Networks`;
}

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key === 'html') node.innerHTML = value;
    else node.setAttribute(key, value);
  }
  for (const child of Array.isArray(children) ? children : [children]) {
    if (child == null) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}
