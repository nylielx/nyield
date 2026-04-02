/**
 * =============================================================================
 * SELLER ORDERS PAGE — Full order management
 * =============================================================================
 */

import { useState } from "react";
import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { RecentOrdersTable } from "../components/recent-orders-table";
import { MetricCard } from "../components/metric-card";
import { SectionInfoCard } from "../components/section-info-card";
import { ShoppingCart, Truck, PackageCheck, XCircle, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orderStatusConfig } from "../data/seller-mock";
import { useIsMobile } from "@/hooks/use-mobile";

const SellerOrdersPage = () => {
  const { orders, metrics, loading } = useSellerDashboard();
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();

  if (loading || !metrics) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track all customer orders
        </p>
      </div>

      <SectionInfoCard
        icon={ClipboardList}
        title="Order Management"
        description="Manage the full lifecycle of customer orders from processing to delivery and returns."
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Orders" value={orders.length.toString()} icon={ShoppingCart} index={0} />
        <MetricCard
          label="Shipped"
          value={orders.filter((o) => o.status === "shipped").length.toString()}
          icon={Truck}
          index={1}
        />
        <MetricCard
          label="Delivered"
          value={orders.filter((o) => o.status === "delivered").length.toString()}
          icon={PackageCheck}
          index={2}
        />
        <MetricCard
          label="Cancelled"
          value={orders.filter((o) => o.status === "cancelled").length.toString()}
          icon={XCircle}
          index={3}
        />
      </div>

      {/* Search */}
      <Input
        placeholder="Search by order ID, customer, or product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {/* Orders — desktop table, mobile cards */}
      {filtered.length === 0 ? (
        <Card className="glass-base">
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">No orders match your search.</p>
          </CardContent>
        </Card>
      ) : isMobile ? (
        <div className="space-y-3">
          {filtered.map((order) => {
            const status = orderStatusConfig[order.status];
            return (
              <Card key={order.id} className="glass-base">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground">{order.orderNumber}</span>
                    <Badge variant="outline" className={`text-[10px] ${status.color}`}>
                      {status.label}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground">{order.product}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{order.customerName}</span>
                    <span className="font-semibold text-foreground">£{order.amount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <RecentOrdersTable orders={filtered} />
      )}
    </div>
  );
};

export default SellerOrdersPage;
