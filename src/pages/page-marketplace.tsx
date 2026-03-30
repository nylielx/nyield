/**
 * =============================================================================
 * MARKETPLACE PAGE — In-depth page for nYield's verified used PC marketplace
 * =============================================================================
 *
 * FILE NAME: MarketplacePage.tsx
 * Named clearly so you know this is the FULL PAGE for the marketplace,
 * distinct from the MarketplaceSection component on the landing page.
 *
 * ROLE:
 * Shows all marketplace listings with full stress test data, filters,
 * and detailed explanations of nYield's verification process.
 * This is where buyers come to browse and purchase verified used PCs.
 *
 * ROUTE: /marketplace (defined in App.tsx)
 *
 * DATA FLOW:
 * Imports listings from src/data/marketplaceExamples.ts.
 * In production, this would fetch from an API with pagination, filters, etc.
 *
 * SCALABILITY NOTES:
 * - Add search/filter functionality (price range, GPU type, location)
 * - Add sorting (price, date listed, benchmark score)
 * - Connect to a real backend with Lovable Cloud
 * - Add user authentication for sellers
 * - Add payment processing with Stripe
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
} from "lucide-react";
import { marketplaceListings } from "@/data/marketplaceExamples";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

/**
 * The verification steps nYield performs on every used PC.
 * This explains the process to build trust with buyers.
 */
const verificationSteps = [
  {
    icon: Cpu,
    title: "CPU Stress Test",
    desc: "30-minute sustained load test measuring stability, temperature, and throttling behaviour.",
  },
  {
    icon: Monitor,
    title: "GPU Stress Test",
    desc: "Runs demanding 3D benchmarks to verify GPU performance, VRAM integrity, and cooling.",
  },
  {
    icon: MemoryStick,
    title: "RAM Stability Test",
    desc: "Multi-pass memory test checking for errors, instability, and correct speed configuration.",
  },
  {
    icon: Thermometer,
    title: "Cooling Performance",
    desc: "Thermal imaging and sensor monitoring under load to ensure fans and heatsinks work correctly.",
  },
  {
    icon: Activity,
    title: "Estimated FPS",
    desc: "Real game benchmarks run at common resolutions to give buyers accurate performance expectations.",
  },
  {
    icon: ShieldCheck,
    title: "Hardware Verification",
    desc: "Component serial numbers and specs are verified against the listing to prevent fraud.",
  },
];

const MarketplacePage = () => {
  useEffect(() => {
    document.title = "Verified Marketplace — nYield";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ----------------------------------------------------------------
       * PAGE HERO
       * ---------------------------------------------------------------- */}
      <section className="pt-32 pb-16 bg-background">
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
              Every PC listed here has been stress-tested and verified by
              nYield's diagnostic software. No guesswork — just real performance
              data you can trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
       * HOW VERIFICATION WORKS
       * Explains each test to build buyer confidence.
       * ---------------------------------------------------------------- */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How We Verify Every PC
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our 6-step verification process ensures every listing is accurate
              and every component is performing as expected.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {verificationSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <step.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
       * MARKETPLACE LISTINGS
       * Shows all available PCs with full benchmark data.
       * In production, this would have search, filters, and pagination.
       * ---------------------------------------------------------------- */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="font-heading text-3xl font-bold mb-2">
                Available PCs
              </h2>
              <p className="text-muted-foreground">
                {marketplaceListings.length} verified listings available
              </p>
            </div>

            {/* Placeholder search — not functional, demonstrates UI intent */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-muted-foreground text-sm">
              <Search size={16} />
              <span>Search listings... (coming soon)</span>
            </div>
          </motion.div>

          {/* Listing cards — expanded from landing page version */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketplaceListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {listing.title}
                    </h3>
                    {listing.verified && (
                      <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                        <ShieldCheck size={14} />
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-3xl font-heading font-bold text-foreground mb-1">
                    £{listing.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Seller: {listing.seller} · {listing.condition} · Listed{" "}
                    {listing.listedDate}
                  </p>
                </div>

                {/* Specs */}
                <div className="p-6 border-b border-border space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Cpu size={14} className="text-primary" /> {listing.specs.cpu}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Monitor size={14} className="text-primary" />{" "}
                    {listing.specs.gpu}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MemoryStick size={14} className="text-primary" />{" "}
                    {listing.specs.ram}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <HardDrive size={14} className="text-primary" />{" "}
                    {listing.specs.storage}
                  </div>
                </div>

                {/* Benchmark results */}
                <div className="p-6 border-b border-border">
                  <p className="text-xs font-semibold text-primary mb-3 flex items-center gap-1">
                    <Gauge size={12} /> STRESS TEST RESULTS
                  </p>

                  {/* Score bars — visual representation of benchmark scores */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">CPU Score</span>
                        <span className="text-foreground font-semibold">
                          {listing.benchmarks.cpuScore}/100
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-primary transition-all"
                          style={{
                            width: `${listing.benchmarks.cpuScore}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">GPU Score</span>
                        <span className="text-foreground font-semibold">
                          {listing.benchmarks.gpuScore}/100
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-primary transition-all"
                          style={{
                            width: `${listing.benchmarks.gpuScore}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        RAM Stability
                      </span>
                      <span className="text-foreground font-semibold">
                        {listing.benchmarks.ramStability}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Cooling</span>
                      <span className="text-foreground font-semibold">
                        {listing.benchmarks.coolingPerformance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* FPS + Buy button */}
                <div className="p-6">
                  <div className="flex justify-between text-xs mb-4">
                    <span className="text-muted-foreground">
                      Fortnite:{" "}
                      <span className="text-primary font-semibold">
                        {listing.benchmarks.estimatedFps.fortnite} FPS
                      </span>
                    </span>
                    <span className="text-muted-foreground">
                      Valorant:{" "}
                      <span className="text-primary font-semibold">
                        {listing.benchmarks.estimatedFps.valorant} FPS
                      </span>
                    </span>
                  </div>
                  <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                    View Full Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
       * SELL YOUR PC CTA
       * Encourages sellers to list their PCs on the marketplace.
       * ---------------------------------------------------------------- */}
      <section className="py-16 bg-secondary/30">
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
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-sm"
            >
              Start Selling (Coming Soon)
            </a>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default MarketplacePage;
