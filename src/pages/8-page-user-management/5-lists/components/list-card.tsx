import { List } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { UserList } from "../data/lists-mock";

export const ListCard = ({ list }: { list: UserList }) => (
  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <List className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{list.name}</h3>
          <p className="text-xs text-muted-foreground">{list.description}</p>
        </div>
        <span className="text-sm font-medium text-muted-foreground">{list.itemCount} items</span>
      </div>
      <div className="space-y-1.5 pl-11">
        {list.previewItems.map((item, i) => (
          <p key={i} className="text-xs text-muted-foreground">• {item}</p>
        ))}
        {list.itemCount > list.previewItems.length && (
          <p className="text-xs text-primary/60">
            +{list.itemCount - list.previewItems.length} more
          </p>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-3 pl-11">
        Updated {new Date(list.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
      </p>
    </CardContent>
  </Card>
);
