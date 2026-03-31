/**
 * =============================================================================
 * STATS SECTION — Proof of performance with animated numbers
 * =============================================================================
 *
 * ROLE:
 * Builds credibility by showing impressive statistics. Visitors see concrete
 * numbers that prove nYield's value (similar to Xilly's "proof of power" section).
 *
 * WHY SEPARATE?
 * Stats sections are common across landing pages. By isolating it, we can
 * reuse or reposition it without affecting other sections.
 *
 * ANIMATION:
 * Uses Framer Motion's "whileInView" to trigger animations only when the
 * section scrolls into the viewport. This prevents wasting animation on
 * content the user hasn't seen yet.
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Zap, Monitor, Users, TrendingUp } from "lucide-react";

/**
 * Stats data as a simple array of objects.
 * Each stat has an icon, value, label, and suffix (like "+" or "%").
 */
const stats = [
  { icon: Monitor, value: "5,000", suffix: "+", label: "Systems Optimized" },
  { icon: TrendingUp, value: "47", suffix: "%", label: "Avg FPS Increase" },
  { icon: Zap, value: "725→1068", suffix: "", label: "FPS on 9950X3D" },
  { icon: Users, value: "100", suffix: "+", label: "Pro Gamers Trust Us" },
];

const StatsSection = () => {
  return (
    <section className="py-24 border-y border-border/30 glass-base">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              /**
               * whileInView triggers animation when this element enters viewport.
               * viewport.once means it only animates the first time (not on re-scroll).
               */
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
