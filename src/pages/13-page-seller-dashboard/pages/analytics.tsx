/**
 * =============================================================================
 * SELLER ANALYTICS PAGE — Revenue & performance deep-dive
 * =============================================================================
 */

import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { RevenueChart } from "../components/revenue-chart";
import { MetricCard } from "../components/metric-card";
import { SectionInfoCard } from "../components/section-info-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Target, Users, ArrowUpDown, Percent, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

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
        <p className="text-sm text-muted-foreground">
          Deep financial and performance analysis
        </p>
      </div>

      <SectionInfoCard
        icon={BarChart3}
        title="Performance Analytics"
        description="Understand performance trends, revenue breakdowns, and customer behaviour to optimise profitability."
      />

      {/* Financial metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard label="Gross Profit" value={`£${metrics.grossProfit.toLocaleString()}`} change="+8.2%" changeType="positive" icon={DollarSign} glow index={0} />
        <MetricCard label="Net Profit" value={`£${metrics.netProfit.toLocaleString()}`} change="+5.7%" changeType="positive" icon={TrendingUp} index={1} />
        <MetricCard label="Conversion Rate" value={`${metrics.conversionRate}%`} change="+0.3%" changeType="positive" icon={Percent} index={2} />
        <MetricCard label="Avg Order Value" value={`£${metrics.averageOrderValue.toLocaleString()}`} icon={ArrowUpDown} index={3} />
        <MetricCard label="Customer Acq. Cost" value={`£${metrics.customerAcquisitionCost}`} change="-£4" changeType="positive" icon={Target} index={4} />
        <MetricCard label="Lifetime Value" value={`£${metrics.lifetimeValue.toLocaleString()}`} change="+12%" changeType="positive" icon={Users} glow index={5} />
      </div>

      {/* Revenue chart */}
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
                <span className="text-xs font-bold text-muted-foreground w-5">
                  #{index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{product.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.views.toLocaleString()} views · {product.conversionRate}% conversion
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{product.sold} sold</p>
                  <p className="text-xs text-muted-foreground">
                    £{(product.sold * product.price).toLocaleString()} revenue
                  </p>
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
