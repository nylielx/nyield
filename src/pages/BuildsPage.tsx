/**
 * =============================================================================
 * BUILDS PAGE — In-depth page for nYield's Pre-built Gaming PCs
 * =============================================================================
 *
 * FILE NAME: BuildsPage.tsx
 * Named "BuildsPage" to clearly indicate this is the FULL PAGE for PC builds,
 * separate from the PCBuildSection component used on the landing page.
 *
 * ROLE:
 * Displays all gaming PC tiers with full specs, comparisons, edition details,
 * and FAQ. This is the page users visit when they're seriously considering
 * buying a pre-built gaming PC from nYield.
 *
 * ROUTE: /builds (defined in App.tsx)
 *
 * DATA FLOW:
 * Imports build data from src/data/pcBuilds.ts — same single source of truth
 * used by the landing page section.
 * =============================================================================
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Cpu,
  Monitor,
  MemoryStick,
  HardDrive,
  Check,
  ArrowRight,
} from "lucide-react";
import { pcBuilds, editions, type PCBuild } from "@/data/pcBuilds";
import pcBlackout from "@/assets/pc-blackout.jpg";
import pcWhiteout from "@/assets/pc-whiteout.jpg";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

/**
 * What's included with every build — shared across all tiers.
 * Extracted as a constant so it's easy to update in one place.
 */
const includedWithEveryBuild = [
  "nYield Competitive OS pre-installed",
  "Full cable management",
  "1-year hardware warranty",
  "Free shipping (UK mainland)",
  "Stress tested before dispatch",
  "Lifetime nYield software updates",
];

const BuildsPage = () => {
  /**
   * State to track which edition the user is viewing.
   * "blackout" or "whiteout" — affects the displayed images.
   */
  const [selectedEdition, setSelectedEdition] = useState<string>("blackout");

  useEffect(() => {
    document.title = "Gaming PC Builds — nYield";
  }, []);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ----------------------------------------------------------------
       * PAGE HERO — Introduces the builds section
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
              Pre-Built <span className="text-gradient">Gaming PCs</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Compact, powerful, and pre-optimized with nYield OS. Designed for
              students and gamers who want maximum performance without the
              hassle of building their own.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
       * EDITION SELECTOR — Blackout vs Whiteout
       * Users can toggle between the two color editions.
       * This demonstrates a simple state-driven UI pattern.
       * ---------------------------------------------------------------- */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-3xl font-bold mb-4">
              Choose Your Edition
            </h2>
            <p className="text-muted-foreground">
              Every tier is available in two stunning finishes.
            </p>
          </motion.div>

          {/* Edition toggle buttons */}
          <div className="flex justify-center gap-4 mb-10">
            {editions.map((edition) => (
              <button
                key={edition.id}
                onClick={() => setSelectedEdition(edition.id)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  selectedEdition === edition.id
                    ? "bg-primary text-primary-foreground glow-sm"
                    : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {edition.name}
              </button>
            ))}
          </div>

          {/* Selected edition image + description */}
          <motion.div
            key={selectedEdition}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="rounded-xl overflow-hidden border border-border">
              <img
                src={selectedEdition === "blackout" ? pcBlackout : pcWhiteout}
                alt={`nYield ${selectedEdition} Edition`}
                className="w-full h-72 object-cover"
                width={800}
                height={600}
              />
              <div className="p-6 bg-card">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {selectedEdition === "blackout" ? "Blackout" : "Whiteout"}{" "}
                  Edition
                </h3>
                <p className="text-muted-foreground">
                  {selectedEdition === "blackout"
                    ? "Stealth matte black finish. Zero distractions. Built for those who let their performance speak."
                    : "Clean arctic white finish. Stand out from the crowd. A statement piece for your setup."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
       * BUILD TIER COMPARISON — Full specs for all 5 tiers
       * Uses a card grid with detailed specs and FPS estimates.
       * ---------------------------------------------------------------- */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Choose Your Tier
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From entry-level to ultimate — every build includes nYield OS,
              stress testing, and free UK shipping.
            </p>
          </motion.div>

          {/* Build cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
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
                  <p className="text-sm text-muted-foreground font-medium">
                    {build.tier}
                  </p>
                  <p className="font-heading text-3xl font-bold text-foreground">
                    £{build.price.toLocaleString()}
                  </p>
                </div>

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

                <div className="space-y-1 text-xs mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Fortnite</span>
                    <span className="text-primary font-semibold">
                      {build.estimatedFps.fortnite} FPS
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Valorant</span>
                    <span className="text-primary font-semibold">
                      {build.estimatedFps.valorant} FPS
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Warzone</span>
                    <span className="text-primary font-semibold">
                      {build.estimatedFps.warzone} FPS
                    </span>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                  Configure
                </button>
              </motion.div>
            ))}
          </div>

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto rounded-xl border border-border bg-card p-8"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">
              Included With Every Build
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {includedWithEveryBuild.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check size={16} className="text-primary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default BuildsPage;
