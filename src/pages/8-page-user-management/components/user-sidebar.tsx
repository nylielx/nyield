/**
 * =============================================================================
 * USER SIDEBAR — Static navigation for user management pages
 * =============================================================================
 * This component does NOT use mock data. It is a static layout element.
 * =============================================================================
 */

import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Cpu, Heart, List, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const sidebarLinks = [
  { label: "Dashboard", to: "/account", icon: LayoutDashboard },
  { label: "My Orders", to: "/account/orders", icon: ShoppingCart },
  { label: "Saved Builds", to: "/account/builds", icon: Cpu },
  { label: "Saved Items", to: "/account/saved", icon: Heart },
  { label: "My Lists", to: "/account/lists", icon: List },
];

export const UserSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 space-y-1">
        {/* User info */}
        <div className="pb-3 mb-2 border-b border-border/30">
          <p className="font-semibold text-foreground text-sm">
            {user?.fullName ?? "Guest"}
          </p>
          <p className="text-xs text-muted-foreground">{user?.email ?? ""}</p>
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

        {/* Logout */}
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full mt-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
