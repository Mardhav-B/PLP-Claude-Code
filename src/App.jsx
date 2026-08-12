import { useState } from 'react';
import Header from './components/Header/Header';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import CategoryHeader from './components/CategoryHeader/CategoryHeader';
import Filters from './components/Filters/Filters';
import SortBar from './components/SortBar/SortBar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Pagination from './components/Pagination/Pagination';
import { useProducts } from './hooks/useProducts';
import { CATEGORIES, BRANDS, PRICE_BOUNDS } from './data/products';
import './App.css';

export default function App() {
  const {
    items,
    total,
    totalPages,
    page,
    setPage,
    sortBy,
    changeSort,
    filters,
    updateFilters,
    resetFilters,
    isLoading,
    isEmpty,
  } = useProducts({ pageSize: 12 });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      <Header search={filters.search} onSearchChange={(search) => updateFilters({ search })} />

      <main className="page">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'All Products' }]} />

        <CategoryHeader
          title="All Products"
          description="Shop our full range of electronics, fashion, home, beauty and sports essentials."
          count={total}
          isLoading={isLoading}
        />

        <div className="page__layout">
          <Filters
            className="page__filters-desktop"
            categories={CATEGORIES}
            brands={BRANDS}
            priceBounds={PRICE_BOUNDS}
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
          />

          <div className="page__content">
            <SortBar sortBy={sortBy} onChange={changeSort} onOpenFilters={() => setMobileFiltersOpen(true)} />

            <ProductGrid
              products={items}
              isLoading={isLoading}
              isEmpty={isEmpty}
              onClearFilters={resetFilters}
            />

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      </main>

      {mobileFiltersOpen && (
        <div className="filter-drawer" role="dialog" aria-modal="true">
          <div className="filter-drawer__backdrop" onClick={() => setMobileFiltersOpen(false)} />
          <div className="filter-drawer__panel">
            <div className="filter-drawer__header">
              <h2>Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                ✕
              </button>
            </div>
            <Filters
              categories={CATEGORIES}
              brands={BRANDS}
              priceBounds={PRICE_BOUNDS}
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
            />
            <button className="filter-drawer__apply" onClick={() => setMobileFiltersOpen(false)}>
              Show results
            </button>
          </div>
        </div>
      )}
    </>
  );
}
