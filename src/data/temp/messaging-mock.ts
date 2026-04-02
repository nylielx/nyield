/**
 * =============================================================================
 * MESSAGING MOCK DATA — Conversations, messages, and context
 * =============================================================================
 */

export type MessageType = "text" | "build-card" | "listing-card" | "specs-card" | "ai-suggestion";

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: MessageType;
  timestamp: string;
  read: boolean;
  /** Structured data for rich message cards */
  cardData?: Record<string, string | number>;
}

export interface Conversation {
  id: string;
  type: "buyer-seller" | "support";
  participants: { userId: string; name: string; avatar: string; role: "buyer" | "seller" | "support"; isOnline: boolean; lastSeen?: string }[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  /** Context: linked listing */
  linkedListingId?: string;
  linkedListingTitle?: string;
  /** Business info for seller conversations */
  businessName?: string;
  businessRating?: number;
  verified?: boolean;
}

export interface AiSuggestion {
  id: string;
  type: "bottleneck" | "fps-issue" | "compatibility" | "upgrade" | "optimisation";
  title: string;
  description: string;
  emoji: string;
  actionLabel: string;
  actionRoute?: string;
}

/* -------------------------------------------------------------------------- */

export const conversationsMock: Conversation[] = [
  {
    id: "conv-1",
    type: "buyer-seller",
    participants: [
      { userId: "user-001", name: "Hassan", avatar: "dragon", role: "buyer", isOnline: true },
      { userId: "user-004", name: "Alex Chen", avatar: "eagle", role: "seller", isOnline: true, lastSeen: "2026-04-02T10:00:00Z" },
    ],
    lastMessage: "The RTX 4070 Ti build is still available — want me to run benchmarks?",
    lastMessageTime: "2026-04-02T10:15:00Z",
    unreadCount: 2,
    linkedListingId: "mp-001",
    linkedListingTitle: "RTX 4070 Ti Gaming PC",
    businessName: "ProBuilder PCs",
    businessRating: 4.9,
    verified: true,
  },
  {
    id: "conv-2",
    type: "buyer-seller",
    participants: [
      { userId: "user-001", name: "Hassan", avatar: "dragon", role: "buyer", isOnline: true },
      { userId: "user-005", name: "Kai Martinez", avatar: "ninja", role: "seller", isOnline: false, lastSeen: "2026-04-01T22:30:00Z" },
    ],
    lastMessage: "Shipped today! Tracking number sent to your email.",
    lastMessageTime: "2026-04-01T14:30:00Z",
    unreadCount: 0,
    linkedListingId: "mp-003",
    linkedListingTitle: "Ultra Low Latency Rig",
  },
  {
    id: "conv-3",
    type: "support",
    participants: [
      { userId: "user-001", name: "Hassan", avatar: "dragon", role: "buyer", isOnline: true },
      { userId: "support-001", name: "nYield Support", avatar: "robot", role: "support", isOnline: true },
    ],
    lastMessage: "Your optimisation service has been scheduled for tomorrow at 3 PM.",
    lastMessageTime: "2026-03-31T16:00:00Z",
    unreadCount: 1,
  },
];

export const messagesMock: Record<string, ChatMessage[]> = {
  "conv-1": [
    { id: "m1", conversationId: "conv-1", senderId: "user-001", content: "Hi, I'm interested in the RTX 4070 Ti build. Is it still available?", type: "text", timestamp: "2026-04-02T09:30:00Z", read: true },
    { id: "m2", conversationId: "conv-1", senderId: "user-004", content: "Hey Hassan! Yes it's available. It's been stress-tested and benchmarked.", type: "text", timestamp: "2026-04-02T09:32:00Z", read: true },
    {
      id: "m3", conversationId: "conv-1", senderId: "user-004", content: "Here are the full specs:", type: "listing-card", timestamp: "2026-04-02T09:33:00Z", read: true,
      cardData: { title: "RTX 4070 Ti Gaming PC", cpu: "AMD Ryzen 7 7800X3D", gpu: "RTX 4070 Ti Super", ram: "32GB DDR5", storage: "2TB NVMe", price: 1849 },
    },
    { id: "m4", conversationId: "conv-1", senderId: "user-001", content: "Looks great. What FPS can I expect in Valorant at 1440p?", type: "text", timestamp: "2026-04-02T09:45:00Z", read: true },
    { id: "m5", conversationId: "conv-1", senderId: "user-004", content: "Easily 350+ FPS at 1440p High settings. I can share the benchmark report if you want.", type: "text", timestamp: "2026-04-02T09:48:00Z", read: true },
    {
      id: "m6", conversationId: "conv-1", senderId: "user-004", content: "", type: "specs-card", timestamp: "2026-04-02T09:49:00Z", read: true,
      cardData: { game: "Valorant", resolution: "1440p", settings: "High", fps: 380, latency: "4ms" },
    },
    { id: "m7", conversationId: "conv-1", senderId: "user-001", content: "That's incredible. Can I compare it with my current setup?", type: "text", timestamp: "2026-04-02T10:00:00Z", read: false },
    { id: "m8", conversationId: "conv-1", senderId: "user-004", content: "The RTX 4070 Ti build is still available — want me to run benchmarks?", type: "text", timestamp: "2026-04-02T10:15:00Z", read: false },
  ],
  "conv-2": [
    { id: "m9", conversationId: "conv-2", senderId: "user-005", content: "Order confirmed! I'll prepare the build today.", type: "text", timestamp: "2026-03-30T11:00:00Z", read: true },
    { id: "m10", conversationId: "conv-2", senderId: "user-005", content: "Build is complete and tested. Packaging now.", type: "text", timestamp: "2026-03-31T16:00:00Z", read: true },
    { id: "m11", conversationId: "conv-2", senderId: "user-005", content: "Shipped today! Tracking number sent to your email.", type: "text", timestamp: "2026-04-01T14:30:00Z", read: true },
    { id: "m12", conversationId: "conv-2", senderId: "user-001", content: "Thanks! Looking forward to it 🎮", type: "text", timestamp: "2026-04-01T14:35:00Z", read: true },
  ],
  "conv-3": [
    { id: "m13", conversationId: "conv-3", senderId: "user-001", content: "Hi, I booked an optimisation service. When will it start?", type: "text", timestamp: "2026-03-31T14:00:00Z", read: true },
    { id: "m14", conversationId: "conv-3", senderId: "support-001", content: "Hi Hassan! Let me check your booking.", type: "text", timestamp: "2026-03-31T14:05:00Z", read: true },
    {
      id: "m15", conversationId: "conv-3", senderId: "support-001", content: "", type: "ai-suggestion", timestamp: "2026-03-31T14:06:00Z", read: true,
      cardData: { title: "System Analysis Complete", description: "Based on your specs, we recommend the Performance Optimisation package with latency tuning.", emoji: "🔬", type: "optimisation" },
    },
    { id: "m16", conversationId: "conv-3", senderId: "support-001", content: "Your optimisation service has been scheduled for tomorrow at 3 PM.", type: "text", timestamp: "2026-03-31T16:00:00Z", read: false },
  ],
};

export const aiSuggestionsMock: AiSuggestion[] = [
  { id: "ai-1", type: "bottleneck", title: "CPU Bottleneck Detected", description: "Your i5-12400F may limit the RTX 4070 Ti at 1080p in CPU-bound titles.", emoji: "⚠️", actionLabel: "View Upgrade Options", actionRoute: "/pc-analyzer" },
  { id: "ai-2", type: "fps-issue", title: "Low FPS in Cyberpunk", description: "RT Ultra at 4K typically yields 30-45 FPS on this GPU. Consider DLSS Frame Gen.", emoji: "📉", actionLabel: "See Optimisation Tips" },
  { id: "ai-3", type: "upgrade", title: "RAM Upgrade Recommended", description: "16GB DDR4 may cause stuttering in modern AAA titles. 32GB DDR5 recommended.", emoji: "🧠", actionLabel: "Compare RAM Options", actionRoute: "/pc-analyzer" },
  { id: "ai-4", type: "compatibility", title: "PSU Check", description: "The RTX 4070 Ti requires a 700W+ PSU. Verify your power supply rating.", emoji: "🔌", actionLabel: "Check Compatibility" },
];

/** Quick action buttons for chat */
export const quickActions = [
  { id: "qa-1", label: "Recommend Upgrade", emoji: "⬆️" },
  { id: "qa-2", label: "View Full Specs", emoji: "📋" },
  { id: "qa-3", label: "Compare Builds", emoji: "⚖️" },
  { id: "qa-4", label: "Apply Optimisation", emoji: "⚡" },
  { id: "qa-5", label: "Share My Setup", emoji: "📤" },
  { id: "qa-6", label: "Request Invoice", emoji: "🧾" },
];

/** Total unread count across all conversations */
export function getTotalUnread(): number {
  return conversationsMock.reduce((sum, c) => sum + c.unreadCount, 0);
}
