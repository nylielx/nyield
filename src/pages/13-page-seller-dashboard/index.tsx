/**
 * =============================================================================
 * BUSINESS DASHBOARD LAYOUT — Wraps all /seller/* pages with sidebar
 * =============================================================================
 * Auth-gated: requires login AND role = "business".
 * Standard users are redirected to /account.
 * =============================================================================
 */

import { Outlet, Navigate } from "react-router-dom";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { SellerSidebar } from "./components/seller-sidebar";
import { useAuth } from "@/contexts/AuthContext";

const SellerDashboardLayout = () => {
  const { user, isLoading, isBusiness } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (!isBusiness) {
    return <Navigate to="/account" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <SellerSidebar />
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default SellerDashboardLayout;
