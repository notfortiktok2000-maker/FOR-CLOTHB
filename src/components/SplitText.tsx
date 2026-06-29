import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  splitBy?: "word" | "char";
}

export function SplitText({ text, className, splitBy = "char" }: SplitTextProps) {
  const words = text.split(" ");

  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
          className="split-word"
        >
          {splitBy === "char" ? (
            word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                style={{ display: "inline-block" }}
                className="split-char"
              >
                {char}
              </span>
            ))
          ) : (
            <span style={{ display: "inline-block" }} className="split-word-inner">
              {word}
            </span>
          )}
          {/* Add a space after each word except the last one */}
          {wordIndex < words.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}
