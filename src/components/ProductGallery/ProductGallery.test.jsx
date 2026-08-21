import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductGallery from './ProductGallery';

const images = ['/img/p1-1.jpg', '/img/p1-2.jpg', '/img/p1-3.jpg'];

describe('ProductGallery', () => {
  it('renders the first image as the main image', () => {
    render(<ProductGallery images={images} name="Wireless Headphones" />);

    expect(screen.getByRole('img', { name: 'Wireless Headphones' })).toHaveAttribute(
      'src',
      images[0]
    );
  });

  it('renders a thumbnail button for each image', () => {
    render(<ProductGallery images={images} name="Wireless Headphones" />);

    expect(screen.getAllByRole('button')).toHaveLength(images.length);
  });

  it('marks the first thumbnail as active initially', () => {
    render(<ProductGallery images={images} name="Wireless Headphones" />);

    expect(screen.getByRole('button', { name: 'View image 1 of Wireless Headphones' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('switches the main image when a thumbnail is clicked', async () => {
    render(<ProductGallery images={images} name="Wireless Headphones" />);

    await userEvent.click(screen.getByRole('button', { name: 'View image 2 of Wireless Headphones' }));

    expect(screen.getByRole('img', { name: 'Wireless Headphones' })).toHaveAttribute('src', images[1]);
    expect(screen.getByRole('button', { name: 'View image 2 of Wireless Headphones' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'View image 1 of Wireless Headphones' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('does not render a thumbnail strip when there is only one image', () => {
    render(<ProductGallery images={[images[0]]} name="Wireless Headphones" />);

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('falls back to an empty main image without throwing when images is missing', () => {
    expect(() => render(<ProductGallery images={undefined} name="Wireless Headphones" />)).not.toThrow();
  });

  it('resets to the first image when remounted for a different product', async () => {
    const { rerender } = render(<ProductGallery key="p1" images={images} name="Wireless Headphones" />);

    await userEvent.click(screen.getByRole('button', { name: 'View image 2 of Wireless Headphones' }));
    expect(screen.getByRole('img', { name: 'Wireless Headphones' })).toHaveAttribute('src', images[1]);

    rerender(<ProductGallery key="p2" images={images} name="Wireless Headphones" />);

    expect(screen.getByRole('img', { name: 'Wireless Headphones' })).toHaveAttribute('src', images[0]);
  });
});
