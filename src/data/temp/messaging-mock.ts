/**
 * =============================================================================
 * MESSAGING MOCK DATA — Intent-driven conversations
 * =============================================================================
 */

export type MessageType = "text" | "build-card" | "listing-card" | "specs-card" | "ai-suggestion";
export type ConversationType = "product_inquiry" | "offer" | "order" | "general";

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: MessageType;
  timestamp: string;
  read: boolean;
  cardData?: Record<string, string | number>;
}

export interface LinkedListing {
  id: string;
  title: string;
  price: number;
  cpu?: string;
  gpu?: string;
  ram?: string;
  storage?: string;
}

export interface LinkedOrder {
  orderId: string;
  status: "building" | "testing" | "shipped" | "delivered";
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface LinkedOffer {
  offerAmount: number;
  listingPrice: number;
  listingTitle: string;
  status: "pending" | "accepted" | "declined";
}

export interface ConversationParticipant {
  userId: string;
  name: string;
  avatar: string;
  role: "buyer" | "seller" | "support";
  isOnline: boolean;
  lastSeen?: string;
  username?: string;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  participants: ConversationParticipant[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  linkedListing?: LinkedListing;
  linkedOrder?: LinkedOrder;
  linkedOffer?: LinkedOffer;
  businessName?: string;
  businessSlug?: string;
  businessRating?: number;
  verified?: boolean;
  userProfileUsername?: string;
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
  // 1. PRODUCT INQUIRY — asking about specs, FPS, performance
  {
    id: "conv-1",
    type: "product_inquiry",
    participants: [
      { userId: "user-001", name: "Hassan", avatar: "dragon", role: "buyer", isOnline: true, username: "hassan" },
      { userId: "user-004", name: "Alex Chen", avatar: "eagle", role: "seller", isOnline: true, lastSeen: "2026-04-02T10:00:00Z", username: "probuilder" },
    ],
    lastMessage: "The RTX 4070 Ti build is still available — want me to run benchmarks?",
    lastMessageTime: "2026-04-02T10:15:00Z",
    unreadCount: 2,
    linkedListing: {
      id: "mp-001",
      title: "RTX 4070 Ti Gaming PC",
      price: 1849,
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 4070 Ti Super",
      ram: "32GB DDR5",
      storage: "2TB NVMe",
    },
    businessName: "ProBuilder PCs",
    businessSlug: "probuilder-pcs",
    businessRating: 4.9,
    verified: true,
  },
  // 2. OFFER — user making a price offer
  {
    id: "conv-5",
    type: "offer",
    participants: [
      { userId: "user-001", name: "Hassan", avatar: "dragon", role: "buyer", isOnline: true, username: "hassan" },
      { userId: "user-004", name: "Alex Chen", avatar: "eagle", role: "seller", isOnline: true, lastSeen: "2026-04-02T10:00:00Z", username: "probuilder" },
    ],
    lastMessage: "Would you accept £1,600 for the RTX 4070 Ti build?",
    lastMessageTime: "2026-04-02T11:00:00Z",
    unreadCount: 1,
    linkedListing: {
      id: "mp-001",
      title: "RTX 4070 Ti Gaming PC",
      price: 1849,
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 4070 Ti Super",
      ram: "32GB DDR5",
      storage: "2TB NVMe",
    },
    linkedOffer: {
      offerAmount: 1600,
      listingPrice: 1849,
      listingTitle: "RTX 4070 Ti Gaming PC",
      status: "pending",
    },
    businessName: "ProBuilder PCs",
    businessSlug: "probuilder-pcs",
    businessRating: 4.9,
    verified: true,
  },
  // 3. ORDER — tracking a purchased build
  {
    id: "conv-2",
    type: "order",
    participants: [
      { userId: "user-001", name: "Hassan", avatar: "dragon", role: "buyer", isOnline: true, username: "hassan" },
      { userId: "user-005", name: "Kai Martinez", avatar: "ninja", role: "seller", isOnline: false, lastSeen: "2026-04-01T22:30:00Z", username: "speedrunner" },
    ],
    lastMessage: "Shipped today! Tracking number sent to your email.",
    lastMessageTime: "2026-04-01T14:30:00Z",
    unreadCount: 0,
    linkedListing: {
      id: "mp-003",
      title: "Ultra Low Latency Rig",
      price: 2199,
    },
    linkedOrder: {
      orderId: "ORD-2026-0412",
      status: "shipped",
      estimatedDelivery: "2026-04-05",
      trackingNumber: "RM1234567890GB",
    },
    userProfileUsername: "speedrunner",
  },
  // 4. GENERAL — casual user-to-user chat, no listing
  {
    id: "conv-4",
    type: "general",
    participants: [
      { userId: "user-001", name: "Hassan", avatar: "dragon", role: "buyer", isOnline: true, username: "hassan" },
      { userId: "user-002", name: "Demo User", avatar: "fox", role: "buyer", isOnline: false, lastSeen: "2026-04-01T18:00:00Z", username: "demouser" },
    ],
    lastMessage: "Hey, what GPU are you running? Want to compare setups.",
    lastMessageTime: "2026-04-01T18:05:00Z",
    unreadCount: 1,
    userProfileUsername: "demouser",
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
  "conv-5": [
    { id: "m20", conversationId: "conv-5", senderId: "user-001", content: "Hi Alex, I really like the RTX 4070 Ti build. Would you accept £1,600 for it?", type: "text", timestamp: "2026-04-02T10:50:00Z", read: true },
    { id: "m21", conversationId: "conv-5", senderId: "user-004", content: "Thanks for the offer! The build includes premium components — let me think about it.", type: "text", timestamp: "2026-04-02T10:55:00Z", read: true },
    { id: "m22", conversationId: "conv-5", senderId: "user-001", content: "Would you accept £1,600 for the RTX 4070 Ti build?", type: "text", timestamp: "2026-04-02T11:00:00Z", read: false },
  ],
  "conv-2": [
    { id: "m9", conversationId: "conv-2", senderId: "user-005", content: "Order confirmed! I'll prepare the build today.", type: "text", timestamp: "2026-03-30T11:00:00Z", read: true },
    { id: "m10", conversationId: "conv-2", senderId: "user-005", content: "Build is complete and tested. Packaging now.", type: "text", timestamp: "2026-03-31T16:00:00Z", read: true },
    { id: "m11", conversationId: "conv-2", senderId: "user-005", content: "Shipped today! Tracking number sent to your email.", type: "text", timestamp: "2026-04-01T14:30:00Z", read: true },
    { id: "m12", conversationId: "conv-2", senderId: "user-001", content: "Thanks! Looking forward to it 🎮", type: "text", timestamp: "2026-04-01T14:35:00Z", read: true },
  ],
  "conv-4": [
    { id: "m17", conversationId: "conv-4", senderId: "user-002", content: "Hey Hassan! Saw your profile — nice setup!", type: "text", timestamp: "2026-04-01T17:50:00Z", read: true },
    { id: "m18", conversationId: "conv-4", senderId: "user-001", content: "Thanks! Just upgraded the GPU last month.", type: "text", timestamp: "2026-04-01T17:55:00Z", read: true },
    { id: "m19", conversationId: "conv-4", senderId: "user-002", content: "Hey, what GPU are you running? Want to compare setups.", type: "text", timestamp: "2026-04-01T18:05:00Z", read: false },
  ],
};

export const aiSuggestionsMock: AiSuggestion[] = [
  { id: "ai-1", type: "bottleneck", title: "CPU Bottleneck Detected", description: "Your i5-12400F may limit the RTX 4070 Ti at 1080p in CPU-bound titles.", emoji: "⚠️", actionLabel: "View Upgrade Options", actionRoute: "/pc-analyzer" },
  { id: "ai-2", type: "fps-issue", title: "Low FPS in Cyberpunk", description: "RT Ultra at 4K typically yields 30-45 FPS on this GPU. Consider DLSS Frame Gen.", emoji: "📉", actionLabel: "See Optimisation Tips" },
  { id: "ai-3", type: "upgrade", title: "RAM Upgrade Recommended", description: "16GB DDR4 may cause stuttering in modern AAA titles. 32GB DDR5 recommended.", emoji: "🧠", actionLabel: "Compare RAM Options", actionRoute: "/pc-analyzer" },
  { id: "ai-4", type: "compatibility", title: "PSU Check", description: "The RTX 4070 Ti requires a 700W+ PSU. Verify your power supply rating.", emoji: "🔌", actionLabel: "Check Compatibility" },
];

export const quickActions = [
  { id: "qa-1", label: "Recommend Upgrade", emoji: "⬆️" },
  { id: "qa-2", label: "View Full Specs", emoji: "📋" },
  { id: "qa-3", label: "Compare Builds", emoji: "⚖️" },
  { id: "qa-4", label: "Apply Optimisation", emoji: "⚡" },
  { id: "qa-5", label: "Share My Setup", emoji: "📤" },
  { id: "qa-6", label: "Request Invoice", emoji: "🧾" },
];

/** Intent options for "Message Seller" modal */
export interface MessageIntent {
  id: string;
  type: ConversationType;
  label: string;
  description: string;
  emoji: string;
  prefillMessage: string;
}

export const messageIntents: MessageIntent[] = [
  {
    id: "intent-inquiry",
    type: "product_inquiry",
    label: "Ask about this product",
    description: "Ask about specs, FPS, performance, or availability",
    emoji: "💬",
    prefillMessage: "Hi, I'm interested in this build. What FPS can I expect in Valorant at 1440p?",
  },
  {
    id: "intent-offer",
    type: "offer",
    label: "Make an offer",
    description: "Propose a price for this listing",
    emoji: "💰",
    prefillMessage: "Hi, would you accept £{price} for this build?",
  },
  {
    id: "intent-order",
    type: "order",
    label: "Ask about delivery / order",
    description: "Get an update on shipping or delivery status",
    emoji: "📦",
    prefillMessage: "Hi, can I get an update on my order?",
  },
  {
    id: "intent-general",
    type: "general",
    label: "General question",
    description: "Ask anything else",
    emoji: "🗨️",
    prefillMessage: "Hi, I have a question.",
  },
];

export function getTotalUnread(): number {
  return conversationsMock.reduce((sum, c) => sum + c.unreadCount, 0);
}

/**
 * Resolve the "my" participant in a conversation based on user role.
 * Standard users own the "buyer" participant; business users own the "seller" participant.
 */
export function getMyParticipant(
  conversation: Conversation,
  userRole: "standard" | "business",
): ConversationParticipant | undefined {
  if (userRole === "business") {
    return conversation.participants.find((p) => p.role === "seller");
  }
  return conversation.participants.find((p) => p.role === "buyer" && p.userId === "user-001")
    ?? conversation.participants.find((p) => p.role === "buyer");
}

/**
 * Resolve the "other" participant (the person you're chatting WITH).
 */
export function getOtherParticipant(
  conversation: Conversation,
  userRole: "standard" | "business",
): ConversationParticipant | undefined {
  const me = getMyParticipant(conversation, userRole);
  if (!me) return conversation.participants[0];
  return conversation.participants.find((p) => p.userId !== me.userId);
}

/**
 * Check if a message was sent by "me" based on role-based ownership.
 */
export function isMyMessage(
  message: ChatMessage,
  conversation: Conversation,
  userRole: "standard" | "business",
): boolean {
  const me = getMyParticipant(conversation, userRole);
  return me ? message.senderId === me.userId : false;
}
