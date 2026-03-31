/**
 * =============================================================================
 * CURSOR GRID OVERLAY — Interactive mouse-follow grid reveal effect
 * =============================================================================
 * Renders a faint base grid with a radial "spotlight" that follows the cursor,
 * revealing a brighter grid underneath. Uses Framer Motion values for
 * GPU-friendly, zero-re-render tracking.
 * =============================================================================
 */

import { useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

/* ── SVG Grid Pattern ── */
const GridPattern = ({
  width = 60,
  height = 60,
  id,
  className,
}: {
  width?: number;
  height?: number;
  id: string;
  className?: string;
}) => (
  <svg className={`absolute inset-0 w-full h-full ${className ?? ""}`}>
    <defs>
      <pattern
        id={id}
        width={width}
        height={height}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${width} 0 L 0 0 0 ${height}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-foreground"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const CursorGridOverlay = () => {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  /* Radial gradient mask that follows the cursor */
  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, white, transparent)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-[5] pointer-events-auto"
      style={{ cursor: "default" }}
    >
      {/* Faint base grid — always visible */}
      <div className="absolute inset-0 opacity-[0.03]">
        <GridPattern id="cursor-grid-base" />
      </div>

      {/* Cursor-reveal grid — brighter, masked to mouse position */}
      <motion.div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <GridPattern id="cursor-grid-reveal" />
      </motion.div>
    </div>
  );
};

export default CursorGridOverlay;
