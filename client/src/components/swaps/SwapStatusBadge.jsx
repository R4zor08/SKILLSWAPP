const MAP = {
  pending: 'badge warn',
  accepted: 'badge ok',
  rejected: 'badge bad',
  cancelled: 'badge ghost',
  completed: 'badge primary',
};

export function SwapStatusBadge({ status }) {
  return <span className={MAP[status] || 'badge'}>{status}</span>;
}
