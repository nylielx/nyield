import { Cpu, Monitor, MemoryStick, HardDrive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SavedBuild } from "../data/saved-builds-mock";

const specIcons = [
  { key: "cpu" as const, icon: Cpu },
  { key: "gpu" as const, icon: Monitor },
  { key: "ram" as const, icon: MemoryStick },
  { key: "storage" as const, icon: HardDrive },
];

export const BuildCard = ({ build }: { build: SavedBuild }) => (
  <Card className="glass-base">
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{build.name}</h3>
          <Badge variant="outline" className="mt-1 text-xs border-primary/30 text-primary">
            {build.tier}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-foreground">£{build.totalPrice.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            Saved {new Date(build.savedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {specIcons.map(({ key, icon: Icon }) => (
          <div key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon className="h-3.5 w-3.5 text-primary/60" />
            <span>{build.specs[key]}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
