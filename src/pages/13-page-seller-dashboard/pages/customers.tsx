/**
 * =============================================================================
 * SELLER CUSTOMERS PAGE — CRM-style with search, filters, expandable rows
 * =============================================================================
 */

import { useState } from "react";
import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { MetricCard } from "../components/metric-card";
import { SectionInfoCard } from "../components/section-info-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, Crown, ArrowUpDown, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SellerCustomer } from "../data/seller-mock";

const segmentConfig = {
  new: { label: "New", color: "bg-blue-500/10 text-blue-500 border-blue-500/30" },
  returning: { label: "Returning", color: "bg-amber-500/10 text-amber-500 border-amber-500/30" },
  vip: { label: "VIP", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" },
};

const ExpandedCustomerRow = ({ customer }: { customer: SellerCustomer }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="overflow-hidden"
  >
    <div className="px-4 pb-4 pt-1 border-t border-border/30 bg-muted/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Purchase History</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Total Orders</span><span className="text-foreground">{customer.totalOrders}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total Spent</span><span className="text-foreground">£{customer.totalSpent.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Avg Order Value</span><span className="text-foreground">£{(customer.totalSpent / customer.totalOrders).toFixed(0)}</span></div>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Behaviour</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Return Rate</span><span className="text-foreground">0%</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Avg Response</span><span className="text-foreground">2.1 hrs</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Preferred Category</span><span className="text-foreground">Gaming PCs</span></div>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notes</h4>
          <p className="text-xs text-muted-foreground italic">No CRM notes yet. Notes will be editable in a future update.</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const SellerCustomersPage = () => {
  const { customers, metrics, loading } = useSellerDashboard();
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading || !metrics) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  const filtered = customers.filter(
    (c) =>
      (segmentFilter === "all" || c.segment === segmentFilter) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground">Customer intelligence and segmentation</p>
      </div>

      <SectionInfoCard
        icon={Users}
        title="Customer Intelligence"
        description="Track customer behaviour, identify high-value segments, and improve retention to increase lifetime value."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Customers" value={metrics.totalCustomers.toLocaleString()} icon={Users} glow index={0} />
        <MetricCard label="Returning" value={metrics.returningCustomers.toLocaleString()} icon={ArrowUpDown} index={1} />
        <MetricCard label="New This Month" value="47" icon={UserPlus} index={2} />
        <MetricCard label="VIP Customers" value={customers.filter((c) => c.segment === "vip").length.toString()} icon={Crown} index={3} />
      </div>

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={segmentFilter} onValueChange={setSegmentFilter}>
          <SelectTrigger className="w-[140px] text-xs"><SelectValue placeholder="Segment" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Segments</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="returning">Returning</SelectItem>
            <SelectItem value="new">New</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customers list */}
      <div className="space-y-2">
        {filtered.map((customer, i) => {
          const seg = segmentConfig[customer.segment];
          const isExpanded = expandedId === customer.id;
          return (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              <Card className="glass-base hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : customer.id)}
                  className="w-full text-left"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-[10px] font-semibold text-muted-foreground shrink-0">
                        {customer.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{customer.name}</span>
                          <Badge variant="outline" className={`text-[10px] ${seg.color}`}>{seg.label}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                      <div className="text-right shrink-0 hidden sm:block">
                        <p className="text-sm font-bold text-foreground">£{customer.totalSpent.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground">{customer.totalOrders} orders</p>
                      </div>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                      </motion.div>
                    </div>
                  </CardContent>
                </button>
                <AnimatePresence>{isExpanded && <ExpandedCustomerRow customer={customer} />}</AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SellerCustomersPage;
