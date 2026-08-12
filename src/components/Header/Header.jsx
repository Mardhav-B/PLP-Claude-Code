import { useState } from "react";
import { useShop } from "../../context/ShopContext";
import "./Header.css";

const NAV_LINKS = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Deals",
];

export default function Header({ search, onSearchChange }) {
  const { cartCount, wishlist } = useShop();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__top">
        <button
          className="site-header__burger"
          aria-label="Toggle navigation menu"
          onClick={() => setNavOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <a className="site-header__logo" href="/">
          <span className="site-header__logo-mark">N</span>
          <span className="site-header__logo-text">Nimbus</span>
        </a>

        <div className="site-header__search">
          <svg
            viewBox="0 0 24 24"
            className="site-header__search-icon"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            placeholder="Search products, brands and categories"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search products"
          />
        </div>

        <div className="site-header__actions">
          <button className="site-header__icon-btn" aria-label="Account">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="12"
                cy="8"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="site-header__icon-label">Account</span>
          </button>

          <button
            className="site-header__icon-btn"
            aria-label={`Wishlist, ${wishlist.length} items`}
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
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span className="site-header__icon-label">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="site-header__badge">{wishlist.length}</span>
            )}
          </button>

          <button
            className="site-header__icon-btn"
            aria-label={`Cart, ${cartCount} items`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="20" r="1.5" fill="currentColor" />
              <circle cx="17" cy="20" r="1.5" fill="currentColor" />
            </svg>
            <span className="site-header__icon-label">Cart</span>
            {cartCount > 0 && (
              <span className="site-header__badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <nav
        className={`site-header__nav ${navOpen ? "site-header__nav--open" : ""}`}
      >
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" className="site-header__nav-link">
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}
