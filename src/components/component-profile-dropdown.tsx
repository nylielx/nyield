/**
 * =============================================================================
 * PROFILE DROPDOWN — Role-based navigation dropdown
 * =============================================================================
 * Uses canonical username for profile URL generation.
 * =============================================================================
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Store, ArrowRight, Award, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { dropdownVariants } from "@/animations/presets";
import { standardSidebarSections } from "@/data/navigation-config";
import { UserAvatarDisplay } from "@/components/ui/user-avatar-display";
import BusinessPanel from "./component-business-panel";
import SellerApplicationModal from "./seller-application-modal";

const ProfileDropdown = () => {
  const { user, isBusiness } = useAuth();

  if (user && isBusiness) {
    return <BusinessPanel />;
  }

  return <StandardDropdown />;
};

const StandardDropdown = () => {
  const [open, setOpen] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const quickSections = standardSidebarSections.slice(0, 3);

  // Hide seller CTA if already applied or approved
  const showSellerCta = user.sellerApplicationStatus === "none";

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Open profile menu"
        >
          <UserAvatarDisplay avatarUrl={user.avatarUrl} avatarId={user.avatar} size="sm" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 mt-2 w-60 rounded-xl glass-focus shadow-xl overflow-hidden z-50"
            >
              {/* User info */}
              <div className="px-4 py-3 border-b border-border/30">
                <p className="text-sm font-semibold text-foreground">{user.fullName}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>

              {/* Profile & Affiliate links */}
              <div className="py-1 border-b border-border/30">
                <Link
                  to={`/user/${user.username}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                >
                  <User className="h-4 w-4" />
                  View Profile
                </Link>
                <Link
                  to="/affiliate"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                >
                  <Award className="h-4 w-4" />
                  Affiliate Dashboard
                </Link>
              </div>

              {/* Quick sections */}
              <div className="py-1">
                {quickSections.map((section) => (
                  <div key={section.group}>
                    <p className="px-4 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      {section.group}
                    </p>
                    {section.items.map(({ label, to, icon: Icon }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* Account links */}
              <div className="border-t border-border/30 py-1">
                <p className="px-4 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  Account
                </p>
                {standardSidebarSections
                  .find((s) => s.group === "Account")
                  ?.items.map(({ label, to, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
              </div>

              {/* Sign out */}
              <div className="border-t border-border/30 py-1">
                <button
                  onClick={() => {
                    setOpen(false);
                    logout().then(() => navigate("/"));
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>

              {/* Seller CTA — only if not already applied */}
              {showSellerCta && (
                <div className="border-t border-border/30 px-3 py-2.5">
                  <button
                    onClick={() => { setOpen(false); setSellerModalOpen(true); }}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Store className="h-3 w-3" />
                    Start Selling
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Pending application status */}
              {user.sellerApplicationStatus === "pending" && (
                <div className="border-t border-border/30 px-3 py-2.5">
                  <p className="text-center text-[11px] text-amber-400">
                    ⏳ Seller application under review
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SellerApplicationModal open={sellerModalOpen} onClose={() => setSellerModalOpen(false)} />
    </>
  );
};

export default ProfileDropdown;
