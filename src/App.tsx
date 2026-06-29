import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomCursor } from "./components/CustomCursor";
import { LoadingScreen } from "./components/LoadingScreen";
import { Hero } from "./components/Hero";
import { ScrollSectionOne } from "./components/ScrollSectionOne";
import { ProductShowcase } from "./components/ProductShowcase";
import { PurchaseSection } from "./components/PurchaseSection";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { GlobalUI } from "./components/GlobalUI";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    document.addEventListener('open-cart', handleOpenCart);
    return () => document.removeEventListener('open-cart', handleOpenCart);
  }, []);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-accent selection:text-white">
      <CustomCursor />
      <GlobalUI />
      
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <main className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <Hero />
        <ScrollSectionOne />
        <ProductShowcase />
        <PurchaseSection onAddToCart={() => setIsCartOpen(true)} />
      </main>

      {!isLoading && <Footer />}
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
