/**
 * =============================================================================
 * ABOUT SECTION — nYield's mission and vision
 * =============================================================================
 *
 * ROLE:
 * Humanizes the brand. Tells visitors WHY nYield exists — not just what it does.
 * Storytelling builds emotional connection and trust.
 *
 * CONTENT:
 * Based on the nYield business plan: targeting students, esports gamers,
 * and anyone who wants transparent, verified PC performance.
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Target, Heart, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Performance First",
    description: "Every decision we make optimizes for real-world performance. No gimmicks, no bloat — just results.",
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "From stress test results to pricing — we believe you deserve to know exactly what you're getting.",
  },
  {
    icon: Heart,
    title: "Built for Students",
    description: "We started as students ourselves. nYield is built to give you power and portability without the premium price tag.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              The <span className="text-gradient-glow-wrapper"><span className="text-gradient-glow">Mission</span></span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              nYield exists to democratize PC performance. We believe every
              gamer and student deserves a machine that works at its best —
              without needing a computer science degree to set it up.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center p-6 rounded-xl border border-border glass-card"
              >
                <value.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
