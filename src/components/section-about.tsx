/**
 * =============================================================================
 * ABOUT SECTION — Brand story & mission
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Target, Heart, Shield, Users, Lightbulb, Wrench } from "lucide-react";

const storyBlocks = [
  {
    icon: Users,
    title: "Built by Students, for Students",
    description:
      "nYield was founded by medicine and pharmacy students in the UK who were frustrated with poor PC performance. We knew there had to be a better way.",
  },
  {
    icon: Lightbulb,
    title: "The Problem We Saw",
    description:
      "eBay, Facebook Marketplace — full of overpriced PCs with zero transparency. No real specs, no performance data, no trust. We wanted to change that.",
  },
  {
    icon: Wrench,
    title: "Our Solution",
    description:
      "The nYield ecosystem: custom operating systems that maximize your hardware, pre-built PCs with verified specs, and a marketplace built on transparency.",
  },
];

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
    title: "Accessible to All",
    description: "From GCSE students to university gamers and creators — nYield is for anyone who wants their PC to perform at its best.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-glow-wrapper">
                <span className="text-gradient-glow">Built by Students</span>
              </span>
              , for Students
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We exist to unlock the full performance potential of every system —
              and make PC gaming accessible, transparent, and fair.
            </p>
          </motion.div>

          {/* Story blocks */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {storyBlocks.map((block, index) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-base rounded-xl p-6 transition-shadow hover:shadow-lg"
              >
                <block.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {block.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{block.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mission statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 glass-elevated rounded-2xl p-8 md:p-12"
          >
            <p className="text-primary font-medium text-sm mb-2">Our Mission</p>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              "Unlock the full performance potential of every system"
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We believe every gamer and student deserves a machine that works at
              its best — without needing a computer science degree to set it up.
            </p>
          </motion.div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center p-6 rounded-xl glass-elevated transition-shadow hover:shadow-lg"
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
