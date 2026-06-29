import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 3D Product Rotation Effect
    gsap.to(imageRef.current, {
      rotateY: 15,
      rotateX: 5,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Fade in product info
    gsap.fromTo(
      infoRef.current?.children ? Array.from(infoRef.current.children) : [],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="product"
      className="relative w-full min-h-screen bg-black py-32 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 px-8"
      style={{ perspective: "1500px" }}
    >
      <div className="w-full lg:w-1/2 flex items-center justify-center relative">
        {/* Glow effect behind product */}
        <div className="absolute w-[60%] h-[60%] bg-white/5 rounded-full blur-[100px]" />
        
        <img
          ref={imageRef}
          src="https://i.ibb.co/pjHbSPXP/Product-photography-white-oversized-heavyweight-202606290057.jpg"
          alt="The Signature Club T-Shirt"
          className="relative z-10 w-full max-w-full md:max-w-[500px] h-auto object-contain object-center filter transform-style-3d drop-shadow-2xl grayscale"
        />
      </div>

      <div ref={infoRef} className="w-full lg:w-1/3 flex flex-col items-start text-left space-y-12">
        <div className="space-y-2">
          <h3 className="text-xl font-light tracking-[0.2em] uppercase">The Signature Club™</h3>
          <p className="text-sm font-thin tracking-widest text-white/50">NOTFOREVERYONE™</p>
        </div>

        <ul className="space-y-6 text-sm font-light tracking-wider text-white/80">
          <li className="flex items-center gap-4">
            <span className="w-4 h-[1px] bg-accent" />
            100% Premium Cotton
          </li>
          <li className="flex items-center gap-4">
            <span className="w-4 h-[1px] bg-accent" />
            Heavyweight 320GSM
          </li>
          <li className="flex items-center gap-4">
            <span className="w-4 h-[1px] bg-accent" />
            Oversized Boxy Fit
          </li>
          <li className="flex items-center gap-4">
            <span className="w-4 h-[1px] bg-accent" />
            Made in Morocco
          </li>
          <li className="flex items-center gap-4">
            <span className="w-4 h-[1px] bg-accent" />
            Numbered Pieces
          </li>
        </ul>
      </div>
    </section>
  );
}
