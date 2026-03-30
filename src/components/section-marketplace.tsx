/**
 * =============================================================================
 * MARKETPLACE SECTION — Verified used PC marketplace preview
 * =============================================================================
 *
 * ROLE:
 * Shows sample marketplace listings with stress test results.
 * This is nYield's unique value prop: every used PC is verified with
 * real benchmark data, giving buyers confidence.
 *
 * DATA FLOW:
 * Imports mock listings from src/data/marketplaceExamples.ts.
 * In production, these would come from an API endpoint.
 *
 * SCALABILITY:
 * - Add filters (price range, GPU type, etc.)
 * - Add search functionality
 * - Connect to a real backend with Lovable Cloud
 * - Add payment integration with Stripe
 * - Add seller verification and rating system
 * =============================================================================
 */

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Monitor, MemoryStick, HardDrive, Gauge } from "lucide-react";
import { marketplaceListings } from "@/data/marketplaceExamples";

const MarketplaceSection = () => {
  return (
    <section id="marketplace" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Verified <span className="text-gradient">Marketplace</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every PC is stress-tested and verified by nYield's diagnostic software.
            Buy with confidence — no surprises.
          </p>
        </motion.div>

        {/* Listing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {marketplaceListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              {/* Header with verified badge */}
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
                <p className="text-2xl font-heading font-bold text-foreground">
                  £{listing.price.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Seller: {listing.seller} · {listing.condition}
                </p>
              </div>

              {/* Specs */}
              <div className="p-6 border-b border-border space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Cpu size={14} className="text-primary" /> {listing.specs.cpu}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Monitor size={14} className="text-primary" /> {listing.specs.gpu}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MemoryStick size={14} className="text-primary" /> {listing.specs.ram}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <HardDrive size={14} className="text-primary" /> {listing.specs.storage}
                </div>
              </div>

              {/* Benchmark results — the unique nYield feature */}
              <div className="p-6">
                <p className="text-xs font-semibold text-primary mb-3 flex items-center gap-1">
                  <Gauge size={12} /> STRESS TEST RESULTS
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">CPU Score</p>
                    <p className="font-semibold text-foreground">{listing.benchmarks.cpuScore}/100</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">GPU Score</p>
                    <p className="font-semibold text-foreground">{listing.benchmarks.gpuScore}/100</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">RAM Stability</p>
                    <p className="font-semibold text-foreground">{listing.benchmarks.ramStability}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cooling</p>
                    <p className="font-semibold text-foreground">{listing.benchmarks.coolingPerformance}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    Fortnite: <span className="text-primary font-semibold">{listing.benchmarks.estimatedFps.fortnite} FPS</span>
                  </span>
                  <span className="text-muted-foreground">
                    Valorant: <span className="text-primary font-semibold">{listing.benchmarks.estimatedFps.valorant} FPS</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
