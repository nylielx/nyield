/**
 * =============================================================================
 * RECENT ORDERS TABLE — Compact order list for seller dashboard
 * =============================================================================
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { orderStatusConfig, type SellerOrder } from "../data/seller-mock";

interface RecentOrdersTableProps {
  orders: SellerOrder[];
}

export const RecentOrdersTable = ({ orders }: RecentOrdersTableProps) => (
  <Card className="glass-base">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          View All →
        </Button>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Order ID</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Date</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Customer</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Product</th>
              <th className="text-right py-2 px-2 text-xs font-medium text-muted-foreground">Amount</th>
              <th className="text-center py-2 px-2 text-xs font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const status = orderStatusConfig[order.status];
              return (
                <tr key={order.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-2 font-mono text-xs text-foreground">{order.orderNumber}</td>
                  <td className="py-3 px-2 text-xs text-muted-foreground whitespace-nowrap">{order.date}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center text-[10px] font-semibold text-muted-foreground">
                        {order.customerAvatar}
                      </div>
                      <span className="text-xs text-foreground">{order.customerName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-xs text-foreground max-w-[200px] truncate">{order.product}</td>
                  <td className="py-3 px-2 text-xs font-semibold text-foreground text-right">
                    £{order.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <Badge variant="outline" className={`text-[10px] ${status.color}`}>
                      {status.label}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);
