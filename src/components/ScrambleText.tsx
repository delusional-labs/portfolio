import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function ScrambleText({ text, className = "", delay = 0 }: ScrambleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = text.split("").map(c => c === " " ? "\u00A0" : c);

  useEffect(() => {
    if (!containerRef.current) return;

    const charWrappers = containerRef.current.querySelectorAll(".char-wrapper");
    const symbols = containerRef.current.querySelectorAll(".scramble-symbol");
    
    gsap.set(charWrappers, { yPercent: 0 });
    gsap.set(containerRef.current, { autoAlpha: 1 });

    const tl = gsap.timeline({ 
      delay: delay + 0.8,
      defaults: { ease: "power4.inOut" } // Smoother, more deliberate ease
    });

    // 1. Slide to reveal letters
    tl.to(charWrappers, {
      duration: 1.4,
      yPercent: -50,
      stagger: 0.04,
    });

    // 2. Kill symbols opacity after slide to ensure 0 artifacts
    tl.to(symbols, {
      duration: 0.1,
      opacity: 0,
      stagger: 0.02,
    }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, [delay, text]);

  const getRandomChar = () => {
    const symbols = "X*/_$%&@#0123456789";
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  return (
    <div ref={containerRef} className={`scramble-container ${className}`} style={{ visibility: "hidden" }}>
      {chars.map((char, i) => (
        <div key={i} className="scramble-char-box">
          <div className="char-wrapper">
            <span className="scramble-symbol">{getRandomChar()}</span>
            <span className="scramble-letter">{char}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
