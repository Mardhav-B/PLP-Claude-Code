import './CategoryHeader.css';

export default function CategoryHeader({ title, description, count, isLoading }) {
  return (
    <div className="category-header">
      <h1 className="category-header__title">{title}</h1>
      <p className="category-header__description">{description}</p>
      <p className="category-header__count">
        {isLoading ? 'Loading products…' : `${count} ${count === 1 ? 'product' : 'products'} found`}
      </p>
    </div>
  );
}
