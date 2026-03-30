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
import ProcessSection from "@/components/section-process";
import AboutSection from "@/components/section-about";
import SiteFooter from "@/components/component-site-footer";

const Index = () => {
  /**
   * Set the page title for SEO and browser tab.
   * useEffect with [] runs once on mount.
   */
  useEffect(() => {
    document.title = "nYield — Unlock Your PC's True Power";
  }, []);

  return (
    /**
     * The "dark" class on the wrapper enables dark mode for all children.
     * This uses Tailwind's class-based dark mode strategy.
     * All components use semantic tokens (bg-background, text-foreground)
     * which automatically switch colors when dark mode is active.
     */
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed navbar at the top of the viewport */}
      <Navbar />

      {/* Main content — each section is a self-contained component */}
      <main>
        {/* 1. Hero: Big headline + CTA — grabs attention */}
        <HeroSection />

        {/* 2. Stats: Social proof with numbers — builds credibility */}
        <StatsSection />

        {/* 3. Performance: Stock vs optimized comparison — shows value */}
        <PerformanceComparison />

        {/* 4. Services: OS editions — explains the core product */}
        <ServicesSection />

        {/* 5. PC Builds: Gaming PC tiers — shows product range */}
        <PCBuildSection />

        {/* 6. Marketplace: Verified used PCs — unique differentiator */}
        <MarketplaceSection />

        {/* 7. Process: How it works — reduces friction */}
        <ProcessSection />

        {/* 8. About: Mission & values — builds brand connection */}
        <AboutSection />
      </main>

      {/* Footer: Navigation + legal */}
      <SiteFooter />
    </div>
  );
};

export default Index;
