import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { formatPrice, type Product } from '../data/menu';
import { photo } from '../data/images';

type ProductCardProps = {
  product: Product;
  onAdd: () => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1100);
    return () => window.clearTimeout(timer);
  }, [added]);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-brand-charcoal transition-[box-shadow,border-color] duration-300 hover:border-brand-red/40 hover:shadow-[0_26px_54px_-26px_rgba(198,0,0,0.75)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={photo(product.image, 700)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/10 to-transparent" />
        {product.badge && (
          <span className="absolute right-3 top-3 grid h-14 w-14 place-items-center rounded-full bg-brand-orange text-center text-[9px] font-bold uppercase leading-tight tracking-wide text-brand-black shadow-glow-orange">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight text-white">{product.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/45">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3 pt-1">
          <span className="font-display text-2xl tracking-wide text-brand-orange">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`grid h-11 w-11 place-items-center rounded-full text-brand-black shadow-glow-orange transition-all duration-300 hover:scale-105 hover:bg-brand-amber ${
              added ? 'bg-brand-amber' : 'bg-brand-orange'
            }`}
          >
            <motion.span
              key={added ? 'added' : 'add'}
              initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.22 }}
              className="grid place-items-center"
            >
              {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </motion.span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
