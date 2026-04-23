export function EmptyState({ title, description, action, visual }) {
  return (
    <div className="empty-state card pad-lg" role="status">
      {visual && <div className="empty-visual" aria-hidden>{visual}</div>}
      <h3 className="empty-title">{title}</h3>
      {description && <p className="muted empty-desc">{description}</p>}
      {action && <div className="empty-actions">{action}</div>}
    </div>
  );
}
