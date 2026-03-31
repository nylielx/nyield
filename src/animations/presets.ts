/**
 * =============================================================================
 * ANIMATION PRESETS — Reusable Framer Motion animation variants
 * =============================================================================
 * Import these in any component for consistent, smooth animations.
 *
 * Usage:
 *   import { fadeIn, slideUp } from "@/animations/presets";
 *   <motion.div variants={fadeIn} initial="hidden" animate="visible" />
 * =============================================================================
 */

import type { Variants } from "framer-motion";

/** Fade in from transparent */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

/** Slide up from below with fade */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Glow pulse effect */
export const glowPulse: Variants = {
  hidden: { opacity: 0.6 },
  visible: {
    opacity: [0.6, 1, 0.6],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Staggered container — children animate one by one */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** Staggered child — used inside staggerContainer */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/** Hover lift — subtle y-axis raise */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
};

/** Scale on hover — for buttons */
export const hoverScale = {
  whileHover: { scale: 1.03, transition: { duration: 0.2 } },
  whileTap: { scale: 0.97 },
};

/** Dropdown animation — for menus */
export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

/** Page transition — fade in/out */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};
