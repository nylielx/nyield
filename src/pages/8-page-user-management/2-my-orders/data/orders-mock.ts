/**
 * =============================================================================
 * ORDERS MOCK DATA
 * =============================================================================
 */

export interface Order {
  id: string;
  orderNumber: string;
  title: string;
  price: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  specs: string;
  image?: string;
}

export const ordersMock: Order[] = [
  {
    id: "ord-1",
    orderNumber: "NY-20260312",
    title: "RTX 4070 Gaming Build",
    price: 1249,
    status: "processing",
    date: "2026-03-28",
    specs: "R7 7700X • RTX 4070 • 32GB DDR5 • 1TB NVMe",
  },
  {
    id: "ord-2",
    orderNumber: "NY-20260228",
    title: "i7-13700K Content Creator Build",
    price: 1899,
    status: "delivered",
    date: "2026-02-28",
    specs: "i7-13700K • RTX 4070 Ti • 64GB DDR5 • 2TB NVMe",
  },
  {
    id: "ord-3",
    orderNumber: "NY-20260115",
    title: "Budget Starter PC",
    price: 549,
    status: "delivered",
    date: "2026-01-15",
    specs: "i5-12400F • RX 6600 • 16GB DDR4 • 512GB NVMe",
  },
];
