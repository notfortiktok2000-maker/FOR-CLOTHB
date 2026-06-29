import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GlobalUI() {
  useEffect(() => {
    // Scroll progress bar
    gsap.to(".progress-bar", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <>
      {/* Global Film Grain */}
      <div className="fixed inset-0 pointer-events-none z-[9001] opacity-[0.03]" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')"}}></div>

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full px-6 md:px-12 py-6 md:py-10 flex justify-between items-start z-[9000] pointer-events-none">
        <div className="flex flex-col space-y-1">
          <span className="text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] font-light uppercase opacity-60">THE SIGNATURE CLUB</span>
          <span className="text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] font-light uppercase">NOTFOREVERYONE™</span>
        </div>
        <div className="flex space-y-4 flex-col items-end">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 rounded-full bg-[#235DFF] animate-pulse"></div>
            <span className="text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] font-light uppercase">DROP 01 / LIVE STOCK</span>
          </div>
          <div className="text-[12px] md:text-[14px] tracking-widest font-light flex items-center space-x-6 md:space-x-12 pt-2 md:pt-4 pointer-events-auto">
            <a href="#purchase" className="hover:text-[#235DFF] transition-colors clickable text-center">BUY MY T-SHIRT</a>
            <button className="hover:text-[#235DFF] transition-colors clickable" onClick={() => document.dispatchEvent(new CustomEvent('open-cart'))}>CART (0)</button>
          </div>
        </div>
      </nav>

      {/* Vertical Rail Label */}
      <div className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 -rotate-180 z-[9000]" style={{ writingMode: 'vertical-rl' }}>
        <p className="text-[9px] tracking-[0.4em] font-light opacity-20 uppercase">COLLECTION_SS24 // THE_IDENTITY_DROP</p>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-[9000]">
        <div className="w-[1px] h-12 bg-white/10 overflow-hidden relative">
          <div className="progress-bar absolute top-0 left-0 w-full h-full bg-accent origin-top scale-y-0" />
        </div>
      </div>

      {/* Sticky Badge */}
      <div className="hidden md:block fixed bottom-8 right-8 z-[9000] mix-blend-difference pointer-events-none">
        <div className="animate-spin-slow w-24 h-24 border border-white/30 rounded-full flex items-center justify-center relative">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="none" />
            <text className="text-[10px] uppercase tracking-widest fill-white font-light">
              <textPath href="#curve" startOffset="0%">
                Limited Drop • Limited Drop •
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
