import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { currency } from '../data/products';
import { site } from '../data/site';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const { items, isOpen, closeCart, setQty, removeItem, subtotal, count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  const remaining = Math.max(0, site.freeDeliveryThreshold - subtotal);
  const progress = Math.min(100, (subtotal / site.freeDeliveryThreshold) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col border-l border-white/10 bg-[#0c0c0c]"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="font-display text-xl uppercase tracking-wide text-white">Your Cart</h2>
                <p className="mt-0.5 text-[11px] text-muted/60">
                  {count} item{count === 1 ? '' : 's'} ready to go
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:text-brand"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white/40">
                  <ShoppingCart className="h-7 w-7" />
                </span>
                <p className="text-sm text-muted">Your cart is empty — time to fix that.</p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    navigate('/menu');
                  }}
                  className="btn-brand"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-[68px] w-[68px] shrink-0 rounded-lg object-cover"
                        />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-[13px] font-semibold text-white">{item.name}</p>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="text-white/35 transition-colors hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-0.5 text-[11px] text-muted/60">{currency(item.price)} each</p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full border border-white/15">
                              <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty - 1)}
                                aria-label={`Decrease ${item.name} quantity`}
                                className="flex h-8 w-8 items-center justify-center text-white/70 transition-colors hover:text-brand"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-[12px] font-semibold text-white">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty + 1)}
                                aria-label={`Increase ${item.name} quantity`}
                                className="flex h-8 w-8 items-center justify-center text-white/70 transition-colors hover:text-brand"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-[13px] font-semibold text-brand">
                              {currency(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <footer className="border-t border-white/10 px-6 py-5">
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] text-muted/70">
                      <span>
                        {remaining > 0
                          ? `Add ${currency(remaining)} for free delivery`
                          : 'Free delivery unlocked 🎉'}
                      </span>
                      <span>{currency(Math.min(subtotal, site.freeDeliveryThreshold))}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-brand transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/50">Subtotal</span>
                    <span className="font-display text-2xl text-white">{currency(subtotal)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      navigate('/checkout');
                    }}
                    className="btn-brand w-full justify-between px-6"
                  >
                    Checkout
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-center text-[10px] text-white/30">
                    Delivery &amp; discount calculated at checkout
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
