export function ProfileForm({ initial, onSubmit, submitting }) {
  return (
    <form
      className="form-grid card pad-lg"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit({
          name: fd.get('name'),
          bio: fd.get('bio'),
          location: fd.get('location'),
          avatar: fd.get('avatar'),
        });
      }}
    >
      <label className="field">
        <span>Name</span>
        <input className="input" name="name" defaultValue={initial?.name || ''} required />
      </label>
      <label className="field">
        <span>Location</span>
        <input className="input" name="location" defaultValue={initial?.location || ''} />
      </label>
      <label className="field full">
        <span>Bio</span>
        <textarea className="input" name="bio" rows={4} defaultValue={initial?.bio || ''} />
      </label>
      <label className="field full">
        <span>Avatar URL</span>
        <input className="input" name="avatar" defaultValue={initial?.avatar || ''} placeholder="https://…" />
      </label>
      <div className="field full">
        <button type="submit" className="btn primary" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save profile'}
        </button>
      </div>
    </form>
  );
}
