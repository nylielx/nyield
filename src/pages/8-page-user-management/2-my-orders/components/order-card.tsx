import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Order } from "../data/orders-mock";

const statusStyles: Record<Order["status"], string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  processing: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  shipped: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  delivered: "bg-green-500/10 text-green-500 border-green-500/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

export const OrderCard = ({ order }: { order: Order }) => (
  <Card className="glass-base">
    <CardContent className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{order.title}</h3>
            <Badge variant="outline" className={statusStyles[order.status]}>
              {order.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-1">#{order.orderNumber}</p>
          <p className="text-sm text-muted-foreground">{order.specs}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-foreground">£{order.price.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);
