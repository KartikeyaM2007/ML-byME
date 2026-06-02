export function navigate(path: string) {
  if (path === window.location.pathname) return;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function isInternalPath(href: string) {
  if (!href || href.startsWith('#') || href.startsWith('http')) return false;
  return href.startsWith('/');
}

export function setupSpaNavigation(root: Document | HTMLElement = document) {
  const handler = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const navEl = target.closest('[data-nav]') as HTMLElement | null;
    if (navEl) {
      event.preventDefault();
      navigate(navEl.getAttribute('data-nav') || '/');
      return;
    }

    const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    if (!isInternalPath(href)) return;
    if (anchor.target === '_blank') return;
    event.preventDefault();
    navigate(href);
  };

  root.addEventListener('click', handler as EventListener);
  return () => root.removeEventListener('click', handler as EventListener);
}
