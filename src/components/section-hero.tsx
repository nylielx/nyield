/**
 * =============================================================================
 * HERO SECTION — Landing hero with MeshGradient shader background
 * =============================================================================
 */

import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { MeshGradient } from "@paper-design/shaders-react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* MeshGradient Shader Background */}
      <div className="absolute inset-0">
        <MeshGradient
          style={{ width: "100%", height: "100%" }}
          speed={0.6}
          color1="#0a0a0a"
          color2="#1a0000"
          color3="#ff5722"
          color4="#1a0505"
        />
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
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

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/services"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all glow relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            Choose Your Edition
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/marketplace"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-semibold text-lg hover:bg-secondary transition-colors"
          >
            View Gaming PCs
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
