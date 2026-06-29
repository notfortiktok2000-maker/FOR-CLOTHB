import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const moroccoRef = useRef<HTMLHeadingElement>(null);
  const subHeadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline({ delay: 3.5 }); // wait for loading screen (approx)

    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll(".split-char");
      gsap.set(chars, { opacity: 0, y: 50, rotateX: -90 });
      tl.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power4.out",
      });
    }

    if (moroccoRef.current) {
      tl.fromTo(moroccoRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8");
    }

    tl.fromTo(
      subHeadlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.8"
    );

    // Subtle parallax for background
    const heroBg = document.querySelector(".hero-bg");
    if (heroBg) {
      gsap.to(".hero-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with Overlay */}
      <div className="hero-bg absolute inset-0 z-0 w-full h-full bg-black/50">
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1
          ref={headlineRef}
          className="font-bold leading-[0.8] tracking-[-0.02em] text-white flex flex-col items-center uppercase text-[clamp(2rem,8vw,4rem)] md:text-[clamp(3rem,8vw,120px)] break-words w-full px-4"
          style={{ perspective: "1000px" }}
        >
          <SplitText text="NOTFOREVERYONE" className="block" />
        </h1>
        
        <h2 
          ref={moroccoRef}
          className="text-[#235DFF] font-bold mt-4 mb-12 uppercase tracking-widest text-[clamp(1.5rem,5vw,3rem)] md:text-[clamp(2rem,5vw,80px)] break-words w-full px-4"
        >
          Morocco
        </h2>

        <p
          ref={subHeadlineRef}
          className="text-[10px] tracking-[0.4em] uppercase font-light text-white/80 mb-16"
        >
          The Signature Club.
        </p>

        <a
          ref={ctaRef}
          href="#purchase"
          className="group relative inline-flex items-center gap-4 text-[12px] tracking-[0.4em] uppercase font-light overflow-hidden pb-2 clickable text-white"
        >
          <span className="relative z-10 flex items-center gap-2 transform transition-transform duration-500 group-hover:-translate-y-full">
            Enter the Club <span className="font-thin">→</span>
          </span>
          <span className="absolute inset-0 z-10 flex items-center gap-2 transform translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-accent">
            Enter the Club <span className="font-thin">→</span>
          </span>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 origin-left transform scale-x-100 transition-transform duration-500" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-left transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
        </a>
      </div>
    </section>
  );
}
