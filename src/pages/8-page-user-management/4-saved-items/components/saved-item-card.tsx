import { ShieldCheck, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SavedItem } from "../data/saved-items-mock";

export const SavedItemCard = ({ item }: { item: SavedItem }) => (
  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
            {item.verified && (
              <ShieldCheck className="h-4 w-4 text-green-500 shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {item.seller} • {item.condition}
          </p>
        </div>
        <Heart className="h-4 w-4 text-primary shrink-0 fill-primary" />
      </div>
      <p className="text-sm text-muted-foreground mb-2">{item.specs}</p>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-foreground">£{item.price.toLocaleString()}</p>
        <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground">
          Saved {new Date(item.savedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
        </Badge>
      </div>
    </CardContent>
  </Card>
);
