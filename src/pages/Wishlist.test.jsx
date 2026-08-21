import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Wishlist from './Wishlist';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

vi.mock('../context/ShopContext', () => ({
  useShop: vi.fn(),
}));

function renderWishlist(wishlist, toggleWishlist = vi.fn()) {
  useShop.mockReturnValue({ wishlist, toggleWishlist, addToCart: vi.fn() });

  render(
    <MemoryRouter>
      <Wishlist />
    </MemoryRouter>
  );

  return { toggleWishlist };
}

beforeEach(() => {
  useShop.mockReset();
});

describe('Wishlist', () => {
  it('shows the empty state when there are no wishlisted products', () => {
    renderWishlist([]);

    expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument();
    expect(screen.getByText('0 items saved')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Continue shopping' })).toHaveAttribute('href', '/');
  });

  it('renders the wishlisted products', () => {
    renderWishlist(['p01', 'p02']);

    expect(screen.getByText('Aria Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Pulse Fitness Smartwatch')).toBeInTheDocument();
    expect(screen.queryByText('Your wishlist is empty')).not.toBeInTheDocument();
  });

  it('shows a singular item count when exactly one product is wishlisted', () => {
    renderWishlist(['p01']);

    expect(screen.getByText('1 item saved')).toBeInTheDocument();
  });

  it('shows a plural item count when multiple products are wishlisted', () => {
    renderWishlist(['p01', 'p02']);

    expect(screen.getByText('2 items saved')).toBeInTheDocument();
  });

  it('ignores wishlisted ids that no longer match a product', () => {
    renderWishlist(['p01', 'does-not-exist']);

    expect(screen.getByText('Aria Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('1 item saved')).toBeInTheDocument();
  });

  it('calls toggleWishlist with the product id when a card wishlist button is removed', async () => {
    const { toggleWishlist } = renderWishlist(['p01']);

    await userEvent.click(screen.getByRole('button', { name: 'Remove from wishlist' }));

    expect(toggleWishlist).toHaveBeenCalledWith('p01');
  });

  it('links each wishlisted product to its product detail page', () => {
    const product = PRODUCTS.find((p) => p.id === 'p01');
    renderWishlist(['p01']);

    const links = screen.getAllByRole('link', { name: product.name });
    expect(links[0]).toHaveAttribute('href', '/product/p01');
  });
});
