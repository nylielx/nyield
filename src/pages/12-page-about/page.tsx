/**
 * =============================================================================
 * ABOUT PAGE — Dedicated page for about, team, and testimonials
 * =============================================================================
 */

import { useEffect } from "react";
import Navbar from "@/components/component-navbar";
import AboutSection from "@/components/section-about";
import SiteFooter from "@/components/component-site-footer";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us — nYield";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <AboutSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default AboutPage;
