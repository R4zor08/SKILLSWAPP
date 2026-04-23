import { formatDate } from '../../utils/formatters.js';

export function ProgressCard({ item }) {
  return (
    <article className="card pad-md progress-card">
      <div className="progress-head">
        <h3>{item.title}</h3>
        <span className="badge ghost">{item.completionStatus}</span>
      </div>
      <p className="muted sm">{item.notes || 'No notes'}</p>
      <p className="muted sm">
        {item.updatedBy?.name || 'User'} · {formatDate(item.updatedAt || item.createdAt)}
      </p>
    </article>
  );
}
