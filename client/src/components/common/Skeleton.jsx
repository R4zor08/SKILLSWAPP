/**
 * Loading placeholders — use with .skeleton* styles in index.css.
 * Respects prefers-reduced-motion via global CSS.
 */

export function Skeleton({ className = '', as: Tag = 'div', ...rest }) {
  return <Tag className={`skeleton ${className}`.trim()} aria-hidden {...rest} />;
}

export function SkeletonLine({ width = '100%' }) {
  return <div className="skeleton skeleton-line" style={{ width }} aria-hidden />;
}

export function SkeletonCard() {
  return (
    <article className="card pad-md skeleton-card" aria-hidden>
      <SkeletonLine width="35%" />
      <SkeletonLine width="70%" />
      <SkeletonLine width="55%" />
      <div className="skeleton-row">
        <span className="skeleton skeleton-pill" />
        <span className="skeleton skeleton-pill" />
      </div>
    </article>
  );
}

export function BrowseSkillsSkeleton({ count = 6 }) {
  return (
    <div className="skill-grid skeleton-grid" aria-busy="true" aria-label="Loading skills">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div className="profile-skeleton" aria-busy="true" aria-label="Loading profile">
      <div className="card pad-lg skeleton-profile-card">
        <div className="skeleton-profile-head">
          <div className="skeleton skeleton-avatar" />
          <div className="skeleton-profile-meta">
            <SkeletonLine width="50%" />
            <SkeletonLine width="35%" />
            <SkeletonLine width="90%" />
          </div>
        </div>
      </div>
      <div className="skeleton skill-grid skeleton-grid">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
