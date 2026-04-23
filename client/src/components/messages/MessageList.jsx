import { formatDate } from '../../utils/formatters.js';

export function MessageList({ messages, currentUserId }) {
  if (!messages?.length) {
    return <p className="muted">No messages yet. Say hello!</p>;
  }

  return (
    <div className="message-list">
      {messages.map((m) => {
        const mine = String(m.senderId?._id ?? m.senderId) === String(currentUserId);
        return (
          <div key={m._id} className={`bubble ${mine ? 'mine' : ''}`}>
            <div className="bubble-meta">
              <strong>{mine ? 'You' : m.senderId?.name || 'Partner'}</strong>
              <span className="muted sm">{formatDate(m.createdAt)}</span>
            </div>
            <p>{m.content}</p>
          </div>
        );
      })}
    </div>
  );
}
