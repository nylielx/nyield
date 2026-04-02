/**
 * =============================================================================
 * SELLER ANALYTICS PAGE — Expandable metrics with timeframe toggles
 * =============================================================================
 */

import { useState } from "react";
import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { RevenueChart } from "../components/revenue-chart";
import { SectionInfoCard } from "../components/section-info-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Target, Users, ArrowUpDown, Percent, BarChart3, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ExpandableMetricProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  glow?: boolean;
  index: number;
  breakdown?: { label: string; value: string }[];
  drivers?: string[];
}

const ExpandableMetric = ({ label, value, change, changeType = "neutral", icon: Icon, glow = false, index, breakdown, drivers }: ExpandableMetricProps) => {
  const [expanded, setExpanded] = useState(false);
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("monthly");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "glass-base relative overflow-hidden group transition-shadow duration-300 cursor-pointer",
          glow && "ring-1 ring-primary/20 hover:shadow-[0_0_20px_hsl(var(--primary)/0.12)]"
        )}
        onClick={() => setExpanded(!expanded)}
      >
        {glow && <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />}
        <CardContent className="p-5 relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{label}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {change && (
                <p className={cn("text-xs mt-1 font-medium", changeType === "positive" && "text-emerald-500", changeType === "negative" && "text-destructive", changeType === "neutral" && "text-muted-foreground")}>
                  {change}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <motion.div whileHover={{ scale: 1.1 }} className={cn("p-2 rounded-lg transition-colors duration-200", glow ? "bg-primary/10" : "bg-muted/50")}>
                <Icon className={cn("h-5 w-5", glow ? "text-primary" : "text-muted-foreground")} />
              </motion.div>
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </motion.div>
            </div>
          </div>
        </CardContent>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 border-t border-border/30 pt-3 space-y-3" onClick={(e) => e.stopPropagation()}>
                {/* Timeframe toggle */}
                <div className="flex gap-1">
                  {(["daily", "weekly", "monthly"] as const).map((tf) => (
                    <Button
                      key={tf}
                      variant={timeframe === tf ? "default" : "ghost"}
                      size="sm"
                      className="text-[10px] h-6 px-2"
                      onClick={() => setTimeframe(tf)}
                    >
                      {tf.charAt(0).toUpperCase() + tf.slice(1)}
                    </Button>
                  ))}
                </div>

                {breakdown && (
                  <div className="space-y-1.5">
                    {breakdown.map((b) => (
                      <div key={b.label} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{b.label}</span>
                        <span className="text-foreground font-medium">{b.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {drivers && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Key Drivers</p>
                    {drivers.map((d) => (
                      <div key={d} className="flex items-center gap-1.5 py-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-xs text-muted-foreground">{d}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

const SellerAnalyticsPage = () => {
  const { metrics, revenueData, listings, loading } = useSellerDashboard();

  if (loading || !metrics) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  const topProducts = [...listings].sort((a, b) => b.sold - a.sold).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Deep financial and performance analysis</p>
      </div>

      <SectionInfoCard
        icon={BarChart3}
        title="Performance Analytics"
        description="Understand performance trends, revenue breakdowns, and customer behaviour to optimise profitability."
      />

      {/* Expandable financial metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ExpandableMetric
          label="Gross Profit" value={`£${metrics.grossProfit.toLocaleString()}`} change="+8.2%" changeType="positive" icon={DollarSign} glow index={0}
          breakdown={[{ label: "Revenue", value: `£${metrics.revenue.monthly.toLocaleString()}` }, { label: "COGS", value: `£${(metrics.revenue.monthly - metrics.grossProfit).toLocaleString()}` }]}
          drivers={["Apex Predator builds (+£4.2k)", "Summer Sale discount impact (-£1.1k)"]}
        />
        <ExpandableMetric
          label="Net Profit" value={`£${metrics.netProfit.toLocaleString()}`} change="+5.7%" changeType="positive" icon={TrendingUp} index={1}
          breakdown={[{ label: "Gross Profit", value: `£${metrics.grossProfit.toLocaleString()}` }, { label: "Platform Fees", value: `-£${(metrics.grossProfit - metrics.netProfit).toLocaleString()}` }]}
          drivers={["Fee reduction on high-volume listings", "Reduced refund rate"]}
        />
        <ExpandableMetric
          label="Conversion Rate" value={`${metrics.conversionRate}%`} change="+0.3%" changeType="positive" icon={Percent} index={2}
          breakdown={[{ label: "Impressions", value: "12,400" }, { label: "Clicks", value: "1,860" }, { label: "Purchases", value: "89" }]}
          drivers={["Improved listing photos", "Faster page load speed"]}
        />
        <ExpandableMetric
          label="Avg Order Value" value={`£${metrics.averageOrderValue.toLocaleString()}`} icon={ArrowUpDown} index={3}
          breakdown={[{ label: "Highest AOV Product", value: "Silent Storm (£4,200)" }, { label: "Lowest AOV Product", value: "Budget Blitz (£795)" }]}
        />
        <ExpandableMetric
          label="Customer Acq. Cost" value={`£${metrics.customerAcquisitionCost}`} change="-£4" changeType="positive" icon={Target} index={4}
          breakdown={[{ label: "Ad Spend", value: "£820" }, { label: "New Customers", value: "47" }]}
          drivers={["Organic traffic growing", "Word of mouth referrals"]}
        />
        <ExpandableMetric
          label="Lifetime Value" value={`£${metrics.lifetimeValue.toLocaleString()}`} change="+12%" changeType="positive" icon={Users} glow index={5}
          breakdown={[{ label: "Avg Orders/Customer", value: "2.4" }, { label: "Avg Retention", value: "14 months" }]}
          drivers={["VIP segment growing 18%", "Repeat purchase rate up"]}
        />
      </div>

      <RevenueChart data={revenueData} />

      {/* Top products */}
      <Card className="glass-base">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Top Performing Products</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.25 }}
                className="flex items-center gap-4 py-2 border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors rounded-lg px-2"
              >
                <span className="text-xs font-bold text-muted-foreground w-5">#{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{product.title}</p>
                  <p className="text-xs text-muted-foreground">{product.views.toLocaleString()} views · {product.conversionRate}% conversion</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{product.sold} sold</p>
                  <p className="text-xs text-muted-foreground">£{(product.sold * product.price).toLocaleString()} revenue</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerAnalyticsPage;
