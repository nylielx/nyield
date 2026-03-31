/**
 * =============================================================================
 * MARKETPLACE PAGE — Beta marketplace with verified PC listings
 * =============================================================================
 *
 * ARCHITECTURE:
 * This page uses clean composition — all heavy logic and UI pieces
 * are extracted into the components/, hooks/, and services/ sub-folders.
 *
 * SECTIONS:
 * 1. Hero — value prop focused on verified data
 * 2. Verification cards — 5 cards (no FPS)
 * 3. Beta banner — limited listings notice
 * 4. Filter bar — functional inline filters
 * 5. Listing grid — 1 active, rest disabled
 * 6. Coming Soon features
 *
 * ROUTE: /marketplace
 * =============================================================================
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Monitor,
  MemoryStick,
  Thermometer,
  MessageSquare,
  LayoutDashboard,
  Filter,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import MarketplaceFilters from "@/components/component-marketplace-filters";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "./hooks/use-marketplace";
import ListingHeader from "./components/listing-header";
import ListingGrid from "./components/listing-grid";

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

const MarketplacePage = () => {
  const { listings, filteredListings, loading, handleFilteredChange } = useMarketplace();

  useEffect(() => {
    document.title = "Verified Marketplace — nYield";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <ListingHeader />

      {/* ── VERIFICATION CARDS ── */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-6xl">
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

      {/* ── BETA BANNER ── */}
      <section className="py-4 bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-heading font-bold text-foreground">Marketplace Beta — Limited Listings Available</p>
              <p className="text-xs text-muted-foreground">Only selected verified PCs are currently available. Full marketplace access coming soon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="pt-12 pb-4 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-5xl mx-auto space-y-4">
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading listings...</div>
            ) : (
              <>
                <MarketplaceFilters listings={listings} onFilteredChange={handleFilteredChange} />
                <p className="text-sm text-muted-foreground">
                  {filteredListings.length} of {listings.length} verified listings
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── LISTING GRID ── */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {loading ? (
              <div className="col-span-full text-center py-16">
                <p className="text-sm text-muted-foreground">Loading verified listings...</p>
              </div>
            ) : (
              <ListingGrid listings={filteredListings} />
            )}
          </div>
        </div>
      </section>

      {/* ── COMING SOON FEATURES ── */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-6xl">
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

      {/* ── SELL CTA ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl text-center">
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
