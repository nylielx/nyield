/**
 * =============================================================================
 * MARKETPLACE PAGE — Full browsing experience for nYield's verified PC market
 * =============================================================================
 *
 * SECTIONS:
 * 1. Hero — value prop focused on comparison & verified data
 * 2. Verification — compact cards explaining what data each listing includes
 * 3. Marketplace Controls — search, filter chips, sort (all placeholders)
 * 4. Listing Cards — specs, benchmark bars, tags, bestFor, dual CTAs
 * 5. Coming Soon — future features roadmap
 * 6. Sell CTA — encourages sellers
 *
 * ROUTE: /marketplace (defined in App.tsx)
 * =============================================================================
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Monitor,
  MemoryStick,
  HardDrive,
  Gauge,
  Thermometer,
  Activity,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  MessageSquare,
  LayoutDashboard,
  Filter,
  CreditCard,
  Tag,
  ChevronDown,
} from "lucide-react";
import { marketplaceListings } from "@/data/marketplaceExamples";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Verification steps — compact version explaining what data
 * every listing includes so buyers know nothing is hidden.
 */
const verificationSteps = [
  { icon: Cpu, title: "CPU Stress Test", desc: "30-min sustained load — stability, temp & throttling." },
  { icon: Monitor, title: "GPU Benchmark", desc: "3D benchmarks verifying VRAM integrity & cooling." },
  { icon: MemoryStick, title: "RAM Stability", desc: "Multi-pass memory test for errors & correct speed." },
  { icon: Thermometer, title: "Cooling Check", desc: "Thermal monitoring under load — fans & heatsinks." },
  { icon: Activity, title: "Real FPS Data", desc: "Actual game benchmarks at common resolutions." },
  { icon: ShieldCheck, title: "Hardware Verified", desc: "Serial numbers & specs checked against listing." },
];

/** Filter chip options (non-functional placeholders) */
const filterChips = [
  { label: "All GPUs", icon: Monitor },
  { label: "RTX 4000+", icon: Monitor },
  { label: "Under £500", icon: Tag },
  { label: "Under £1000", icon: Tag },
  { label: "Excellent", icon: ShieldCheck },
  { label: "Like New", icon: ShieldCheck },
];

/** Coming soon features for the bottom roadmap section */
const comingSoonFeatures = [
  { icon: MessageSquare, title: "Negotiation System", desc: "Make offers and negotiate directly with sellers through our secure messaging platform." },
  { icon: LayoutDashboard, title: "Seller Dashboard", desc: "Full dashboard for sellers to manage listings, view analytics, and track enquiries." },
  { icon: Filter, title: "Advanced Filters", desc: "Filter by GPU generation, CPU brand, price range, benchmark scores, and more." },
  { icon: CreditCard, title: "Secure Payments", desc: "Escrow-based payment system with buyer protection and verified delivery." },
];

/**
 * Returns a color class for listing tags so they're visually distinct.
 */
const getTagStyle = (tag: string) => {
  switch (tag) {
    case "Best Value":
      return "bg-primary/15 text-primary border-primary/30";
    case "High Performance":
      return "bg-primary/15 text-primary border-primary/30";
    case "Budget":
      return "bg-muted text-muted-foreground border-border";
    case "Creator":
      return "bg-accent/15 text-accent border-accent/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const MarketplacePage = () => {
  useEffect(() => {
    document.title = "Verified Marketplace — nYield";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* =================================================================
       * SECTION 1 — HERO
       * Focus: comparison & verified data value prop
       * ================================================================= */}
      <section className="pt-32 pb-12 bg-background">
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              Verified <span className="text-gradient">Marketplace</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Compare verified PCs with full specs and real performance data.
              Every listing is stress-tested by nYield — no guesswork, no hidden specs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =================================================================
       * SECTION 2 — VERIFICATION EXPLAINED (compact)
       * ================================================================= */}
      <section className="py-10 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mb-6"
          >
            Every listing includes this data — no hidden specs
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
            {verificationSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-lg bg-card border border-border text-center"
              >
                <step.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <h3 className="font-heading text-xs font-bold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-[10px] text-muted-foreground leading-tight">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
       * SECTION 3 — MARKETPLACE CONTROLS (placeholder)
       * Search, filter chips, and sort dropdown — all non-functional
       * ================================================================= */}
      <section className="pt-12 pb-4 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto space-y-4"
          >
            {/* Search + Sort row */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search bar (disabled) */}
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-muted-foreground text-sm cursor-not-allowed opacity-60">
                <Search size={16} />
                <span>Search listings... (Coming Soon)</span>
              </div>

              {/* Sort dropdown (disabled) */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-muted-foreground text-sm cursor-not-allowed opacity-60">
                <SlidersHorizontal size={16} />
                <span>Sort by: Price</span>
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              {filterChips.map((chip) => (
                <button
                  key={chip.label}
                  disabled
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs text-muted-foreground cursor-not-allowed opacity-60 hover:opacity-60"
                >
                  <chip.icon size={12} />
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Listing count */}
            <p className="text-sm text-muted-foreground">
              {marketplaceListings.length} verified listings available
            </p>
          </motion.div>
        </div>
      </section>

      {/* =================================================================
       * SECTION 4 — LISTING CARDS
       * Full specs, benchmark bars, tags, bestFor, dual CTAs
       * ================================================================= */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {marketplaceListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-border bg-card overflow-hidden flex flex-col"
              >
                {/* ---- Card Header: title, price, tags, verified ---- */}
                <div className="p-5 border-b border-border">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                      {listing.title}
                    </h3>
                    {listing.verified && (
                      <div className="flex items-center gap-1 text-primary text-xs font-semibold shrink-0 ml-2">
                        <ShieldCheck size={14} />
                        Verified
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {listing.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getTagStyle(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-3xl font-heading font-bold text-foreground mb-1">
                    £{listing.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Seller: {listing.seller} · {listing.condition}
                  </p>
                </div>

                {/* ---- Specs ---- */}
                <div className="p-5 border-b border-border space-y-1.5 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Cpu size={14} className="text-primary shrink-0" /> {listing.specs.cpu}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Monitor size={14} className="text-primary shrink-0" /> {listing.specs.gpu}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MemoryStick size={14} className="text-primary shrink-0" /> {listing.specs.ram}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <HardDrive size={14} className="text-primary shrink-0" /> {listing.specs.storage}
                  </div>
                </div>

                {/* ---- Benchmark results with score bars ---- */}
                <div className="p-5 border-b border-border">
                  <p className="text-xs font-semibold text-primary mb-3 flex items-center gap-1">
                    <Gauge size={12} /> STRESS TEST RESULTS
                  </p>

                  <div className="space-y-2.5">
                    {/* CPU Score bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">CPU Score</span>
                        <span className="text-foreground font-semibold">{listing.benchmarks.cpuScore}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-secondary">
                        <motion.div
                          className="h-1.5 rounded-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${listing.benchmarks.cpuScore}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </div>

                    {/* GPU Score bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">GPU Score</span>
                        <span className="text-foreground font-semibold">{listing.benchmarks.gpuScore}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-secondary">
                        <motion.div
                          className="h-1.5 rounded-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${listing.benchmarks.gpuScore}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* RAM + Cooling inline */}
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">RAM Stability</span>
                      <span className="text-foreground font-semibold">{listing.benchmarks.ramStability}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Cooling</span>
                      <span className="text-foreground font-semibold">{listing.benchmarks.coolingPerformance}</span>
                    </div>
                  </div>

                  {/* FPS estimates */}
                  <div className="mt-3 pt-3 border-t border-border flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      Fortnite: <span className="text-primary font-semibold">{listing.benchmarks.estimatedFps.fortnite} FPS</span>
                    </span>
                    <span className="text-muted-foreground">
                      Valorant: <span className="text-primary font-semibold">{listing.benchmarks.estimatedFps.valorant} FPS</span>
                    </span>
                  </div>
                </div>

                {/* ---- Best For + Buttons ---- */}
                <div className="p-5 mt-auto">
                  <p className="text-xs text-muted-foreground mb-3">
                    <span className="font-semibold text-foreground">Best For:</span> {listing.bestFor}
                  </p>

                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      View Full Details
                    </Button>
                    <Button variant="outline" className="w-full" size="sm" disabled>
                      Make Offer (Coming Soon)
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
       * SECTION 5 — COMING SOON FEATURES
       * ================================================================= */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
              Marketplace Features <span className="text-gradient">Coming Soon</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              We're building a full marketplace experience. Here's what's next on our roadmap.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {comingSoonFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border text-center"
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading text-sm font-bold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
       * SECTION 6 — SELL YOUR PC CTA
       * ================================================================= */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-3xl font-bold mb-4">
              Want to Sell Your PC?
            </h2>
            <p className="text-muted-foreground mb-6">
              List your gaming PC on nYield's marketplace. We'll run our
              diagnostic software to verify performance, giving your buyers
              confidence and helping you sell faster.
            </p>
            <Button size="lg" disabled className="glow-sm">
              Start Selling (Coming Soon)
            </Button>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default MarketplacePage;
