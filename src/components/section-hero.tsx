/**
 * =============================================================================
 * HERO SECTION — The first thing visitors see on the nYield website
 * =============================================================================
 *
 * ROLE:
 * Creates an immediate, powerful first impression. Communicates what nYield
 * does in under 5 seconds. Includes a strong call-to-action.
 *
 * DESIGN DECISIONS:
 * - Full-viewport height to dominate the screen
 * - Dark overlay on background image for text readability
 * - Animated headline to draw attention
 * - Glowing CTA button to encourage clicks
 *
 * PROPS: None — content is hardcoded since this is a one-off landing section.
 * In a CMS-driven site, you'd pass headline/subtitle as props.
 * =============================================================================
 */

import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ----------------------------------------------------------------
       * BACKGROUND IMAGE
       * We use an absolutely-positioned img tag instead of CSS background
       * so we can apply object-fit and lazy loading attributes.
       * The dark gradient overlay ensures text is always readable.
       * ---------------------------------------------------------------- */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Gaming PC setup with teal lighting"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Gradient overlay: dark at edges, slightly transparent in center */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      {/* ----------------------------------------------------------------
       * HERO CONTENT
       * Uses Framer Motion's staggerChildren to animate children one by one.
       * This creates a cascading reveal effect.
       * ---------------------------------------------------------------- */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center max-w-4xl"
        initial="hidden"
        animate="visible"
        /**
         * staggerChildren: Each child animates 0.15s after the previous one.
         * This creates the cascading "typewriter" reveal effect.
         */
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {/* Badge — small label above the headline */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-elevated border-primary/20 mb-8"
        >
          <Cpu size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">
            PC Optimization & Gaming Systems
          </span>
        </motion.div>

        {/* Main headline — uses text-gradient for the brand name */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-gradient-glow-wrapper">
            Unlock Your PC's{" "}
            <span className="text-gradient-glow">True Power</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Custom operating systems, pre-built gaming PCs, and a verified
          marketplace — all engineered for maximum performance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity glow animate-pulse-glow"
          >
            Analyze My PC
            <ArrowRight size={20} />
          </a>
          <a
            href="#builds"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-semibold text-lg hover:bg-secondary transition-colors"
          >
            View Gaming PCs
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
