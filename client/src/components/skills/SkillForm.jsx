export function SkillForm({ initial, onSubmit, submitting }) {
  return (
    <form
      className="form-grid card pad-lg"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const tags = String(fd.get('tags') || '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
        onSubmit({
          skillName: fd.get('skillName'),
          category: fd.get('category'),
          description: fd.get('description'),
          type: fd.get('type'),
          level: fd.get('level'),
          tags,
        });
      }}
    >
      <label className="field">
        <span>Skill name</span>
        <input className="input" name="skillName" defaultValue={initial?.skillName || ''} required />
      </label>
      <label className="field">
        <span>Category</span>
        <input className="input" name="category" defaultValue={initial?.category || ''} required />
      </label>
      <label className="field">
        <span>Type</span>
        <select className="input" name="type" defaultValue={initial?.type || 'offered'}>
          <option value="offered">Offered</option>
          <option value="wanted">Wanted</option>
        </select>
      </label>
      <label className="field">
        <span>Level</span>
        <select className="input" name="level" defaultValue={initial?.level || 'beginner'}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
      </label>
      <label className="field full">
        <span>Description</span>
        <textarea className="input" name="description" rows={3} defaultValue={initial?.description || ''} />
      </label>
      <label className="field full">
        <span>Tags (comma separated)</span>
        <input className="input" name="tags" defaultValue={initial?.tags?.join(', ') || ''} />
      </label>
      <div className="field full">
        <button type="submit" className="btn primary" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save skill'}
        </button>
      </div>
    </form>
  );
}
