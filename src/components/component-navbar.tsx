/**
 * =============================================================================
 * NAVBAR COMPONENT — Top navigation bar for nYield
 * =============================================================================
 * Unread message count is user-scoped via AuthContext.
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import { Menu, X, MessageCircle, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./component-theme-toggle";
import ProfileDropdown from "./component-profile-dropdown";
import { useAuth } from "@/contexts/AuthContext";
import {
  conversationsMock, messagesMock, getConversationsForUser, getTotalUnreadForUser,
} from "@/data/temp/messaging-mock";

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Builds", to: "/builds" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Affiliate", to: "/earn" },
  { label: "About", to: "/about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const velocityFactor = useTransform(scrollVelocity, [-3000, 0, 3000], [-200, 0, 200]);
  const smoothVelocity = useSpring(velocityFactor, { stiffness: 50, damping: 30 });

  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const unsubscribe = smoothVelocity.on("change", (v) => {
      setRotation((prev) => prev + v * 0.002);
    });
    return unsubscribe;
  }, [smoothVelocity]);

  const gradientBg = `linear-gradient(${rotation}deg, hsl(0 72% 51% / 0.7), hsl(0 0% 85% / 0.5), hsl(0 72% 51% / 0.7))`;

  const isActive = (link: { to: string }) => location.pathname === link.to;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // User-scoped unread count
  const unreadMessages = useMemo(() => {
    if (!user) return 0;
    const myConversations = getConversationsForUser(user.id, conversationsMock);
    return getTotalUnreadForUser(user.id, myConversations, messagesMock);
  }, [user]);

  // Mock notifications — demo-only, clearly scoped
  const notifications = user ? [
    { id: "n1", text: "New message from Alex Chen", time: "2m ago", read: false },
    { id: "n2", text: "Your order has been shipped", time: "1h ago", read: false },
    { id: "n3", text: "Affiliate commission earned: £7.50", time: "3h ago", read: true },
  ] : [];
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto max-w-[95vw]"
      >
        <div
          className="rounded-full p-[1.5px] transition-shadow duration-500"
          style={{
            background: gradientBg,
            boxShadow: scrolled
              ? '0 0 18px hsl(0 72% 51% / 0.2), 0 0 40px hsl(0 72% 51% / 0.06)'
              : '0 0 10px hsl(0 72% 51% / 0.12), 0 0 25px hsl(0 72% 51% / 0.04)',
          }}
        >
          <nav className={`rounded-full glass-focus transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
            <div className="px-4 sm:px-6 py-2.5 flex items-center gap-2 sm:gap-6">
              <Link to="/" className="font-heading text-xl font-bold text-foreground whitespace-nowrap">
                n<span className="text-primary">Yield</span>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link key={link.label} to={link.to} className={`nav-pill ${isActive(link) ? "active" : ""}`}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-2 ml-2">
                {user ? (
                  <>
                    {/* Notifications */}
                    <div className="relative">
                      <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        className="relative p-1.5 rounded-full hover:bg-muted/30 transition-colors"
                      >
                        <Bell className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        {unreadNotifs > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-[9px] font-bold text-primary-foreground">{unreadNotifs}</span>
                          </span>
                        )}
                      </button>
                      {notifOpen && (
                        <div className="absolute right-0 mt-2 w-72 rounded-xl glass-focus shadow-xl overflow-hidden z-50">
                          <div className="px-4 py-2.5 border-b border-border/30 flex items-center justify-between">
                            <span className="text-xs font-semibold">Notifications</span>
                            <button
                              onClick={() => setNotifOpen(false)}
                              className="text-[10px] text-primary hover:underline"
                            >
                              Clear all
                            </button>
                          </div>
                          <div className="max-h-60 overflow-y-auto p-1 space-y-0.5">
                            {notifications.map((n) => (
                              <button
                                key={n.id}
                                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 relative isolate cursor-pointer hover:bg-accent hover:translate-x-0.5 ${!n.read ? "bg-primary/5" : ""}`}
                                onClick={() => setNotifOpen(false)}
                              >
                                <p className="text-xs">{n.text}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Messages */}
                    <Link to="/messages" className="relative p-1.5 rounded-full hover:bg-muted/30 transition-colors">
                      <MessageCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                      {unreadMessages > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-[9px] font-bold text-primary-foreground">{unreadMessages}</span>
                        </span>
                      )}
                    </Link>
                    <ProfileDropdown />
                  </>
                ) : (
                  <>
                    <Link to="/signin" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                      Sign In
                    </Link>
                    <Link to="/signup" className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-opacity glow-sm whitespace-nowrap">
                      Sign Up
                    </Link>
                  </>
                )}
                <ThemeToggle />
              </div>

              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground ml-auto" aria-label="Toggle menu">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-2 rounded-2xl glass-focus overflow-hidden">
            <div className="px-5 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)} className={`nav-pill ${isActive(link) ? "active" : ""}`}>
                  {link.label}
                </Link>
              ))}
              {user ? (
                <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                  <Link to="/account" onClick={() => setMenuOpen(false)} className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-center hover:text-primary hover:border-primary transition-colors">
                    My Account
                  </Link>
                  <Link to="/messages" onClick={() => setMenuOpen(false)} className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-center hover:text-primary hover:border-primary transition-colors">
                    Messages {unreadMessages > 0 && `(${unreadMessages})`}
                  </Link>
                  <Link to="/affiliate" onClick={() => setMenuOpen(false)} className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-center hover:text-primary hover:border-primary transition-colors">
                    Affiliate
                  </Link>
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-center hover:text-destructive hover:border-destructive transition-colors">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                  <Link to="/signin" onClick={() => setMenuOpen(false)} className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-center">Sign In</Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm text-center">Sign Up</Link>
                </div>
              )}
              <div className="flex justify-center pt-1"><ThemeToggle /></div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Navbar;
