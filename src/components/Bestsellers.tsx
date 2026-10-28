import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import ProductCard from './ProductCard';
import { categories, products, type CategoryId } from '../data/menu';

type BestsellersProps = {
  activeCategory: CategoryId | null;
  onClear: () => void;
  onAdd: (id: string) => void;
};

export default function Bestsellers({ activeCategory, onClear, onAdd }: BestsellersProps) {
  const visible = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products.filter((product) => product.featured);
  const activeLabel = categories.find((category) => category.id === activeCategory)?.title;

  return (
    <section id="menu" className="relative scroll-mt-24 bg-brand-black py-16 lg:py-24">
      <div className="container-page">
        <div className="text-center">
          <p className="font-script text-2xl text-brand-orange sm:text-3xl">Popular Picks</p>
          <h2 className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-4xl uppercase leading-none text-white sm:text-5xl lg:text-6xl">
            <span aria-hidden="true" className="hidden h-px w-12 bg-brand-orange/70 sm:block" />
            <span>Our</span>
            <span className="text-brand-orange">Bestsellers</span>
            <span aria-hidden="true" className="hidden h-px w-12 bg-brand-orange/70 sm:block" />
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45">
            Fresh from the kitchen and made to order — the plates our guests keep coming back
            for.
          </p>
        </div>

        {activeCategory && (
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange transition-colors hover:border-brand-red hover:text-brand-red"
            >
              Showing {activeLabel}
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Clear category filter</span>
            </button>
          </div>
        )}

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={() => onAdd(product.id)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
