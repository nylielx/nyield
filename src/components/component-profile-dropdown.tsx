/**
 * =============================================================================
 * PROFILE DROPDOWN — Animated dropdown menu for logged-in users
 * =============================================================================
 * Shows when clicking profile icon in navbar. Animated with framer-motion.
 * Links to all user management pages + logout.
 * =============================================================================
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ShoppingCart,
  Cpu,
  Heart,
  List,
  UserCog,
  Shield,
  HelpCircle,
  LogOut,
  Store,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { dropdownVariants } from "@/animations/presets";
import { avatarOptions } from "@/data/temp/8-user-profile-mock";

const dropdownLinks = [
  { label: "Dashboard", to: "/account", icon: LayoutDashboard },
  { label: "My Bookings", to: "/account/bookings", icon: CalendarDays },
  { label: "My Orders", to: "/account/orders", icon: ShoppingCart },
  { label: "Saved Builds", to: "/account/builds", icon: Cpu },
  { label: "Saved Items", to: "/account/saved", icon: Heart },
  { label: "Lists", to: "/account/lists", icon: List },
  { label: "Profile Settings", to: "/account/profile", icon: UserCog },
  { label: "Security", to: "/account/security", icon: Shield },
  { label: "Help & Support", to: "/account/help", icon: HelpCircle },
];

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /** Close on click outside */
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

  const avatarEmoji = avatarOptions.find((a) => a.value === user.avatar)?.emoji ?? "👤";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger — avatar circle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm hover:bg-primary/30 transition-colors"
        aria-label="Open profile menu"
      >
        {avatarEmoji}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 mt-2 w-56 rounded-xl glass-focus shadow-xl overflow-hidden"
          >
            {/* User info header */}
            <div className="px-4 py-3 border-b border-border/50">
              <p className="text-sm font-semibold text-foreground">{user.fullName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            {/* Navigation links */}
            <div className="py-1">
              {dropdownLinks.map(({ label, to, icon: Icon }) => (
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

            {/* Logout */}
            <div className="border-t border-border/50 py-1">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
