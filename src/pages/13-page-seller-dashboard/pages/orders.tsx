/**
 * =============================================================================
 * SELLER ORDERS PAGE — Full order management with filters + expandable rows
 * =============================================================================
 */

import { useState } from "react";
import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { MetricCard } from "../components/metric-card";
import { SectionInfoCard } from "../components/section-info-card";
import { ShoppingCart, Truck, PackageCheck, XCircle, ClipboardList, ChevronDown, Search, SlidersHorizontal, RotateCcw, Mail, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { orderStatusConfig, type SellerOrder } from "../data/seller-mock";
import { motion, AnimatePresence } from "framer-motion";

const ExpandedOrderRow = ({ order }: { order: SellerOrder }) => {
  const timeline = [
    { label: "Order Placed", date: order.date, done: true },
    { label: "Processing", date: order.status !== "pending" ? "Completed" : "—", done: ["processing", "shipped", "delivered"].includes(order.status) },
    { label: "Shipped", date: order.trackingNumber ?? "—", done: ["shipped", "delivered"].includes(order.status) },
    { label: "Delivered", date: order.status === "delivered" ? "Confirmed" : "—", done: order.status === "delivered" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="px-4 pb-4 pt-1 border-t border-border/30 bg-muted/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {/* Customer & Product */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</h4>
            <p className="text-sm text-foreground">{order.customerName}</p>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-3">Product</h4>
            <p className="text-sm text-foreground">{order.product}</p>
            <p className="text-xs text-muted-foreground">Qty: {order.quantity}</p>
          </div>

          {/* Payment */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payment</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">£{order.amount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Platform Fee (5%)</span><span className="text-foreground">-£{(order.amount * 0.05).toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">VAT (20%)</span><span className="text-foreground">£{(order.amount * 0.2).toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-border/30 pt-1 font-semibold"><span className="text-foreground">Net</span><span className="text-foreground">£{(order.amount * 0.95).toFixed(2)}</span></div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeline</h4>
            <div className="space-y-2">
              {timeline.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${step.done ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                  <span className={`text-xs ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{step.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4 pt-3 border-t border-border/20">
          <Button variant="outline" size="sm" className="text-xs gap-1.5"><RotateCcw className="h-3 w-3" />Refund</Button>
          <Button variant="outline" size="sm" className="text-xs gap-1.5"><Mail className="h-3 w-3" />Contact</Button>
          <Button variant="outline" size="sm" className="text-xs gap-1.5"><FileText className="h-3 w-3" />Invoice</Button>
        </div>
      </div>
    </motion.div>
  );
};

const SellerOrdersPage = () => {
  const { orders, metrics, loading } = useSellerDashboard();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("newest");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading || !metrics) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  let filtered = orders.filter(
    (o) =>
      (statusFilter === "all" || o.status === statusFilter) &&
      (o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.product.toLowerCase().includes(search.toLowerCase()))
  );

  if (sort === "highest") filtered = [...filtered].sort((a, b) => b.amount - a.amount);
  if (sort === "oldest") filtered = [...filtered].reverse();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        <p className="text-sm text-muted-foreground">Manage and track all customer orders</p>
      </div>

      <SectionInfoCard
        icon={ClipboardList}
        title="Order Management"
        description="Manage the full lifecycle of customer orders from processing to delivery and returns."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Orders" value={orders.length.toString()} icon={ShoppingCart} index={0} />
        <MetricCard label="Shipped" value={orders.filter((o) => o.status === "shipped").length.toString()} icon={Truck} index={1} />
        <MetricCard label="Delivered" value={orders.filter((o) => o.status === "delivered").length.toString()} icon={PackageCheck} index={2} />
        <MetricCard label="Cancelled" value={orders.filter((o) => o.status === "cancelled").length.toString()} icon={XCircle} index={3} />
      </div>

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by Order ID, customer, product..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] text-xs"><SlidersHorizontal className="h-3 w-3 mr-1.5" /><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[130px] text-xs"><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="highest">Highest Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <Card className="glass-base"><CardContent className="py-16 text-center"><p className="text-muted-foreground">No orders match your search.</p></CardContent></Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((order, i) => {
            const status = orderStatusConfig[order.status];
            const isExpanded = expandedId === order.id;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
              >
                <Card className="glass-base hover:shadow-md transition-shadow duration-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="w-full text-left"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-[10px] font-semibold text-muted-foreground shrink-0">
                          {order.customerAvatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-foreground">{order.orderNumber}</span>
                            <Badge variant="outline" className={`text-[10px] ${status.color}`}>{status.label}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{order.product} · {order.customerName}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-foreground">£{order.amount.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">{order.date.split(",")[0]}</p>
                        </div>
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </button>
                  <AnimatePresence>{isExpanded && <ExpandedOrderRow order={order} />}</AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SellerOrdersPage;
