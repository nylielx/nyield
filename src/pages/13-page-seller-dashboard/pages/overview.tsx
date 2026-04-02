/**
 * =============================================================================
 * SELLER DASHBOARD — Overview page (Executive Decision Layer)
 * =============================================================================
 */

import { useAuth } from "@/contexts/AuthContext";
import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { MetricCard } from "../components/metric-card";
import { SectionInfoCard } from "../components/section-info-card";
import { OrderBreakdown } from "../components/order-breakdown";
import { RevenueChart } from "../components/revenue-chart";
import { RecentOrdersTable } from "../components/recent-orders-table";
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Clock,
  LayoutDashboard,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockAlerts = [
  { id: 1, message: "Conversion dropped 12% this week — review pricing strategy", type: "warning" as const },
  { id: 2, message: "Silent Storm Workstation is out of stock — restock recommended", type: "warning" as const },
  { id: 3, message: "Summer Sale campaign outperforming by 23%", type: "success" as const },
];

const SellerOverviewPage = () => {
  const { user } = useAuth();
  const { metrics, orders, activities, revenueData, loading } = useSellerDashboard();

  if (loading || !metrics) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 bg-muted/30 rounded animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-muted/30 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="h-80 bg-muted/30 rounded-lg animate-pulse" />
      </div>
    );
  }

  const firstName = user?.fullName?.split(" ")[0] ?? "Seller";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {firstName}
          </h1>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
            Business
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Your business at a glance — key metrics, orders, and alerts.
        </p>
      </div>

      {/* Section context */}
      <SectionInfoCard
        icon={LayoutDashboard}
        title="Executive Overview"
        description="Monitor real-time business health including revenue, orders, conversion, and smart alerts to make quick decisions."
      />

      {/* Smart Alerts */}
      <div className="space-y-2">
        {mockAlerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
          >
            <Card className={alert.type === "warning" ? "border-amber-500/30 bg-amber-500/5" : "border-emerald-500/30 bg-emerald-500/5"}>
              <CardContent className="p-3 flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {alert.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                  ) : (
                    <Zap className="h-4 w-4 text-emerald-500 shrink-0" />
                  )}
                </motion.div>
                <p className="text-xs text-foreground">{alert.message}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Key Metrics — 4-card grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Orders"
          value={metrics.totalOrders.toLocaleString()}
          change="-1.2%"
          changeType="negative"
          icon={ShoppingCart}
          glow
          index={0}
        />
        <MetricCard
          label="Avg Delivery Time"
          value="3.2 days"
          change="+0.7 days"
          changeType="positive"
          icon={Clock}
          index={1}
        />
        <MetricCard
          label="Volume Growth"
          value="+8%"
          change="+2% this week"
          changeType="positive"
          icon={TrendingUp}
          index={2}
        />
        <MetricCard
          label="Monthly Revenue"
          value={`£${metrics.revenue.monthly.toLocaleString()}`}
          change="+12.4%"
          changeType="positive"
          icon={DollarSign}
          glow
          index={3}
        />
      </div>

      {/* Order Breakdown */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Order Breakdown</h2>
        <OrderBreakdown metrics={metrics} />
      </div>

      {/* Revenue Chart */}
      <RevenueChart data={revenueData} />

      {/* Recent Orders */}
      <RecentOrdersTable orders={orders.slice(0, 6)} />

      {/* Recent Activity */}
      <Card className="glass-base">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {activities.map((act, i) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
              className="flex items-start gap-3 py-2 border-b border-border/20 last:border-0"
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">{act.message}</p>
                <p className="text-xs text-muted-foreground">{act.time}</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerOverviewPage;
