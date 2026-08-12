import './Breadcrumb.css';

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.label}>
              {isLast ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <>
                  <a href={item.href || '#'}>{item.label}</a>
                  <span className="breadcrumb__sep" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
