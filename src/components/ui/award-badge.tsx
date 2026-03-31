/**
 * AWARD BADGE — Premium 3D verification badge for marketplace listings
 * Tiers: Gold (place=1), Silver (place=2), Bronze (place=3)
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AwardBadgeProps {
  type: "product-of-the-month" | "product-of-the-week" | "product-of-the-day";
  place: 1 | 2 | 3;
  size?: "sm" | "md";
  className?: string;
}

const tierConfig = {
  1: {
    label: "Advanced Verified",
    gradient: "from-yellow-400 via-amber-300 to-yellow-500",
    border: "border-yellow-400/50",
    glow: "0 0 16px hsl(45 90% 55% / 0.3)",
    ribbon: "bg-yellow-500",
    textColor: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    icon: "🏆",
  },
  2: {
    label: "Performance Verified",
    gradient: "from-slate-300 via-gray-200 to-slate-400",
    border: "border-slate-300/50",
    glow: "0 0 12px hsl(220 10% 70% / 0.25)",
    ribbon: "bg-slate-400",
    textColor: "text-slate-300",
    bgColor: "bg-slate-300/10",
    icon: "🥈",
  },
  3: {
    label: "Seller Verified",
    gradient: "from-orange-400 via-amber-600 to-orange-500",
    border: "border-orange-400/50",
    glow: "0 0 10px hsl(25 80% 50% / 0.2)",
    ribbon: "bg-orange-500",
    textColor: "text-orange-400",
    bgColor: "bg-orange-400/10",
    icon: "🥉",
  },
};

const AwardBadge = ({ place, size = "sm", className }: AwardBadgeProps) => {
  const config = tierConfig[place];

  if (size === "sm") {
    return (
      <motion.div
        whileHover={{ scale: 1.08 }}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-sm",
          config.border,
          config.bgColor,
          className
        )}
        style={{ boxShadow: config.glow }}
      >
        <span className="text-xs">{config.icon}</span>
        <span className={cn("text-[10px] font-bold uppercase tracking-wider", config.textColor)}>
          {config.label}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className={cn(
        "relative inline-flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl border backdrop-blur-sm",
        config.border,
        config.bgColor,
        className
      )}
      style={{ boxShadow: config.glow }}
    >
      <span className="text-lg">{config.icon}</span>
      <span className={cn("text-[10px] font-bold uppercase tracking-wider", config.textColor)}>
        {config.label}
      </span>
    </motion.div>
  );
};

export { AwardBadge, tierConfig };
export type { AwardBadgeProps };
