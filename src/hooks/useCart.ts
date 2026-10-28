import { useMemo, useState } from 'react';
import type { Product } from '../data/menu';

type CartLine = { id: string; qty: number };

export function useCart(catalog: Product[]) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = catalog.find((p) => p.id === line.id);
          return product ? { product, qty: line.qty } : null;
        })
        .filter((item): item is { product: Product; qty: number } => item !== null),
    [lines, catalog]
  );

  const count = items.reduce((total, item) => total + item.qty, 0);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.qty, 0);

  const add = (id: string) =>
    setLines((prev) => {
      const existing = prev.find((line) => line.id === id);
      if (existing) {
        return prev.map((line) => (line.id === id ? { ...line, qty: line.qty + 1 } : line));
      }
      return [...prev, { id, qty: 1 }];
    });

  const setQty = (id: string, qty: number) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((line) => line.id !== id)
        : prev.map((line) => (line.id === id ? { ...line, qty } : line))
    );

  const remove = (id: string) => setLines((prev) => prev.filter((line) => line.id !== id));
  const clear = () => setLines([]);

  return { items, count, subtotal, add, setQty, remove, clear };
}

export type Cart = ReturnType<typeof useCart>;
