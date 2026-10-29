import { motion } from 'framer-motion';
import { ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { categories, products, type CategoryId } from '../data/products';
import { ProductCard } from './ProductCard';

const filters: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  ...categories.map((category) => ({ id: category.id, label: category.title })),
];

export function MenuSection({
  active,
  onSelect,
}: {
  active: CategoryId | 'all';
  onSelect: (id: CategoryId | 'all') => void;
}) {
  const list = useMemo(() => {
    if (active === 'all') return products.slice(0, 8);
    return products.filter((product) => product.category === active);
  }, [active]);

  return (
    <section id="menu" className="relative scroll-mt-20 bg-ink2 py-20 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">Straight From The Grill</span>
            <h2 className="display mt-2 text-[clamp(30px,4.6vw,48px)] text-white">
              Explore Our <span className="text-brand">Menu</span>
            </h2>
          </motion.div>

          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 self-start text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-brand md:self-auto"
          >
            View full menu
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="no-scrollbar -mx-5 mt-8 flex items-center gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <span className="mr-1 hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35 sm:flex">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </span>
          {filters.map((filter) => {
            const isActive = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onSelect(filter.id)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] transition-all duration-250 ${
                  isActive
                    ? 'border-brand bg-brand text-ink'
                    : 'border-white/15 text-white/70 hover:border-brand/60 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-10 rounded-2xl border border-white/10 bg-card p-8 text-center text-sm text-muted">
            Nothing in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
