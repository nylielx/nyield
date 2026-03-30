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
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/page-index.tsx";
import NotFound from "./pages/page-not-found.tsx";
import ServicesPage from "./pages/page-services.tsx";
import BuildsPage from "./pages/page-builds.tsx";
import MarketplacePage from "./pages/page-marketplace.tsx";
import SignUpPage from "./pages/page-sign-up.tsx";
import SignInPage from "./pages/page-sign-in.tsx";
import ForgotPasswordPage from "./pages/page-forgot-password.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

