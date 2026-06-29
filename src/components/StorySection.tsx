import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = textRef.current?.querySelectorAll(".story-line");

    if (lines) {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 50, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.3,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-48 bg-black flex items-center justify-center px-4">
      <div ref={textRef} className="max-w-4xl mx-auto flex flex-col space-y-12 text-center" style={{ perspective: "1000px" }}>
        <p className="story-line text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-white/70">
          Some brands chase attention.
        </p>
        <p className="story-line text-3xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white">
          We don't.
        </p>
        <p className="story-line text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-white/70 pt-12">
          Some wear logos.
        </p>
        <p className="story-line text-3xl md:text-5xl lg:text-6xl font-normal tracking-wide text-accent">
          Others wear identity.
        </p>
        <p className="story-line text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-white/70 pt-12">
          The Signature Club was never made for everyone.
        </p>
        <p className="story-line text-3xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white">
          Only those who understand.
        </p>
      </div>
    </section>
  );
}
