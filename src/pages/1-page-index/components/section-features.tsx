/**
 * SOFTWARE FEATURES SECTION — 4 feature cards reinforcing value
 */

import { motion } from "framer-motion";
import { Gamepad2, Wifi, Trash2, Settings2 } from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Game Mode",
    description: "Instantly prioritize GPU, CPU, and RAM for your game. Background noise eliminated.",
  },
  {
    icon: Wifi,
    title: "Network Optimisation",
    description: "Reduce ping and packet loss with deep network stack tuning and route optimization.",
  },
  {
    icon: Trash2,
    title: "Background Cleaner",
    description: "Strip unnecessary processes, services, and telemetry for maximum resource availability.",
  },
  {
    icon: Settings2,
    title: "Advanced System Tweaks",
    description: "Registry-level optimizations, power plan tuning, and scheduler adjustments — all automated.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background border-t border-border/20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Built For <span className="text-gradient">Maximum Performance</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every optimization engineered to give you the edge
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-border/40 bg-card/50 p-6 hover:border-primary/30 transition-all duration-500"
                style={{ transition: "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px hsl(var(--primary) / 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
