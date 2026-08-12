import ProductCard from '../ProductCard/ProductCard';
import LoadingState from '../LoadingState/LoadingState';
import EmptyState from '../EmptyState/EmptyState';
import './ProductGrid.css';

export default function ProductGrid({ products, isLoading, isEmpty, onClearFilters }) {
  if (isLoading) return <LoadingState />;
  if (isEmpty) return <EmptyState onClearFilters={onClearFilters} />;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
