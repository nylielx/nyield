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
import Index from "./pages/1-page-index.tsx";
import ServicesPage from "./pages/2-page-services.tsx";
import BuildsPage from "./pages/3-page-builds.tsx";
import MarketplacePage from "./pages/4-page-marketplace.tsx";
import SignInPage from "./pages/7-page-sign-in.tsx";
import SignUpPage from "./pages/8-page-sign-up.tsx";
import ForgotPasswordPage from "./pages/9-page-forgot-password.tsx";
import NotFound from "./pages/10-page-not-found.tsx";

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

