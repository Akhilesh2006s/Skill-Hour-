async function hydrateDesktopDownload() {
  const link = document.getElementById('desktop-download');
  const nameEl = document.getElementById('desktop-name');
  const metaEl = document.getElementById('desktop-meta');
  if (!link) return;

  try {
    const res = await fetch('downloads/latest.json', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    const path = String(data.path || '').trim().replace(/^\//, '');
    const fileName = String(data.fileName || 'SkillHour Setup').trim();
    const version = String(data.version || '').trim();
    const arch = String(data.architecture || 'x64').trim();

    if (path) link.setAttribute('href', path);
    if (nameEl) nameEl.textContent = fileName.replace(/\.exe$/i, '') || 'SkillHour Setup';
    if (metaEl && version) {
      metaEl.textContent = `${arch} · NSIS installer · v${version}`;
    }
  } catch {
    /* keep static fallback href — works when opened as a local file */
  }
}

function setupNavScroll() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavScroll();
  void hydrateDesktopDownload();
});
