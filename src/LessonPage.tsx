import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { mathLessons } from './data/mathLessons';
import { mathLessonContent } from './data/mathLessonContent';
import { navigate } from './navigation';

export function LessonPage({ path }: { path: string }) {
  const lesson = mathLessons.find((l) => l.path === path) ?? mathLessons[0];
  const content = mathLessonContent[path];

  if (!lesson) {
    return (
      <section className="page" style={{ padding: 40, color: '#fff' }}>
        <h1>Lesson not found</h1>
        <button type="button" onClick={() => navigate('/ml-math')}>Back to ML Math</button>
      </section>
    );
  }

  return (
    <section className="page" style={{ padding: '32px 24px', maxWidth: 900, margin: '0 auto', color: '#f0f4f4' }}>
      <button type="button" onClick={() => navigate('/ml-math')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', marginBottom: 24 }}>
        ← Back to ML Math
      </button>
      <p style={{ color: '#00ff94', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{lesson.area}</p>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>{lesson.title}</h1>
      <div style={{ color: '#bbb', lineHeight: 1.7, marginBottom: 32 }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content?.intro || lesson.summary}</ReactMarkdown>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {lesson.sections.map((section) => (
          <div key={section} style={{ border: '1px solid #1a2222', borderRadius: 12, padding: 20, background: '#111515' }}>
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>{section}</h2>
            <div style={{ color: '#aaa', fontSize: 14, lineHeight: 1.7 }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content?.sections?.[section] ||
                  `### ${section}\n\nPractice **${lesson.title}** in the Problems workspace.`}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
