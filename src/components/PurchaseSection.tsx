import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PurchaseSectionProps {
  onAddToCart: () => void;
}

export function PurchaseSection({ onAddToCart }: PurchaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    if (contentRef.current) {
      const elements = contentRef.current.children;
      tl.fromTo(
        elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="purchase" className="relative w-full py-32 bg-[#0A0A0A] flex flex-col items-center justify-center px-8">
      <div ref={contentRef} className="w-full max-w-md flex flex-col items-center text-center space-y-6">
        
        <div className="w-full bg-black border border-white/5 p-4 flex justify-center items-center overflow-hidden mb-4">
          <img
            src="https://i.ibb.co/BHM5MdGY/The-three-line-graphic-NOTFOREVERYONE-202606290057.jpg"
            alt="Signature Oversized Tee"
            className="w-full max-w-[320px] object-contain"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-['Poppins'] font-semibold tracking-wide uppercase text-white">
            Signature Oversized Tee
          </h2>
          <p className="text-xl font-['Poppins'] font-light text-white/70">400 MAD</p>
        </div>

        <button
          onClick={onAddToCart}
          className="w-full h-[56px] bg-black text-white font-['Poppins'] font-semibold text-sm tracking-[0.1em] uppercase border border-white rounded-none hover:bg-white hover:text-black transition-colors duration-300 mt-4"
        >
          Add to Cart
        </button>

      </div>
    </section>
  );
}
