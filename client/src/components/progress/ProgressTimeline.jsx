import { ProgressCard } from './ProgressCard.jsx';

export function ProgressTimeline({ items }) {
  if (!items?.length) return <p className="muted">No progress updates yet.</p>;
  return (
    <div className="progress-timeline">
      {items.map((item) => (
        <ProgressCard key={item._id} item={item} />
      ))}
    </div>
  );
}
