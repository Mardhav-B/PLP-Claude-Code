import ProductGrid from '../ProductGrid/ProductGrid';
import './RecentlyViewed.css';

export default function RecentlyViewed({ products }) {
  if (products.length === 0) return null;

  return (
    <section className="recently-viewed">
      <h2>Recently Viewed</h2>
      <ProductGrid products={products} isLoading={false} isEmpty={false} />
    </section>
  );
}
