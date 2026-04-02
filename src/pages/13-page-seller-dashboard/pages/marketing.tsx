/**
 * =============================================================================
 * SELLER MARKETING PAGE — Campaigns, discounts, and growth tools
 * =============================================================================
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "../components/metric-card";
import { SectionInfoCard } from "../components/section-info-card";
import { Megaphone, Tag, TrendingUp, Zap, Plus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const mockCampaigns = [
  { id: 1, name: "Summer Sale 2025", status: "active", discount: "15%", uses: 234, revenue: 18200 },
  { id: 2, name: "New Customer Welcome", status: "active", discount: "10%", uses: 89, revenue: 6400 },
  { id: 3, name: "Black Friday Early", status: "scheduled", discount: "25%", uses: 0, revenue: 0 },
  { id: 4, name: "Spring Clearance", status: "ended", discount: "20%", uses: 567, revenue: 42100 },
];

const aiInsights = [
  "Your Summer Sale campaign is outperforming by 23% compared to last quarter's equivalent.",
  "Conversion rate increased 1.4% after the New Customer Welcome discount was introduced.",
  "Consider raising the Black Friday discount to 30% — demand forecasting suggests higher uptake.",
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

    <SectionInfoCard
      icon={Megaphone}
      title="Marketing & Growth"
      description="Track campaign performance, discounts, and conversion metrics to optimise revenue growth."
    />

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard label="Active Campaigns" value="2" icon={Megaphone} glow index={0} />
      <MetricCard label="Active Discounts" value="3" icon={Tag} index={1} />
      <MetricCard label="Campaign Revenue" value="£66,700" change="+18%" changeType="positive" icon={TrendingUp} index={2} />
      <MetricCard label="Conversion Uplift" value="+2.1%" icon={Zap} index={3} />
    </div>

    {/* Campaigns */}
    <Card className="glass-base">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Campaigns</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {mockCampaigns.map((campaign, i) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              className="flex items-center gap-4 py-3 border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors rounded-lg px-2"
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
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* AI Insights — upgraded */}
    <Card className="glass-base border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 rounded-lg bg-primary/10"
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">AI-Powered Insights</h3>
            <p className="text-[10px] text-muted-foreground">Smart analysis based on your data</p>
          </div>
        </div>
        <div className="space-y-3">
          {aiInsights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.3 }}
              className="flex items-start gap-2.5 py-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">{insight}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SellerMarketingPage;
