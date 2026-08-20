import './CategoryHeader.css';

export default function CategoryHeader({ title, description, count, isLoading }) {
  return (
    <div className="category-header">
      <div className="category-header__heading-row">
        <h1 className="category-header__title">{title}</h1>
        <span className="category-header__count">
          {isLoading ? 'Loading…' : `${count} ${count === 1 ? 'product' : 'products'}`}
        </span>
      </div>
      <p className="category-header__description">{description}</p>
    </div>
  );
}
