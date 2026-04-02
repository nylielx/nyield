/**
 * =============================================================================
 * SELLER MARKETING PAGE — Expandable campaigns + New Campaign modal
 * =============================================================================
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "../components/metric-card";
import { SectionInfoCard } from "../components/section-info-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Megaphone, Tag, TrendingUp, Zap, Plus, Sparkles, ChevronDown, Search, Users, Calendar, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const mockCampaigns = [
  { id: 1, name: "Summer Sale 2025", status: "active" as const, discount: "15%", uses: 234, revenue: 18200, conversion: 6.2, reach: 3800, orders: 234, start: "Jun 1", end: "Aug 31" },
  { id: 2, name: "New Customer Welcome", status: "active" as const, discount: "10%", uses: 89, revenue: 6400, conversion: 4.1, reach: 2100, orders: 89, start: "Apr 1", end: "Ongoing" },
  { id: 3, name: "Black Friday Early", status: "scheduled" as const, discount: "25%", uses: 0, revenue: 0, conversion: 0, reach: 0, orders: 0, start: "Nov 20", end: "Nov 30" },
  { id: 4, name: "Spring Clearance", status: "ended" as const, discount: "20%", uses: 567, revenue: 42100, conversion: 7.8, reach: 7200, orders: 567, start: "Mar 1", end: "Mar 31" },
];

const aiInsights = [
  "Your Summer Sale campaign is outperforming by 23% compared to last quarter's equivalent.",
  "Conversion rate increased 1.4% after the New Customer Welcome discount was introduced.",
  "Consider raising the Black Friday discount to 30% — demand forecasting suggests higher uptake.",
];

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  scheduled: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  ended: "bg-muted text-muted-foreground border-border",
};

const ExpandedCampaign = ({ campaign }: { campaign: typeof mockCampaigns[0] }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="overflow-hidden"
  >
    <div className="px-4 pb-4 pt-1 border-t border-border/30 bg-muted/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
        <div className="space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Revenue</p>
          <p className="text-sm font-bold text-foreground">£{campaign.revenue.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Conversion</p>
          <p className="text-sm font-bold text-foreground">{campaign.conversion}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Users Reached</p>
          <p className="text-sm font-bold text-foreground">{campaign.reach.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Orders</p>
          <p className="text-sm font-bold text-foreground">{campaign.orders}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        <span>{campaign.start} → {campaign.end}</span>
      </div>
    </div>
  </motion.div>
);

const NewCampaignModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />New Campaign</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Create Campaign</DialogTitle></DialogHeader>
        <div className="space-y-4 mt-2">
          <div><Label className="text-xs">Campaign Name</Label><Input placeholder="e.g. Back to School Sale" /></div>
          <div><Label className="text-xs">Discount %</Label><Input type="number" placeholder="15" /></div>
          <div><Label className="text-xs">Target Audience</Label>
            <Select><SelectTrigger className="text-xs"><SelectValue placeholder="Select audience" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="new">New Customers</SelectItem>
                <SelectItem value="returning">Returning</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label className="text-xs">Channel</Label>
            <Select><SelectTrigger className="text-xs"><SelectValue placeholder="Select channel" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="marketplace">Marketplace</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Mock AI prediction */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary shrink-0" />
              <p className="text-xs text-muted-foreground">AI predicts ~£8,400 revenue and 4.2% conversion based on similar campaigns.</p>
            </CardContent>
          </Card>
          <Button className="w-full" onClick={() => setOpen(false)}>Launch Campaign</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SellerMarketingPage = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = mockCampaigns.filter(
    (c) =>
      (statusFilter === "all" || c.status === statusFilter) &&
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Marketing & Growth</h1>
          <p className="text-sm text-muted-foreground">Campaign tracking, discounts, and conversion tools</p>
        </div>
        <NewCampaignModal />
      </div>

      <SectionInfoCard icon={Megaphone} title="Marketing & Growth" description="Track campaign performance, discounts, and conversion metrics to optimise revenue growth." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Campaigns" value="2" icon={Megaphone} glow index={0} />
        <MetricCard label="Active Discounts" value="3" icon={Tag} index={1} />
        <MetricCard label="Campaign Revenue" value="£66,700" change="+18%" changeType="positive" icon={TrendingUp} index={2} />
        <MetricCard label="Conversion Uplift" value="+2.1%" icon={Zap} index={3} />
      </div>

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search campaigns..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px] text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="ended">Ended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaigns */}
      <div className="space-y-2">
        {filtered.map((campaign, i) => {
          const isExpanded = expandedId === campaign.id;
          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
            >
              <Card className="glass-base hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <button onClick={() => setExpandedId(isExpanded ? null : campaign.id)} className="w-full text-left">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground">{campaign.discount} off · {campaign.uses} uses</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-foreground">£{campaign.revenue.toLocaleString()}</p>
                      </div>
                      <Badge variant="outline" className={`text-[10px] shrink-0 ${statusColors[campaign.status]}`}>{campaign.status}</Badge>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                      </motion.div>
                    </div>
                  </CardContent>
                </button>
                <AnimatePresence>{isExpanded && <ExpandedCampaign campaign={campaign} />}</AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* AI Insights */}
      <Card className="glass-base border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">AI-Powered Insights</h3>
              <p className="text-[10px] text-muted-foreground">Smart analysis based on your data</p>
            </div>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12, duration: 0.3 }} className="flex items-start gap-2.5 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">{insight}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerMarketingPage;
