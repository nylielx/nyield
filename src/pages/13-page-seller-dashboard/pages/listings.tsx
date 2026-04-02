/**
 * =============================================================================
 * SELLER LISTINGS PAGE — Manage marketplace listings
 * =============================================================================
 */

import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionInfoCard } from "../components/section-info-card";
import { MetricCard } from "../components/metric-card";
import { Plus, Eye, Edit, AlertTriangle, Package, Store, BarChart3, ShoppingCart } from "lucide-react";
import { listingStatusConfig } from "../data/seller-mock";
import { motion } from "framer-motion";

const SellerListingsPage = () => {
  const { listings, metrics, loading } = useSellerDashboard();

  if (loading || !metrics) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Listings</h1>
          <p className="text-sm text-muted-foreground">
            {listings.length} listing{listings.length !== 1 ? "s" : ""} — Manage your marketplace inventory
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Listing
        </Button>
      </div>

      <SectionInfoCard
        icon={Package}
        title="Inventory & Marketplace"
        description="Monitor stock levels, prevent shortages, and optimise supply flow. Listings sync with the nYield marketplace."
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Listings" value={metrics.totalListings.toString()} icon={Store} glow index={0} />
        <MetricCard label="Active" value={metrics.activeListings.toString()} icon={Package} index={1} />
        <MetricCard label="Total Sold" value={listings.reduce((s, l) => s + l.sold, 0).toString()} icon={ShoppingCart} index={2} />
        <MetricCard label="Avg Conversion" value={`${(listings.reduce((s, l) => s + l.conversionRate, 0) / listings.length).toFixed(1)}%`} icon={BarChart3} index={3} />
      </div>

      {/* Low stock alert */}
      {listings.some((l) => l.stock <= 2 && l.stock > 0) && (
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-4 flex items-center gap-3">
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
              </motion.div>
              <p className="text-sm text-foreground">
                <span className="font-semibold">Low stock alert:</span>{" "}
                {listings.filter((l) => l.stock <= 2 && l.stock > 0).map((l) => l.title).join(", ")}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Listings grid */}
      <div className="grid gap-4">
        {listings.map((listing, i) => {
          const status = listingStatusConfig[listing.status];
          return (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Card className="glass-base hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground truncate">{listing.title}</h3>
                        <Badge variant="outline" className={`text-[10px] shrink-0 ${status.color}`}>
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {listing.specs.cpu} · {listing.specs.gpu} · {listing.specs.ram} · {listing.specs.storage}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-center">
                      {[
                        { val: `£${listing.price.toLocaleString()}`, lbl: "Price" },
                        { val: listing.stock.toString(), lbl: "Stock" },
                        { val: listing.sold.toString(), lbl: "Sold" },
                        { val: listing.views.toLocaleString(), lbl: "Views" },
                        { val: `${listing.conversionRate}%`, lbl: "Conv." },
                      ].map((s) => (
                        <div key={s.lbl}>
                          <p className="text-lg font-bold text-foreground">{s.val}</p>
                          <p className="text-[10px] text-muted-foreground">{s.lbl}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SellerListingsPage;
