/**
 * =============================================================================
 * NAVBAR COMPONENT — Top navigation bar for nYield
 * =============================================================================
 *
 * ROLE:
 * Provides site-wide navigation. Sticks to the top of the viewport so users
 * can always access nav links. Uses a glass morphism effect for a modern look.
 *
 * WHY A SEPARATE COMPONENT?
 * The navbar is used on every page, so it lives in its own file for reuse.
 * If we later add more pages (e.g. /marketplace, /builds), the navbar
 * component stays the same — we just add new links.
 *
 * PROPS: None — this is a "presentational" component with no external data.
 *
 * ANIMATION:
 * - Fades in on mount using Framer Motion
 * - Background becomes more opaque when scrolled (glass effect)
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

/**
 * Navigation links configuration.
 * Each object maps a label to an anchor ID on the page.
 * Using anchor links (#section) enables smooth scrolling to sections.
 */
const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Builds", href: "#builds" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  // Track whether the user has scrolled down (for glass effect intensity)
  const [scrolled, setScrolled] = useState(false);
  // Track mobile menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * useEffect runs side effects after render.
   * Here we add a scroll listener to detect when the user scrolls past 50px.
   * The empty dependency array [] means this runs once on mount.
   */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    // Cleanup: remove listener when component unmounts to prevent memory leaks
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      /**
       * Framer Motion "initial" and "animate" props create entrance animations.
       * initial = starting state (invisible, shifted up)
       * animate = ending state (visible, in position)
       * transition = how long and what easing to use
       */
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg" /* More visible glass when scrolled */
          : "bg-transparent"  /* Fully transparent at top of page */
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand logo — uses the heading font for distinction */}
        <a href="#" className="font-heading text-2xl font-bold text-foreground">
          n<span className="text-primary">Yield</span>
        </a>

        {/* Desktop navigation links — hidden on mobile (md:flex) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          {/* Primary CTA button */}
          <a
            href="#hero"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity glow-sm"
          >
            Analyze My PC
          </a>
        </div>

        {/* Mobile hamburger button — visible only on small screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu — slides down when open */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-border"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#hero"
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm text-center"
            >
              Analyze My PC
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
