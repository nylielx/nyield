/**
 * =============================================================================
 * SELLER DASHBOARD — Overview page (Executive Decision Layer)
 * =============================================================================
 */

import { useAuth } from "@/contexts/AuthContext";
import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { MetricCard } from "../components/metric-card";
import { OrderBreakdown } from "../components/order-breakdown";
import { RevenueChart } from "../components/revenue-chart";
import { RecentOrdersTable } from "../components/recent-orders-table";
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
          Track and manage your orders, from placement to delivery, all in one place.
        </p>
      </div>

      {/* Key Metrics — 4-card grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Orders"
          value={metrics.totalOrders.toLocaleString()}
          change="-1.2% from last period"
          changeType="negative"
          icon={ShoppingCart}
          glow
        />
        <MetricCard
          label="Average Delivery Time"
          value="3.2 days"
          change="+0.7 days compared to last period"
          changeType="positive"
          icon={Clock}
        />
        <MetricCard
          label="Order Volume Growth"
          value="+8%"
          change="Increased by +2% this week"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          label="Monthly Revenue"
          value={`£${metrics.revenue.monthly.toLocaleString()}`}
          change="+12.4% from last month"
          changeType="positive"
          icon={DollarSign}
          glow
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
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-start gap-3 py-2 border-b border-border/20 last:border-0"
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">{act.message}</p>
                <p className="text-xs text-muted-foreground">{act.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerOverviewPage;
