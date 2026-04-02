/**
 * =============================================================================
 * ORDER CARD — Mobile-friendly card for orders
 * =============================================================================
 */

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import type { Order } from "../data/orders-mock";
import { getStatusMeta } from "../data/orders-mock";

export const OrderCard = ({ order }: { order: Order }) => {
  const status = getStatusMeta(order.status);

  return (
    <Card className="glass-base">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-foreground">{order.title}</h3>
              <Badge variant="outline" className={status.color}>
                {status.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-1">#{order.orderNumber}</p>
            <p className="text-sm text-muted-foreground">{order.itemSummary}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-foreground">£{order.price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(order.dateProcessed).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>Qty: {order.quantity}</span>
          <span>•</span>
          <span>Est: {order.productionTime}</span>
          {order.trackingNumber && (
            <>
              <span>•</span>
              <span className="text-primary">{order.trackingNumber}</span>
            </>
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="outline" size="sm" className="text-xs h-8">
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            View
          </Button>
          {order.invoiceUrl && (
            <Button variant="outline" size="sm" className="text-xs h-8">
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Invoice
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
