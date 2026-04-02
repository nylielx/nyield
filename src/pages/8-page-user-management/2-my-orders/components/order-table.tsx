/**
 * =============================================================================
 * ORDER TABLE — Desktop table view for orders
 * =============================================================================
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import type { Order } from "../data/orders-mock";
import { getStatusMeta } from "../data/orders-mock";

export const OrderTable = ({ orders }: { orders: Order[] }) => (
  <div className="rounded-xl border border-border/50 overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border/50 bg-muted/20">
          <th className="text-left px-4 py-3 font-medium text-muted-foreground">Order No</th>
          <th className="text-left px-4 py-3 font-medium text-muted-foreground">Item</th>
          <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
          <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
          <th className="text-center px-4 py-3 font-medium text-muted-foreground">Qty</th>
          <th className="text-left px-4 py-3 font-medium text-muted-foreground">Production</th>
          <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          const status = getStatusMeta(order.status);
          return (
            <tr key={order.id} className="border-b border-border/30 last:border-0 hover:bg-muted/10 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-foreground">{order.orderNumber}</td>
              <td className="px-4 py-3">
                <p className="font-medium text-foreground">{order.title}</p>
                <p className="text-xs text-muted-foreground">{order.itemSummary}</p>
              </td>
              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                {new Date(order.dateProcessed).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </td>
              <td className="px-4 py-3">
                <Badge variant="outline" className={status.color}>{status.label}</Badge>
              </td>
              <td className="px-4 py-3 text-center text-muted-foreground">{order.quantity}</td>
              <td className="px-4 py-3 text-muted-foreground text-xs">{order.productionTime}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1.5">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {order.invoiceUrl && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileText className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
