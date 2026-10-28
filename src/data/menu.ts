import { images } from './images';

export type CategoryId = 'burgers' | 'fries' | 'pizza' | 'drinks' | 'chicken' | 'desserts';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: keyof typeof images;
  /** Featured items are the bestsellers shown in the default grid row. */
  featured?: boolean;
  badge?: string;
};

export type CategoryIcon = 'burger' | 'fries' | 'pizza' | 'drink' | 'chicken' | 'dessert';

export type Category = {
  id: CategoryId;
  title: string;
  caption: string;
  icon: CategoryIcon;
};

export const categories: Category[] = [
  { id: 'burgers', title: 'Burgers', caption: 'Juicy & Cheesy', icon: 'burger' },
  { id: 'fries', title: 'Fries', caption: 'Crispy & Golden', icon: 'fries' },
  { id: 'pizza', title: 'Pizza', caption: 'Hot & Delicious', icon: 'pizza' },
  { id: 'drinks', title: 'Drinks', caption: 'Chill & Refreshing', icon: 'drink' },
  { id: 'chicken', title: 'Chicken', caption: 'Crispy & Spicy', icon: 'chicken' },
  { id: 'desserts', title: 'Desserts', caption: 'Sweet Treats', icon: 'dessert' },
];

export const products: Product[] = [
  {
    id: 'signature-burger',
    name: 'Signature Burger',
    description: 'Loaded with cheese & special sauce',
    price: 5.49,
    category: 'burgers',
    image: 'burger',
    featured: true,
    badge: 'Best Seller',
  },
  {
    id: 'cheesy-pizza',
    name: 'Cheesy Pizza',
    description: 'Fresh veggies, Italian herbs & cheese',
    price: 8.49,
    category: 'pizza',
    image: 'pizza',
    featured: true,
  },
  {
    id: 'crispy-chicken',
    name: 'Crispy Chicken',
    description: 'Golden fried & perfectly seasoned',
    price: 5.99,
    category: 'chicken',
    image: 'chicken',
    featured: true,
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Fries',
    description: 'Crispy fries with cheese & sauce',
    price: 2.99,
    category: 'fries',
    image: 'fries',
    featured: true,
  },
  {
    id: 'ice-cold-cola',
    name: 'Ice Cold Cola',
    description: 'Served chilled with crushed ice',
    price: 2.49,
    category: 'drinks',
    image: 'drink',
  },
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    description: 'Warm fudge brownie & chocolate sauce',
    price: 3.99,
    category: 'desserts',
    image: 'dessert',
  },
];

export const formatPrice = (value: number) => `$${value.toFixed(2)}`;
