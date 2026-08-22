export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <span className="search-icon">⌕</span>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks by title, description or assignee..."
        aria-label="Search tasks"
      />

      {value && (
        <button
          type="button"
          className="clear-search"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}