import { SwapStatusBadge } from './SwapStatusBadge.jsx';
import { SwapActionButtons } from './SwapActionButtons.jsx';

export function SwapRequestCard({ swap, currentUserId, onAccept, onReject, onCancel, onComplete }) {
  const from = swap.senderId?.name || 'User';
  const to = swap.receiverId?.name || 'User';
  const offered = swap.offeredSkillId?.skillName || 'Skill';
  const requested = swap.requestedSkillId?.skillName || 'Skill';

  return (
    <article className="card pad-md swap-card">
      <div className="swap-card-head">
        <SwapStatusBadge status={swap.status} />
        <span className="muted sm">{new Date(swap.updatedAt || swap.createdAt).toLocaleString()}</span>
      </div>
      <p>
        <strong>{from}</strong> offers <em>{offered}</em> for <em>{requested}</em> with <strong>{to}</strong>
      </p>
      {swap.message && <p className="muted sm">“{swap.message}”</p>}
      <SwapActionButtons
        swap={swap}
        currentUserId={currentUserId}
        onAccept={onAccept}
        onReject={onReject}
        onCancel={onCancel}
        onComplete={onComplete}
      />
    </article>
  );
}
