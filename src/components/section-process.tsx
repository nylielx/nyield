/**
 * =============================================================================
 * PROCESS SECTION — 5-step journey with connected timeline
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Monitor, HardDrive, CalendarDays, Settings, Gamepad2 } from "lucide-react";

const steps = [
  {
    icon: Monitor,
    title: "Choose Windows",
    description: "Select Windows 10 or 11 as your base. We'll strip it down and rebuild it for performance.",
  },
  {
    icon: HardDrive,
    title: "Fresh ISO Installation",
    description: "We create a clean, bloat-free ISO image optimized specifically for your hardware and use case.",
  },
  {
    icon: CalendarDays,
    title: "Book a Time & Date",
    description: "Pick a convenient time for our technicians to remotely install and configure your system.",
  },
  {
    icon: Settings,
    title: "We Optimise Your System",
    description: "Our team fine-tunes drivers, services, power plans, and network settings for peak performance.",
  },
  {
    icon: Gamepad2,
    title: "Install & Play",
    description: "Your PC is ready. Install your games and experience the difference immediately — more FPS, less lag.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 glass-base">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient-glow-wrapper"><span className="text-gradient-glow">Works</span></span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Five simple steps from stock Windows to peak performance.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical connector line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className={`relative flex items-start gap-6 ${
                  index % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
                }`}
              >
                {/* Step number & icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                >
                  <step.icon className="w-6 h-6 text-primary" />
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </motion.div>

                {/* Content card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="flex-1 glass-base rounded-xl p-5 transition-shadow hover:shadow-lg"
                >
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
