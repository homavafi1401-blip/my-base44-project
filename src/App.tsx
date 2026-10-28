import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FoodCategories from './components/FoodCategories';
import Bestsellers from './components/Bestsellers';
import DeliveryBanner from './components/DeliveryBanner';
import ShoppingCart from './components/ShoppingCart';
import Footer from './components/Footer';
import { products, type CategoryId } from './data/menu';
import { useCart } from './hooks/useCart';

export default function App() {
  const cart = useCart(products);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  const selectCategory = (id: CategoryId) => {
    setActiveCategory((current) => (current === id ? null : id));
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const addToCart = (id: string) => {
    cart.add(id);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-brand-black">
        <Header cartCount={cart.count} onOpenCart={() => setCartOpen(true)} />
        <main>
          <HeroSection />
          <FoodCategories active={activeCategory} onSelect={selectCategory} />
          <Bestsellers
            activeCategory={activeCategory}
            onClear={() => setActiveCategory(null)}
            onAdd={addToCart}
          />
          <DeliveryBanner />
        </main>
        <Footer />
        <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
      </div>
    </MotionConfig>
  );
}
