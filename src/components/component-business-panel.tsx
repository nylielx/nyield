/**
 * =============================================================================
 * BUSINESS QUICK PANEL — Structured mini-dashboard popover for business users
 * =============================================================================
 * Uses canonical username/businessSlug for profile URLs.
 * Does NOT link to /account (standard account shell) — uses /seller routes.
 * =============================================================================
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Settings,
  HelpCircle,
  LogOut,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Store,
  User,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { UserAvatarDisplay } from "@/components/ui/user-avatar-display";
import { sellerMetrics } from "@/pages/13-page-seller-dashboard/data/seller-mock";
import { businessDropdownQuickActions } from "@/data/navigation-config";

const BusinessPanel = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const avatarId = user.avatar;
  const businessProfileLink = user.businessSlug ? `/business/${user.businessSlug}` : `/user/${user.username}`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Open business panel"
      >
        <UserAvatarDisplay avatarUrl={user.avatarUrl} avatarId={avatarId} size="sm" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-80 rounded-2xl glass-elevated shadow-2xl overflow-hidden border border-border/30 z-50"
          >
            {/* ── Account Overview ── */}
            <div className="p-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <UserAvatarDisplay avatarUrl={user.avatarUrl} avatarId={avatarId} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2.5">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px]">
                  Business
                </Badge>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px] gap-1">
                  <CheckCircle2 className="h-2.5 w-2.5" />
                  Verified
                </Badge>
              </div>
            </div>

            {/* ── Profile & Messages ── */}
            <div className="p-2 border-b border-border/30">
              <Link
                to={businessProfileLink}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                <User className="h-4 w-4" />
                View Business Profile
              </Link>
              <Link
                to="/messages"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Messages
              </Link>
            </div>

            {/* ── Quick Actions ── */}
            <div className="p-2 border-b border-border/30">
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                Quick Actions
              </p>
              {businessDropdownQuickActions.map(({ label, to, icon: Icon }) => (
                <Link
                  key={to + label}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors group"
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  {label}
                </Link>
              ))}
            </div>

            {/* ── Performance Snapshot ── */}
            <div className="p-3 border-b border-border/30">
              <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                Performance Snapshot
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Revenue", value: `£${sellerMetrics.revenue.daily.toLocaleString()}`, icon: TrendingUp },
                  { label: "Active Listings", value: sellerMetrics.activeListings.toString(), icon: Store },
                  { label: "Conversion", value: `${sellerMetrics.conversionRate}%`, icon: BarChart3 },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg bg-muted/20 border border-border/20 p-2 text-center"
                  >
                    <stat.icon className="h-3.5 w-3.5 text-primary mx-auto mb-1" />
                    <p className="text-xs font-bold text-foreground">{stat.value}</p>
                    <p className="text-[9px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Account + Support + System ── */}
            <div className="p-2">
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                Account
              </p>
              <Link
                to="/seller/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                to="/account/help"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </Link>

              <div className="mt-1 pt-1 border-t border-border/30">
                <button
                  onClick={() => {
                    setOpen(false);
                    logout().then(() => navigate("/"));
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessPanel;
