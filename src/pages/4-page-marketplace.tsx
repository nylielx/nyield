/**
 * =============================================================================
 * MARKETPLACE PAGE — Beta marketplace with verified PC listings
 * =============================================================================
 *
 * SECTIONS:
 * 1. Hero — value prop focused on verified data
 * 2. Verification cards — 5 cards (no FPS)
 * 3. Beta banner — limited listings notice
 * 4. Filter bar — placeholder controls
 * 5. Listing grid — 1 active, rest disabled
 * 6. Coming Soon features
 *
 * ROUTE: /marketplace
 * =============================================================================
 */

import { useEffect, useState, useCallback } from "react";
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
  MessageSquare,
  LayoutDashboard,
  Filter,
  CreditCard,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { marketplaceListings, type MarketplaceListing } from "@/data/marketplaceExamples";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import MarketplaceFilters from "@/components/component-marketplace-filters";
import { Button } from "@/components/ui/button";

/** 5 verification steps — no FPS card */
const verificationSteps = [
  { icon: Cpu, title: "CPU Stress Test", desc: "30-min sustained load — stability, temp & throttling." },
  { icon: Monitor, title: "GPU Benchmark", desc: "3D benchmarks verifying VRAM integrity & cooling." },
  { icon: MemoryStick, title: "RAM Stability", desc: "Multi-pass memory test for errors & correct speed." },
  { icon: Thermometer, title: "Cooling Check", desc: "Thermal monitoring under load — fans & heatsinks." },
  { icon: ShieldCheck, title: "Hardware Verified", desc: "Serial numbers & specs checked against listing." },
];


/** Coming soon features */
const comingSoonFeatures = [
  { icon: MessageSquare, title: "Negotiation System", desc: "Make offers and negotiate directly with sellers through our secure messaging platform." },
  { icon: LayoutDashboard, title: "Seller Dashboard", desc: "Full dashboard for sellers to manage listings, view analytics, and track enquiries." },
  { icon: Filter, title: "Advanced Filters", desc: "Filter by GPU generation, CPU brand, price range, benchmark scores, and more." },
  { icon: CreditCard, title: "Secure Payments", desc: "Escrow-based payment system with buyer protection and verified delivery." },
];

/** Tag color styles */
const getTagStyle = (tag: string) => {
  switch (tag) {
    case "Best Value":
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
  const [filteredListings, setFilteredListings] = useState<MarketplaceListing[]>(marketplaceListings);

  const handleFilteredChange = useCallback((filtered: MarketplaceListing[]) => {
    setFilteredListings(filtered);
  }, []);

  useEffect(() => {
    document.title = "Verified Marketplace — nYield";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ================================================================
       * HERO
       * ================================================================ */}
      <section className="pt-32 pb-12 bg-background">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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

      {/* ================================================================
       * VERIFICATION CARDS (5 cards, no FPS)
       * ================================================================ */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm text-muted-foreground mb-5">
            Every listing includes this data — no hidden specs
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {verificationSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-lg bg-card border border-border text-center"
              >
                <step.icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <h3 className="font-heading text-xs font-bold text-foreground mb-0.5">{step.title}</h3>
                <p className="text-[10px] text-muted-foreground leading-tight">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
       * BETA BANNER
       * ================================================================ */}
      <section className="py-4 bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-heading font-bold text-foreground">Marketplace Beta — Limited Listings Available</p>
              <p className="text-xs text-muted-foreground">Only selected verified PCs are currently available. Full marketplace access coming soon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       * FILTER BAR — Functional inline filters
       * ================================================================ */}
      <section className="pt-10 pb-4 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-4">
            <MarketplaceFilters listings={marketplaceListings} onFilteredChange={handleFilteredChange} />
            <p className="text-sm text-muted-foreground">
              {filteredListings.length} of {marketplaceListings.length} verified listings
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
       * LISTING GRID — 1 active, others disabled
       * ================================================================ */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filteredListings.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-lg font-heading font-bold text-foreground mb-2">No listings match your filters</p>
                <p className="text-sm text-muted-foreground">Try adjusting or clearing your filters to see more results.</p>
              </div>
            ) : (
            filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={listing.isActive ? { y: -4 } : undefined}
                className={`rounded-xl border overflow-hidden flex flex-col relative ${
                  listing.isActive
                    ? "border-border bg-card"
                    : "border-border/50 bg-card/50 opacity-50 pointer-events-none select-none"
                }`}
              >
                {/* Disabled overlay */}
                {!listing.isActive && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm rounded-xl">
                    <Lock className="w-8 h-8 text-muted-foreground mb-3" />
                    <p className="font-heading text-sm font-bold text-foreground">Coming Soon</p>
                    <p className="text-xs text-muted-foreground text-center max-w-[200px] mt-1">
                      This listing will be available in the full marketplace launch.
                    </p>
                  </div>
                )}

                {/* Card Header */}
                <div className="p-5 border-b border-border">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-lg font-bold text-foreground leading-tight">{listing.title}</h3>
                    {listing.verified && (
                      <div className="flex items-center gap-1 text-primary text-xs font-semibold shrink-0 ml-2">
                        <ShieldCheck size={14} /> Verified
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {listing.tags.map((tag) => (
                      <span key={tag} className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getTagStyle(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-3xl font-heading font-bold text-foreground mb-1">£{listing.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Seller: {listing.seller} · {listing.condition}</p>
                </div>

                {/* Specs */}
                <div className="p-5 border-b border-border space-y-1.5 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground"><Cpu size={14} className="text-primary shrink-0" /> {listing.specs.cpu}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Monitor size={14} className="text-primary shrink-0" /> {listing.specs.gpu}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><MemoryStick size={14} className="text-primary shrink-0" /> {listing.specs.ram}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><HardDrive size={14} className="text-primary shrink-0" /> {listing.specs.storage}</div>
                </div>

                {/* Stress Test Summary */}
                <div className="p-5 border-b border-border">
                  <p className="text-xs font-semibold text-primary mb-3 flex items-center gap-1"><Gauge size={12} /> STRESS TEST RESULTS</p>

                  <div className="space-y-2.5">
                    {/* CPU Score bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">CPU Score</span>
                        <span className="text-foreground font-semibold">{listing.benchmarks.cpuScore}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-secondary">
                        <motion.div className="h-1.5 rounded-full bg-primary" initial={{ width: 0 }} whileInView={{ width: `${listing.benchmarks.cpuScore}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
                      </div>
                    </div>

                    {/* GPU Score bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">GPU Score</span>
                        <span className="text-foreground font-semibold">{listing.benchmarks.gpuScore}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-secondary">
                        <motion.div className="h-1.5 rounded-full bg-primary" initial={{ width: 0 }} whileInView={{ width: `${listing.benchmarks.gpuScore}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} />
                      </div>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">RAM Stability</span>
                      <span className="text-foreground font-semibold">{listing.benchmarks.ramStability}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Cooling</span>
                      <span className="text-foreground font-semibold">{listing.benchmarks.coolingRating}</span>
                    </div>
                  </div>
                </div>

                {/* Best For + Buttons */}
                <div className="p-5 mt-auto">
                  <p className="text-xs text-muted-foreground mb-3">
                    <span className="font-semibold text-foreground">Best For:</span> {listing.bestFor}
                  </p>

                  <div className="space-y-2">
                    {listing.isActive ? (
                      <Link to={`/marketplace/${listing.id}`}>
                        <Button className="w-full" size="sm">View Full Details</Button>
                      </Link>
                    ) : (
                      <Button className="w-full" size="sm" disabled>View Full Details</Button>
                    )}
                    <Button variant="outline" className="w-full" size="sm" disabled>Make Offer (Coming Soon)</Button>
                  </div>
                </div>
              </motion.div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* ================================================================
       * COMING SOON FEATURES
       * ================================================================ */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
              Marketplace Features <span className="text-gradient">Coming Soon</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">We're building a full marketplace experience. Here's what's next on our roadmap.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {comingSoonFeatures.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-5 rounded-xl bg-card border border-border text-center">
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading text-sm font-bold text-foreground mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
       * SELL CTA
       * ================================================================ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Want to <span className="text-gradient">Sell?</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6">
              List your verified PC on nYield's marketplace. Get more trust, better buyers, and transparent pricing.
            </p>
            <Button size="lg" disabled className="opacity-60">Seller Registration Coming Soon</Button>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default MarketplacePage;
