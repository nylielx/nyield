/**
 * =============================================================================
 * INDEX PAGE — Landing page for nYield
 * =============================================================================
 * 
 * Storytelling-focused landing page that guides users toward choosing
 * a software edition. Does NOT repeat full Services/Builds/Marketplace pages.
 * 
 * SECTIONS:
 * 1. Hero — Full screen with animated background
 * 2. Editions — Core conversion: 3 edition cards
 * 3. Hardware Ecosystem — Lightweight links to Builds & Marketplace
 * 4. Performance Proof — Interactive game-by-game comparison
 * 5. Software Features — 4 reinforcement cards
 * 6. Stats — Social proof with count-up animation
 * 7. Final CTA — Closing conversion block
 * =============================================================================
 */

import { useEffect } from "react";
import Navbar from "@/components/component-navbar";
import HeroSection from "@/components/section-hero";
import EditionsSection from "./components/section-editions";
import HardwareSection from "./components/section-hardware";
import PerformanceProofSection from "./components/section-performance-proof";
import FeaturesSection from "./components/section-features";
import StatsLandingSection from "./components/section-stats-landing";
import FinalCtaSection from "./components/section-final-cta";
import SiteFooter from "@/components/component-site-footer";

const Index = () => {
  useEffect(() => {
    document.title = "nYield — Unlock Your PC's True Power";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <EditionsSection />
        <HardwareSection />
        <PerformanceProofSection />
        <FeaturesSection />
        <StatsLandingSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
