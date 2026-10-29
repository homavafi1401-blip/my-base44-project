export type CategoryId = 'burgers' | 'fries' | 'pizza' | 'drinks' | 'chicken' | 'desserts';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryId;
  badge?: string;
};

/** Unsplash delivery helper — keeps every photo on a single, editable pattern. */
export const photo = (id: string, width = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const categories: {
  id: CategoryId;
  title: string;
  tagline: string;
  icon: 'burger' | 'fries' | 'pizza' | 'drink' | 'chicken' | 'dessert';
}[] = [
  { id: 'burgers', title: 'BURGERS', tagline: 'Juicy & Cheesy', icon: 'burger' },
  { id: 'fries', title: 'FRIES', tagline: 'Crispy & Golden', icon: 'fries' },
  { id: 'pizza', title: 'PIZZA', tagline: 'Hot & Delicious', icon: 'pizza' },
  { id: 'drinks', title: 'DRINKS', tagline: 'Chill & Refreshing', icon: 'drink' },
  { id: 'chicken', title: 'CHICKEN', tagline: 'Crispy & Spicy', icon: 'chicken' },
  { id: 'desserts', title: 'DESSERTS', tagline: 'Sweet Treats', icon: 'dessert' },
];

export const products: Product[] = [
  // Burgers
  {
    id: 'signature-burger',
    name: 'Signature Burger',
    description: 'Loaded with cheese & special sauce',
    price: 5.49,
    image: photo('1568901346375-23c9450c58cd'),
    category: 'burgers',
    badge: 'BEST SELLER',
  },
  {
    id: 'double-smash',
    name: 'Double Smash',
    description: 'Two smashed patties, molten cheddar',
    price: 6.99,
    image: photo('1553979459-d2229ba7433b'),
    category: 'burgers',
  },
  {
    id: 'bbq-bacon-burger',
    name: 'BBQ Bacon Burger',
    description: 'Smoky bacon, crispy onions & BBQ glaze',
    price: 7.49,
    image: photo('1550317138-10000687a72b'),
    category: 'burgers',
  },
  {
    id: 'classic-cheeseburger',
    name: 'Classic Cheeseburger',
    description: 'Grilled beef, pickles & American cheese',
    price: 4.99,
    image: photo('1571091718767-18b5b1457add'),
    category: 'burgers',
  },
  // Pizza
  {
    id: 'cheesy-pizza',
    name: 'Cheesy Pizza',
    description: 'Fresh veggies, Italian herbs & cheese',
    price: 8.49,
    image: photo('1513104890138-7c749659a591'),
    category: 'pizza',
    badge: 'BEST SELLER',
  },
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    description: 'Double pepperoni on a stone-baked base',
    price: 9.49,
    image: photo('1565299624946-b28f40a0ae38'),
    category: 'pizza',
  },
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    description: 'San Marzano tomato, basil & mozzarella',
    price: 7.99,
    image: photo('1574071318508-1cdbab80d002'),
    category: 'pizza',
  },
  // Chicken
  {
    id: 'crispy-chicken',
    name: 'Crispy Chicken',
    description: 'Golden fried & perfectly seasoned',
    price: 5.99,
    image: photo('1562967914-608f82629710'),
    category: 'chicken',
    badge: 'BEST SELLER',
  },
  {
    id: 'spicy-wings',
    name: 'Spicy Wings',
    description: 'Crispy wings tossed in hot honey',
    price: 6.49,
    image: photo('1608039755401-742074f0548d'),
    category: 'chicken',
  },
  {
    id: 'chicken-sandwich',
    name: 'Chicken Bucket',
    description: 'Crispy pieces & house dipping sauce',
    price: 6.99,
    image: photo('1626645738196-c2a7c87a8f58'),
    category: 'chicken',
  },
  // Fries
  {
    id: 'loaded-fries',
    name: 'Loaded Fries',
    description: 'Crispy fries with cheese & sauce',
    price: 2.99,
    image: photo('1573080496219-bb080dd4f877'),
    category: 'fries',
    badge: 'BEST SELLER',
  },
  {
    id: 'classic-fries',
    name: 'Classic Fries',
    description: 'Sea-salted, skin-on & twice fried',
    price: 2.49,
    image: photo('1630384060421-cb20d0e0649d'),
    category: 'fries',
  },
  {
    id: 'cheese-fries',
    name: 'Skin-On Fries',
    description: 'Twice fried, sea salted & ketchup',
    price: 3.99,
    image: photo('1518013431117-eb1465fa5752'),
    category: 'fries',
  },
  // Drinks
  {
    id: 'cola',
    name: 'Signature Cola',
    description: 'Ice cold, extra fizzy & refreshing',
    price: 1.99,
    image: photo('1554866585-cd94860890b7'),
    category: 'drinks',
  },
  {
    id: 'iced-tea',
    name: 'Iced Lemon Tea',
    description: 'Fresh lemon, brewed black tea & mint',
    price: 2.29,
    image: photo('1621263764928-df1444c5e859'),
    category: 'drinks',
  },
  {
    id: 'chocolate-shake',
    name: 'Chocolate Shake',
    description: 'Thick shake, cocoa & whipped cream',
    price: 3.49,
    image: photo('1553787499-6f9133860278'),
    category: 'drinks',
  },
  // Desserts
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    description: 'Warm fudge brownie & vanilla cream',
    price: 3.99,
    image: photo('1606313564200-e75d5e30476c'),
    category: 'desserts',
  },
  {
    id: 'buttermilk-pancakes',
    name: 'Buttermilk Pancakes',
    description: 'Fluffy stack, maple & banana',
    price: 2.99,
    image: photo('1567620905732-2d1ec7ab7445'),
    category: 'desserts',
  },
  {
    id: 'vanilla-ice-cream',
    name: 'Vanilla Ice Cream',
    description: 'Madagascar vanilla, caramel drizzle',
    price: 3.49,
    image: photo('1497034825429-c343d7c6a68f'),
    category: 'desserts',
  },
];

export const bestsellers = [
  'signature-burger',
  'cheesy-pizza',
  'crispy-chicken',
  'loaded-fries',
]
  .map((id) => products.find((p) => p.id === id)!)
  .filter(Boolean);

/** Hero art direction — the three floating products from the reference. */
export const heroImages = {
  burger: photo('1568901346375-23c9450c58cd', 1200),
  fries: photo('1630384060421-cb20d0e0649d', 600),
  drink: photo('1554866585-cd94860890b7', 600),
  scooter: photo('1526367790999-0150786686a2', 900),
};

export const currency = (value: number) =>
  `$${value.toFixed(2)}`;
