import { Beef, CupSoda, Drumstick, IceCreamBowl, Pizza, Utensils } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { categories, type CategoryId, type CategoryIcon } from '../data/menu';

const icons: Record<CategoryIcon, LucideIcon> = {
  burger: Beef,
  fries: Utensils,
  pizza: Pizza,
  drink: CupSoda,
  chicken: Drumstick,
  dessert: IceCreamBowl,
};

type FoodCategoriesProps = {
  active: CategoryId | null;
  onSelect: (id: CategoryId) => void;
};

export default function FoodCategories({ active, onSelect }: FoodCategoriesProps) {
  return (
    <section aria-label="Food categories" className="relative z-30 -mt-16 lg:-mt-20">
      <div className="container-page">
        <div className="rounded-[26px] border border-black/5 bg-brand-gray p-2.5 shadow-[0_34px_70px_-32px_rgba(0,0,0,0.85)] sm:p-4">
          <ul className="no-scrollbar flex snap-x snap-mandatory gap-1 overflow-x-auto sm:grid sm:grid-cols-3 sm:gap-0 sm:overflow-visible lg:grid-cols-6">
            {categories.map((category) => {
              const Icon = icons[category.icon];
              const isActive = active === category.id;
              return (
                <li
                  key={category.id}
                  className="min-w-[148px] flex-1 snap-start border-black/10 sm:min-w-0 sm:border-l sm:first:border-l-0"
                >
                  <button
                    type="button"
                    onClick={() => onSelect(category.id)}
                    aria-label={`Show ${category.title} menu`}
                    aria-pressed={isActive}
                    className={`group flex w-full flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center transition-all duration-300 hover:-translate-y-1 ${
                      isActive ? 'bg-white shadow-[0_10px_24px_-14px_rgba(198,0,0,0.6)]' : ''
                    }`}
                  >
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-full transition-all duration-300 group-hover:scale-105 ${
                        isActive ? 'bg-brand-red/10' : 'bg-brand-orange/10'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 transition-colors duration-300 ${
                          isActive ? 'text-brand-red' : 'text-brand-orange'
                        }`}
                        strokeWidth={1.9}
                      />
                    </span>
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-[0.16em] text-neutral-900 transition-colors duration-300 ${
                        isActive ? 'text-brand-red' : 'group-hover:text-brand-orange'
                      }`}
                    >
                      {category.title}
                    </span>
                    <span className="text-[11px] leading-none text-neutral-500">
                      {category.caption}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
