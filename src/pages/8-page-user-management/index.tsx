/**
 * =============================================================================
 * USER MANAGEMENT LAYOUT — Wraps all /account/* pages with sidebar
 * =============================================================================
 */

import { Outlet } from "react-router-dom";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { UserSidebar } from "./components/user-sidebar";

const UserManagementLayout = () => (
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

export default UserManagementLayout;
