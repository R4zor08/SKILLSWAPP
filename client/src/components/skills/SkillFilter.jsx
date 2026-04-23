export function SkillFilter({ type, onTypeChange, category, onCategoryChange }) {
  return (
    <div className="filter-bar">
      <label className="field inline">
        <span className="muted sm">Type</span>
        <select className="input sm" value={type} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="">All</option>
          <option value="offered">Offered</option>
          <option value="wanted">Wanted</option>
        </select>
      </label>
      <label className="field inline grow">
        <span className="muted sm">Category</span>
        <input
          className="input sm"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          placeholder="e.g. Design"
        />
      </label>
    </div>
  );
}
