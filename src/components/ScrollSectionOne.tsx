import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollSectionOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Initial state
    gsap.set([text2Ref.current, text3Ref.current], {
      opacity: 0,
      y: 100,
      scale: 0.9,
    });

    // Animate Text 2
    tl.fromTo(text2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
      .to({}, { duration: 1.5 }) // Hold
      .to(text2Ref.current, { opacity: 0, y: -50, scale: 1.1, duration: 1 })

      // Animate Text 3
      .fromTo(text3Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.5")
      .to({}, { duration: 1.5 }) // Hold
      .to(text3Ref.current, { opacity: 0, y: -50, scale: 1.1, duration: 1 });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      <h2
        ref={text2Ref}
        className="absolute text-5xl md:text-7xl lg:text-9xl font-light tracking-tight text-center px-4"
      >
        We create <br />
        <span className="font-medium text-accent">identity.</span>
      </h2>

      <h2
        ref={text3Ref}
        className="absolute text-5xl md:text-7xl lg:text-9xl font-light tracking-tight text-center px-4"
      >
        Made for <br />
        <span className="font-thin uppercase tracking-[0.2em] text-4xl md:text-6xl lg:text-8xl mt-4 block">the few.</span>
      </h2>
    </section>
  );
}
