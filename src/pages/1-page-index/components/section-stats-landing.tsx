/**
 * STATS SECTION — Social proof with scroll-triggered count-up
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, TrendingUp, Users } from "lucide-react";

const stats = [
  { icon: Monitor, value: 5000, suffix: "+", label: "Systems Optimized" },
  { icon: TrendingUp, value: 47, suffix: "%", label: "Avg FPS Increase" },
  { icon: Users, value: 100, suffix: "+", label: "Pro Gamers Trust Us" },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}<span className="text-primary">{suffix}</span>
    </span>
  );
};

const StatsLandingSection = () => {
  return (
    <section className="py-24 border-y border-border/20 bg-card/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="text-center"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsLandingSection;
