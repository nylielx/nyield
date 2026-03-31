/**
 * VERIFICATION BADGE — Small icon-based verification with tier rays/glow
 * Gold: glow + rotating rays on hover
 * Silver: faint glow on hover
 * Bronze: subtle color shift only
 */

import { ShieldCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type VerificationTier = "gold" | "silver" | "bronze";

interface VerificationBadgeProps {
  tier: VerificationTier;
  className?: string;
}

const tierConfig: Record<VerificationTier, {
  label: string;
  description: string;
  iconColor: string;
  glowColor: string;
  hasRays: boolean;
  raysRotate: boolean;
}> = {
  gold: {
    label: "Advanced Verified",
    description: "Latency, WiFi, FPS, stability & multi-game benchmark tested",
    iconColor: "text-amber-400",
    glowColor: "rgba(217, 165, 32, 0.5)",
    hasRays: true,
    raysRotate: true,
  },
  silver: {
    label: "Performance Verified",
    description: "Third-party benchmark suite completed",
    iconColor: "text-slate-300",
    glowColor: "rgba(180, 200, 220, 0.35)",
    hasRays: true,
    raysRotate: false,
  },
  bronze: {
    label: "Seller Verified",
    description: "Trusted seller listing",
    iconColor: "text-orange-400",
    glowColor: "transparent",
    hasRays: false,
    raysRotate: false,
  },
};

const VerificationBadge = ({ tier, className = "" }: VerificationBadgeProps) => {
  const config = tierConfig[tier];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`relative group cursor-pointer ${className}`}>
          {/* Ray container — behind icon, only for gold/silver */}
          {config.hasRays && (
            <div
              className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
            >
              {/* Radial glow */}
              <div
                className="absolute w-10 h-10 rounded-full blur-md"
                style={{ background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)` }}
              />
              {/* Conic rays — only rotate for gold */}
              {config.raysRotate ? (
                <div
                  className="absolute w-12 h-12 rounded-full blur-sm animate-spin"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0deg, rgba(217, 165, 32, 0.15) 30deg, transparent 60deg, rgba(217, 165, 32, 0.1) 120deg, transparent 150deg, rgba(217, 165, 32, 0.15) 210deg, transparent 240deg, rgba(217, 165, 32, 0.1) 300deg, transparent 330deg)`,
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

          {/* Icon */}
          <div
            className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center
              bg-background/80 backdrop-blur-sm border border-border/50
              transition-all duration-300 ease-out
              group-hover:scale-110
              ${tier === "gold" ? "group-hover:shadow-[0_0_12px_rgba(217,165,32,0.4)]" : ""}
              ${tier === "silver" ? "group-hover:shadow-[0_0_8px_rgba(180,200,220,0.3)]" : ""}
            `}
          >
            <ShieldCheck
              size={15}
              className={`transition-all duration-300 ${config.iconColor} ${
                tier === "gold" ? "group-hover:drop-shadow-[0_0_4px_rgba(217,165,32,0.6)]" : ""
              }`}
            />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px]">
        <p className="text-xs font-semibold mb-0.5">{config.label}</p>
        <p className="text-[10px] text-muted-foreground">{config.description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export { VerificationBadge, tierConfig };
export type { VerificationTier };
