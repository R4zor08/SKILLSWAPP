export function ProfileCard({ user, skills }) {
  if (!user) return null;
  const offered = skills?.filter((s) => s.type === 'offered')?.length ?? 0;
  const wanted = skills?.filter((s) => s.type === 'wanted')?.length ?? 0;

  return (
    <div className="profile-card card pad-lg">
      <div className="profile-head">
        <div className="avatar lg">{user.name?.charAt(0)?.toUpperCase()}</div>
        <div>
          <h2>{user.name}</h2>
          <p className="muted">{user.location || 'Location not set'}</p>
          <div className="rating-row">
            <span className="badge">★ {user.averageRating?.toFixed?.(1) ?? '0.0'}</span>
            <span className="muted sm">{user.reviewsCount ?? 0} reviews</span>
          </div>
        </div>
      </div>
      <p className="bio">{user.bio || 'No bio yet.'}</p>
      <div className="stat-row">
        <div className="stat">
          <span className="stat-label">Offered</span>
          <span className="stat-value">{offered}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Wanted</span>
          <span className="stat-value">{wanted}</span>
        </div>
      </div>
    </div>
  );
}
