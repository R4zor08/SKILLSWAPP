import { useState } from 'react';

export function MessageInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  return (
    <form
      className="message-input"
      onSubmit={(e) => {
        e.preventDefault();
        if (!value.trim()) return;
        onSend(value.trim());
        setValue('');
      }}
    >
      <input
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a message…"
        disabled={disabled}
      />
      <button type="submit" className="btn primary" disabled={disabled || !value.trim()}>
        Send
      </button>
    </form>
  );
}
