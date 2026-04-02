/**
 * =============================================================================
 * BUSINESS SIDEBAR — Hierarchical navigation for business (seller) users
 * =============================================================================
 * Sections follow enterprise UX grouping:
 *   Overview → Operations → Growth → Account → Support → System
 *
 * Includes "My Account" link to switch back to buyer view.
 *
 * DATA FLOW:
 *   navigation-config.ts → businessSidebarSections → rendered here
 *   AuthContext → user info, logout
 * =============================================================================
 */

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Store,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { getAvatarById } from "@/data/temp/8-user-profile-mock";
import { Badge } from "@/components/ui/badge";
import { businessSidebarSections } from "@/data/navigation-config";

export const SellerSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const avatarEmoji = avatarOptions.find((a) => a.value === user?.avatar)?.emoji ?? "👤";

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="rounded-xl glass-elevated p-4 space-y-1">
        {/* ── Seller info + badges ── */}
        <div className="pb-3 mb-1 border-b border-border/30">
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
          <div className="flex items-center gap-2 mt-2.5">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px]">
              <Store className="h-2.5 w-2.5 mr-1" />
              Business
            </Badge>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px]">
              <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
              Verified
            </Badge>
          </div>
        </div>

        {/* ── Grouped navigation sections ── */}
        {businessSidebarSections.map((section) => (
          <div key={section.group}>
            <p className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              {section.group}
            </p>
            {section.items.map(({ label, to, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group relative",
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active-business"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-primary glow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    "group-hover:scale-110"
                  )} />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}

        {/* ── System: Account switch + Sign Out ── */}
        <div className="pt-2 mt-1 border-t border-border/30">
          <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            System
          </p>
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
