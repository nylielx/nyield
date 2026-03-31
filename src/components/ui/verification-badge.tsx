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
  glowBorder: string;
  glowShadow: string;
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
    glowBorder: "shadow-[0_0_8px_rgba(217,165,32,0.5),inset_0_0_4px_rgba(217,165,32,0.15)]",
    glowShadow: "0 0 12px rgba(217,165,32,0.35)",
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
    glowBorder: "shadow-[0_0_6px_rgba(180,200,220,0.35),inset_0_0_3px_rgba(180,200,220,0.1)]",
    glowShadow: "0 0 8px rgba(180,200,220,0.25)",
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
    glowBorder: "shadow-sm",
    glowShadow: "none",
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

      {/* ── Flag (unrolls from the RIGHT side) ── */}
      <div
        className="absolute top-0 right-full mr-1.5 z-30 pointer-events-none group-hover/badge:pointer-events-auto flex items-start"
        style={{ minWidth: "200px" }}
      >
        <div
          className={`
            origin-right scale-x-0 opacity-0
            group-hover/badge:scale-x-100 group-hover/badge:opacity-100
            bg-background/90 backdrop-blur-xl
            border border-border/60
            rounded-lg rounded-r-sm
            px-3 py-2.5
            ${config.glowBorder}
          `}
          style={{
            transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease-out",
            boxShadow: config.glowShadow,
          }}
        >
          {/* Tier label */}
          <p className={`text-[11px] font-bold tracking-wide mb-1 flex items-center gap-1.5 ${config.iconColor} whitespace-nowrap`}>
            <ShieldCheck size={12} className="shrink-0" />
            {config.shortLabel}
          </p>

          {/* Description */}
          <p className="text-[9px] leading-relaxed text-muted-foreground mb-2">
            {config.description}
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-1">
            {config.features.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-medium bg-muted text-muted-foreground border border-border/50"
              >
                <f.icon size={8} className="shrink-0" />
                {f.label}
              </span>
            ))}
          </div>

          {/* Gold shimmer line */}
          {tier === "gold" && (
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-amber-400/50 to-transparent" />
          )}
        </div>
      </div>
    </div>
  );
};

export { VerificationBadge };
