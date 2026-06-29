import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MembershipSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current?.children ? Array.from(contentRef.current.children) : [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-48 bg-[#0a0a0a] flex items-center justify-center px-4">
      <div ref={contentRef} className="text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-8">
          Membership has no application.<br />
          <span className="italic font-thin">Only recognition.</span>
        </h2>
        
        <p className="text-sm md:text-base tracking-[0.2em] uppercase text-white/50 mb-16">
          Not everyone belongs. That's the point.
        </p>

        <a
          href="#join"
          className="group relative inline-flex flex-col items-center gap-2 text-sm tracking-[0.3em] uppercase font-light overflow-hidden p-4 clickable"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
            Join the Club
          </span>
          <div className="w-1 h-1 bg-white rounded-full transition-all duration-300 group-hover:w-8 group-hover:bg-accent" />
        </a>
      </div>
    </section>
  );
}
