export function ConversationCard({ swap, active, onSelect, peerName }) {
  return (
    <button
      type="button"
      className={`conversation-card card pad-sm ${active ? 'active' : ''}`}
      onClick={() => onSelect(swap._id)}
    >
      <div className="conversation-title">{peerName || 'Partner'}</div>
      <div className="muted sm">Swap #{swap._id?.slice(-6)}</div>
    </button>
  );
}
