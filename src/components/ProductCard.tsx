import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { currency, type Product } from '../data/products';
import { useCart } from '../context/CartContext';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-2 hover:border-brand/45 hover:shadow-[0_30px_60px_-30px_rgba(255,152,0,0.55)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#101010]">
        <img
          src={product.image}
          alt={`${product.name} — ${product.description}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />

        {product.badge && (
          <span className="absolute -right-1 top-3 flex h-16 w-16 rotate-[-10deg] flex-col items-center justify-center rounded-full bg-brand text-center text-ink shadow-glow">
            <span className="text-[7px] font-extrabold uppercase leading-[1.05] tracking-[0.08em]">
              {product.badge.split(' ').join(' ')}
            </span>
            <span className="mt-0.5 text-[9px]">★★★★★</span>
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-5 pb-6">
        <h3 className="text-[15px] font-semibold text-white">{product.name}</h3>
        <p className="mt-1.5 pr-12 text-[12px] leading-relaxed text-muted/80">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl text-brand">{currency(product.price)}</span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">Add to order</span>
        </div>

        <button
          type="button"
          onClick={() => addItem(product)}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-5 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-ink transition-all duration-300 hover:scale-110 hover:bg-gold hover:shadow-glow active:scale-95"
        >
          <Plus className="h-5 w-5" strokeWidth={2.8} />
        </button>
      </div>
    </motion.article>
  );
}
