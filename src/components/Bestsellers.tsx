import { motion } from 'framer-motion';
import { bestsellers } from '../data/products';
import { ProductCard } from './ProductCard';

export function Bestsellers() {
  return (
    <section id="bestsellers" className="relative bg-ink py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(255,152,0,0.12),transparent_65%)]" />
      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-brand/70 sm:w-16" />
            <span className="font-script text-xl text-brand">Popular Picks</span>
            <span className="h-px w-10 bg-brand/70 sm:w-16" />
          </div>
          <h2 className="display mt-3 text-[clamp(32px,5vw,54px)] text-white">
            Our <span className="text-brand">Bestsellers</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted/80">
            The orders our kitchen can&apos;t stop making. Hand-stacked, flame-grilled and
            out the door before the cheese stops melting.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
