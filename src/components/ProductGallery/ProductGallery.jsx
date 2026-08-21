import { useState } from 'react';
import './ProductGallery.css';

export default function ProductGallery({ images, name, children }) {
  const gallery = images && images.length > 0 ? images : [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = gallery[selectedIndex] ?? gallery[0];

  return (
    <div className="pdp__media">
      <img src={activeImage} alt={name} />
      {children}

      {gallery.length > 1 && (
        <div className="product-gallery__thumbs" role="group" aria-label={`${name} images`}>
          {gallery.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`product-gallery__thumb ${index === selectedIndex ? 'product-gallery__thumb--active' : ''}`}
              aria-pressed={index === selectedIndex}
              aria-label={`View image ${index + 1} of ${name}`}
              onClick={() => setSelectedIndex(index)}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
