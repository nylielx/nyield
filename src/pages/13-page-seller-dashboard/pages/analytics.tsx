/**
 * =============================================================================
 * SELLER ANALYTICS PAGE — Revenue & performance deep-dive
 * =============================================================================
 */

import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { RevenueChart } from "../components/revenue-chart";
import { MetricCard } from "../components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Target, Users, ArrowUpDown, Percent } from "lucide-react";

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

  // Top performing products by sales
  const topProducts = [...listings].sort((a, b) => b.sold - a.sold).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Deep financial and performance analysis
        </p>
      </div>

      {/* Financial metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          label="Gross Profit"
          value={`£${metrics.grossProfit.toLocaleString()}`}
          change="+8.2% from last month"
          changeType="positive"
          icon={DollarSign}
          glow
        />
        <MetricCard
          label="Net Profit"
          value={`£${metrics.netProfit.toLocaleString()}`}
          change="+5.7% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          label="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          change="+0.3% improvement"
          changeType="positive"
          icon={Percent}
        />
        <MetricCard
          label="Avg Order Value"
          value={`£${metrics.averageOrderValue.toLocaleString()}`}
          icon={ArrowUpDown}
        />
        <MetricCard
          label="Customer Acq. Cost"
          value={`£${metrics.customerAcquisitionCost}`}
          change="-£4 from last month"
          changeType="positive"
          icon={Target}
        />
        <MetricCard
          label="Lifetime Value"
          value={`£${metrics.lifetimeValue.toLocaleString()}`}
          change="+12% this quarter"
          changeType="positive"
          icon={Users}
          glow
        />
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
              <div
                key={product.id}
                className="flex items-center gap-4 py-2 border-b border-border/20 last:border-0"
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerAnalyticsPage;
