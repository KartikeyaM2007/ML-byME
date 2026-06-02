import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Moon, Star } from 'lucide-react';
import { navigate } from '../navigation';

function TensorLogo() {
  return (
    <svg className="tensor-logo" viewBox="0 0 64 38" aria-hidden="true">
      <path d="M4 34 19 3h38l-7 9H28l-3 6h19l-7 8H21l-4 8H4Z" />
      <path d="M25 3c10 1 20 4 30 10-15-2-28 1-39 10l9-20Z" opacity=".78" />
    </svg>
  );
}

const NAV = [
  ['Problems', '/problems'],
  ['Explore', ''],
  ['Study Plans', '/study-plans'],
  ['Interview Prep', '/interview-prep'],
  ['Feedback', '/feedback'],
] as const;

const EXPLORE = [
  { title: 'ML Research', path: '/research' },
  { title: 'ML Math', path: '/ml-math' },
  { title: 'Leaderboard', path: '/leaderboard' },
] as const;

export function SiteHeader() {
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <header className="site-header-1to1">
      <div className="header-left">
        <button type="button" className="brand-1to1" onClick={() => navigate('/')} aria-label="TensorTonic home">
          <TensorLogo />
          <span>TensorTonic</span>
        </button>
        <nav className="nav-1to1">
          {NAV.map(([label, path]) => (
            <div
              key={label}
              className="nav-item-wrapper-1to1"
              onMouseLeave={() => label === 'Explore' && setExploreOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  if (label === 'Explore') setExploreOpen(!exploreOpen);
                  else if (path) navigate(path);
                }}
                onMouseEnter={() => label === 'Explore' && setExploreOpen(true)}
              >
                {label}
                {label === 'Explore' && <ChevronDown size={14} style={{ marginLeft: 4 }} />}
              </button>
              {label === 'Explore' && exploreOpen && (
                <div className="explore-dropdown-1to1">
                  {EXPLORE.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      className="explore-item-1to1"
                      onClick={() => {
                        navigate(item.path);
                        setExploreOpen(false);
                      }}
                    >
                      <strong>{item.title}</strong>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="header-actions-1to1">
        <button type="button" className="icon-btn-1to1" aria-label="Discord">
          <MessageCircle size={18} />
        </button>
        <button type="button" className="icon-btn-1to1" aria-label="Toggle theme">
          <Moon size={18} />
        </button>
        <button type="button" className="icon-btn-1to1" aria-label="Stars">
          <Star size={18} />
        </button>
        <button type="button" className="avatar-btn-1to1" onClick={() => navigate('/dashboard')} aria-label="Profile">
          <span>L</span>
        </button>
      </div>
    </header>
  );
}
