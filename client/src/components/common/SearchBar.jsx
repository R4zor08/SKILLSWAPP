export function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden>
        ⌕
      </span>
      <input
        className="input search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="search"
      />
    </div>
  );
}
