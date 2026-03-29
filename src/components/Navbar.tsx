/**
 * =============================================================================
 * NAVBAR COMPONENT — Top navigation bar for nYield
 * =============================================================================
 *
 * ROLE:
 * Provides site-wide navigation with links to dedicated pages.
 * Uses glass morphism effect and sticks to the top of the viewport.
 *
 * NAVIGATION:
 * - Landing page sections use anchor links (#services, #about, etc.)
 * - Dedicated pages use React Router Links (/services, /builds, /marketplace)
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Navigation links configuration.
 * "to" = React Router path for dedicated pages.
 * "href" = anchor link for landing page sections.
 */
const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Builds", to: "/builds" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  /** Check if a nav link matches the current route (for active pill state) */
  const isActive = (link: { to?: string; href?: string }) => {
    if (link.to) return location.pathname === link.to;
    if (link.href) return location.pathname + location.hash === link.href;
    return false;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    {/* ================================================================
     * FLOATING PILL NAVBAR WRAPPER
     * - fixed positioning with top spacing (top-4 = 16px from top)
     * - left-1/2 + -translate-x-1/2 = perfectly centered horizontally
     * - z-50 keeps it above all content
     * ================================================================ */}
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw]"
    >
      {/* ================================================================
       * PILL CONTAINER
       * - rounded-full = border-radius: 9999px (pill shape)
       * - glass class = semi-transparent bg + backdrop-blur (glassmorphism)
       * - nav-pill-container = custom glow shadow defined in index.css
       * ================================================================ */}
      <nav
        className={`rounded-full glass nav-pill-container transition-all duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="px-4 sm:px-6 py-2.5 flex items-center gap-2 sm:gap-6">
          {/* Brand logo — always visible */}
          <Link to="/" className="font-heading text-xl font-bold text-foreground whitespace-nowrap">
            n<span className="text-primary">Yield</span>
          </Link>

          {/* ---- Desktop navigation items ---- */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`nav-pill ${isActive(link) ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-pill ${isActive(link) ? "active" : ""}`}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* ---- Desktop auth buttons ---- */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                  <User size={14} />
                  {user.fullName}
                </span>
                <button
                  onClick={() => logout()}
                  className="px-3 py-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary transition-colors flex items-center gap-1"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-opacity glow-sm whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* ---- Mobile hamburger ---- */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground ml-auto"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ================================================================
       * MOBILE DROPDOWN
       * Appears below the pill. Also rounded with glass effect.
       * ================================================================ */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 rounded-2xl glass border border-border/50 overflow-hidden"
        >
          <div className="px-5 py-4 flex flex-col gap-3">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`nav-pill ${isActive(link) ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`nav-pill ${isActive(link) ? "active" : ""}`}
                >
                  {link.label}
                </a>
              )
            )}
            {user ? (
              <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <User size={16} />
                  {user.fullName}
                </span>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-center hover:text-primary hover:border-primary transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                <Link
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <div className="flex justify-center pt-1">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
