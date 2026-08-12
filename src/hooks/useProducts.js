import { useEffect, useRef, useState } from 'react';
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

export function useProducts({ pageSize = 12 } = {}) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState('relevance');
  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  const requestId = useRef(0);

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
    setPage(1);
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  function resetFilters() {
    setPage(1);
    setFilters(DEFAULT_FILTERS);
  }

  function changeSort(nextSortBy) {
    setPage(1);
    setSortBy(nextSortBy);
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
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
    status,
    error,
    isLoading: status === 'loading',
    isEmpty: status === 'success' && items.length === 0,
  };
}
