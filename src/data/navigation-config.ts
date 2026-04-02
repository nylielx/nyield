/**
 * =============================================================================
 * NAVIGATION CONFIG — Single source of truth for sidebar + dropdown menus
 * =============================================================================
 * Powers BOTH standard (buyer) and business (seller) navigation.
 * Each section has a group label, items, and an optional role restriction.
 *
 * DATA FLOW:
 *   This config → UserSidebar / SellerSidebar → ProfileDropdown / BusinessPanel
 *   AuthContext (role) → filters which sections render
 * =============================================================================
 */

import {
  LayoutDashboard,
  CalendarDays,
  ShoppingCart,
  Cpu,
  Heart,
  List,
  UserCog,
  Shield,
  HelpCircle,
  LogOut,
  Package,
  BarChart3,
  Users,
  Megaphone,
  DollarSign,
  Settings,
  Store,
  type LucideIcon,
} from "lucide-react";

/* --------------------------------------------------------------------------
 * TYPES
 * -------------------------------------------------------------------------- */
export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  /** If true, item is highlighted in dropdown Quick Actions */
  quickAction?: boolean;
}

export interface NavSection {
  group: string;
  items: NavItem[];
}

/* --------------------------------------------------------------------------
 * STANDARD USER (BUYER) NAVIGATION
 * -------------------------------------------------------------------------- */
export const standardSidebarSections: NavSection[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", to: "/account", icon: LayoutDashboard, quickAction: true },
    ],
  },
  {
    group: "Activity",
    items: [
      { label: "My Bookings", to: "/account/bookings", icon: CalendarDays, quickAction: true },
      { label: "My Orders", to: "/account/orders", icon: ShoppingCart, quickAction: true },
    ],
  },
  {
    group: "Saved & Planning",
    items: [
      { label: "Saved Builds", to: "/account/builds", icon: Cpu },
      { label: "Saved Items", to: "/account/saved", icon: Heart },
      { label: "Saved Lists", to: "/account/lists", icon: List },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Profile Settings", to: "/account/profile", icon: UserCog },
      { label: "Security", to: "/account/security", icon: Shield },
    ],
  },
  {
    group: "Support",
    items: [
      { label: "Help & Support", to: "/account/help", icon: HelpCircle },
    ],
  },
];

/** Dropdown-only items for standard users (quick subset) */
export const standardDropdownItems: NavItem[] =
  standardSidebarSections.flatMap((s) => s.items).filter((i) => i.quickAction);

/* --------------------------------------------------------------------------
 * BUSINESS USER (SELLER) NAVIGATION
 * -------------------------------------------------------------------------- */
export const businessSidebarSections: NavSection[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", to: "/seller", icon: LayoutDashboard, quickAction: true },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Listings", to: "/seller/listings", icon: Package, quickAction: true },
      { label: "Orders", to: "/seller/orders", icon: ShoppingCart, quickAction: true },
      { label: "Customers", to: "/seller/customers", icon: Users },
      { label: "Analytics", to: "/seller/analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Growth",
    items: [
      { label: "Marketing", to: "/seller/marketing", icon: Megaphone, quickAction: true },
      { label: "Finance", to: "/seller/analytics", icon: DollarSign, quickAction: true },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Settings", to: "/seller/settings", icon: Settings },
    ],
  },
  {
    group: "Support",
    items: [
      { label: "Help & Support", to: "/account/help", icon: HelpCircle },
    ],
  },
];

export const businessDropdownQuickActions: NavItem[] = [
  { label: "Go to Dashboard", to: "/seller", icon: LayoutDashboard, quickAction: true },
  { label: "Manage Listings", to: "/seller/listings", icon: Package, quickAction: true },
  { label: "View Orders", to: "/seller/orders", icon: ShoppingCart, quickAction: true },
  { label: "Open Marketing", to: "/seller/marketing", icon: Megaphone, quickAction: true },
  { label: "Finance Overview", to: "/seller/analytics", icon: DollarSign, quickAction: true },
];
