/**
 * =============================================================================
 * PC BUILD SECTION — Gaming PC tier cards with Blackout/Whiteout editions
 * =============================================================================
 *
 * ROLE:
 * Displays nYield's pre-built gaming PCs across five price tiers.
 * Each card shows specs, estimated FPS, and pricing.
 *
 * DATA FLOW:
 * Imports from src/data/pcBuilds.ts → maps over array → renders cards.
 *
 * DESIGN PATTERN:
 * This uses the "Card Grid" pattern — one of the most common e-commerce layouts.
 * Cards are great for comparing similar items side-by-side.
 *
 * SCALABILITY NOTE:
 * In a real store, clicking "Configure" would navigate to a product page
 * with full specs, images, and an "Add to Cart" button connected to
 * a payment system like Stripe.
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Monitor, Cpu, HardDrive, MemoryStick } from "lucide-react";
import { pcBuilds, editions } from "@/data/pcBuilds";
import pcBlackout from "@/assets/pc-blackout.jpg";
import pcWhiteout from "@/assets/pc-whiteout.jpg";

const PCBuildSection = () => {
  return (
    <section id="builds" className="py-24 glass-base">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Pre-Built <span className="text-gradient-glow-wrapper"><span className="text-gradient-glow">Gaming PCs</span></span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compact, powerful, pre-optimized. Designed for students who need
            portability without sacrificing performance.
          </p>
        </motion.div>

        {/* Edition showcase — Blackout & Whiteout images */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {[
            { edition: editions[0], img: pcBlackout },
            { edition: editions[1], img: pcWhiteout },
          ].map(({ edition, img }, i) => (
            <motion.div
              key={edition.id}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-xl overflow-hidden group"
            >
              <img
                src={img}
                alt={`nYield ${edition.name} Edition PC`}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    {edition.name} Edition
                  </h3>
                  <p className="text-sm text-muted-foreground">{edition.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PC tier cards — scrollable on mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {pcBuilds.map((build, index) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`rounded-xl p-6 border ${
                build.popular
                  ? "border-primary/50 bg-primary/5 glow-sm relative"
                  : "border-border bg-card"
              }`}
            >
              {build.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Best Value
                </div>
              )}

              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground font-medium">{build.tier}</p>
                <p className="font-heading text-3xl font-bold text-foreground">
                  £{build.price.toLocaleString()}
                </p>
              </div>

              {/* Specs list */}
              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Cpu size={14} className="text-primary" />
                  {build.specs.cpu}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Monitor size={14} className="text-primary" />
                  {build.specs.gpu}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MemoryStick size={14} className="text-primary" />
                  {build.specs.ram}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <HardDrive size={14} className="text-primary" />
                  {build.specs.storage}
                </div>
              </div>

              {/* Estimated FPS badges */}
              <div className="space-y-1 text-xs mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Fortnite</span>
                  <span className="text-primary font-semibold">{build.estimatedFps.fortnite} FPS</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Valorant</span>
                  <span className="text-primary font-semibold">{build.estimatedFps.valorant} FPS</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Warzone</span>
                  <span className="text-primary font-semibold">{build.estimatedFps.warzone} FPS</span>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-lg border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                Configure
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PCBuildSection;
