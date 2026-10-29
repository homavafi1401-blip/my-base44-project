import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Product } from '../data/products';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type Toast = { id: number; text: string };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toasts: Toast[];
  notify: (text: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'tastybites.cart.v1';

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        item && typeof item.id === 'string' && typeof item.price === 'number' && typeof item.qty === 'number',
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);
  const [isOpen, setIsOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable (private mode) — cart still works in-memory */
    }
  }, [items]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const notify = useCallback((text: string) => {
    const id = ++toastId.current;
    setToasts((current) => [...current, { id, text }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  const addItem = useCallback(
    (product: Product, qty = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) => (item.id === product.id ? { ...item, qty: item.qty + qty } : item));
        }
        return [
          ...current,
          { id: product.id, name: product.name, price: product.price, image: product.image, qty },
        ];
      });
      notify(`${product.name} added to cart`);
    },
    [notify],
  );

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, qty } : item)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((total, item) => total + item.qty, 0);
    const subtotal = items.reduce((total, item) => total + item.qty * item.price, 0);
    return {
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      setQty,
      clearCart,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toasts,
      notify,
    };
  }, [items, isOpen, toasts, addItem, removeItem, setQty, clearCart, notify]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
