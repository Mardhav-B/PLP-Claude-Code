import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article
      className={`product-card ${!product.inStock ? "product-card--out" : ""}`}
    >
      <div className="product-card__media">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>

        {product.discountPercent > 0 && (
          <span className="product-card__badge product-card__badge--sale">
            -{product.discountPercent}%
          </span>
        )}
        {product.isNew && (
          <span className="product-card__badge product-card__badge--new">
            New
          </span>
        )}

        <button
          className={`product-card__wishlist ${isWishlisted ? "product-card__wishlist--active" : ""}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 20
     C10.5 19 3 14.3 2.5 9
     C2.2 5.8 4.2 4 6.5 4
     C9 4 10.8 5.6 12 7.5
     C13.2 5.6 15 4 17.5 4
     C19.8 4 21.8 5.8 21.5 9
     C21 14.3 13.5 19 12 20Z"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {!product.inStock && (
          <div className="product-card__overlay">Out of stock</div>
        )}
      </div>

      <div className="product-card__body">
        <p className="product-card__brand">{product.brand}</p>
        <h3 className="product-card__name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="product-card__rating">
          <span className="product-card__stars" aria-hidden="true">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}
          </span>
          <span className="product-card__rating-value">
            {product.rating.toFixed(1)}
          </span>
          <span className="product-card__reviews">({product.reviews})</span>
        </div>

        <div className="product-card__price-row">
          <span className="product-card__price">
            {formatCurrency(product.price)}
          </span>
          {product.discountPercent > 0 && (
            <span className="product-card__original-price">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          className="product-card__add-btn"
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
        >
          {product.inStock ? "Add to Cart" : "Notify Me"}
        </button>
      </div>
    </article>
  );
}
