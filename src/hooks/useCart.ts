import { useMemo, useState } from 'react';
import type { Product } from '../data/menu';
import { site } from '../data/site';

type CartLine = { id: string; qty: number };

export function useCart(catalog: Product[]) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);

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
  const discountRate = coupon ? site.couponDiscount : 0;
  const discount = Math.round(subtotal * discountRate * 100) / 100;
  const total = Math.round((subtotal - discount) * 100) / 100;

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

  /** Returns true when the code matches the configured coupon. */
  const applyCoupon = (input: string) => {
    if (input.trim().toUpperCase() !== site.couponCode) return false;
    setCoupon(site.couponCode);
    return true;
  };

  const removeCoupon = () => setCoupon(null);

  return {
    items,
    count,
    subtotal,
    discount,
    discountRate,
    total,
    coupon,
    add,
    setQty,
    remove,
    clear,
    applyCoupon,
    removeCoupon,
  };
}

export type Cart = ReturnType<typeof useCart>;
