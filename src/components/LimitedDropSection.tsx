import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LimitedDropSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!numberRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 70%",
      onEnter: () => {
        if (!hasAnimated) {
          gsap.to(numberRef.current, {
            innerHTML: 100,
            duration: 3,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            onUpdate: function () {
              if (numberRef.current) {
                numberRef.current.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString();
              }
            },
          });
          setHasAnimated(true);
        }
      },
    });

    // Parallax background text
    gsap.to(".bg-text-parallax", {
      xPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [hasAnimated]);

  return (
    <section ref={containerRef} className="relative w-full h-[70vh] bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[200%] opacity-5 pointer-events-none bg-text-parallax flex whitespace-nowrap">
        <h2 className="text-[15vw] font-bold leading-none uppercase text-stroke">Limited Drop Limited Drop Limited Drop</h2>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-8">
        <p className="text-sm tracking-[0.3em] uppercase font-light text-white/50">Strictly Limited to</p>
        
        <h3 
          className="font-light tracking-tighter leading-none text-accent"
          style={{ fontSize: "clamp(6rem, 15vw, 15rem)" }}
        >
          <span ref={numberRef}>0</span>
        </h3>
        
        <p className="text-sm tracking-[0.3em] uppercase font-light text-white/50">Pieces Worldwide.</p>

        <p className="mt-12 text-xl md:text-2xl font-thin tracking-wider italic text-white/80">
          When it's gone,<br /> it's gone.
        </p>
      </div>
    </section>
  );
}
