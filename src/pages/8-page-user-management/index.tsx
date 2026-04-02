/**
 * =============================================================================
 * USER MANAGEMENT LAYOUT — Wraps all /account/* pages with sidebar
 * =============================================================================
 * Auth-gated: requires login. Business users can access /account pages
 * (shared pages like help, profile) but are shown the standard sidebar.
 * =============================================================================
 */

import { Outlet, Navigate } from "react-router-dom";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { UserSidebar } from "./components/user-sidebar";
import { useAuth } from "@/contexts/AuthContext";

const UserManagementLayout = () => {
  const { user, isLoading } = useAuth();

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <UserSidebar />
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default UserManagementLayout;
