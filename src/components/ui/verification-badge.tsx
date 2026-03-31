/**
 * VERIFICATION BADGE — Icon-only badge with flag unroll on hover.
 * Gold: glow + rotating rays + shimmer flag
 * Silver: faint glow + static rays + neutral flag
 * Bronze: no effects + simple flag
 */

import { ShieldCheck, Zap, Brain, Wifi, Gamepad2, Activity, UserCheck, Cpu, ClipboardCheck } from "lucide-react";

/* ── Tier data ── */
export type VerificationTier = "gold" | "silver" | "bronze";

interface TierConfig {
  name: string;
  shortLabel: string;
  description: string;
  features: { icon: React.ElementType; label: string }[];
  iconColor: string;
  glowColor: string;
  flagGradient: string;
  flagBorder: string;
  hasRays: boolean;
  raysRotate: boolean;
}

export const tierConfig: Record<VerificationTier, TierConfig> = {
  gold: {
    name: "nYield Elite Verified",
    shortLabel: "Elite Verified",
    description:
      "Fully validated using advanced multi-layer testing. Includes FPS benchmarks, latency optimisation, network stability, and real-world performance across multiple competitive titles.",
    features: [
      { icon: Activity, label: "CapFrameX" },
      { icon: Zap, label: "FPS + Lows" },
      { icon: Brain, label: "Latency" },
      { icon: Wifi, label: "Network" },
      { icon: Gamepad2, label: "Multi-game" },
      { icon: Cpu, label: "Stress Test" },
    ],
    iconColor: "text-amber-400",
    glowColor: "rgba(217, 165, 32, 0.5)",
    flagGradient: "from-amber-500/90 via-yellow-600/85 to-amber-700/90",
    flagBorder: "border-amber-400/40",
    hasRays: true,
    raysRotate: true,
  },
  silver: {
    name: "nYield Performance Verified",
    shortLabel: "Performance Verified",
    description:
      "Verified using trusted benchmarking tools to confirm performance gains, FPS stability, and system consistency.",
    features: [
      { icon: ClipboardCheck, label: "Benchmarks" },
      { icon: Zap, label: "FPS Testing" },
      { icon: Activity, label: "Stability" },
      { icon: Gamepad2, label: "Game Test" },
    ],
    iconColor: "text-slate-300",
    glowColor: "rgba(180, 200, 220, 0.35)",
    flagGradient: "from-slate-500/85 via-slate-600/80 to-slate-700/85",
    flagBorder: "border-slate-400/30",
    hasRays: true,
    raysRotate: false,
  },
  bronze: {
    name: "nYield Seller Verified",
    shortLabel: "Seller Verified",
    description:
      "Listed by a trusted and verified seller. System details have been reviewed, but advanced performance validation has not been completed.",
    features: [
      { icon: UserCheck, label: "ID Verified" },
      { icon: Cpu, label: "Specs Checked" },
      { icon: ClipboardCheck, label: "Reviewed" },
    ],
    iconColor: "text-orange-400",
    glowColor: "transparent",
    flagGradient: "from-stone-600/80 via-stone-700/75 to-stone-800/80",
    flagBorder: "border-stone-500/25",
    hasRays: false,
    raysRotate: false,
  },
};

/* ── Component ── */
interface VerificationBadgeProps {
  tier: VerificationTier;
  className?: string;
}

const VerificationBadge = ({ tier, className = "" }: VerificationBadgeProps) => {
  const config = tierConfig[tier];

  return (
    <div className={`relative group/badge ${className}`}>
      {/* ── Ray container (behind icon) ── */}
      {config.hasRays && (
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 ease-out">
          {/* Radial glow */}
          <div
            className="absolute w-10 h-10 rounded-full blur-md"
            style={{
              background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
            }}
          />
          {/* Conic rays — rotate for gold only */}
          {config.raysRotate ? (
            <div
              className="absolute w-12 h-12 rounded-full blur-sm animate-spin"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(217,165,32,0.15) 30deg, transparent 60deg, rgba(217,165,32,0.1) 120deg, transparent 150deg, rgba(217,165,32,0.15) 210deg, transparent 240deg, rgba(217,165,32,0.1) 300deg, transparent 330deg)",
                animationDuration: "4s",
              }}
            />
          ) : (
            <div
              className="absolute w-10 h-10 rounded-full blur-sm"
              style={{
                background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 65%)`,
              }}
            />
          )}
        </div>
      )}

      {/* ── Icon ── */}
      <div
        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center
          bg-background/80 backdrop-blur-sm border border-border/50
          transition-all duration-300 ease-out
          group-hover/badge:scale-110
          ${tier === "gold" ? "group-hover/badge:shadow-[0_0_12px_rgba(217,165,32,0.4)]" : ""}
          ${tier === "silver" ? "group-hover/badge:shadow-[0_0_8px_rgba(180,200,220,0.3)]" : ""}
        `}
      >
        <ShieldCheck
          size={14}
          className={`transition-all duration-300 ${config.iconColor} ${
            tier === "gold" ? "group-hover/badge:drop-shadow-[0_0_4px_rgba(217,165,32,0.6)]" : ""
          }`}
        />
      </div>

      {/* ── Flag (unrolls down on hover) ── */}
      <div
        className="absolute top-full mt-1.5 right-0 z-30 pointer-events-none group-hover/badge:pointer-events-auto"
        style={{ minWidth: "180px" }}
      >
        <div
          className={`
            origin-top scale-y-0 opacity-0
            group-hover/badge:scale-y-100 group-hover/badge:opacity-100
            bg-gradient-to-b ${config.flagGradient}
            backdrop-blur-xl border ${config.flagBorder}
            rounded-lg rounded-tr-sm shadow-xl
            px-3 py-2.5
          `}
          style={{
            transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease-out",
          }}
        >
          {/* Tier label */}
          <p className="text-[11px] font-bold text-white/95 tracking-wide mb-1 flex items-center gap-1.5">
            <ShieldCheck size={12} className="shrink-0" />
            {config.shortLabel}
          </p>

          {/* Description */}
          <p className="text-[9px] leading-relaxed text-white/70 mb-2">
            {config.description}
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-1">
            {config.features.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-medium bg-white/10 text-white/80 border border-white/10"
              >
                <f.icon size={8} className="shrink-0" />
                {f.label}
              </span>
            ))}
          </div>

          {/* Gold shimmer line */}
          {tier === "gold" && (
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
          )}
        </div>
      </div>
    </div>
  );
};

export { VerificationBadge };
