/**
 * =============================================================================
 * USER SIDEBAR — Hierarchical navigation for standard (buyer) users
 * =============================================================================
 * Sections follow psychological UX grouping:
 *   Overview → Activity → Saved & Planning → [Seller CTA] → Account → Support → System
 *
 * The "Become a Seller" CTA introduces a seamless conversion path from
 * buyer → business without being intrusive (placed after primary usage sections).
 *
 * DATA FLOW:
 *   navigation-config.ts → standardSidebarSections → rendered here
 *   AuthContext → user info, logout
 * =============================================================================
 */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Store, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { getAvatarById } from "@/data/temp/8-user-profile-mock";
import { standardSidebarSections } from "@/data/navigation-config";
import SellerApplicationModal from "@/components/seller-application-modal";

export const UserSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  const avatarEmoji = avatarOptions.find((a) => a.value === user?.avatar)?.emoji ?? "👤";

  return (
    <>
      <aside className="w-full md:w-64 shrink-0">
        <div className="rounded-xl glass-elevated p-4 space-y-1">
          {/* ── User info ── */}
          <div className="pb-3 mb-1 border-b border-border/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-lg">
              {avatarEmoji}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">
                {user?.fullName ?? "Guest"}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user?.email ?? ""}</p>
            </div>
          </div>

          {/* ── Grouped navigation sections ── */}
          {standardSidebarSections.map((section, sIdx) => (
            <div key={section.group}>
              {/* Section header */}
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
                    {/* Left accent bar for active */}
                    {active && (
                      <motion.div
                        layoutId="sidebar-active-standard"
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

              {/* Insert Seller CTA after "Saved & Planning" (index 2) */}
              {sIdx === 2 && (
                <div className="mx-1 my-3">
                  <motion.button
                    onClick={() => setSellerModalOpen(true)}
                    className="w-full rounded-lg border border-primary/20 bg-primary/5 p-3 text-left transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-7 h-7 rounded-md bg-primary/15 border border-primary/25 flex items-center justify-center">
                        <Store className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">Start Selling on nYield</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">
                      List your PC, reach verified buyers, and earn.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary group-hover:gap-1.5 transition-all">
                      Apply for Business Account
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </motion.button>
                </div>
              )}
            </div>
          ))}

          {/* ── System: Sign Out ── */}
          <div className="pt-2 mt-1 border-t border-border/30">
            <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              System
            </p>
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

      {/* Seller Application Modal */}
      <SellerApplicationModal open={sellerModalOpen} onClose={() => setSellerModalOpen(false)} />
    </>
  );
};
