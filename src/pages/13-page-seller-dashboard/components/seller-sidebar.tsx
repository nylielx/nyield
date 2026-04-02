/**
 * =============================================================================
 * BUSINESS SIDEBAR — Navigation for the business dashboard
 * =============================================================================
 * Visible only to users with role = "business".
 * =============================================================================
 */

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  Megaphone,
  Settings,
  LogOut,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { avatarOptions } from "@/data/temp/8-user-profile-mock";

const sidebarLinks = [
  { label: "Dashboard", to: "/seller", icon: LayoutDashboard },
  { label: "My Orders", to: "/seller/orders", icon: ShoppingCart },
  { label: "Listings", to: "/seller/listings", icon: Package },
  { label: "Analytics", to: "/seller/analytics", icon: BarChart3 },
  { label: "Customers", to: "/seller/customers", icon: Users },
  { label: "Marketing", to: "/seller/marketing", icon: Megaphone },
  { label: "Settings", to: "/seller/settings", icon: Settings },
];

export const SellerSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const avatarEmoji = avatarOptions.find((a) => a.value === user?.avatar)?.emoji ?? "👤";

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="rounded-xl glass-elevated p-4 space-y-1">
        {/* Seller info */}
        <div className="pb-3 mb-2 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-lg">
              {avatarEmoji}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">
                {user?.fullName ?? "Seller"}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user?.email ?? ""}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <Store className="h-3 w-3 text-primary" />
            <span className="text-[11px] font-medium text-primary">Business Dashboard</span>
          </div>
        </div>

        {/* Navigation links */}
        {sidebarLinks.map(({ label, to, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}

        {/* Back to account */}
        <div className="pt-2 mt-2 border-t border-border/30 space-y-1">
          <Link
            to="/account"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            My Account
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};
