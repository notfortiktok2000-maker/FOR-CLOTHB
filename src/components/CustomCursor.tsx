import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;

    if (!dot || !outline) return;

    // We use a separate state to handle GSAP tweens vs React state
    let isClickableHovered = false;

    // Set initial position off-screen
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(outline, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const moveCursor = (e: MouseEvent) => {
      // Dot follows immediately
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Outline follows with a slight delay
      gsap.to(outline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable")
      ) {
        if (!isClickableHovered) {
          isClickableHovered = true;
          gsap.to(outline, {
            scale: 1.5,
            borderColor: "rgba(35, 93, 255, 1)",
            backgroundColor: "rgba(35, 93, 255, 0.1)",
            duration: 0.3,
          });
          gsap.to(dot, {
            scale: 0,
            duration: 0.3,
          });
        }
      } else {
        if (isClickableHovered) {
          isClickableHovered = false;
          gsap.to(outline, {
            scale: 1,
            borderColor: "rgba(35, 93, 255, 0.5)",
            backgroundColor: "transparent",
            duration: 0.3,
          });
          gsap.to(dot, {
            scale: 1,
            duration: 0.3,
          });
        }
      }
    };

    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="custom-cursor cursor-dot fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={cursorOutlineRef}
        className="custom-cursor fixed top-0 left-0 w-8 h-8 border border-accent/50 rounded-full pointer-events-none z-[9998]"
      />
    </>
  );
}
