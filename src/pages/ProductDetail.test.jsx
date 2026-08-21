import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { useShop } from '../context/ShopContext';
import { getProductById } from '../services/productService';

vi.mock('../context/ShopContext', () => ({
  useShop: vi.fn(),
}));

vi.mock('../services/productService', () => ({
  getProductById: vi.fn(),
}));

const product = {
  id: 'p1',
  name: 'Wireless Headphones',
  brand: 'Acme',
  category: 'Electronics',
  image: '/img/p1.jpg',
  images: ['/img/p1.jpg'],
  price: 49.99,
  originalPrice: 49.99,
  discountPercent: 0,
  isNew: false,
  inStock: true,
  rating: 4,
  reviews: 128,
};

const otherProduct = { ...product, id: 'p2', name: 'Fitness Smartwatch' };

function renderProductDetail(id, shopOverrides = {}) {
  const shop = {
    addToCart: vi.fn(),
    wishlist: [],
    toggleWishlist: vi.fn(),
    recordView: vi.fn(),
    ...shopOverrides,
  };
  useShop.mockReturnValue(shop);

  const view = render(
    <MemoryRouter initialEntries={[`/product/${id}`]}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>
  );

  return { shop, unmount: view.unmount };
}

beforeEach(() => {
  useShop.mockReset();
  getProductById.mockReset();
});

describe('ProductDetail recordView', () => {
  it('calls recordView with the loaded product id once the product loads', async () => {
    getProductById.mockResolvedValue(product);
    const { shop } = renderProductDetail('p1');

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wireless Headphones')
    );

    expect(shop.recordView).toHaveBeenCalledWith('p1');
    expect(shop.recordView).toHaveBeenCalledTimes(1);
  });

  it('does not call recordView while the product is still loading', () => {
    getProductById.mockReturnValue(new Promise(() => {}));
    const { shop } = renderProductDetail('p1');

    expect(screen.getByText('Loading product…')).toBeInTheDocument();
    expect(shop.recordView).not.toHaveBeenCalled();
  });

  it('does not call recordView when the product is not found', async () => {
    getProductById.mockResolvedValue(null);
    const { shop } = renderProductDetail('missing');

    await waitFor(() => expect(screen.getByText('Product not found.')).toBeInTheDocument());

    expect(shop.recordView).not.toHaveBeenCalled();
  });

  it('records each product id independently when visiting different PDPs', async () => {
    getProductById.mockImplementation((id) =>
      Promise.resolve(id === 'p1' ? product : otherProduct)
    );

    const { shop: shopA, unmount } = renderProductDetail('p1');
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wireless Headphones')
    );
    expect(shopA.recordView).toHaveBeenCalledWith('p1');
    expect(shopA.recordView).toHaveBeenCalledTimes(1);
    unmount();

    const { shop: shopB } = renderProductDetail('p2');
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fitness Smartwatch')
    );
    expect(shopB.recordView).toHaveBeenCalledWith('p2');
    expect(shopB.recordView).toHaveBeenCalledTimes(1);
  });
});
