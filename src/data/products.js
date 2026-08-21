import { placeholderImage } from '../utils/placeholderImage';

// Mock catalog. In a real app this would come from a backend/CMS —
// see src/services/productService.js for the seam where that swap happens.
const RAW_PRODUCTS = [
  { id: 'p01', name: 'Aria Wireless Headphones', brand: 'Sonik', category: 'Electronics', price: 129.99, originalPrice: 179.99, rating: 4.6, reviews: 812, inStock: true, isNew: true },
  { id: 'p02', name: 'Pulse Fitness Smartwatch', brand: 'Sonik', category: 'Electronics', price: 89.5, originalPrice: 89.5, rating: 4.2, reviews: 341, inStock: true, isNew: false },
  { id: 'p03', name: 'UltraSlim 14" Laptop Sleeve', brand: 'Carryon', category: 'Electronics', price: 24.99, originalPrice: 34.99, rating: 4.4, reviews: 156, inStock: true, isNew: false },
  { id: 'p04', name: 'BassBoost Portable Speaker', brand: 'Sonik', category: 'Electronics', price: 59.0, originalPrice: 59.0, rating: 3.9, reviews: 98, inStock: false, isNew: false },
  { id: 'p05', name: 'ClearView 27" Monitor', brand: 'Displex', category: 'Electronics', price: 219.0, originalPrice: 259.0, rating: 4.7, reviews: 502, inStock: true, isNew: false },
  { id: 'p06', name: 'Mechanical Keyboard RGB', brand: 'Keytron', category: 'Electronics', price: 74.99, originalPrice: 99.99, rating: 4.5, reviews: 674, inStock: true, isNew: true },
  { id: 'p07', name: 'Classic Denim Jacket', brand: 'Urban Thread', category: 'Fashion', price: 64.0, originalPrice: 64.0, rating: 4.1, reviews: 210, inStock: true, isNew: false },
  { id: 'p08', name: 'Everyday Running Sneakers', brand: 'Strydr', category: 'Fashion', price: 79.99, originalPrice: 99.99, rating: 4.3, reviews: 980, inStock: true, isNew: false },
  { id: 'p09', name: 'Minimal Leather Wallet', brand: 'Urban Thread', category: 'Fashion', price: 34.5, originalPrice: 34.5, rating: 4.0, reviews: 88, inStock: true, isNew: false },
  { id: 'p10', name: 'Merino Wool Sweater', brand: 'Northloom', category: 'Fashion', price: 89.0, originalPrice: 120.0, rating: 4.8, reviews: 421, inStock: true, isNew: true },
  { id: 'p11', name: 'Polarized Aviator Sunglasses', brand: 'Solaire', category: 'Fashion', price: 45.0, originalPrice: 60.0, rating: 4.2, reviews: 302, inStock: false, isNew: false },
  { id: 'p12', name: 'Ceramic Nonstick Cookware Set', brand: 'HearthPro', category: 'Home & Kitchen', price: 149.99, originalPrice: 199.99, rating: 4.6, reviews: 267, inStock: true, isNew: false },
  { id: 'p13', name: 'Cold Brew Coffee Maker', brand: 'BrewCraft', category: 'Home & Kitchen', price: 39.99, originalPrice: 39.99, rating: 4.4, reviews: 189, inStock: true, isNew: true },
  { id: 'p14', name: 'Aromatherapy Diffuser', brand: 'HearthPro', category: 'Home & Kitchen', price: 27.5, originalPrice: 35.0, rating: 3.8, reviews: 143, inStock: true, isNew: false },
  { id: 'p15', name: 'Memory Foam Pillow Set', brand: 'Restwell', category: 'Home & Kitchen', price: 42.0, originalPrice: 55.0, rating: 4.5, reviews: 356, inStock: true, isNew: false },
  { id: 'p16', name: 'Stainless Steel Knife Block', brand: 'BrewCraft', category: 'Home & Kitchen', price: 68.0, originalPrice: 68.0, rating: 4.1, reviews: 76, inStock: false, isNew: false },
  { id: 'p17', name: 'Hydrating Vitamin C Serum', brand: 'Glowie', category: 'Beauty', price: 22.0, originalPrice: 28.0, rating: 4.7, reviews: 1204, inStock: true, isNew: false },
  { id: 'p18', name: 'Matte Finish Lipstick Trio', brand: 'Glowie', category: 'Beauty', price: 18.5, originalPrice: 18.5, rating: 4.3, reviews: 289, inStock: true, isNew: true },
  { id: 'p19', name: 'Argan Oil Hair Mask', brand: 'PureRoot', category: 'Beauty', price: 15.99, originalPrice: 21.99, rating: 4.0, reviews: 167, inStock: true, isNew: false },
  { id: 'p20', name: 'Mineral Sunscreen SPF 50', brand: 'PureRoot', category: 'Beauty', price: 19.0, originalPrice: 19.0, rating: 4.6, reviews: 533, inStock: true, isNew: false },
  { id: 'p21', name: 'Adjustable Dumbbell Set', brand: 'Ironclad', category: 'Sports', price: 159.0, originalPrice: 199.0, rating: 4.5, reviews: 244, inStock: true, isNew: false },
  { id: 'p22', name: 'Yoga Mat Pro', brand: 'Ironclad', category: 'Sports', price: 29.99, originalPrice: 39.99, rating: 4.4, reviews: 612, inStock: true, isNew: true },
  { id: 'p23', name: 'Insulated Water Bottle 32oz', brand: 'TrailGear', category: 'Sports', price: 21.5, originalPrice: 21.5, rating: 4.8, reviews: 890, inStock: true, isNew: false },
  { id: 'p24', name: 'Trail Running Backpack 20L', brand: 'TrailGear', category: 'Sports', price: 54.0, originalPrice: 72.0, rating: 4.2, reviews: 133, inStock: false, isNew: false },
];

export const PRODUCTS = RAW_PRODUCTS.map((p) => {
  const images = [
    placeholderImage(p.id, p.name),
    placeholderImage(`${p.id}-2`, p.name),
    placeholderImage(`${p.id}-3`, p.name),
    placeholderImage(`${p.id}-4`, p.name),
  ];

  return {
    ...p,
    image: images[0],
    images,
    discountPercent:
      p.originalPrice > p.price
        ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
        : 0,
  };
});

export const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];
export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];
export const PRICE_BOUNDS = {
  min: Math.floor(Math.min(...PRODUCTS.map((p) => p.price))),
  max: Math.ceil(Math.max(...PRODUCTS.map((p) => p.price))),
};
