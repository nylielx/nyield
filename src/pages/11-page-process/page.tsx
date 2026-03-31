/**
 * =============================================================================
 * PROCESS PAGE — Dedicated page for the process/journey section
 * =============================================================================
 */

import { useEffect } from "react";
import Navbar from "@/components/component-navbar";
import ProcessSection from "@/components/section-process";
import SiteFooter from "@/components/component-site-footer";

const ProcessPage = () => {
  useEffect(() => {
    document.title = "How It Works — nYield";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <ProcessSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default ProcessPage;
