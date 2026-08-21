import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RecentlyViewed from './RecentlyViewed';
import { useShop } from '../../context/ShopContext';

vi.mock('../../context/ShopContext', () => ({
  useShop: vi.fn(),
}));

const productA = {
  id: 'p1',
  name: 'Wireless Headphones',
  brand: 'Acme',
  image: '/img/p1.jpg',
  price: 49.99,
  originalPrice: 49.99,
  discountPercent: 0,
  isNew: false,
  inStock: true,
  rating: 4,
  reviews: 128,
};

const productB = {
  id: 'p2',
  name: 'Fitness Smartwatch',
  brand: 'Sonik',
  image: '/img/p2.jpg',
  price: 89.5,
  originalPrice: 89.5,
  discountPercent: 0,
  isNew: false,
  inStock: true,
  rating: 4.2,
  reviews: 341,
};

function renderRecentlyViewed(products, onClear = vi.fn()) {
  useShop.mockReturnValue({ addToCart: vi.fn(), wishlist: [], toggleWishlist: vi.fn() });

  render(
    <MemoryRouter>
      <RecentlyViewed products={products} onClear={onClear} />
    </MemoryRouter>
  );

  return onClear;
}

beforeEach(() => {
  useShop.mockReset();
});

describe('RecentlyViewed', () => {
  it('renders nothing when there are no products', () => {
    const { container } = render(
      <MemoryRouter>
        <RecentlyViewed products={[]} onClear={vi.fn()} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders a heading and the given products when non-empty', () => {
    renderRecentlyViewed([productA, productB]);

    expect(screen.getByText('Recently Viewed')).toBeInTheDocument();
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Fitness Smartwatch')).toBeInTheDocument();
  });

  it('renders products in the order given', () => {
    renderRecentlyViewed([productB, productA]);

    const names = screen.getAllByRole('heading', { level: 3 }).map((el) => el.textContent);
    expect(names).toEqual(['Fitness Smartwatch', 'Wireless Headphones']);
  });

  it('calls onClear when the Clear button is clicked', async () => {
    const onClear = renderRecentlyViewed([productA], vi.fn());

    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('does not call onClear on render', () => {
    const onClear = renderRecentlyViewed([productA], vi.fn());

    expect(onClear).not.toHaveBeenCalled();
  });
});
