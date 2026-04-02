/**
 * =============================================================================
 * SELLER DASHBOARD MOCK DATA
 * =============================================================================
 * Comprehensive mock data for the seller dashboard system.
 * Structured for easy replacement with real API calls.
 * =============================================================================
 */

/* --------------------------------------------------------------------------
 * TYPES
 * -------------------------------------------------------------------------- */

export interface SellerMetrics {
  revenue: { daily: number; weekly: number; monthly: number; yearly: number };
  grossProfit: number;
  netProfit: number;
  conversionRate: number;
  averageOrderValue: number;
  customerAcquisitionCost: number;
  lifetimeValue: number;
  totalOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  cancelledOrders: number;
  deliveredOrders: number;
  totalListings: number;
  activeListings: number;
  totalCustomers: number;
  returningCustomers: number;
}

export interface SellerOrder {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerAvatar: string;
  product: string;
  productImage?: string;
  quantity: number;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  trackingNumber?: string;
}

export interface SellerListing {
  id: string;
  title: string;
  price: number;
  stock: number;
  sold: number;
  views: number;
  conversionRate: number;
  status: "active" | "draft" | "out_of_stock" | "paused";
  specs: { cpu: string; gpu: string; ram: string; storage: string };
  createdAt: string;
  image?: string;
}

export interface SellerCustomer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  segment: "new" | "returning" | "vip";
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface SellerActivity {
  id: string;
  type: "order" | "listing" | "review" | "alert";
  message: string;
  time: string;
}

/* --------------------------------------------------------------------------
 * MOCK DATA
 * -------------------------------------------------------------------------- */

export const sellerMetrics: SellerMetrics = {
  revenue: { daily: 1245, weekly: 8730, monthly: 34920, yearly: 412500 },
  grossProfit: 28150,
  netProfit: 21870,
  conversionRate: 4.8,
  averageOrderValue: 1247,
  customerAcquisitionCost: 32,
  lifetimeValue: 3840,
  totalOrders: 573541,
  pendingOrders: 40000,
  shippedOrders: 380000,
  cancelledOrders: 5500,
  deliveredOrders: 370000,
  totalListings: 24,
  activeListings: 18,
  totalCustomers: 1284,
  returningCustomers: 467,
};

export const revenueChart: RevenueDataPoint[] = [
  { month: "Jan", revenue: 28400, orders: 23 },
  { month: "Feb", revenue: 31200, orders: 26 },
  { month: "Mar", revenue: 29800, orders: 24 },
  { month: "Apr", revenue: 35600, orders: 29 },
  { month: "May", revenue: 42100, orders: 34 },
  { month: "Jun", revenue: 38900, orders: 31 },
  { month: "Jul", revenue: 45200, orders: 36 },
  { month: "Aug", revenue: 41800, orders: 33 },
  { month: "Sep", revenue: 48600, orders: 39 },
  { month: "Oct", revenue: 52100, orders: 42 },
  { month: "Nov", revenue: 58400, orders: 47 },
  { month: "Dec", revenue: 61200, orders: 49 },
];

export const sellerOrders: SellerOrder[] = [
  {
    id: "so-001",
    orderNumber: "ORD-78923",
    date: "May 12, 2025, 09:00 AM",
    customerName: "Greg Lau",
    customerAvatar: "GL",
    product: "Apex Predator RTX 4090 Build",
    quantity: 1,
    amount: 3450,
    status: "shipped",
    trackingNumber: "GB1234567890",
  },
  {
    id: "so-002",
    orderNumber: "ORD-78924",
    date: "May 11, 2025, 02:30 PM",
    customerName: "Richard Martin",
    customerAvatar: "RM",
    product: "Shadow Ops i7 Gaming Rig",
    quantity: 1,
    amount: 2180,
    status: "processing",
  },
  {
    id: "so-003",
    orderNumber: "ORD-78925",
    date: "May 10, 2025, 11:15 AM",
    customerName: "Jenny Taylor",
    customerAvatar: "JT",
    product: "Silent Storm Workstation",
    quantity: 1,
    amount: 4200,
    status: "delivered",
    trackingNumber: "GB9876543210",
  },
  {
    id: "so-004",
    orderNumber: "ORD-78926",
    date: "May 9, 2025, 04:45 PM",
    customerName: "Alex Chen",
    customerAvatar: "AC",
    product: "Budget Blitz Ryzen Build",
    quantity: 2,
    amount: 1590,
    status: "pending",
  },
  {
    id: "so-005",
    orderNumber: "ORD-78927",
    date: "May 8, 2025, 10:00 AM",
    customerName: "Sarah Wilson",
    customerAvatar: "SW",
    product: "Neon Forge RGB Showcase",
    quantity: 1,
    amount: 2850,
    status: "shipped",
    trackingNumber: "GB5556667778",
  },
  {
    id: "so-006",
    orderNumber: "ORD-78928",
    date: "May 7, 2025, 08:30 AM",
    customerName: "Marcus Lee",
    customerAvatar: "ML",
    product: "Stealth Mini ITX Pro",
    quantity: 1,
    amount: 1920,
    status: "cancelled",
  },
];

export const sellerListings: SellerListing[] = [
  {
    id: "sl-001",
    title: "Apex Predator RTX 4090 Build",
    price: 3450,
    stock: 3,
    sold: 47,
    views: 2840,
    conversionRate: 1.7,
    status: "active",
    specs: { cpu: "i9-14900K", gpu: "RTX 4090", ram: "64GB DDR5", storage: "2TB NVMe" },
    createdAt: "2024-11-15",
  },
  {
    id: "sl-002",
    title: "Shadow Ops i7 Gaming Rig",
    price: 2180,
    stock: 7,
    sold: 31,
    views: 1950,
    conversionRate: 1.6,
    status: "active",
    specs: { cpu: "i7-14700K", gpu: "RTX 4070 Ti", ram: "32GB DDR5", storage: "1TB NVMe" },
    createdAt: "2024-12-03",
  },
  {
    id: "sl-003",
    title: "Silent Storm Workstation",
    price: 4200,
    stock: 0,
    sold: 12,
    views: 890,
    conversionRate: 1.3,
    status: "out_of_stock",
    specs: { cpu: "Ryzen 9 7950X", gpu: "RTX 4080", ram: "128GB DDR5", storage: "4TB NVMe" },
    createdAt: "2025-01-20",
  },
  {
    id: "sl-004",
    title: "Budget Blitz Ryzen Build",
    price: 795,
    stock: 15,
    sold: 89,
    views: 5200,
    conversionRate: 1.7,
    status: "active",
    specs: { cpu: "Ryzen 5 5600", gpu: "RX 7600", ram: "16GB DDR4", storage: "512GB NVMe" },
    createdAt: "2024-10-08",
  },
  {
    id: "sl-005",
    title: "Neon Forge RGB Showcase",
    price: 2850,
    stock: 4,
    sold: 22,
    views: 1680,
    conversionRate: 1.3,
    status: "active",
    specs: { cpu: "i7-13700K", gpu: "RTX 4070", ram: "32GB DDR5", storage: "2TB NVMe" },
    createdAt: "2025-02-14",
  },
];

export const sellerCustomers: SellerCustomer[] = [
  { id: "sc-001", name: "Greg Lau", email: "greg@email.com", totalOrders: 3, totalSpent: 8240, lastOrder: "2025-05-12", segment: "vip" },
  { id: "sc-002", name: "Richard Martin", email: "richard@email.com", totalOrders: 2, totalSpent: 4360, lastOrder: "2025-05-11", segment: "returning" },
  { id: "sc-003", name: "Jenny Taylor", email: "jenny@email.com", totalOrders: 1, totalSpent: 4200, lastOrder: "2025-05-10", segment: "new" },
  { id: "sc-004", name: "Alex Chen", email: "alex@email.com", totalOrders: 5, totalSpent: 12600, lastOrder: "2025-05-09", segment: "vip" },
  { id: "sc-005", name: "Sarah Wilson", email: "sarah@email.com", totalOrders: 2, totalSpent: 5700, lastOrder: "2025-05-08", segment: "returning" },
  { id: "sc-006", name: "Marcus Lee", email: "marcus@email.com", totalOrders: 1, totalSpent: 1920, lastOrder: "2025-05-07", segment: "new" },
];

export const sellerActivities: SellerActivity[] = [
  { id: "sa-01", type: "order", message: "New order #ORD-78923 from Greg Lau", time: "2 hours ago" },
  { id: "sa-02", type: "alert", message: "Silent Storm Workstation is out of stock", time: "5 hours ago" },
  { id: "sa-03", type: "review", message: "New 5-star review on Apex Predator build", time: "8 hours ago" },
  { id: "sa-04", type: "order", message: "Order #ORD-78925 delivered to Jenny Taylor", time: "1 day ago" },
  { id: "sa-05", type: "listing", message: "Budget Blitz Ryzen Build reached 5,000 views", time: "1 day ago" },
  { id: "sa-06", type: "order", message: "Order #ORD-78928 cancelled by Marcus Lee", time: "2 days ago" },
];

/* --------------------------------------------------------------------------
 * ORDER STATUS METADATA
 * -------------------------------------------------------------------------- */

export const orderStatusConfig: Record<SellerOrder["status"], { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-amber-500/10 text-amber-500 border-amber-500/30" },
  processing: { label: "Processing", color: "bg-blue-500/10 text-blue-500 border-blue-500/30" },
  shipped: { label: "Shipped", color: "bg-primary/10 text-primary border-primary/30" },
  delivered: { label: "Delivered", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive border-destructive/30" },
  returned: { label: "Returned", color: "bg-orange-500/10 text-orange-500 border-orange-500/30" },
};

export const listingStatusConfig: Record<SellerListing["status"], { label: string; color: string }> = {
  active: { label: "Active", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" },
  draft: { label: "Draft", color: "bg-muted text-muted-foreground border-border" },
  out_of_stock: { label: "Out of Stock", color: "bg-destructive/10 text-destructive border-destructive/30" },
  paused: { label: "Paused", color: "bg-amber-500/10 text-amber-500 border-amber-500/30" },
};
