/**
 * =============================================================================
 * SELLER LISTINGS PAGE — Manage marketplace listings
 * =============================================================================
 */

import { useSellerDashboard } from "../hooks/use-seller-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Edit, AlertTriangle } from "lucide-react";
import { listingStatusConfig } from "../data/seller-mock";

const SellerListingsPage = () => {
  const { listings, loading } = useSellerDashboard();

  if (loading) {
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

      {/* Low stock alert */}
      {listings.some((l) => l.stock <= 2 && l.stock > 0) && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">Low stock alert:</span>{" "}
              {listings
                .filter((l) => l.stock <= 2 && l.stock > 0)
                .map((l) => l.title)
                .join(", ")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Listings grid */}
      <div className="grid gap-4">
        {listings.map((listing) => {
          const status = listingStatusConfig[listing.status];
          return (
            <Card key={listing.id} className="glass-base">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground truncate">
                        {listing.title}
                      </h3>
                      <Badge variant="outline" className={`text-[10px] shrink-0 ${status.color}`}>
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {listing.specs.cpu} · {listing.specs.gpu} · {listing.specs.ram} · {listing.specs.storage}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <p className="text-lg font-bold text-foreground">£{listing.price.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Price</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{listing.stock}</p>
                      <p className="text-[10px] text-muted-foreground">Stock</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{listing.sold}</p>
                      <p className="text-[10px] text-muted-foreground">Sold</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{listing.views.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Views</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{listing.conversionRate}%</p>
                      <p className="text-[10px] text-muted-foreground">Conv.</p>
                    </div>
                  </div>

                  {/* Actions */}
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
          );
        })}
      </div>
    </div>
  );
};

export default SellerListingsPage;
