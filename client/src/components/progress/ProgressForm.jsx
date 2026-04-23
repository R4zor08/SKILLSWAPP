import { useState } from 'react';

export function ProgressForm({ swapId, onSubmit, submitting }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [completionStatus, setCompletionStatus] = useState('in_progress');

  return (
    <form
      className="card pad-lg form-grid"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!swapId || submitting) return;
        const result = await onSubmit({ swapId, title, notes, completionStatus });
        if (result === true) {
          setTitle('');
          setNotes('');
          setCompletionStatus('in_progress');
        }
      }}
    >
      <label className="field full">
        <span>Title</span>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="field full">
        <span>Notes</span>
        <textarea className="input" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <label className="field">
        <span>Status</span>
        <select className="input" value={completionStatus} onChange={(e) => setCompletionStatus(e.target.value)}>
          <option value="in_progress">In progress</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
      </label>
      <button type="submit" className="btn primary" disabled={submitting || !swapId}>
        {submitting ? 'Saving…' : 'Add update'}
      </button>
    </form>
  );
}
