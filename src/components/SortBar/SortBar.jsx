import { SORT_OPTIONS } from '../../services/productService';
import './SortBar.css';

export default function SortBar({ sortBy, onChange, onOpenFilters, hasActiveFilters, onClearFilters }) {
  return (
    <div className="sort-bar">
      <button className="sort-bar__filter-btn" onClick={onOpenFilters}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Filters
      </button>

      {hasActiveFilters && (
        <button className="sort-bar__clear-btn" onClick={onClearFilters}>
          Clear filters
        </button>
      )}

      <label className="sort-bar__sort">
        <span>Sort by</span>
        <select value={sortBy} onChange={(e) => onChange(e.target.value)}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
