import { PRODUCTS } from '../data/products';

// This module is the seam between the UI and the data source.
// Every function returns a Promise shaped the way a REST/GraphQL API would,
// so swapping the body for a real `fetch('/api/products?...')` later
// requires no changes in components or hooks.

const SIMULATED_LATENCY_MS = 450;

function delay(value, ms = SIMULATED_LATENCY_MS) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Avg. Customer Rating' },
  { value: 'newest', label: 'Newest Arrivals' },
];

function applySort(items, sortBy) {
  const sorted = [...items];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case 'relevance':
    default:
      return sorted;
  }
}

function applyFilters(items, filters) {
  const {
    search = '',
    categories = [],
    brands = [],
    minPrice,
    maxPrice,
    minRating = 0,
    inStockOnly = false,
  } = filters;

  const normalizedSearch = search.trim().toLowerCase();

  return items.filter((p) => {
    if (normalizedSearch) {
      const haystack = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
      if (!haystack.includes(normalizedSearch)) return false;
    }
    if (categories.length && !categories.includes(p.category)) return false;
    if (brands.length && !brands.includes(p.brand)) return false;
    if (typeof minPrice === 'number' && p.price < minPrice) return false;
    if (typeof maxPrice === 'number' && p.price > maxPrice) return false;
    if (minRating && p.rating < minRating) return false;
    if (inStockOnly && !p.inStock) return false;
    return true;
  });
}

/**
 * Fetches a page of products matching the given filters/sort.
 * @param {object} params
 * @returns {Promise<{items: object[], total: number, page: number, pageSize: number}>}
 */
export async function getProducts({
  filters = {},
  sortBy = 'relevance',
  page = 1,
  pageSize = 12,
} = {}) {
  const filtered = applyFilters(PRODUCTS, filters);
  const sorted = applySort(filtered, sortBy);

  const start = (page - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);

  return delay({
    items,
    total: sorted.length,
    page,
    pageSize,
  });
}

export async function getProductById(id) {
  return delay(PRODUCTS.find((p) => p.id === id) ?? null);
}

export async function getFacets() {
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];
  const brands = [...new Set(PRODUCTS.map((p) => p.brand))];
  const prices = PRODUCTS.map((p) => p.price);
  return delay({
    categories,
    brands,
    priceBounds: { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) },
  });
}
