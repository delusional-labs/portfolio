import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function InteractiveDivider() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const hitRef = useRef<SVGPathElement>(null);

  const startY = 50;
  const p0 = { x: 0, y: startY };
  const p1 = { x: 400, y: startY };
  const p2 = { x: 800, y: startY };
  
  let connected = false;

  const curveString = () => `M${p0.x},${p0.y} Q${p1.x},${p1.y} ${p2.x},${p2.y}`;

  useEffect(() => {
    const render = () => {
      if (pathRef.current) pathRef.current.setAttribute("d", curveString());
      if (hitRef.current) hitRef.current.setAttribute("d", curveString());
    };

    gsap.ticker.add(render);

    const handlePointerMove = (e: PointerEvent) => {
      if (!svgRef.current) return;
      
      const rect = svgRef.current.getBoundingClientRect();
      const y = (e.clientY - rect.top) * (100 / rect.height);
      
      // Check if mouse is over hit area or if already pulling
      const overPath = e.target === hitRef.current;

      if (!connected && overPath) {
        connected = true;
        gsap.killTweensOf(p1);
      }

      if (connected) {
        // Calculate the pull with some resistance
        p1.y = y * 2 - (p0.y + p2.y) / 2;
      }
    };

    const handlePointerLeave = () => {
      connected = false;
      gsap.to(p1, {
        duration: 0.8,
        y: startY,
        ease: "elastic.out(1.2, 0.3)",
      });
    };

    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener("pointermove", handlePointerMove);
      svg.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      gsap.ticker.remove(render);
      if (svg) {
        svg.removeEventListener("pointermove", handlePointerMove);
        svg.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, []);

  return (
    <div className="w-full h-24 flex items-center justify-center overflow-visible relative z-30 py-10 select-none">
      <svg 
        ref={svgRef}
        viewBox="0 0 800 100" 
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible touch-none pointer-events-auto"
      >
        <defs>
          <linearGradient id="dividerGrad" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgba(170, 59, 255, 0)" />
            <stop offset="0.5" stopColor="rgba(170, 59, 255, 1)" />
            <stop offset="1" stopColor="rgba(170, 59, 255, 0)" />
          </linearGradient>
        </defs>
        
        {/* Visible line */}
        <path 
          ref={pathRef}
          d={`M0,${startY} Q400,${startY} 800,${startY}`} 
          stroke="url(#dividerGrad)" 
          strokeWidth="2" 
          fill="none"
          className="pointer-events-none opacity-80"
        />
        
        {/* Invisible thicker path for hover detection */}
        <path 
          ref={hitRef}
          d={`M0,${startY} Q400,${startY} 800,${startY}`} 
          stroke="transparent" 
          strokeWidth="60" 
          fill="none"
          className="cursor-ns-resize"
        />
      </svg>
    </div>
  );
}
