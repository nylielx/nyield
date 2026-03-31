/**
 * =============================================================================
 * PERFORMANCE COMPARISON — Stock vs Optimized interactive comparison
 * =============================================================================
 *
 * ROLE:
 * Visually demonstrates the difference between a stock PC and one optimized
 * by nYield. Uses animated bar charts to make the improvement tangible.
 *
 * WHY THIS MATTERS:
 * "Show, don't tell" is a core UX principle. Instead of saying "we make PCs
 * faster," we SHOW the FPS difference with visual bars.
 *
 * ARCHITECTURE NOTE:
 * We use simple CSS bars instead of a charting library (like Recharts)
 * because they're lighter and we have full control over the animation.
 * For a dashboard with complex data, you'd use a library.
 * =============================================================================
 */

import { motion } from "framer-motion";

/** Comparison data: each game shows stock FPS vs nYield-optimized FPS */
const comparisons = [
  { game: "Fortnite", stock: 420, optimized: 680, unit: "FPS" },
  { game: "Valorant", stock: 550, optimized: 870, unit: "FPS" },
  { game: "Call of Duty", stock: 160, optimized: 245, unit: "FPS" },
  { game: "Input Latency", stock: 3.8, optimized: 1.7, unit: "ms", inverse: true },
];

const PerformanceComparison = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Proof of <span className="text-gradient">Power</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real benchmarks. Real hardware. See the difference nYield optimization makes
            on a Ryzen 9 9950X3D + RTX 5090 test bench.
          </p>
        </motion.div>

        {/* Comparison bars */}
        <div className="max-w-3xl mx-auto space-y-8">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.game}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-heading font-semibold text-foreground">
                  {item.game}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.stock} → {item.optimized} {item.unit}
                </span>
              </div>

              {/* Stock bar (gray) */}
              <div className="relative h-8 rounded-md bg-secondary/50 overflow-hidden mb-1">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-muted-foreground/30 rounded-md"
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${item.inverse
                      ? (item.stock / 5) * 100  // For latency, lower = better
                      : (item.stock / 1000) * 100
                    }%`
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                  Stock: {item.stock} {item.unit}
                </span>
              </div>

              {/* Optimized bar (primary/teal) */}
              <div className="relative h-8 rounded-md bg-secondary/50 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary/80 rounded-md"
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${item.inverse
                      ? (item.optimized / 5) * 100
                      : (item.optimized / 1000) * 100
                    }%`
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.1 + 0.2 }}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary-foreground">
                  nYield: {item.optimized} {item.unit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceComparison;
