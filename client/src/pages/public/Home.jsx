import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories, steps } from '../../data/marketing.js';

function useScrollToHash() {
  const location = useLocation();
  const prevHashRef = useRef(null);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const id = location.hash.replace(/^#/, '');
    const prev = prevHashRef.current;

    const run = () => {
      if (id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (prev !== null && prev !== '') {
        document.getElementById('top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const t = window.requestAnimationFrame(run);
    prevHashRef.current = location.hash;
    return () => window.cancelAnimationFrame(t);
  }, [location.pathname, location.hash]);
}

export function Home() {
  useScrollToHash();

  return (
    <div className="home landing landing-page" id="top">
      <section className="neon-hero landing-hero marketing-hero-bg" aria-labelledby="landing-headline">
        <div className="neon-ribbons" aria-hidden />
        <div className="landing-hero-noise marketing-noise" aria-hidden />
        <div className="container landing-hero-grid">
          <div className="landing-hero-copy">
            <div className="landing-badge-row">
              <span className="landing-pill">Peer-to-peer</span>
              <span className="landing-pill landing-pill--accent">No fees — just exchange</span>
            </div>
            <p className="eyebrow eyebrow--pulse" id="landing-kicker">
              Community-powered learning
            </p>
            <h1 id="landing-headline" className="hero-title hero-title--enter">
              Trade What You Know.{' '}
              <span className="gradient gradient--animated">Learn What You Need.</span>
            </h1>
            <p className="hero-lead">
              SkillSwap connects people who want to grow together. Offer what you have mastered, request what you want
              next, and build real relationships through exchange.
            </p>
            <div className="hero-actions landing-hero-cta">
              <Link to="/register" className="btn primary btn--shine touch-target">
                Get started free
              </Link>
              <Link to="/login" className="btn ghost touch-target">
                Log in
              </Link>
            </div>
            <p className="landing-see-features">
              <a href="#features" className="link-accent">
                See how SkillSwap works →
              </a>
            </p>
            <ul className="landing-trust" aria-label="What you can do">
              <li>
                <span className="landing-trust-icon" aria-hidden>
                  ✓
                </span>
                <span>Offer &amp; request skills</span>
              </li>
              <li>
                <span className="landing-trust-icon" aria-hidden>
                  ✓
                </span>
                <span>Structured swap requests</span>
              </li>
              <li>
                <span className="landing-trust-icon" aria-hidden>
                  ✓
                </span>
                <span>Messages &amp; progress tracking</span>
              </li>
            </ul>
          </div>
          <div className="landing-hero-art" aria-hidden>
            <div className="landing-art-orbit" />
            <div className="landing-art-card landing-art-card--a">
              <span className="landing-art-label">Offered</span>
              <strong>UI Design</strong>
              <span className="muted sm">Advanced</span>
            </div>
            <div className="landing-art-card landing-art-card--b">
              <span className="landing-art-label">Wanted</span>
              <strong>Spanish</strong>
              <span className="muted sm">Beginner</span>
            </div>
            <div className="landing-art-card landing-art-card--c">
              <span className="landing-art-dot" />
              <span className="landing-art-chat">Swap request sent</span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="landing-anchor neon-section neon-section--head" tabIndex={-1}>
        <div className="container">
          <header className="landing-section-head">
            <p className="eyebrow">Product</p>
            <h2 className="landing-h2 landing-page-title">Features</h2>
            <p className="landing-sub muted">Why SkillSwap works — from first impression to a completed swap.</p>
          </header>
        </div>
      </section>

      <section className="section landing-section" aria-labelledby="features-pillars">
        <div className="container">
          <h2 id="features-pillars" className="visually-hidden">
            Core pillars
          </h2>
          <div className="grid-3 stagger-children landing-feature-grid">
            <article className="glass-panel pad-lg feature-card landing-feature">
              <div className="feature-icon-wrap" aria-hidden>
                <span className="feature-icon">◎</span>
              </div>
              <h3 className="feature-title">Offer &amp; request</h3>
              <p className="muted">List skills you can teach and skills you want to learn — clearly and honestly.</p>
            </article>
            <article className="glass-panel pad-lg feature-card landing-feature">
              <div className="feature-icon-wrap" aria-hidden>
                <span className="feature-icon">✧</span>
              </div>
              <h3 className="feature-title">Match &amp; propose</h3>
              <p className="muted">Find people with complementary goals and send structured swap requests.</p>
            </article>
            <article className="glass-panel pad-lg feature-card landing-feature">
              <div className="feature-icon-wrap" aria-hidden>
                <span className="feature-icon">⇄</span>
              </div>
              <h3 className="feature-title">Collaborate</h3>
              <p className="muted">Message, track progress, and leave reviews when the exchange is complete.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section landing-section landing-section--steps" aria-labelledby="steps-heading">
        <div className="container">
          <header className="landing-section-head">
            <p className="eyebrow">How it works</p>
            <h2 id="steps-heading" className="landing-h2">
              From signup to swap in four steps
            </h2>
          </header>
          <ol className="landing-steps">
            {steps.map((s) => (
              <li key={s.n} className="landing-step glass-panel pad-lg">
                <span className="landing-step-num">{s.n}</span>
                <h3 className="landing-step-title">{s.title}</h3>
                <p className="muted landing-step-text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section muted-bg section--soft landing-section">
        <div className="container">
          <header className="landing-section-head">
            <p className="eyebrow">Explore</p>
            <h2 className="landing-h2">Popular categories</h2>
            <p className="landing-sub muted">A few places members start — add your own niche when you join.</p>
          </header>
          <div className="landing-category-grid stagger-children">
            {categories.map((c) => (
              <span key={c} className="landing-category-tile">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="landing-anchor neon-section neon-section--head section--tight-top" tabIndex={-1}>
        <div className="container">
          <header className="landing-section-head">
            <p className="eyebrow">Our story</p>
            <h2 className="landing-h2 landing-page-title">About SkillSwap</h2>
            <p className="landing-sub muted">
              We believe the best learning often happens person to person — not only through courses, but through trust,
              clarity, and a fair exchange.
            </p>
          </header>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <article className="glass-panel pad-lg">
            <h3 className="landing-h2 about-panel-title">Mission</h3>
            <p className="muted">
              Help people trade what they know for what they need — with structured requests, respectful messaging, and
              room to grow together.
            </p>
          </article>
          <article className="glass-panel pad-lg">
            <h3 className="landing-h2 about-panel-title">What makes us different</h3>
            <p className="muted">
              SkillSwap is built around <strong className="text-highlight">reciprocal value</strong>: clear offered and
              wanted skills, swap requests you can accept or decline, and progress you can track — not endless feeds or
              vague networking.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" className="landing-anchor neon-section neon-section--head section--tight-top" tabIndex={-1}>
        <div className="container">
          <header className="landing-section-head">
            <p className="eyebrow">We are here to help</p>
            <h2 className="landing-h2 landing-page-title">Contact</h2>
            <p className="landing-sub muted">Questions about SkillSwap, partnerships, or support — reach out.</p>
          </header>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <article className="glass-panel pad-lg contact-card">
              <h3 className="contact-card-title">Email</h3>
              <p className="muted">For general inquiries and support:</p>
              <a href="mailto:support@skillswap.app" className="link-accent contact-email">
                support@skillswap.app
              </a>
              <p className="muted sm contact-note">Replace with your real address when you go live.</p>
            </article>
            <article className="glass-panel pad-lg contact-card">
              <h3 className="contact-card-title">Before you write</h3>
              <ul className="contact-list muted">
                <li>Review the Features section above for how swaps and messaging work.</li>
                <li>Account issues are fastest from the email you used to register.</li>
              </ul>
              <a href="#features" className="btn ghost touch-target contact-card-cta">
                View features
              </a>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
