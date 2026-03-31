/**
 * PERFORMANCE BENCHMARKS SECTION — "BENCHMARKS. PROVEN GAINS."
 * Interactive benchmark display with game/system selectors, tester badges,
 * and animated metric cards. Data stored inline for easy expansion.
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Cpu, Monitor, MemoryStick } from "lucide-react";

/* --------------------------------------------------------------------------
 * BENCHMARK DATA — stored inline, easy to expand with more testers
 * -------------------------------------------------------------------------- */

interface BenchmarkEntry {
  game: string;
  system: string;
  tester: string;
  specs: { cpu: string; gpu: string; ram: string };
  results: {
    fpsGain: number;
    latencyReduction: number;
    metrics: {
      avgFps: { optimized: number; standard: number };
      low1: { optimized: number; standard: number };
      low01: { optimized: number; standard: number };
      latency: { optimized: number; standard: number };
    };
  };
}

const benchmarks: BenchmarkEntry[] = [
  {
    game: "Valorant",
    system: "High-End",
    tester: "Allele",
    specs: { cpu: "i7-14700KF", gpu: "RTX 4070 Ti Super", ram: "32GB 7200MT/s" },
    results: {
      fpsGain: 73,
      latencyReduction: 65,
      metrics: {
        avgFps: { optimized: 118.7, standard: 117.5 },
        low1: { optimized: 98.9, standard: 78.1 },
        low01: { optimized: 75.8, standard: 26.1 },
        latency: { optimized: 14.1, standard: 40.3 },
      },
    },
  },
  {
    game: "CS2",
    system: "Mid-Range",
    tester: "Dazai",
    specs: { cpu: "i5-12400F", gpu: "RTX 3060 Ti", ram: "16GB 3200MT/s" },
    results: {
      fpsGain: 58,
      latencyReduction: 52,
      metrics: {
        avgFps: { optimized: 285.4, standard: 180.6 },
        low1: { optimized: 198.2, standard: 112.3 },
        low01: { optimized: 142.7, standard: 64.8 },
        latency: { optimized: 8.2, standard: 17.1 },
      },
    },
  },
  {
    game: "Fortnite",
    system: "High-End",
    tester: "Darizyy",
    specs: { cpu: "R9 7900X", gpu: "RTX 4080 Super", ram: "32GB 6000MT/s" },
    results: {
      fpsGain: 61,
      latencyReduction: 48,
      metrics: {
        avgFps: { optimized: 342.1, standard: 212.5 },
        low1: { optimized: 245.8, standard: 148.2 },
        low01: { optimized: 178.3, standard: 82.6 },
        latency: { optimized: 6.4, standard: 12.3 },
      },
    },
  },
  {
    game: "Warzone",
    system: "Mid-Range",
    tester: "Absar",
    specs: { cpu: "i5-13600K", gpu: "RX 7700 XT", ram: "32GB 5600MT/s" },
    results: {
      fpsGain: 44,
      latencyReduction: 39,
      metrics: {
        avgFps: { optimized: 168.3, standard: 116.9 },
        low1: { optimized: 124.5, standard: 78.4 },
        low01: { optimized: 88.2, standard: 42.1 },
        latency: { optimized: 12.8, standard: 21.0 },
      },
    },
  },
  {
    game: "Apex Legends",
    system: "High-End",
    tester: "D4rk",
    specs: { cpu: "R7 7800X3D", gpu: "RTX 4070 Super", ram: "32GB 6000MT/s" },
    results: {
      fpsGain: 55,
      latencyReduction: 57,
      metrics: {
        avgFps: { optimized: 264.8, standard: 170.8 },
        low1: { optimized: 192.4, standard: 108.6 },
        low01: { optimized: 138.6, standard: 52.3 },
        latency: { optimized: 7.8, standard: 18.1 },
      },
    },
  },
];

/* --------------------------------------------------------------------------
 * SUB-COMPONENTS
 * -------------------------------------------------------------------------- */

/** Selector dropdown */
const Selector = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-border/60 bg-card/80 text-foreground font-medium transition-all hover:border-primary/40 min-w-[180px] text-sm"
      >
        <span>
          <span className="text-muted-foreground mr-1.5">{label}:</span>
          {value}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-border/60 bg-card shadow-lg overflow-hidden z-20"
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-primary/10 ${
                    opt === value ? "text-primary font-semibold bg-primary/5" : "text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

/** Animated number display */
const AnimatedValue = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => (
  <motion.span
    key={value}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    {prefix}{value}{suffix}
  </motion.span>
);

/** Metric comparison card */
const MetricCard = ({
  label,
  optimized,
  standard,
  unit,
  inverse = false,
  delay = 0,
}: {
  label: string;
  optimized: number;
  standard: number;
  unit: string;
  inverse?: boolean;
  delay?: number;
}) => {
  const delta = inverse
    ? -Math.round(((standard - optimized) / standard) * 100)
    : Math.round(((optimized - standard) / standard) * 100);
  const maxVal = Math.max(optimized, standard) * 1.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-xl border border-border/40 bg-card/60 p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          (inverse ? delta < 0 : delta > 0) ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
        }`}>
          {delta > 0 ? "+" : ""}{delta}%
        </span>
      </div>

      {/* Optimized bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-primary font-semibold">nYield</span>
          <span className="text-primary font-bold">{optimized}{unit}</span>
        </div>
        <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(optimized / maxVal) * 100}%` }}
            transition={{ duration: 0.8, delay: delay + 0.1, ease: "easeOut" }}
            style={{ boxShadow: "0 0 10px hsl(var(--primary) / 0.4)" }}
          />
        </div>
      </div>

      {/* Standard bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Stock</span>
          <span className="text-muted-foreground">{standard}{unit}</span>
        </div>
        <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-muted-foreground/30"
            initial={{ width: 0 }}
            animate={{ width: `${(standard / maxVal) * 100}%` }}
            transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* --------------------------------------------------------------------------
 * MAIN COMPONENT
 * -------------------------------------------------------------------------- */

const PerformanceProofSection = () => {
  const games = useMemo(() => [...new Set(benchmarks.map((b) => b.game))], []);
  const systems = useMemo(() => [...new Set(benchmarks.map((b) => b.system))], []);

  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [selectedSystem, setSelectedSystem] = useState(systems[0]);

  const entry = useMemo(
    () =>
      benchmarks.find((b) => b.game === selectedGame && b.system === selectedSystem) ??
      benchmarks.find((b) => b.game === selectedGame) ??
      benchmarks[0],
    [selectedGame, selectedSystem]
  );

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            BENCHMARKS. <span className="text-gradient">PROVEN GAINS.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-world benchmark data extracted from diverse hardware environments.
          </p>
        </motion.div>

        {/* Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Selector label="Game" value={selectedGame} options={games} onChange={setSelectedGame} />
          <Selector label="System" value={selectedSystem} options={systems} onChange={setSelectedSystem} />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={entry.game + entry.tester}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top: Info + Big Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left: Game info + tester + specs */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 flex flex-col justify-center">
                <h3 className="font-heading text-3xl font-bold text-foreground mb-2">
                  {entry.game}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Benchmarked on a {entry.system.toLowerCase()} system with nYield optimizations applied.
                </p>

                {/* Tester badge */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold uppercase tracking-wider text-primary">
                    <User className="w-3 h-3" /> Tester: {entry.tester}
                  </span>
                </div>

                {/* Spec tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 bg-secondary/50 text-xs text-muted-foreground">
                    <Cpu className="w-3 h-3" /> {entry.specs.cpu}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 bg-secondary/50 text-xs text-muted-foreground">
                    <Monitor className="w-3 h-3" /> {entry.specs.gpu}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 bg-secondary/50 text-xs text-muted-foreground">
                    <MemoryStick className="w-3 h-3" /> {entry.specs.ram}
                  </span>
                </div>
              </div>

              {/* Right: Big percentage stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/40 bg-card/50 p-8 flex flex-col items-center justify-center text-center">
                  <motion.p
                    key={`fps-${entry.results.fpsGain}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="font-heading text-5xl font-bold text-primary"
                    style={{ textShadow: "0 0 20px hsl(var(--primary) / 0.3)" }}
                  >
                    +{entry.results.fpsGain}%
                  </motion.p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">FPS Gain</p>
                </div>
                <div className="rounded-2xl border border-border/40 bg-card/50 p-8 flex flex-col items-center justify-center text-center">
                  <motion.p
                    key={`lat-${entry.results.latencyReduction}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
                    className="font-heading text-5xl font-bold text-primary"
                    style={{ textShadow: "0 0 20px hsl(var(--primary) / 0.3)" }}
                  >
                    -{entry.results.latencyReduction}%
                  </motion.p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">Delay Cut</p>
                </div>
              </div>
            </div>

            {/* Bottom: 4 metric cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Average FPS"
                optimized={entry.results.metrics.avgFps.optimized}
                standard={entry.results.metrics.avgFps.standard}
                unit=" FPS"
                delay={0}
              />
              <MetricCard
                label="1% Low"
                optimized={entry.results.metrics.low1.optimized}
                standard={entry.results.metrics.low1.standard}
                unit=" FPS"
                delay={0.08}
              />
              <MetricCard
                label="0.1% Low"
                optimized={entry.results.metrics.low01.optimized}
                standard={entry.results.metrics.low01.standard}
                unit=" FPS"
                delay={0.16}
              />
              <MetricCard
                label="PC Latency"
                optimized={entry.results.metrics.latency.optimized}
                standard={entry.results.metrics.latency.standard}
                unit="ms"
                inverse
                delay={0.24}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Trust label */}
        <p className="text-center text-xs text-muted-foreground mt-12 opacity-60">
          Based on real benchmark data from nYield test systems
        </p>
      </div>
    </section>
  );
};

export default PerformanceProofSection;
