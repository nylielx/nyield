/**
 * Shared split-panel auth layout with MeshGradient background.
 * Left: testimonial + branding panel (hidden on mobile)
 * Right: auth form content
 */

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Cpu } from "lucide-react";
import { MeshGradient } from "@paper-design/shaders-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
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

  const gradientColors = isDark
    ? ["#1a0000", "#330a00", "#ff5722", "#661a00"]
    : ["#ffffff", "#fff0ec", "#ff5722", "#ffe0d6"];

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* ── Left Panel: Branding + Testimonial ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* MeshGradient Background */}
        <div className="absolute inset-0">
          <MeshGradient
            style={{ width: "100%", height: "100%" }}
            speed={0.4}
            colors={gradientColors}
          />
        </div>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]" />

        {/* Glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Cpu size={28} className="text-primary" />
            <span className="text-2xl font-heading font-bold text-foreground">
              nYield
            </span>
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-md"
          >
            <blockquote className="text-xl font-medium leading-relaxed text-foreground/90 mb-6">
              "nYield transformed my gaming rig — more FPS, lower temps, and
              zero hassle. Best optimization service I've ever used."
            </blockquote>
            <p className="text-sm text-muted-foreground">~ Ali Hassan</p>
          </motion.div>

          {/* Decorative dots */}
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-primary/40" />
          </div>
        </div>
      </div>

      {/* ── Right Panel: Auth Form ── */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Top bar with back button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} />
            Home
          </Link>
        </div>

        {/* Mobile logo (shown only on small screens) */}
        <div className="flex lg:hidden items-center gap-2 pt-6 px-6">
          <Cpu size={24} className="text-primary" />
          <span className="text-xl font-heading font-bold text-foreground">
            nYield
          </span>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
