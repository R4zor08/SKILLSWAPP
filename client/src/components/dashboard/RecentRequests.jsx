import { SwapRequestCard } from '../swaps/SwapRequestCard.jsx';

export function RecentRequests({ swaps, currentUserId, onAccept, onReject, onCancel, onComplete }) {
  if (!swaps?.length) {
    return <p className="muted">No recent swap activity.</p>;
  }

  return (
    <div className="stack">
      {swaps.slice(0, 5).map((s) => (
        <SwapRequestCard
          key={s._id}
          swap={s}
          currentUserId={currentUserId}
          onAccept={onAccept}
          onReject={onReject}
          onCancel={onCancel}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}
