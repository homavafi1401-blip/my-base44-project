import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { categories, products, type CategoryId } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const filters: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  ...categories.map((category) => ({ id: category.id, label: category.title })),
];

export function MenuPage() {
  const [active, setActive] = useState<CategoryId | 'all'>('all');
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = active === 'all' || product.category === active;
      const matchesQuery =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  return (
    <div className="min-h-screen bg-ink">
      <section className="relative overflow-hidden border-b border-white/10 pb-12 pt-16 sm:pt-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-0 h-[380px] w-[380px] rounded-full bg-brand/20 blur-[130px]" />
          <div className="absolute -left-24 bottom-0 h-[300px] w-[300px] rounded-full bg-[#ff6a00]/10 blur-[120px]" />
        </div>
        <div className="container-page relative text-center">
          <span className="font-script text-xl text-brand">Served Hot All Day</span>
          <h1 className="display mt-3 text-[clamp(38px,7vw,76px)] text-white">
            The Full <span className="text-brand">Menu</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            Burgers, pizza, crispy chicken, loaded fries and something sweet — everything our kitchen
            fires up, in one place.
          </p>

          <div className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-full border border-white/12 bg-[#101010] px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-white/40" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the menu…"
              aria-label="Search the menu"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-[10px] uppercase tracking-[0.18em] text-white/40 hover:text-brand"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="no-scrollbar -mx-5 flex items-center gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((filter) => {
            const isActive = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
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

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-12 rounded-2xl border border-white/10 bg-card p-10 text-center text-sm text-muted">
            No dishes match “{query}”. Try another search or category.
          </p>
        )}
      </section>
    </div>
  );
}
