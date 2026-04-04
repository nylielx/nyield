/**
 * =============================================================================
 * SUPPORT MOCK DATA — Ticket system and support hub
 * =============================================================================
 */

export type TicketStatus = "open" | "in_progress" | "resolved";
export type TicketPriority = "low" | "medium" | "high";

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  orderRef?: string;
  createdAt: string;
  updatedAt: string;
  messages: { sender: "user" | "agent"; text: string; timestamp: string }[];
}

export const ticketCategories = [
  "Order Issue",
  "Performance Problem",
  "Billing & Payments",
  "Account & Security",
  "Compatibility",
  "Feature Request",
  "Other",
];

export const mockTickets: SupportTicket[] = [
  {
    id: "TK-001",
    subject: "FPS drop after latest Windows update",
    category: "Performance Problem",
    priority: "high",
    status: "in_progress",
    createdAt: "2025-03-28T10:00:00Z",
    updatedAt: "2025-03-29T14:30:00Z",
    messages: [
      { sender: "user", text: "After the latest Windows update, my FPS dropped by about 20%. I'm on the Competitive edition.", timestamp: "2025-03-28T10:00:00Z" },
      { sender: "agent", text: "Thanks for reporting this. We're aware of a conflict with the latest Windows update. A patch is being prepared. In the meantime, try rolling back the display driver.", timestamp: "2025-03-29T14:30:00Z" },
    ],
  },
  {
    id: "TK-002",
    subject: "Haven't received my digital key",
    category: "Order Issue",
    priority: "medium",
    status: "resolved",
    orderRef: "ORD-2024-1847",
    createdAt: "2025-03-20T08:15:00Z",
    updatedAt: "2025-03-20T09:45:00Z",
    messages: [
      { sender: "user", text: "I purchased the Balanced Edition 2 hours ago but haven't received the activation key.", timestamp: "2025-03-20T08:15:00Z" },
      { sender: "agent", text: "I've resent the key to your registered email. Please check your spam folder as well. Let me know if you still don't see it!", timestamp: "2025-03-20T09:45:00Z" },
    ],
  },
];
