import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { ShopProvider } from './context/ShopContext';
import { PRODUCTS } from './data/products';

function renderApp() {
  render(
    <MemoryRouter>
      <ShopProvider>
        <App />
      </ShopProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe('App recently viewed section', () => {
  it('does not render a Recently Viewed section when none have been viewed', async () => {
    renderApp();

    await waitFor(() => expect(screen.queryByText('Loading product…')).not.toBeInTheDocument());
    expect(screen.queryByText('Recently Viewed')).not.toBeInTheDocument();
  });

  it('shows viewed products on the PLP after a recorded view', async () => {
    const [firstProduct] = PRODUCTS;
    localStorage.setItem('plp:recentlyViewed', JSON.stringify([firstProduct.id]));

    renderApp();

    const section = await screen.findByText('Recently Viewed');
    const grid = section.closest('.recently-viewed');
    expect(within(grid).getByText(firstProduct.name)).toBeInTheDocument();
  });

  it('silently drops stale product ids that no longer exist in the catalog', async () => {
    const [firstProduct] = PRODUCTS;
    localStorage.setItem(
      'plp:recentlyViewed',
      JSON.stringify(['this-id-does-not-exist', firstProduct.id])
    );

    renderApp();

    const section = await screen.findByText('Recently Viewed');
    const grid = section.closest('.recently-viewed');
    expect(within(grid).getByText(firstProduct.name)).toBeInTheDocument();
    expect(within(grid).getAllByRole('article')).toHaveLength(1);
  });
});
