/**
 * AWARD BADGE — 3D interactive verification badge for marketplace listings
 * Adapted from Product Hunt badge with full matrix3d hover transforms.
 * Tiers: Gold (place=1), Silver (place=2), Bronze (place=3)
 */

import React, { MouseEvent, useEffect, useRef, useState } from "react";

type AwardBadgeType = "product-of-the-month" | "product-of-the-week" | "product-of-the-day";

interface AwardBadgeProps {
  type: AwardBadgeType;
  place?: 1 | 2 | 3;
  link?: string;
  size?: "sm" | "md";
  className?: string;
}

const identityMatrix =
  "1, 0, 0, 0, " +
  "0, 1, 0, 0, " +
  "0, 0, 1, 0, " +
  "0, 0, 0, 1";

const maxRotate = 0.25;
const minRotate = -0.25;
const maxScale = 1;
const minScale = 0.97;

/** Background colors for place 1 (gold), 2 (silver), 3 (bronze) */
const backgroundColors = ["#f3e3ac", "#ddd", "#f1cfa6"];

/** Accent colors per tier */
const accentColors = ["#d4a017", "#888", "#cd7f32"];

/** Title mapping */
const titleMap: Record<AwardBadgeType, string> = {
  "product-of-the-month": "Advanced Verified",
  "product-of-the-week": "Performance Verified",
  "product-of-the-day": "Seller Verified",
};

/** Tier descriptions for tooltip/label */
const tierDescriptions: Record<number, string> = {
  1: "Latency, WiFi, FPS, stability & multi-game tested",
  2: "Third-party benchmark suite completed",
  3: "Trusted seller listing",
};

const AwardBadge = ({ type, place = 1, link, size = "md", className = "" }: AwardBadgeProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [firstOverlayPosition, setFirstOverlayPosition] = useState(0);
  const [matrix, setMatrix] = useState(identityMatrix);
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix);
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState(true);
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState(false);
  const [isTimeoutFinished, setIsTimeoutFinished] = useState(false);
  const enterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout3 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getDimensions = () => {
    const rect = ref.current?.getBoundingClientRect();
    return {
      left: rect?.left || 0,
      right: rect?.right || 0,
      top: rect?.top || 0,
      bottom: rect?.bottom || 0,
    };
  };

  const getMatrix = (clientX: number, clientY: number) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    const scale = [
      maxScale - (maxScale - minScale) * Math.abs(xCenter - clientX) / (xCenter - left),
      maxScale - (maxScale - minScale) * Math.abs(yCenter - clientY) / (yCenter - top),
      maxScale - (maxScale - minScale) * (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY)) / (xCenter - left + yCenter - top),
    ];

    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / yCenter - (xCenter - clientX) / xCenter),
      x2: maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left),
      x3: 0,
      y0: 0,
      y2: maxRotate - (maxRotate - minRotate) * (top - clientY) / (top - bottom),
      y3: 0,
      z0: -(maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left)),
      z1: 0.2 - (0.2 + 0.6) * (top - clientY) / (top - bottom),
      z3: 0,
    };

    return `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ` +
      `${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ` +
      `${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ` +
      `${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`;
  };

  const getOppositeMatrix = (_matrix: string, clientY: number, onEnter?: boolean) => {
    const { top, bottom } = getDimensions();
    const oppositeY = bottom - clientY + top;
    const weakening = onEnter ? 0.7 : 4;
    const multiplier = onEnter ? -1 : 1;

    return _matrix
      .split(", ")
      .map((item, index) => {
        if (index === 2 || index === 4 || index === 8) {
          return -parseFloat(item) * multiplier / weakening;
        } else if (index === 0 || index === 5 || index === 10) {
          return "1";
        } else if (index === 6) {
          return multiplier * (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening;
        } else if (index === 9) {
          return (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening;
        }
        return item;
      })
      .join(", ");
  };

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    if (leaveTimeout1.current) clearTimeout(leaveTimeout1.current);
    if (leaveTimeout2.current) clearTimeout(leaveTimeout2.current);
    if (leaveTimeout3.current) clearTimeout(leaveTimeout3.current);
    setDisableOverlayAnimation(true);

    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setDisableInOutOverlayAnimation(false);
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5);
      });
    });

    const m = getMatrix(e.clientX, e.clientY);
    const oppositeMatrix = getOppositeMatrix(m, e.clientY, true);

    setMatrix(oppositeMatrix);
    setIsTimeoutFinished(false);
    setTimeout(() => setIsTimeoutFinished(true), 200);
  };

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setTimeout(
      () => setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5),
      150
    );

    if (isTimeoutFinished) {
      setCurrentMatrix(getMatrix(e.clientX, e.clientY));
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY);
    if (enterTimeout.current) clearTimeout(enterTimeout.current);

    setCurrentMatrix(oppositeMatrix);
    setTimeout(() => setCurrentMatrix(identityMatrix), 200);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableInOutOverlayAnimation(false);
        leaveTimeout1.current = setTimeout(() => setFirstOverlayPosition(-firstOverlayPosition / 4), 150);
        leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300);
        leaveTimeout3.current = setTimeout(() => {
          setDisableOverlayAnimation(false);
          setDisableInOutOverlayAnimation(true);
        }, 500);
      });
    });
  };

  useEffect(() => {
    if (isTimeoutFinished) {
      setMatrix(currentMatrix);
    }
  }, [currentMatrix, isTimeoutFinished]);

  const overlayAnimations = [...Array(10).keys()]
    .map(
      (i) => `
      @keyframes overlayAnimation${i + 1} {
        0% { transform: rotate(${i * 10}deg); }
        50% { transform: rotate(${(i + 1) * 10}deg); }
        100% { transform: rotate(${i * 10}deg); }
      }`
    )
    .join(" ");

  const placeIndex = (place || 1) - 1;
  const bgColor = backgroundColors[placeIndex] || backgroundColors[0];
  const accent = accentColors[placeIndex] || accentColors[0];
  const badgeTitle = titleMap[type] || "Verified";
  const placeLabel = place === 1 ? "GOLD" : place === 2 ? "SILVER" : "BRONZE";

  const scaleFactor = size === "sm" ? 0.55 : 0.75;

  return (
    <div className={className} style={{ display: "inline-block" }}>
      <style>{overlayAnimations}</style>

      <a
        ref={ref}
        href={link || "#"}
        onClick={(e) => { if (!link) e.preventDefault(); }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "inline-block",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          cursor: link ? "pointer" : "default",
          transform: `scale(${scaleFactor})`,
          transformOrigin: "top right",
        }}
      >
        <div
          style={{
            transform: `matrix3d(${matrix})`,
            transition: "transform 0.2s ease-out",
            position: "relative",
          }}
        >
          {/* Overlay effects */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "12px",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            {[...Array(10).keys()].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background: `conic-gradient(from ${i * 36}deg, transparent 0deg, rgba(255,255,255,${disableOverlayAnimation ? 0.12 : 0}) ${firstOverlayPosition}deg, transparent ${firstOverlayPosition + 2}deg)`,
                  animation: disableInOutOverlayAnimation
                    ? `overlayAnimation${i + 1} 4s ease-in-out infinite`
                    : "none",
                  transition: disableInOutOverlayAnimation ? "none" : "all 0.35s ease",
                  opacity: disableOverlayAnimation ? 1 : 0,
                }}
              />
            ))}
          </div>

          {/* Badge SVG */}
          <svg
            width="240"
            height="260"
            viewBox="0 0 240 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "relative", zIndex: 1 }}
          >
            {/* Background shape */}
            <path
              d="M12 0h216c6.627 0 12 5.373 12 12v200l-120 48L0 212V12C0 5.373 5.373 0 12 0z"
              fill={bgColor}
            />
            <path
              d="M12 0h216c6.627 0 12 5.373 12 12v200l-120 48L0 212V12C0 5.373 5.373 0 12 0z"
              fill="url(#badgeGradient)"
              opacity="0.3"
            />

            {/* Inner border */}
            <path
              d="M18 6h204c5 0 9 4 9 9v191l-111 44.5L9 206V15c0-5 4-9 9-9z"
              fill="none"
              stroke={accent}
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Shield icon at top */}
            <g transform="translate(88, 24)">
              <path
                d="M32 0L64 12V36C64 52 50 64 32 70C14 64 0 52 0 36V12L32 0Z"
                fill={accent}
                opacity="0.9"
              />
              <path
                d="M32 6L58 16V36C58 49 46 59 32 64C18 59 6 49 6 36V16L32 6Z"
                fill={bgColor}
              />
              {/* Checkmark */}
              <path
                d="M22 34L28 40L42 26"
                stroke={accent}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            {/* nYIELD text */}
            <text
              x="120"
              y="115"
              textAnchor="middle"
              fill={accent}
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="12"
              fontWeight="700"
              letterSpacing="3"
            >
              nYIELD
            </text>

            {/* Separator line */}
            <line x1="60" y1="125" x2="180" y2="125" stroke={accent} strokeWidth="0.5" opacity="0.5" />

            {/* Badge title */}
            <text
              x="120"
              y="148"
              textAnchor="middle"
              fill="#333"
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="14"
              fontWeight="700"
            >
              {badgeTitle}
            </text>

            {/* Place label */}
            {place && (
              <text
                x="120"
                y="170"
                textAnchor="middle"
                fill={accent}
                fontFamily="'Space Grotesk', sans-serif"
                fontSize="11"
                fontWeight="600"
                letterSpacing="2"
              >
                {placeLabel}
              </text>
            )}

            {/* Decorative stars */}
            <g transform="translate(120, 192)" fill={accent} opacity="0.6">
              <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" />
              <polygon points="-20,-5 -18.5,-1.5 -15,-1.5 -17.5,1 -16.5,5 -20,2.5 -23.5,5 -22.5,1 -25,-1.5 -21.5,-1.5" transform="scale(0.7)" />
              <polygon points="20,-5 21.5,-1.5 25,-1.5 22.5,1 23.5,5 20,2.5 16.5,5 17.5,1 15,-1.5 18.5,-1.5" transform="scale(0.7)" />
            </g>

            {/* Gradient defs */}
            <defs>
              <linearGradient id="badgeGradient" x1="0" y1="0" x2="240" y2="260" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#fff" stopOpacity="0" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </a>
    </div>
  );
};

export { AwardBadge, titleMap, tierDescriptions };
export type { AwardBadgeProps, AwardBadgeType };
