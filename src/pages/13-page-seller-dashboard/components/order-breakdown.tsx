/**
 * =============================================================================
 * ORDER BREAKDOWN — Stat cards for order status breakdown
 * =============================================================================
 */

import { Card, CardContent } from "@/components/ui/card";
import type { SellerMetrics } from "../data/seller-mock";

interface OrderBreakdownProps {
  metrics: SellerMetrics;
}

const breakdownItems = [
  { key: "pendingOrders" as const, label: "Pending Orders", changeText: "+9.3%", changeType: "positive" as const },
  { key: "shippedOrders" as const, label: "Shipped Orders", changeText: "+2.4%", changeType: "positive" as const },
  { key: "cancelledOrders" as const, label: "Cancelled Orders", changeText: "-1.2%", changeType: "negative" as const },
  { key: "deliveredOrders" as const, label: "Delivered Orders", changeText: "+6.1%", changeType: "positive" as const },
];

export const OrderBreakdown = ({ metrics }: OrderBreakdownProps) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    {breakdownItems.map(({ key, label, changeText, changeType }) => (
      <Card key={key} className="glass-base">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-xl font-bold text-foreground">
              {metrics[key].toLocaleString()}
            </p>
            <span
              className={
                changeType === "positive"
                  ? "text-xs text-emerald-500"
                  : "text-xs text-destructive"
              }
            >
              {changeText}
            </span>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
