export function Loader({ label = 'Loading…' }) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <div className="spinner spinner--dual" aria-hidden>
        <span className="spinner-ring" />
        <span className="spinner-ring spinner-ring--delay" />
      </div>
      <span className="muted loader-label">{label}</span>
    </div>
  );
}
