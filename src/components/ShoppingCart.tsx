import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { ordering } from '../config';
import { formatPrice } from '../data/menu';
import { photo } from '../data/images';
import type { Cart } from '../hooks/useCart';

type ShoppingCartProps = {
  open: boolean;
  onClose: () => void;
  cart: Cart;
};

export default function ShoppingCart({ open, onClose, cart }: ShoppingCartProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const handleCheckout = () => {
    if (ordering.url) window.open(ordering.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70]"
          role="presentation"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-brand-charcoal shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-orange/15">
                  <ShoppingBag className="h-5 w-5 text-brand-orange" />
                </span>
                <div>
                  <p className="font-display text-xl uppercase tracking-wide text-white">
                    Your Order
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                    {cart.count} item{cart.count === 1 ? '' : 's'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {cart.items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/5">
                  <ShoppingBag className="h-7 w-7 text-white/30" />
                </span>
                <p className="text-sm text-white/50">
                  Your cart is empty. Add something delicious from the menu.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-red"
                >
                  Browse the menu
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-5">
                  {cart.items.map(({ product, qty }) => (
                    <li
                      key={product.id}
                      className="flex gap-3 border-b border-white/10 py-4 last:border-b-0"
                    >
                      <img
                        src={photo(product.image, 200)}
                        alt={product.name}
                        loading="lazy"
                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-white">{product.name}</p>
                          <button
                            type="button"
                            onClick={() => cart.remove(product.id)}
                            aria-label={`Remove ${product.name} from cart`}
                            className="text-white/35 transition-colors hover:text-brand-red"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs font-semibold text-brand-orange">
                          {formatPrice(product.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => cart.setQty(product.id, qty - 1)}
                            aria-label={`Decrease quantity of ${product.name}`}
                            className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-orange hover:text-brand-orange"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-white">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => cart.setQty(product.id, qty + 1)}
                            aria-label={`Increase quantity of ${product.name}`}
                            className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-orange hover:text-brand-orange"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <p className="w-16 shrink-0 text-right text-sm font-semibold text-white">
                        {formatPrice(product.price * qty)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 px-5 py-5">
                  <div className="flex items-center justify-between text-sm text-white/50">
                    <span>Subtotal</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                      Total
                    </span>
                    <span className="font-display text-2xl text-brand-orange">
                      {formatPrice(cart.subtotal)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="mt-4 w-full rounded-full bg-brand-orange px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-glow-orange transition-colors hover:bg-brand-red"
                  >
                    {ordering.url ? ordering.label : 'Checkout Coming Soon'}
                  </button>
                  {!ordering.url && (
                    <p className="mt-3 text-center text-[11px] leading-relaxed text-white/35">
                      {ordering.placeholderNote}
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
