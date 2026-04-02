/**
 * =============================================================================
 * METRIC CARD — Animated stat card with glow effect for key metrics
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  glow?: boolean;
  index?: number;
}

export const MetricCard = ({
  label,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  glow = false,
  index = 0,
}: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
  >
    <Card
      className={cn(
        "glass-base relative overflow-hidden group transition-shadow duration-300",
        glow && "ring-1 ring-primary/20 hover:shadow-[0_0_20px_hsl(var(--primary)/0.12)]"
      )}
    >
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      )}
      <CardContent className="p-5 relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <p
                className={cn(
                  "text-xs mt-1 font-medium",
                  changeType === "positive" && "text-emerald-500",
                  changeType === "negative" && "text-destructive",
                  changeType === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </p>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={cn(
              "p-2 rounded-lg transition-colors duration-200",
              glow ? "bg-primary/10 group-hover:bg-primary/15" : "bg-muted/50 group-hover:bg-muted/70"
            )}
          >
            <Icon className={cn("h-5 w-5", glow ? "text-primary" : "text-muted-foreground")} />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
