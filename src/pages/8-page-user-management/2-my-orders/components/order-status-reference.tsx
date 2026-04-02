/**
 * =============================================================================
 * ORDER STATUS REFERENCE — Collapsible status explanation section
 * =============================================================================
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { orderStatusMeta } from "../data/orders-mock";
import { cn } from "@/lib/utils";

export const OrderStatusReference = () => {
  const [open, setOpen] = useState(false);

  return (
    <Card className="glass-base">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <h3 className="text-sm font-semibold text-foreground">Order Status Guide</h3>
          <p className="text-xs text-muted-foreground">Understand what each status means</p>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <CardContent className="pt-0 pb-5 px-5 space-y-3">
          {orderStatusMeta.map((s) => (
            <div key={s.key} className="flex items-start gap-3">
              <Badge variant="outline" className={cn(s.color, "shrink-0 mt-0.5 text-[10px]")}>{s.label}</Badge>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};
