import './Filters.css';

const RATING_OPTIONS = [4, 3, 2, 1];

export default function Filters({
  categories,
  brands,
  priceBounds,
  filters,
  onChange,
  onReset,
  className = '',
}) {
  const { categories: activeCategories, brands: activeBrands, minPrice, maxPrice, minRating, inStockOnly } =
    filters;

  function toggleFromList(list, value) {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  }

  const activeCount =
    activeCategories.length +
    activeBrands.length +
    (minRating ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minPrice !== undefined || maxPrice !== undefined ? 1 : 0);

  return (
    <aside className={`filters ${className}`} aria-label="Product filters">
      <div className="filters__header">
        <h2>Filters</h2>
        {activeCount > 0 && (
          <button className="filters__reset" onClick={onReset}>
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <section className="filters__group">
        <h3>Category</h3>
        <ul>
          {categories.map((cat) => (
            <li key={cat}>
              <label className="filters__checkbox">
                <input
                  type="checkbox"
                  checked={activeCategories.includes(cat)}
                  onChange={() =>
                    onChange({ categories: toggleFromList(activeCategories, cat) })
                  }
                />
                <span>{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="filters__group">
        <h3>Brand</h3>
        <ul>
          {brands.map((brand) => (
            <li key={brand}>
              <label className="filters__checkbox">
                <input
                  type="checkbox"
                  checked={activeBrands.includes(brand)}
                  onChange={() => onChange({ brands: toggleFromList(activeBrands, brand) })}
                />
                <span>{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="filters__group">
        <h3>Price</h3>
        <div className="filters__price">
          <label>
            <span>Min</span>
            <input
              type="number"
              min={priceBounds.min}
              max={maxPrice ?? priceBounds.max}
              placeholder={`$${priceBounds.min}`}
              value={minPrice ?? ''}
              onChange={(e) =>
                onChange({ minPrice: e.target.value === '' ? undefined : Number(e.target.value) })
              }
            />
          </label>
          <span className="filters__price-sep">–</span>
          <label>
            <span>Max</span>
            <input
              type="number"
              min={minPrice ?? priceBounds.min}
              max={priceBounds.max}
              placeholder={`$${priceBounds.max}`}
              value={maxPrice ?? ''}
              onChange={(e) =>
                onChange({ maxPrice: e.target.value === '' ? undefined : Number(e.target.value) })
              }
            />
          </label>
        </div>
      </section>

      <section className="filters__group">
        <h3>Customer Rating</h3>
        <ul>
          {RATING_OPTIONS.map((r) => (
            <li key={r}>
              <label className="filters__checkbox">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === r}
                  onChange={() => onChange({ minRating: minRating === r ? 0 : r })}
                />
                <span className="filters__stars" aria-label={`${r} stars and up`}>
                  {'★'.repeat(r)}
                  {'☆'.repeat(5 - r)}
                  <span className="filters__stars-text"> &amp; up</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="filters__group">
        <label className="filters__checkbox filters__checkbox--switch">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked })}
          />
          <span>In stock only</span>
        </label>
      </section>
    </aside>
  );
}
