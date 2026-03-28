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
import { Link } from "react-router-dom";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold text-foreground">
          n<span className="text-primary">Yield</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          )}
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity glow-sm"
          >
            Analyze My PC
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-border"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
            <Link
              to="/"
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm text-center"
            >
              Analyze My PC
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
