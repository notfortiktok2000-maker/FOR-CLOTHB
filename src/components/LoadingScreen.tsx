import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clubTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // 1. Initial state
    gsap.set(clubTextRef.current, { opacity: 0, y: 20 });
    gsap.set(subTextRef.current, { opacity: 0, y: 10 });

    // 2. Animate "THE SIGNATURE CLUB." in
    tl.to(clubTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2,
    })
      // 3. Fade in "NOTFOREVERYONE™"
      .to(
        subTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "+=0.2"
      )
      // 4. Hold for a moment
      .to({}, { duration: 0.8 })
      // 5. Mask transition out
      .to(containerRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        ease: "power4.inOut",
      });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="overflow-hidden">
        <h1
          ref={clubTextRef}
          className="text-sm md:text-base font-light tracking-[0.3em] uppercase mb-4"
        >
          The Signature Club.
        </h1>
      </div>
      <div className="overflow-hidden">
        <p
          ref={subTextRef}
          className="text-xs md:text-sm text-white/50 tracking-widest uppercase font-thin"
        >
          NotForEveryone&trade;
        </p>
      </div>
    </div>
  );
}
