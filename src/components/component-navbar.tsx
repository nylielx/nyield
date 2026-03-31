/**
 * =============================================================================
 * NAVBAR COMPONENT — Top navigation bar for nYield
 * =============================================================================
 *
 * Features:
 * - Floating pill design with glassmorphism
 * - Profile dropdown when logged in (with animated menu)
 * - Scroll progress bar
 * - Responsive mobile menu
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./component-theme-toggle";
import ProfileDropdown from "./component-profile-dropdown";
import ScrollProgressBar from "./component-scroll-progress";
import { useAuth } from "@/contexts/AuthContext";

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

  const { scrollYProgress } = useScroll();
  const gradientX = useTransform(scrollYProgress, [0, 1], [0, 360]);

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
    <>
      {/* Scroll progress bar */}
      <ScrollProgressBar />

      <div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-auto max-w-[95vw]"
        >
          {/* Gradient border wrapper */}
          <motion.div
            className="rounded-full p-[1.5px]"
            style={{
              background: useTransform(
                gradientX,
                (v) => `linear-gradient(${v}deg, hsl(0 72% 51%), hsl(0 0% 90%), hsl(0 72% 51%))`
              ),
              boxShadow: scrolled
                ? '0 0 15px hsl(0 72% 51% / 0.25), 0 0 40px hsl(0 72% 51% / 0.08)'
                : '0 0 10px hsl(0 72% 51% / 0.15), 0 0 30px hsl(0 72% 51% / 0.05)',
            }}
          >
          <nav
            className={`rounded-full glass nav-pill-container transition-all duration-300 ${
              scrolled ? "shadow-lg" : ""
            }`}
          >
            <div className="px-4 sm:px-6 py-2.5 flex items-center gap-2 sm:gap-6">
              {/* Brand logo */}
              <Link to="/" className="font-heading text-xl font-bold text-foreground whitespace-nowrap">
                n<span className="text-primary">Yield</span>
              </Link>

              {/* Desktop navigation */}
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

              {/* Desktop auth area */}
              <div className="hidden md:flex items-center gap-2 ml-2">
                {user ? (
                  <ProfileDropdown />
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

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-foreground ml-auto"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
          </motion.div>

          {/* Mobile dropdown */}
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
                    <Link
                      to="/account"
                      onClick={() => setMenuOpen(false)}
                      className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-center hover:text-primary hover:border-primary transition-colors"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => { logout(); setMenuOpen(false); }}
                      className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-center hover:text-destructive hover:border-destructive transition-colors"
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
      </div>
    </>
  );
};

export default Navbar;
