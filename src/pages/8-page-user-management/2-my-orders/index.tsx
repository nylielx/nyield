/**
 * =============================================================================
 * MY ORDERS PAGE — Premium orders overview
 * =============================================================================
 */

import { useOrders } from "./hooks/use-orders";
import { OrderCard } from "./components/order-card";
import { OrderTable } from "./components/order-table";
import { OrderStatusReference } from "./components/order-status-reference";
import { DispatchLeadTimes } from "./components/dispatch-lead-times";
import { useIsMobile } from "@/hooks/use-mobile";
import { PackageOpen } from "lucide-react";

const MyOrdersPage = () => {
  const { orders, loading } = useOrders();
  const isMobile = useIsMobile();

  if (loading) {
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          {orders.length > 0
            ? `${orders.length} order${orders.length !== 1 ? "s" : ""} — Track your builds from production to delivery.`
            : "You haven't placed any orders yet."}
        </p>
      </div>

      {/* Orders list */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-muted/30 mb-4">
            <PackageOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">No orders yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            When you place an order, it will appear here so you can track its progress.
          </p>
        </div>
      ) : isMobile ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <OrderTable orders={orders} />
      )}

      {/* Status reference */}
      <OrderStatusReference />

      {/* Dispatch lead times */}
      <DispatchLeadTimes />
    </div>
  );
};

export default MyOrdersPage;
