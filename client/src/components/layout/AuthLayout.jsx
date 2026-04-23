import { Link } from 'react-router-dom';

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="app-shell marketing-theme auth-page">
      <div className="auth-backdrop" aria-hidden>
        <div className="auth-visual-bg" />
        <div className="neon-ribbons auth-neon-ribbons" />
        <div className="marketing-noise auth-noise" />
      </div>

      <main id="main-content" className="auth-center">
        <div className="auth-glass-card pad-lg auth-panel--enter">
          <div className="auth-card-accent" aria-hidden />
          <div className="auth-card-brand">
            <Link to={{ pathname: '/', hash: '' }} className="brand auth-card-brand-link">
              <span className="brand-mark">⇄</span>
              <span>SkillSwap</span>
            </Link>
          </div>
          <h1 className="page-title auth-card-title">{title}</h1>
          {subtitle && <p className="muted auth-card-sub">{subtitle}</p>}
          {children}
        </div>
      </main>
    </div>
  );
}
