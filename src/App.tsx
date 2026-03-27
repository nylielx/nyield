/**
 * =============================================================================
 * APP.TSX — Root component & Router configuration
 * =============================================================================
 *
 * ROUTES:
 * /            → Index (landing page)
 * /services    → ServicesPage (in-depth OS editions)
 * /builds      → BuildsPage (in-depth gaming PC tiers)
 * /marketplace → MarketplacePage (in-depth verified marketplace)
 * *            → NotFound (404 catch-all)
 * =============================================================================
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import BuildsPage from "./pages/BuildsPage.tsx";
import MarketplacePage from "./pages/MarketplacePage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/builds" element={<BuildsPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

