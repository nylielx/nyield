/**
 * PERFORMANCE PROOF SECTION — Interactive game-by-game comparison
 * Dropdown selector + animated FPS/latency bars
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface GameData {
  name: string;
  fps: { stock: number; optimized: number };
  latency: { stock: number; optimized: number };
}

const games: GameData[] = [
  { name: "Valorant", fps: { stock: 550, optimized: 870 }, latency: { stock: 3.2, optimized: 1.4 } },
  { name: "CS2", fps: { stock: 480, optimized: 760 }, latency: { stock: 4.1, optimized: 1.8 } },
  { name: "Fortnite", fps: { stock: 420, optimized: 680 }, latency: { stock: 3.8, optimized: 1.7 } },
  { name: "Warzone", fps: { stock: 160, optimized: 245 }, latency: { stock: 5.2, optimized: 2.3 } },
  { name: "Apex Legends", fps: { stock: 310, optimized: 520 }, latency: { stock: 4.5, optimized: 2.0 } },
];

const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="font-heading font-bold"
    >
      {value}{suffix}
    </motion.span>
  );
};

const ComparisonBar = ({
  label,
  value,
  maxValue,
  variant,
  delay = 0,
}: {
  label: string;
  value: number;
  maxValue: number;
  variant: "stock" | "optimized";
  delay?: number;
}) => {
  const pct = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={variant === "optimized" ? "text-primary font-semibold" : "text-muted-foreground"}>
          {value} {maxValue > 100 ? "FPS" : "ms"}
        </span>
      </div>
      <div className="h-3 rounded-full bg-secondary/60 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            variant === "optimized"
              ? "bg-primary"
              : "bg-muted-foreground/30"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
          style={
            variant === "optimized"
              ? { boxShadow: "0 0 12px hsl(var(--primary) / 0.4)" }
              : {}
          }
        />
      </div>
    </div>
  );
};

const PerformanceProofSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const game = games[selectedIndex];

  const fpsMax = 1000;
  const latencyMax = 8;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            See The Difference <span className="text-gradient">Instantly</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real benchmarks on a Ryzen 9 9950X3D + RTX 5090 test system
          </p>
        </motion.div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          {/* Game Selector Dropdown */}
          <div className="relative mb-12 max-w-xs mx-auto">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl border border-border/60 bg-card text-foreground font-medium transition-all hover:border-primary/40"
            >
              <span className="text-sm">
                <span className="text-muted-foreground mr-2">Game:</span>
                {game.name}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border/60 bg-card shadow-lg overflow-hidden z-20"
                >
                  {games.map((g, i) => (
                    <button
                      key={g.name}
                      onClick={() => {
                        setSelectedIndex(i);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm transition-colors hover:bg-primary/10 ${
                        i === selectedIndex
                          ? "text-primary font-semibold bg-primary/5"
                          : "text-foreground"
                      }`}
                    >
                      {g.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Comparison Bars */}
          <AnimatePresence mode="wait">
            <motion.div
              key={game.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* FPS Comparison */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Frames Per Second
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <AnimatedNumber value={game.fps.stock} />
                    <span className="text-muted-foreground">→</span>
                    <span className="text-primary">
                      <AnimatedNumber value={game.fps.optimized} />
                    </span>
                    <span className="text-muted-foreground text-xs">FPS</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <ComparisonBar label="Stock" value={game.fps.stock} maxValue={fpsMax} variant="stock" />
                  <ComparisonBar label="nYield Optimized" value={game.fps.optimized} maxValue={fpsMax} variant="optimized" delay={0.15} />
                </div>
              </div>

              {/* Latency Comparison */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Input Latency
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <AnimatedNumber value={game.latency.stock} suffix="ms" />
                    <span className="text-muted-foreground">→</span>
                    <span className="text-primary">
                      <AnimatedNumber value={game.latency.optimized} suffix="ms" />
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <ComparisonBar label="Stock" value={game.latency.stock} maxValue={latencyMax} variant="stock" />
                  <ComparisonBar label="nYield Optimized" value={game.latency.optimized} maxValue={latencyMax} variant="optimized" delay={0.15} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Trust label */}
          <p className="text-center text-xs text-muted-foreground mt-8 opacity-60">
            Based on real benchmark data from nYield test systems
          </p>
        </div>
      </div>
    </section>
  );
};

export default PerformanceProofSection;
