import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlist } = useShop();
  const [search, setSearch] = useState('');

  const products = useMemo(
    () => wishlist.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean),
    [wishlist]
  );

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />
      <main className="page">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />

        <div className="wishlist-header">
          <h1>Your Wishlist</h1>
          <p>{products.length} {products.length === 1 ? 'item' : 'items'} saved</p>
        </div>

        {products.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty__icon">♡</div>
            <h3>Your wishlist is empty</h3>
            <p>Save products you love by tapping the heart icon on any product.</p>
            <Link to="/" className="wishlist-empty__link">
              Continue shopping
            </Link>
          </div>
        ) : (
          <ProductGrid products={products} isLoading={false} isEmpty={false} />
        )}
      </main>
    </>
  );
}
