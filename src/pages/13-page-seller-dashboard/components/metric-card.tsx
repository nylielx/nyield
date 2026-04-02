/**
 * =============================================================================
 * METRIC CARD — Large stat card with glow effect for key metrics
 * =============================================================================
 */

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
}

export const MetricCard = ({
  label,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  glow = false,
}: MetricCardProps) => (
  <Card className={cn("glass-base relative overflow-hidden", glow && "ring-1 ring-primary/20")}>
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
        <div className={cn("p-2 rounded-lg", glow ? "bg-primary/10" : "bg-muted/50")}>
          <Icon className={cn("h-5 w-5", glow ? "text-primary" : "text-muted-foreground")} />
        </div>
      </div>
    </CardContent>
  </Card>
);
