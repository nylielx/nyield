/**
 * =============================================================================
 * DASHBOARD STATS — Summary stat cards for the user dashboard
 * =============================================================================
 */

import { ShoppingCart, Heart, List, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  ordersCount: number;
  savedItemsCount: number;
  listsCount: number;
  savedBuildsCount: number;
}

const statConfig = [
  { key: "ordersCount" as const, label: "Orders", icon: ShoppingCart },
  { key: "savedItemsCount" as const, label: "Saved Items", icon: Heart },
  { key: "listsCount" as const, label: "Lists", icon: List },
  { key: "savedBuildsCount" as const, label: "Saved Builds", icon: Cpu },
];

export const DashboardStats = (props: StatsProps) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {statConfig.map(({ key, label, icon: Icon }) => (
      <Card key={key} className="glass-base">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{props[key]}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
