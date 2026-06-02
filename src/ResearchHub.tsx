import React, { useMemo, useState } from 'react';
import { Lock, ExternalLink } from 'lucide-react';
import { researchPapers, type ResearchPaper } from './data/researchPapers';
import { navigate } from './navigation';
import { SiteHeader } from './components/SiteHeader';
import './interior.css';

type Props = { path?: string };

const PAPER_COLORS: Record<string, string> = {
  transformer: 'purple-glow',
  llama: 'blue-glow',
  resnet: 'green-glow',
  gpt2: 'blue-glow',
  gemma3: 'purple-glow',
  bert: 'teal-glow',
};

export function ResearchHub({ path = '/research' }: Props) {
  const parts = path.split('/').filter(Boolean);
  const paperId = parts[1] || researchPapers[0]?.id;
  const paper = researchPapers.find((p) => p.id === paperId) ?? researchPapers[0];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const topics = useMemo(
    () => [...(paper?.topics || [])].sort((a, b) => a.sortOrder - b.sortOrder),
    [paper],
  );

  if (!paper) {
    return (
      <div className="dark interior-page" style={{ padding: 40 }}>
        No research papers loaded. Run <code>npm run fetch:data</code>.
      </div>
    );
  }

  return (
    <div className="dark interior-page">
      <SiteHeader />
      <div className="research-hub-layout">
        <aside className={`research-hub-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <h2 style={{ fontSize: 16, margin: '8px 0 16px', fontWeight: 700 }}>Research Papers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {researchPapers.map((p) => (
              <PaperSidebarItem
                key={p.id}
                paper={p}
                active={p.id === paper.id}
                onSelect={() => {
                  navigate(`/research/${p.id}`);
                  setSidebarOpen(false);
                }}
              />
            ))}
          </div>
        </aside>

        <main className="research-hub-main">
          <button
            type="button"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              marginBottom: 16,
              background: '#111',
              border: '1px solid #333',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: 8,
            }}
          >
            All papers ({researchPapers.length})
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, flex: 1 }}>{paper.title}</h1>
            {paper.isLocked && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#888', fontSize: 12 }}>
                <Lock size={14} /> Pro
              </span>
            )}
          </div>
          <p style={{ color: '#888', marginBottom: 12 }}>
            {paper.authors} · {paper.year}
          </p>
          <p style={{ color: '#bbb', maxWidth: 720, lineHeight: 1.65, marginBottom: 20 }}>{paper.description}</p>

          {paper.paperUrl && (
            <a
              href={paper.paperUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                color: '#00ff94',
                marginBottom: 28,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Read arXiv paper <ExternalLink size={14} />
            </a>
          )}

          <h3 style={{ fontSize: 13, color: '#888', marginBottom: 14, fontWeight: 600 }}>
            Implementation track · {topics.length} modules
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 760 }}>
            {topics.map((topic, i) => (
              <button
                key={topic.id}
                type="button"
                disabled={!topic.problemId}
                onClick={() => topic.problemId && navigate(`/problems/${topic.problemId}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 18px',
                  borderRadius: 12,
                  border: '1px solid #1a2222',
                  background: 'rgba(255,255,255,.03)',
                  cursor: topic.problemId ? 'pointer' : 'not-allowed',
                  textAlign: 'left',
                  color: '#f0f4f4',
                  opacity: topic.isFree === false && paper.isLocked ? 0.65 : 1,
                }}
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    border: `2px solid ${topic.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: topic.color,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ flex: 1 }}>
                  <strong style={{ display: 'block', marginBottom: 2, fontSize: 14 }}>{topic.name}</strong>
                  <span style={{ fontSize: 13, color: '#888' }}>{topic.description}</span>
                </span>
                {!topic.isFree && paper.isLocked ? (
                  <Lock size={14} color="#666" />
                ) : (
                  <span style={{ color: '#00ff94' }}>→</span>
                )}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function PaperSidebarItem({
  paper,
  active,
  onSelect,
}: {
  paper: ResearchPaper;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        textAlign: 'left',
        padding: '10px 12px',
        borderRadius: 10,
        border: active ? '1px solid rgba(0,255,148,.35)' : '1px solid transparent',
        background: active ? 'rgba(0,255,148,.08)' : 'transparent',
        color: active ? '#00ff94' : '#ccc',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3 }}>{paper.title}</div>
      <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{paper.authors}</div>
    </button>
  );
}

/** Short labels for problems page sidebar */
export function researchPaperSidebarItems() {
  return researchPapers.slice(0, 8).map((p) => ({
    id: p.id,
    title: p.title.split(' ').slice(0, 2).join(' ') || p.id,
    glow: PAPER_COLORS[p.id] || 'green-glow',
  }));
}
