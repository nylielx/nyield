/**
 * =============================================================================
 * HERO SECTION — Landing hero with MeshGradient + parallax depth system
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { MeshGradient } from "@paper-design/shaders-react";
import CursorGridOverlay from "./ui/cursor-grid-overlay";
import { GlassButton } from "./ui/glass-button";

const HeroSection = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  /* ── Scroll-driven parallax transforms ── */
  const { scrollY } = useScroll();

  // Background (deep) — slowest
  const deepLayerY = useTransform(scrollY, [0, 1000], [0, 50]);
  const deepScale = useTransform(scrollY, [0, 1000], [1, 1.05]);

  // Grid / shader (mid) — medium speed
  const midLayerY = useTransform(scrollY, [0, 1000], [0, 120]);

  // Glow blobs (front) — fastest
  const frontLayerY = useTransform(scrollY, [0, 1000], [0, 200]);

  // Content fades out as user scrolls past hero
  const contentOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const contentY = useTransform(scrollY, [0, 600], [0, 60]);

  const gradientColors = isDark
    ? ["#1a0000", "#330a00", "#ff5722", "#661a00"]
    : ["#ffffff", "#ffffff", "#ffe8e0", "#fff5f2"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── LAYER 1: Deep background (slowest parallax) ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: deepLayerY, scale: deepScale }}
      >
        <MeshGradient
          style={{ width: "100%", height: "100%" }}
          speed={0.6}
          colors={gradientColors}
        />
      </motion.div>

      {/* ── LAYER 2: Cursor-follow grid overlay ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: midLayerY }}
      >
        <CursorGridOverlay />
      </motion.div>

      {/* ── LAYER 3: Glow blobs (fastest parallax) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: frontLayerY }}
      >
        {/* Primary glow */}
        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        {/* Secondary glow */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
      </motion.div>

      {/* ── Overlay gradient for readability ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/60" />

      {/* ── Hero Content (fades on scroll) ── */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center max-w-4xl"
        style={{ opacity: contentOpacity, y: contentY }}
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
          More FPS. Lower latency. No upgrades needed.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/services">
            <GlassButton size="lg" className="inline-flex items-center gap-2 bg-primary text-primary-foreground">
              Choose Your Edition
              <ArrowRight size={20} />
            </GlassButton>
          </Link>
          <Link to="/builds">
            <GlassButton size="lg" className="inline-flex items-center gap-2 border border-border text-foreground">
              View Gaming PCs
            </GlassButton>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
