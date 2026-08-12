import './Pagination.css';

function getPageList(page, totalPages) {
  const pages = new Set([1, totalPages, page, page - 1, page + 1]);
  return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = getPageList(page, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>

      {pages.map((p, i) => (
        <span key={p} style={{ display: 'contents' }}>
          {i > 0 && p - pages[i - 1] > 1 && <span className="pagination__ellipsis">…</span>}
          <button
            className={p === page ? 'pagination__page pagination__page--active' : 'pagination__page'}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        </span>
      ))}

      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </nav>
  );
}
