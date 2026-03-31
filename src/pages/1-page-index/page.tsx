/**
 * =============================================================================
 * INDEX PAGE — The main landing page for nYield
 * =============================================================================
 *
 * ROLE:
 * This is the "entry point" page — the first thing users see when they visit
 * the site. It composes all the section components into a single scrollable page.
 *
 * ARCHITECTURE PATTERN: "Page Composition"
 * -----------------------------------------
 * Instead of writing all the HTML in one massive file, we break the UI into
 * small, focused components (Navbar, HeroSection, etc.) and COMPOSE them here.
 *
 * Benefits:
 * 1. Each section can be developed and tested independently
 * 2. The page file stays clean and shows the overall structure at a glance
 * 3. Components can be reused on other pages if needed
 *
 * ORDER MATTERS:
 * The order of components here determines the visual order on the page.
 * Rearranging is as simple as swapping lines.
 *
 * SEO:
 * We set the document title and meta description for search engines.
 * In a production app, you'd use react-helmet or a meta tag manager.
 * =============================================================================
 */

import { useEffect } from "react";
import Navbar from "@/components/component-navbar";
import HeroSection from "@/components/section-hero";
import StatsSection from "@/components/section-stats";
import PerformanceComparison from "@/components/component-performance-comparison";
import ServicesSection from "@/components/section-services";
import PCBuildSection from "@/components/section-pc-build";
import MarketplaceSection from "@/components/section-marketplace";
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
        <StatsSection />
        <PerformanceComparison />
        <ServicesSection />
        <PCBuildSection />
        <MarketplaceSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
