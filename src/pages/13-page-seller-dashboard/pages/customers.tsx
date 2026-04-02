/**
 * =============================================================================
 * SELLER CUSTOMERS PAGE — Customer intelligence & segmentation
 * =============================================================================
 */

import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { MetricCard } from "../components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Crown, ArrowUpDown } from "lucide-react";

const segmentConfig = {
  new: { label: "New", color: "bg-blue-500/10 text-blue-500 border-blue-500/30" },
  returning: { label: "Returning", color: "bg-amber-500/10 text-amber-500 border-amber-500/30" },
  vip: { label: "VIP", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" },
};

const SellerCustomersPage = () => {
  const { customers, metrics, loading } = useSellerDashboard();

  if (loading || !metrics) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground">
          Customer intelligence and segmentation
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Customers" value={metrics.totalCustomers.toLocaleString()} icon={Users} glow />
        <MetricCard label="Returning" value={metrics.returningCustomers.toLocaleString()} icon={ArrowUpDown} />
        <MetricCard label="New This Month" value="47" icon={UserPlus} />
        <MetricCard label="VIP Customers" value={customers.filter((c) => c.segment === "vip").length.toString()} icon={Crown} />
      </div>

      {/* Customer table */}
      <Card className="glass-base">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">All Customers</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Email</th>
                  <th className="text-center py-2 px-2 text-xs font-medium text-muted-foreground">Orders</th>
                  <th className="text-right py-2 px-2 text-xs font-medium text-muted-foreground">Total Spent</th>
                  <th className="text-center py-2 px-2 text-xs font-medium text-muted-foreground">Segment</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Last Order</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => {
                  const seg = segmentConfig[customer.segment];
                  return (
                    <tr key={customer.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-2 text-sm font-medium text-foreground">{customer.name}</td>
                      <td className="py-3 px-2 text-xs text-muted-foreground">{customer.email}</td>
                      <td className="py-3 px-2 text-xs text-foreground text-center">{customer.totalOrders}</td>
                      <td className="py-3 px-2 text-xs font-semibold text-foreground text-right">
                        £{customer.totalSpent.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Badge variant="outline" className={`text-[10px] ${seg.color}`}>
                          {seg.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-xs text-muted-foreground">{customer.lastOrder}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerCustomersPage;
