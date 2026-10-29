import { motion } from 'framer-motion';
import { categories, type CategoryId } from '../data/products';

type IconName = 'burger' | 'fries' | 'pizza' | 'drink' | 'chicken' | 'dessert';

function CategoryIcon({ name }: { name: IconName }) {
  const common = { className: 'h-9 w-9', viewBox: '0 0 48 48', 'aria-hidden': true as const };
  switch (name) {
    case 'burger':
      return (
        <svg {...common}>
          <path d="M7 20c0-7.5 7.6-11.5 17-11.5S41 12.5 41 20c0 1-.8 1.8-1.8 1.8H8.8C7.8 21.8 7 21 7 20Z" fill="#F0A24B" />
          <circle cx="18" cy="15" r="1.6" fill="#FFF6E8" />
          <circle cx="26" cy="13.4" r="1.6" fill="#FFF6E8" />
          <circle cx="32" cy="16.4" r="1.4" fill="#FFF6E8" />
          <path d="M7 25.5h34v2.6H7z" fill="#7BC043" />
          <path d="M8 28.1h32l-3 5.2H11z" fill="#E7B23A" />
          <rect x="8" y="33.3" width="32" height="4.6" rx="2.3" fill="#B4552F" />
          <path d="M8.6 37.9h30.8c0 3.6-3.2 5.6-7 5.6H15.6c-3.8 0-7-2-7-5.6Z" fill="#F0A24B" />
        </svg>
      );
    case 'fries':
      return (
        <svg {...common}>
          <g>
            <rect x="14" y="9" width="4.4" height="20" rx="1.6" fill="#FFD24C" transform="rotate(-8 16 19)" />
            <rect x="20" y="6.5" width="4.4" height="22" rx="1.6" fill="#FFC93A" />
            <rect x="26" y="8.5" width="4.4" height="21" rx="1.6" fill="#FFD24C" transform="rotate(7 28 19)" />
            <rect x="31.5" y="11" width="4.2" height="18" rx="1.6" fill="#FFC93A" transform="rotate(14 33 20)" />
          </g>
          <path d="M10.5 20h27l-3.4 19.5a3 3 0 0 1-3 2.5H16.9a3 3 0 0 1-3-2.5L10.5 20Z" fill="#E23F3F" />
          <path d="M13.4 26.5h21.2l-1 6H14.4z" fill="#FFF6E8" opacity="0.92" />
        </svg>
      );
    case 'pizza':
      return (
        <svg {...common}>
          <path d="M24 5c7.7 0 14 3 14 6.6 0 1-.5 1.7-1.4 1.5L24 43 11.4 13.1c-.9.2-1.4-.5-1.4-1.5C10 8 16.3 5 24 5Z" fill="#F3B24A" />
          <path d="M11.4 13.1 24 43l12.6-29.9" fill="none" stroke="#D9922E" strokeWidth="1.6" />
          <circle cx="19" cy="16" r="2.6" fill="#D6483F" />
          <circle cx="28.5" cy="18" r="2.4" fill="#D6483F" />
          <circle cx="24" cy="26" r="2.2" fill="#D6483F" />
          <circle cx="16" cy="24" r="1.6" fill="#7BC043" />
          <circle cx="31" cy="26" r="1.6" fill="#7BC043" />
        </svg>
      );
    case 'drink':
      return (
        <svg {...common}>
          <path d="M31 8.5 36 4" stroke="#E23F3F" strokeWidth="3" strokeLinecap="round" />
          <rect x="13" y="11" width="22" height="4.6" rx="2.3" fill="#F5F5F5" />
          <path d="M14.2 15.6h19.6l-2.2 24.8a3.4 3.4 0 0 1-3.4 3.1h-8.4a3.4 3.4 0 0 1-3.4-3.1L14.2 15.6Z" fill="#E23F3F" />
          <path d="M16.6 26.5h14.8l-.8 9H17.4z" fill="#FFF6E8" opacity="0.92" />
        </svg>
      );
    case 'chicken':
      return (
        <svg {...common}>
          <path
            d="M39 8.5c-4.6-4.2-12-3.3-16.3 1.6-2.7 3.1-3.3 7.3-2.3 11.2-2.5 2-4.4 4.6-5 7.4-.7 3.4.6 6.4 3 7.7 2.4 1.3 5.6.8 8.4-1.2 2.6-1.9 4.6-4.8 5.6-8 3.9.7 7.7-.6 9.8-3.5 3.7-5 2.5-11.2-3.2-15.2Z"
            fill="#F0A24B"
          />
          <path d="M13.6 35.6 6.8 42" stroke="#FFF6E8" strokeWidth="5" strokeLinecap="round" />
          <circle cx="29" cy="16" r="2" fill="#FFF6E8" opacity="0.75" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M17 22.5c-4-3.6-6.6-7.3-5-10.5 1.6-3.2 6-3.6 8.4-.9 1 .9 2.6.9 3.6 0 2.4-2.7 6.8-2.3 8.4.9 1.6 3.2-1 6.9-5 10.5a7.5 7.5 0 0 1-10.4 0Z" fill="#F7C6D2" />
          <path d="M13 22h22l-2.6 17.2a3.4 3.4 0 0 1-3.4 2.9h-10a3.4 3.4 0 0 1-3.4-2.9L13 22Z" fill="#F0A24B" />
          <path d="M13.6 27.6h20.8l-.7 4.6H14.3z" fill="#FFF6E8" opacity="0.85" />
          <circle cx="24" cy="15" r="2.2" fill="#E23F3F" />
        </svg>
      );
  }
}

export function FoodCategories({
  active,
  onSelect,
}: {
  active: CategoryId | 'all';
  onSelect: (id: CategoryId | 'all') => void;
}) {
  return (
    <section aria-label="Food categories" className="relative z-20 -mt-14 sm:-mt-16 lg:-mt-20">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)]"
        >
          <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
            {categories.map((category, index) => {
              const isActive = active === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onSelect(category.id)}
                  aria-pressed={isActive}
                  className={`group relative flex min-w-[132px] snap-start flex-col items-center gap-2 px-4 py-6 transition-colors duration-250 hover:bg-[#faf7f2] ${
                    index !== 0 ? 'md:border-l md:border-black/[0.08]' : ''
                  } ${isActive ? 'bg-[#fff7ec]' : ''}`}
                >
                  <span className="transition-transform duration-250 ease-out group-hover:-translate-y-1 group-hover:scale-110">
                    <CategoryIcon name={category.icon} />
                  </span>
                  <span
                    className={`mt-1 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-250 ${
                      isActive ? 'text-brand' : 'text-neutral-900'
                    }`}
                  >
                    {category.title}
                  </span>
                  <span className="whitespace-nowrap text-[10px] font-medium text-neutral-500">{category.tagline}</span>
                  <span
                    className={`absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-t-full bg-brand transition-all duration-250 ${
                      isActive ? 'w-10' : 'w-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
