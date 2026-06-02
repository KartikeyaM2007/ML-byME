import React, { useEffect, useRef } from 'react';
import { MathHub } from './MathHub';
import { SiteHeader } from './components/SiteHeader';
import { mathLessons } from './data/mathLessons';
import { navigate } from './navigation';

export function MathHubPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('/ml-math')) {
        a.setAttribute('data-nav', href);
      }
    });

    mathLessons.forEach((lesson) => {
      const label = lesson.title.toLowerCase();
      root.querySelectorAll('button, a, [role="button"]').forEach((el) => {
        const text = (el.textContent || '').toLowerCase();
        if (text.includes(label.slice(0, 12))) {
          el.setAttribute('data-nav', lesson.path);
        }
      });
    });
  }, []);

  return (
    <div className="dark interior-page" ref={rootRef}>
      <SiteHeader />
      <div style={{ paddingTop: 60 }}>
        <MathHub />
      </div>
      <div style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid #1a2222' }}>
        <p style={{ color: '#888', marginBottom: 12 }}>Browse structured ML math lessons</p>
        <button
          type="button"
          className="primary"
          style={{ background: '#00ff94', color: '#000', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer' }}
          onClick={() => navigate(mathLessons[0]?.path || '/ml-math/vectors')}
        >
          Open first lesson
        </button>
      </div>
    </div>
  );
}
