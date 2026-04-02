/**
 * =============================================================================
 * SELLER MARKETING PAGE — Campaigns, discounts, and growth tools
 * =============================================================================
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "../components/metric-card";
import { Megaphone, Tag, TrendingUp, Zap, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockCampaigns = [
  { id: 1, name: "Summer Sale 2025", status: "active", discount: "15%", uses: 234, revenue: 18200 },
  { id: 2, name: "New Customer Welcome", status: "active", discount: "10%", uses: 89, revenue: 6400 },
  { id: 3, name: "Black Friday Early", status: "scheduled", discount: "25%", uses: 0, revenue: 0 },
  { id: 4, name: "Spring Clearance", status: "ended", discount: "20%", uses: 567, revenue: 42100 },
];

const SellerMarketingPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Marketing & Growth</h1>
        <p className="text-sm text-muted-foreground">
          Campaign tracking, discounts, and conversion tools
        </p>
      </div>
      <Button size="sm" className="gap-1.5">
        <Plus className="h-4 w-4" />
        New Campaign
      </Button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard label="Active Campaigns" value="2" icon={Megaphone} glow />
      <MetricCard label="Active Discounts" value="3" icon={Tag} />
      <MetricCard label="Campaign Revenue" value="£66,700" change="+18%" changeType="positive" icon={TrendingUp} />
      <MetricCard label="Conversion Uplift" value="+2.1%" icon={Zap} />
    </div>

    {/* Campaigns */}
    <Card className="glass-base">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Campaigns</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {mockCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center gap-4 py-3 border-b border-border/20 last:border-0"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{campaign.name}</p>
                <p className="text-xs text-muted-foreground">
                  {campaign.discount} off · {campaign.uses} uses
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">
                  £{campaign.revenue.toLocaleString()}
                </p>
              </div>
              <Badge
                variant="outline"
                className={
                  campaign.status === "active"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px]"
                    : campaign.status === "scheduled"
                    ? "bg-blue-500/10 text-blue-500 border-blue-500/30 text-[10px]"
                    : "bg-muted text-muted-foreground border-border text-[10px]"
                }
              >
                {campaign.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Future tools placeholder */}
    <Card className="glass-base border-dashed">
      <CardContent className="p-8 text-center">
        <Zap className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-foreground mb-1">AI-Powered Insights</h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Demand forecasting, auto-pricing, and smart alert systems coming soon.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default SellerMarketingPage;
