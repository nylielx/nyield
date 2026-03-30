/**
 * =============================================================================
 * PROCESS SECTION — How nYield works in 3 simple steps
 * =============================================================================
 *
 * ROLE:
 * Reduces friction by showing visitors how simple it is to get started.
 * "Process" or "How it works" sections are proven to increase conversions
 * because they lower the perceived effort of using a service.
 *
 * DESIGN:
 * Uses numbered steps with connecting lines for visual flow.
 * Each step has an icon, title, and description.
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Search, Settings, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Analyze Your PC",
    description:
      "Run our diagnostic tool to get a full breakdown of your system's performance, bottlenecks, and optimization potential.",
  },
  {
    icon: Settings,
    title: "Choose Your Optimization",
    description:
      "Select from our Competitive, Balanced, or Education edition — or configure a custom build tailored to your needs.",
  },
  {
    icon: Rocket,
    title: "Experience the Difference",
    description:
      "Apply the configuration and immediately feel the improvement. Higher FPS, lower latency, smoother experience.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Getting started with nYield is simple. Three steps to a faster PC.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="text-center"
            >
              {/* Numbered circle with icon */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <step.icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
