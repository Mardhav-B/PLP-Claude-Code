import './LoadingState.css';

export default function LoadingState({ count = 8 }) {
  return (
    <div className="product-grid loading-grid" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-card__media shimmer" />
          <div className="skeleton-card__line shimmer" style={{ width: '40%' }} />
          <div className="skeleton-card__line shimmer" style={{ width: '80%' }} />
          <div className="skeleton-card__line shimmer" style={{ width: '55%' }} />
        </div>
      ))}
    </div>
  );
}
