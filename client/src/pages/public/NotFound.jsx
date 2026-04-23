import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main id="main-content" className="page-center page-not-found marketing-theme">
      <div className="card pad-lg text-center not-found-card">
        <h1>404</h1>
        <p className="muted">This page does not exist.</p>
        <Link to="/" className="btn primary touch-target">
          Go home
        </Link>
      </div>
    </main>
  );
}
