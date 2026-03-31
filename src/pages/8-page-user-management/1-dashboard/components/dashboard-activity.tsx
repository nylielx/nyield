/**
 * =============================================================================
 * DASHBOARD ACTIVITY — Recent activity feed
 * =============================================================================
 */

import { ShoppingCart, Heart, List, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: string;
  type: "order" | "saved" | "list" | "build";
  title: string;
  description: string;
  timestamp: string;
}

const typeIcons = {
  order: ShoppingCart,
  saved: Heart,
  list: List,
  build: Cpu,
};

export const DashboardActivity = ({ activities }: { activities: Activity[] }) => (
  <Card className="glass-base">
    <CardHeader>
      <CardTitle className="text-lg text-foreground">Recent Activity</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {activities.map((item) => {
        const Icon = typeIcons[item.type];
        const date = new Date(item.timestamp);
        return (
          <div key={item.id} className="flex items-start gap-3 pb-3 border-b border-border/30 last:border-0 last:pb-0">
            <div className="p-1.5 rounded-md bg-primary/10 mt-0.5">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
            </span>
          </div>
        );
      })}
    </CardContent>
  </Card>
);
