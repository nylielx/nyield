/**
 * =============================================================================
 * APP.TSX — Root component & Router configuration
 * =============================================================================
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/1-page-index";
import ServicesPage from "./pages/2-page-services";
import BuildsPage from "./pages/3-page-builds";
import TierOnePage from "./pages/3-page-builds/1-tier-one";
import TierTwoPage from "./pages/3-page-builds/2-tier-two";
import TierThreePage from "./pages/3-page-builds/3-tier-three";
import TierFourPage from "./pages/3-page-builds/4-tier-four";
import TierFivePage from "./pages/3-page-builds/5-tier-five";
import MarketplacePage from "./pages/4-page-marketplace";
import ListingDetailPage from "./pages/5-page-listing-detail";
import SignInPage from "./pages/7-page-sign-in";
import SignUpPage from "./pages/8-page-sign-up";
import ForgotPasswordPage from "./pages/9-page-forgot-password";
import UserManagementLayout from "./pages/8-page-user-management";
import DashboardPage from "./pages/8-page-user-management/1-dashboard";
import MyOrdersPage from "./pages/8-page-user-management/2-my-orders";
import SavedBuildsPage from "./pages/8-page-user-management/3-saved-builds";
import SavedItemsPage from "./pages/8-page-user-management/4-saved-items";
import ListsPage from "./pages/8-page-user-management/5-lists";
import ProfileSettingsPage from "./pages/8-page-user-management/6-profile-settings";
import SecurityPage from "./pages/8-page-user-management/7-security";
import HelpSupportPage from "./pages/8-page-user-management/8-help-support";
import NotFound from "./pages/10-page-not-found";

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
            <Route path="/builds/tier-1" element={<TierOnePage />} />
            <Route path="/builds/tier-2" element={<TierTwoPage />} />
            <Route path="/builds/tier-3" element={<TierThreePage />} />
            <Route path="/builds/tier-4" element={<TierFourPage />} />
            <Route path="/builds/tier-5" element={<TierFivePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/:id" element={<ListingDetailPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* User Management — nested routes with sidebar layout */}
            <Route path="/account" element={<UserManagementLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="orders" element={<MyOrdersPage />} />
              <Route path="builds" element={<SavedBuildsPage />} />
              <Route path="saved" element={<SavedItemsPage />} />
              <Route path="lists" element={<ListsPage />} />
              <Route path="profile" element={<ProfileSettingsPage />} />
              <Route path="security" element={<SecurityPage />} />
              <Route path="help" element={<HelpSupportPage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
