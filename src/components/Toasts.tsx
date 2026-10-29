import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Toasts() {
  const { toasts } = useCart();

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-6 sm:translate-x-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 rounded-xl border border-brand/40 bg-[#121212]/95 px-4 py-3 text-sm text-white shadow-card backdrop-blur"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            {toast.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
