import './EmptyState.css';

export default function EmptyState({ onClearFilters }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">🔍</div>
      <h3>No products found</h3>
      <p>Try adjusting your search or filters to find what you're looking for.</p>
      <button onClick={onClearFilters}>Clear all filters</button>
    </div>
  );
}
