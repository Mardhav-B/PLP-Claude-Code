import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { getProductById } from '../services/productService';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/formatCurrency';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist, recordView } = useShop();
  const [product, setProduct] = useState(undefined); // undefined = loading, null = not found
  const [qty, setQty] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setProduct(undefined);
    setQty(1);
    getProductById(id).then(setProduct);
  }, [id]);

  useEffect(() => {
    if (product) recordView(product.id);
  }, [product, recordView]);

  if (product === undefined) {
    return (
      <>
        <Header search={search} onSearchChange={setSearch} />
        <main className="page pdp-status">Loading product…</main>
      </>
    );
  }

  if (product === null) {
    return (
      <>
        <Header search={search} onSearchChange={setSearch} />
        <main className="page pdp-status">
          <p>Product not found.</p>
          <Link to="/">Back to all products</Link>
        </main>
      </>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />
      <main className="page">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: product.category, href: '/' },
            { label: product.name },
          ]}
        />

        <div className="pdp">
          <div className="pdp__media">
            <img src={product.image} alt={product.name} />
            {product.discountPercent > 0 && (
              <span className="pdp__badge pdp__badge--sale">-{product.discountPercent}%</span>
            )}
            {product.isNew && <span className="pdp__badge pdp__badge--new">New</span>}
          </div>

          <div className="pdp__info">
            <p className="pdp__brand">{product.brand}</p>
            <h1 className="pdp__name">{product.name}</h1>

            <div className="pdp__rating">
              <span className="pdp__stars" aria-hidden="true">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </span>
              <span className="pdp__rating-value">{product.rating.toFixed(1)}</span>
              <span className="pdp__reviews">({product.reviews} reviews)</span>
            </div>

            <div className="pdp__price-row">
              <span className="pdp__price">{formatCurrency(product.price)}</span>
              {product.discountPercent > 0 && (
                <span className="pdp__original-price">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>

            <p className={`pdp__stock ${product.inStock ? 'pdp__stock--in' : 'pdp__stock--out'}`}>
              {product.inStock ? 'In stock' : 'Out of stock'}
            </p>

            <p className="pdp__description">
              The {product.name} from {product.brand} is a top pick in {product.category}, loved by{' '}
              {product.reviews}+ customers for its quality and value.
            </p>

            <div className="pdp__actions">
              <div className="pdp__qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  −
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                  +
                </button>
              </div>

              <button
                className="pdp__add-btn"
                disabled={!product.inStock}
                onClick={() => addToCart(product, qty)}
              >
                {product.inStock ? 'Add to Cart' : 'Notify Me'}
              </button>

              <button
                className={`pdp__wishlist-btn ${isWishlisted ? 'pdp__wishlist-btn--active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {isWishlisted ? '♥ Wishlisted' : '♡ Wishlist'}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="pdp__related">
            <h2>You may also like</h2>
            <ProductGrid products={related} isLoading={false} isEmpty={false} />
          </section>
        )}
      </main>
    </>
  );
}
