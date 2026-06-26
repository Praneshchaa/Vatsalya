// ds-base.js — loads the bound Vatsalya Sewa Griha design system for every page.
(() => {
  const base = '_ds/vatsalya-sewa-griha-design-system-1b6a1024-b4fc-456d-8e3f-d0bf4b99e736';
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = base + '/styles.css';
  document.head.appendChild(l);
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src);
  document.head.appendChild(s);
})();
