/**
 * HARDWARE ECOSYSTEM SECTION — Equal-height cards with bottom-aligned CTAs
 */

import { motion } from "framer-motion";
import { Monitor, Wrench, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const hardware = [
  {
    title: "Custom Built PCs",
    description: "Configure every component. Built and tested by our team for guaranteed performance.",
    icon: Wrench,
    link: "/builds",
    cta: "Explore Builds",
  },
  {
    title: "Prebuilt PCs",
    description: "Ready-to-ship systems in Blackout and Whiteout editions. Plug in and dominate.",
    icon: Monitor,
    link: "/builds",
    cta: "View Systems",
  },
  {
    title: "Verified Used PCs",
    description: "Quality-checked second-hand hardware at transparent prices. Every unit tested.",
    icon: ShieldCheck,
    link: "/marketplace",
    cta: "Browse Marketplace",
  },
];

const HardwareSection = () => {
  return (
    <section className="py-24 bg-background border-y border-border/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Your Setup, <span className="text-gradient">Your Way</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From fully custom rigs to verified pre-owned — find the perfect system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {hardware.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-border/50 bg-card/50 p-8 hover:border-primary/30 transition-all duration-500 flex flex-col"
                style={{
                  transition: "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px hsl(var(--primary) / 0.1), 0 16px 48px hsl(0 0% 0% / 0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300"
                  >
                    {item.cta} <ArrowRight className="w-4 h-4" />
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

export default HardwareSection;
