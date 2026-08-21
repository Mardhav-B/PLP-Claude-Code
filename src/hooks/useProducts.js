import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/productService';

const DEFAULT_FILTERS = {
  search: '',
  categories: [],
  brands: [],
  minPrice: undefined,
  maxPrice: undefined,
  minRating: 0,
  inStockOnly: false,
};

const SAVED_FILTERS_KEY = 'plp:savedFilters';
const FILTER_PARAM_KEYS = ['q', 'categories', 'brands', 'minPrice', 'maxPrice', 'minRating', 'inStock'];

function readSavedFilters() {
  try {
    const raw = localStorage.getItem(SAVED_FILTERS_KEY);
    if (!raw) return null;
    return { ...DEFAULT_FILTERS, ...JSON.parse(raw) };
  } catch {
    return null;
  }
}

function parseFilters(searchParams) {
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minRating = searchParams.get('minRating');

  return {
    search: searchParams.get('q') ?? DEFAULT_FILTERS.search,
    categories: searchParams.get('categories')?.split(',').filter(Boolean) ?? DEFAULT_FILTERS.categories,
    brands: searchParams.get('brands')?.split(',').filter(Boolean) ?? DEFAULT_FILTERS.brands,
    minPrice: minPrice === null ? undefined : Number(minPrice),
    maxPrice: maxPrice === null ? undefined : Number(maxPrice),
    minRating: minRating === null ? DEFAULT_FILTERS.minRating : Number(minRating),
    inStockOnly: searchParams.get('inStock') === '1',
  };
}

function parseSortBy(searchParams) {
  return searchParams.get('sort') ?? 'relevance';
}

function parsePage(searchParams) {
  const page = searchParams.get('page');
  return page === null ? 1 : Number(page);
}

function writeParams(searchParams, { filters, sortBy, page }) {
  const next = new URLSearchParams(searchParams);

  const setOrDelete = (key, value, defaultValue) => {
    if (value === undefined || value === defaultValue) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
  };

  setOrDelete('q', filters.search || undefined, '');
  setOrDelete('categories', filters.categories.length ? filters.categories.join(',') : undefined);
  setOrDelete('brands', filters.brands.length ? filters.brands.join(',') : undefined);
  setOrDelete('minPrice', filters.minPrice);
  setOrDelete('maxPrice', filters.maxPrice);
  setOrDelete('minRating', filters.minRating || undefined, 0);
  setOrDelete('inStock', filters.inStockOnly ? '1' : undefined);
  setOrDelete('sort', sortBy === 'relevance' ? undefined : sortBy);
  setOrDelete('page', page === 1 ? undefined : String(page));

  return next;
}

export function useProducts({ pageSize = 12 } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const sortBy = useMemo(() => parseSortBy(searchParams), [searchParams]);
  const page = useMemo(() => parsePage(searchParams), [searchParams]);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  const requestId = useRef(0);
  const didRestoreRef = useRef(false);

  useEffect(() => {
    if (didRestoreRef.current) return;
    didRestoreRef.current = true;

    const hasFilterParams = FILTER_PARAM_KEYS.some((key) => searchParams.has(key));
    if (hasFilterParams) return;

    const saved = readSavedFilters();
    if (!saved) return;

    setSearchParams(writeParams(searchParams, { filters: saved, sortBy, page: 1 }), { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentRequest = ++requestId.current;
    setStatus('loading');
    setError(null);

    getProducts({ filters, sortBy, page, pageSize })
      .then((res) => {
        if (currentRequest !== requestId.current) return; // stale response guard
        setItems(res.items);
        setTotal(res.total);
        setStatus('success');
      })
      .catch((err) => {
        if (currentRequest !== requestId.current) return;
        setError(err);
        setStatus('error');
      });
  }, [filters, sortBy, page, pageSize]);

  function updateFilters(partial) {
    const nextFilters = { ...filters, ...partial };
    setSearchParams(writeParams(searchParams, { filters: nextFilters, sortBy, page: 1 }), {
      replace: true,
    });
  }

  function resetFilters() {
    setSearchParams(writeParams(searchParams, { filters: DEFAULT_FILTERS, sortBy, page: 1 }), {
      replace: true,
    });
  }

  function changeSort(nextSortBy) {
    setSearchParams(writeParams(searchParams, { filters, sortBy: nextSortBy, page: 1 }), {
      replace: true,
    });
  }

  function setPage(nextPage) {
    setSearchParams(writeParams(searchParams, { filters, sortBy, page: nextPage }), {
      replace: true,
    });
  }

  function saveFilters() {
    localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(filters));
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    items,
    total,
    totalPages,
    page,
    pageSize,
    setPage,
    sortBy,
    changeSort,
    filters,
    updateFilters,
    resetFilters,
    saveFilters,
    status,
    error,
    isLoading: status === 'loading',
    isEmpty: status === 'success' && items.length === 0,
  };
}
