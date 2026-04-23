import { SwapStatusBadge } from '../swaps/SwapStatusBadge.jsx';

export function OngoingSwaps({ swaps }) {
  const ongoing = swaps?.filter((s) => s.status === 'accepted' || s.status === 'pending') || [];

  if (!ongoing.length) {
    return <p className="muted">No ongoing swaps.</p>;
  }

  return (
    <ul className="stack">
      {ongoing.map((s) => (
        <li key={s._id} className="card pad-md flex-between">
          <div>
            <strong>
              {s.offeredSkillId?.skillName} ⇄ {s.requestedSkillId?.skillName}
            </strong>
            <p className="muted sm">
              {s.senderId?.name} ↔ {s.receiverId?.name}
            </p>
          </div>
          <SwapStatusBadge status={s.status} />
        </li>
      ))}
    </ul>
  );
}
