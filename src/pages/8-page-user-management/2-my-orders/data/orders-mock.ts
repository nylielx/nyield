/**
 * =============================================================================
 * ORDERS MOCK DATA — Premium order system
 * =============================================================================
 */

export type OrderStatus =
  | "awaiting_payment"
  | "processing"
  | "pre_production"
  | "in_building"
  | "in_testing"
  | "awaiting_dispatch"
  | "in_transit"
  | "order_dispatched"
  | "delivered"
  | "finance_accepted"
  | "finance_referred"
  | "finance_declined"
  | "cancelled";

export interface OrderStatusMeta {
  key: OrderStatus;
  label: string;
  color: string; // tailwind classes
  description: string;
}

export const orderStatusMeta: OrderStatusMeta[] = [
  { key: "awaiting_payment", label: "Awaiting Payment", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30", description: "Your order has been received and is awaiting payment confirmation." },
  { key: "processing", label: "Processing", color: "bg-blue-500/10 text-blue-500 border-blue-500/30", description: "Payment confirmed. Your order is being prepared for production." },
  { key: "pre_production", label: "Pre-Production", color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30", description: "Components are being sourced and your build is being scheduled." },
  { key: "in_building", label: "In Building", color: "bg-orange-500/10 text-orange-500 border-orange-500/30", description: "Your system is currently being assembled by our technicians." },
  { key: "in_testing", label: "In Testing", color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30", description: "Your build is undergoing stress testing and quality checks." },
  { key: "awaiting_dispatch", label: "Awaiting Dispatch", color: "bg-purple-500/10 text-purple-500 border-purple-500/30", description: "Testing complete. Your system is packed and awaiting courier collection." },
  { key: "in_transit", label: "In Transit", color: "bg-violet-500/10 text-violet-500 border-violet-500/30", description: "Your order is on its way to you." },
  { key: "order_dispatched", label: "Dispatched", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", description: "Your order has been dispatched and will arrive soon." },
  { key: "delivered", label: "Delivered", color: "bg-green-500/10 text-green-500 border-green-500/30", description: "Your order has been delivered successfully." },
  { key: "finance_accepted", label: "Finance Accepted", color: "bg-green-500/10 text-green-500 border-green-500/30", description: "Your finance application has been accepted." },
  { key: "finance_referred", label: "Finance Referred", color: "bg-amber-500/10 text-amber-500 border-amber-500/30", description: "Your finance application has been referred for further review." },
  { key: "finance_declined", label: "Finance Declined", color: "bg-red-500/10 text-red-500 border-red-500/30", description: "Your finance application was not successful." },
  { key: "cancelled", label: "Cancelled", color: "bg-destructive/10 text-destructive border-destructive/30", description: "This order has been cancelled." },
];

export function getStatusMeta(status: OrderStatus): OrderStatusMeta {
  return orderStatusMeta.find((s) => s.key === status) ?? orderStatusMeta[0];
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  title: string;
  itemSummary: string;
  price: number;
  status: OrderStatus;
  dateProcessed: string;
  quantity: number;
  productionTime: string;
  invoiceUrl?: string;
  trackingNumber?: string;
  notes?: string;
}

export const ordersMock: Order[] = [
  {
    id: "ord-1",
    orderNumber: "NY-20260312",
    userId: "user-001",
    title: "RTX 4070 Gaming Build",
    itemSummary: "R7 7700X • RTX 4070 • 32GB DDR5 • 1TB NVMe",
    price: 1249,
    status: "in_building",
    dateProcessed: "2026-03-28",
    quantity: 1,
    productionTime: "5-7 working days",
    invoiceUrl: "#",
    notes: "Custom cable management requested",
  },
  {
    id: "ord-2",
    orderNumber: "NY-20260228",
    userId: "user-001",
    title: "i7-13700K Content Creator Build",
    itemSummary: "i7-13700K • RTX 4070 Ti • 64GB DDR5 • 2TB NVMe",
    price: 1899,
    status: "delivered",
    dateProcessed: "2026-02-28",
    quantity: 1,
    productionTime: "7-10 working days",
    invoiceUrl: "#",
    trackingNumber: "NY-TRK-882291",
  },
  {
    id: "ord-3",
    orderNumber: "NY-20260115",
    userId: "user-001",
    title: "Budget Starter PC",
    itemSummary: "i5-12400F • RX 6600 • 16GB DDR4 • 512GB NVMe",
    price: 549,
    status: "delivered",
    dateProcessed: "2026-01-15",
    quantity: 1,
    productionTime: "3-5 working days",
    invoiceUrl: "#",
    trackingNumber: "NY-TRK-773102",
  },
];

/* --------------------------------------------------------------------------
 * DISPATCH LEAD TIME DATA
 * -------------------------------------------------------------------------- */
export interface DispatchRow {
  category: string;
  days7: string;
  days14: string;
  days21: string;
  days28: string;
  average: string;
}

export const dispatchLeadTimes: DispatchRow[] = [
  { category: "Desktop PCs", days7: "42%", days14: "78%", days21: "94%", days28: "99%", average: "11 days" },
  { category: "Mini PCs", days7: "55%", days14: "85%", days21: "96%", days28: "100%", average: "9 days" },
  { category: "Laptops", days7: "60%", days14: "88%", days21: "97%", days28: "100%", average: "8 days" },
];
