import { Link } from 'react-router-dom';

export function MatchSuggestions({ matches }) {
  if (!matches?.length) {
    return <p className="muted">Add complementary offered & wanted skills to see suggestions.</p>;
  }

  return (
    <div className="stack">
      {matches.map((m) => (
        <div key={m.user._id} className="card pad-md match-suggestion">
          <div className="match-suggestion-head">
            <div>
              <h3>{m.user.name}</h3>
              <p className="muted sm">{m.user.location}</p>
            </div>
            <span className="badge">Score {m.score}</span>
          </div>
          <p className="muted sm">You learn: {m.youLearnFromThem?.join(', ')}</p>
          <p className="muted sm">They learn: {m.theyLearnFromYou?.join(', ')}</p>
          <Link className="btn ghost sm" to={`/dashboard/profile?user=${m.user._id}`}>
            View profile
          </Link>
        </div>
      ))}
    </div>
  );
}
