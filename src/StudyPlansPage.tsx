import React from 'react';
import { BookOpen, Clock } from 'lucide-react';
import { studyPlansMeta } from './data/studyPlansMeta';
import { navigate } from './navigation';
import { SiteHeader } from './components/SiteHeader';
import './interior.css';

const ACCENT: Record<string, string> = {
  violet: '#a78bfa',
  blue: '#60a5fa',
  rose: '#fb7185',
  indigo: '#818cf8',
  sky: '#38bdf8',
  orange: '#fb923c',
  amber: '#fbbf24',
  teal: '#2dd4bf',
  yellow: '#facc15',
  cyan: '#22d3ee',
  '#047857': '#10b981',
  '#76B900': '#76b900',
  '#A78BFA': '#a78bfa',
};

export function StudyPlansPage() {
  const grouped = studyPlansMeta.reduce<Record<string, typeof studyPlansMeta>>((acc, plan) => {
    const cat = plan.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(plan);
    return acc;
  }, {});

  return (
    <div className="dark interior-page">
      <SiteHeader />
      <main className="study-plans-index">
        <div className="study-plans-index__hero">
          <p className="study-plans-index__eyebrow">Curated paths</p>
          <h1>Study Plans</h1>
          <p>Structured problem sequences from NumPy basics to CUDA kernels and cracking interview tracks.</p>
        </div>

        {Object.entries(grouped).map(([category, plans]) => (
          <section key={category} className="study-plans-index__group">
            <h2>{category}</h2>
            <div className="study-plans-index__grid">
              {plans.map((plan) => {
                const accent = ACCENT[plan.accentColor] || '#00ff94';
                return (
                  <button
                    key={plan.id}
                    type="button"
                    className="study-plans-index__card"
                    data-nav={`/study-plans/${plan.id}`}
                    onClick={() => navigate(`/study-plans/${plan.id}`)}
                  >
                    <span className="study-plans-index__icon" style={{ borderColor: `${accent}44`, color: accent }}>
                      {plan.icon?.length <= 3 ? plan.icon : <BookOpen size={22} />}
                    </span>
                    <div className="study-plans-index__card-body">
                      <h3>{plan.title}</h3>
                      <p className="study-plans-index__subtitle">{plan.subtitle}</p>
                      <p className="study-plans-index__desc">{plan.description.replace(/\s+/g, ' ').trim()}</p>
                      <div className="study-plans-index__meta">
                        <span style={{ color: accent }}>{plan.difficulty}</span>
                        <span>
                          <Clock size={12} /> {plan.estimatedDays} days
                        </span>
                        <span>{plan.problemCount} problems</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
