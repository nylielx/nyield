/**
 * EDITIONS SECTION — Choose Your Performance Level
 * Core conversion section with 3 equal-height edition cards
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Scale, GraduationCap, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const editions = [
  {
    id: "competitive",
    name: "Competitive",
    tagline: "Maximum responsiveness. Zero compromise.",
    icon: Zap,
    popular: true,
    benefits: [
      "Up to 47% FPS increase across titles",
      "Ultra-low input latency tuning",
      "Background process elimination",
      "Game-specific config profiles",
    ],
    details:
      "Built for esports athletes who need every millisecond. Strips out bloat, optimizes GPU/CPU priority, and pushes your hardware to its limit.",
  },
  {
    id: "balanced",
    name: "Balanced",
    tagline: "Power meets productivity.",
    icon: Scale,
    popular: false,
    benefits: [
      "Smart resource allocation",
      "Quick-switch gaming mode",
      "Optimized multitasking workflows",
      "Clean, minimal bloatware setup",
    ],
    details:
      "Designed for creators and professionals who need speed for work and solid FPS when it's time to play.",
  },
  {
    id: "education",
    name: "Education",
    tagline: "Study hard. Game harder.",
    icon: GraduationCap,
    popular: false,
    benefits: [
      "Focus mode with distraction blocking",
      "One-click gaming mode toggle",
      "Study-optimized power profiles",
      "Competitive-grade game performance",
    ],
    details:
      "A quiet, focused setup for students. Minimal distractions during study time, flips into a capable gaming machine on demand.",
  },
];

const EditionsSection = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient">Performance Level</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the edition built for your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {editions.map((edition, index) => {
            const Icon = edition.icon;
            const isHovered = hoveredId === edition.id;

            return (
              <motion.div
                key={edition.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                onMouseEnter={() => setHoveredId(edition.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-2xl border p-8 transition-all duration-500 cursor-pointer group flex flex-col ${
                  edition.popular
                    ? "border-primary/40 bg-card"
                    : "border-border/50 bg-card/50"
                }`}
                style={{
                  boxShadow: isHovered
                    ? "0 0 40px hsl(var(--primary) / 0.15), 0 20px 60px hsl(0 0% 0% / 0.2)"
                    : "0 4px 20px hsl(0 0% 0% / 0.06)",
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                }}
              >
                {edition.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Main content area — flex-1 pushes CTA down */}
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    {edition.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {edition.tagline}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {edition.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-sm text-foreground/80">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-muted-foreground mb-6 overflow-hidden"
                      >
                        {edition.details}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA — always at bottom */}
                <div className="mt-6">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EditionsSection;
