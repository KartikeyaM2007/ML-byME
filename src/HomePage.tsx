import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Clock, Globe, Code2, FileText, Sigma } from 'lucide-react';
import { navigate } from './navigation';
import { FadingVideo } from './components/landing/FadingVideo';
import { BlurText } from './components/landing/BlurText';
import './landing-page.css';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4';

const CAPABILITIES_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4';

const fadeUp = (delay: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
});

const NAV_LINKS = [
  ['Problems', '/problems'],
  ['Research', '/research'],
  ['Study Plans', '/study-plans'],
  ['ML Math', '/ml-math'],
  ['Interview', '/interview-prep'],
] as const;

const CAPABILITY_CARDS = [
  {
    title: 'Research Papers',
    body: 'Implement transformers, diffusion models, and SOTA architectures component by component with guided modules.',
    tags: ['Transformers', 'DDPM', 'From Scratch', 'Visualized'],
    icon: FileText,
    path: '/research',
  },
  {
    title: 'Problem Workspace',
    body: 'Build 200+ ML algorithms in an interactive editor with tests, hints, and instant feedback—NumPy to CUDA.',
    tags: ['200+ Problems', 'Live Tests', 'GPU Kernels', 'Interview Prep'],
    icon: Code2,
    path: '/problems',
  },
  {
    title: 'ML Math Hub',
    body: 'Master linear algebra, probability, calculus, and optimization with lessons tied to real implementations.',
    tags: ['Linear Algebra', 'Probability', 'Gradients', 'Optimization'],
    icon: Sigma,
    path: '/ml-math',
  },
] as const;

export function HomePage() {
  return (
    <div className="landing-page">
      {/* —— Hero —— */}
      <section className="landing-hero">
        <div className="landing-hero__video-wrap">
          <FadingVideo src={HERO_VIDEO} className="landing-hero__video" />
        </div>

        <div className="landing-hero__content">
          <nav className="landing-nav" aria-label="Main">
            <button type="button" className="liquid-glass landing-nav__logo" onClick={() => navigate('/')} aria-label="Home">
              <img src="/images/tt-logo.svg" alt="" width={28} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </button>

            <div className="liquid-glass landing-nav__center">
              {NAV_LINKS.map(([label, path]) => (
                <button key={path} type="button" className="landing-nav__link" data-nav={path}>
                  {label}
                </button>
              ))}
              <button type="button" className="landing-nav__cta" data-nav="/problems">
                Start Learning
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="landing-nav__spacer" aria-hidden="true" />
          </nav>

          <div className="landing-hero__main">
            <motion.div className="liquid-glass landing-badge" {...fadeUp(0.4)}>
              <span className="landing-badge__chip">New</span>
              <span className="landing-badge__text">CUDA &amp; GPU kernel implementations now live</span>
            </motion.div>

            <BlurText text="Learn Machine Learning Through Code" />

            <motion.p className="landing-sub font-body" {...fadeUp(0.8)}>
              Implement 700+ algorithms from scratch—from gradients to transformers and GPU kernels. Interactive
              visualizations, research paper tracks, and a full problem workspace in one platform.
            </motion.p>

            <motion.div className="landing-ctas" {...fadeUp(1.1)}>
              <button type="button" className="liquid-glass-strong landing-cta-primary" data-nav="/problems">
                Start Learning
                <ArrowUpRight size={20} />
              </button>
              <button type="button" className="landing-cta-secondary" data-nav="/research">
                View Research Track
                <Play size={16} fill="currentColor" />
              </button>
            </motion.div>

            <motion.div className="landing-stats" {...fadeUp(1.3)}>
              <div className="liquid-glass landing-stat-card">
                <Clock size={28} strokeWidth={1.5} />
                <div>
                  <div className="landing-stat-card__value">200+</div>
                  <div className="landing-stat-card__label">Coding problems from scratch</div>
                </div>
              </div>
              <div className="liquid-glass landing-stat-card">
                <Globe size={28} strokeWidth={1.5} />
                <div>
                  <div className="landing-stat-card__value">20+</div>
                  <div className="landing-stat-card__label">Research paper implementations</div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div className="landing-partners" {...fadeUp(1.4)}>
            <span className="liquid-glass landing-partners__chip">Built for learners shipping real ML systems</span>
            <div className="landing-partners__row">
              <span>NumPy</span>
              <span>PyTorch</span>
              <span>CUDA</span>
              <span>Transformers</span>
              <span>Triton</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* —— Capabilities —— */}
      <section className="landing-capabilities">
        <FadingVideo src={CAPABILITIES_VIDEO} className="landing-capabilities__video" />

        <div className="landing-capabilities__inner">
          <header>
            <p className="landing-capabilities__kicker font-body">// Platform</p>
            <h2 className="landing-capabilities__title">
              Learning
              <br />
              evolved
            </h2>
          </header>

          <div className="landing-cards">
            {CAPABILITY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.path} className="liquid-glass landing-card">
                  <div className="landing-card__top">
                    <div className="liquid-glass landing-card__icon-wrap">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="landing-card__tags">
                      {card.tags.map((tag) => (
                        <span key={tag} className="liquid-glass landing-card__tag font-body">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="landing-card__spacer" />
                  <h3 className="landing-card__title">{card.title}</h3>
                  <p className="landing-card__body font-body">{card.body}</p>
                  <button type="button" className="landing-card__action font-body" data-nav={card.path}>
                    Explore →
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
