/**
 * Photography sources. Each value is an Unsplash photo id; swap an id to change
 * a photo without touching any component.
 */
export const images = {
  burger: 'photo-1568901346375-23c9450c58cd',
  pizza: 'photo-1513104890138-7c749659a591',
  chicken: 'photo-1426869981800-95ebf51ce900',
  fries: 'photo-1630384060421-cb20d0e0649d',
  drink: 'photo-1629654613528-5d0a2e4166de',
  dessert: 'photo-1606313564200-e75d5e30476c',
  delivery: 'photo-1605478767305-94d9dadcc460',
} as const;

export type ImageKey = keyof typeof images;

export const photo = (key: ImageKey, width = 900) =>
  `https://images.unsplash.com/${images[key]}?auto=format&fit=crop&q=80&w=${width}`;
