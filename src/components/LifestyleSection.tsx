import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LifestyleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".horizontal-item");
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + scrollWrapperRef.current?.offsetWidth,
      },
    });

    // Parallax inside images
    sections.forEach((section: any) => {
      const img = section.querySelector("img");
      if (img) {
        gsap.to(img, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: true,
            start: "top top",
            end: () => "+=" + scrollWrapperRef.current?.offsetWidth,
          },
        });
      }
    });

  }, []);

  const images = [
    "https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1550614000-4b95d4ebfa49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
  ];

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      {/* Film grain overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat opacity-[0.03] mix-blend-overlay" />
      
      <div ref={scrollWrapperRef} className="flex h-full w-[300vw]">
        {images.map((src, index) => (
          <div key={index} className="horizontal-item relative w-screen h-full overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-black/20 z-[1]" />
            <img
              src={src}
              alt={`Lifestyle ${index + 1}`}
              className="absolute top-0 left-[-10%] w-[120%] h-full object-cover filter grayscale contrast-125"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-12 left-12 z-20">
        <p className="text-xs tracking-[0.4em] uppercase font-light text-white/70">
          The Lifestyle / 001
        </p>
      </div>
    </section>
  );
}
