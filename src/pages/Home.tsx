import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { FoodCategories } from '../components/FoodCategories';
import { Bestsellers } from '../components/Bestsellers';
import { DeliveryBanner } from '../components/DeliveryBanner';
import { MenuSection } from '../components/MenuSection';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { VideoModal } from '../components/VideoModal';
import type { CategoryId } from '../data/products';

export function Home() {
  const [active, setActive] = useState<CategoryId | 'all'>('all');
  const [videoOpen, setVideoOpen] = useState(false);
  const location = useLocation();

  // Header/footer links can request a section after navigating here.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const timer = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [location.state]);

  const handleCategory = (id: CategoryId | 'all') => {
    setActive(id);
    window.setTimeout(() => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  return (
    <>
      <Hero onWatchVideo={() => setVideoOpen(true)} />
      <FoodCategories active={active} onSelect={handleCategory} />
      <Bestsellers />
      <DeliveryBanner />
      <MenuSection active={active} onSelect={setActive} />
      <AboutSection />
      <ContactSection />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
