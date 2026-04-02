/**
 * =============================================================================
 * MESSAGING PAGE — Intent-driven chat with dynamic context panel
 * =============================================================================
 * Auth-gated: redirects to /signin if not logged in.
 * All identity resolution uses authenticated user ID.
 * Conversation state derived from live message data.
 * =============================================================================
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Search, ChevronRight, ChevronLeft, MessageCircle, Sparkles,
  CheckCheck, Check, ExternalLink, Cpu, Monitor, MemoryStick,
  PanelRightOpen, PanelRightClose, Bot, Zap, X, Truck,
  ShieldCheck, HardDrive, Clock, AlertCircle,
  Tag, ThumbsUp, ThumbsDown, Plus,
} from "lucide-react";
import Navbar from "@/components/component-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { getAvatarById } from "@/data/temp/8-user-profile-mock";
import { toast } from "@/hooks/use-toast";
import { getUserProfile } from "@/data/temp/profile-mock";
import {
  conversationsMock, messagesMock, aiSuggestionsMock, quickActions, messageIntents,
  getMyParticipant, getOtherParticipant, isMyMessage, getConversationsForUser,
  deriveConversationPreview,
  type Conversation, type ChatMessage, type ConversationType,
} from "@/data/temp/messaging-mock";

/* ── Helpers ── */
const timeAgo = (ts: string) => {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
};

const formatTime = (ts: string) =>
  new Date(ts).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

const TYPE_LABELS: Record<ConversationType, string> = {
  product_inquiry: "Product Inquiry",
  offer: "Offer",
  order: "Order",
  general: "General",
};

const TYPE_COLORS: Record<ConversationType, string> = {
  product_inquiry: "bg-primary/10 text-primary border-primary/30",
  offer: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  order: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  general: "bg-muted/20 text-muted-foreground border-border/30",
};

/* ══════════════════════════════════════════════════════════════════════════════
 * MESSAGE SELLER MODAL — Intent selection before starting a conversation
 * ══════════════════════════════════════════════════════════════════════════════ */
const MessageSellerModal = ({
  open, onClose, onSelectIntent,
}: {
  open: boolean;
  onClose: () => void;
  onSelectIntent: (type: ConversationType, prefill: string) => void;
}) => (
  <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
    <DialogContent className="sm:max-w-md glass-focus border-border/30">
      <DialogHeader>
        <DialogTitle className="text-lg font-heading">Start a New Conversation</DialogTitle>
      </DialogHeader>
      <p className="text-xs text-muted-foreground -mt-1 mb-2">
        Choose a conversation type. A new thread will be created with a prefilled message.
      </p>
      <div className="space-y-2">
        {messageIntents.map((intent) => (
          <button
            key={intent.id}
            onClick={() => onSelectIntent(intent.type, intent.prefillMessage)}
            className="w-full text-left p-3.5 rounded-xl border border-border/30 bg-muted/10 hover:bg-muted/20 hover:border-primary/30 transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{intent.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-medium group-hover:text-primary transition-colors">{intent.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{intent.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground mt-1 group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

/* ══════════════════════════════════════════════════════════════════════════════
 * CONVERSATION LIST COMPONENT
 * ══════════════════════════════════════════════════════════════════════════════ */
const ConversationList = ({
  conversations, activeId, onSelect, search, onSearchChange, onNewMessage, userId, localMessages,
}: {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
  onNewMessage: () => void;
  userId: string;
  localMessages: Record<string, ChatMessage[]>;
}) => {
  const filtered = conversations.filter((c) => {
    const names = c.participants.map((p) => p.name.toLowerCase()).join(" ");
    return names.includes(search.toLowerCase()) || (c.linkedListing?.title ?? "").toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden bg-card/20">
      <div className="shrink-0 border-b border-border/30 p-4">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-10 border-border/30 bg-muted/20 pl-9 text-sm"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-full justify-center gap-1.5 border-border/30 text-xs hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
            onClick={onNewMessage}
          >
            <Plus className="h-3.5 w-3.5" /> New Conversation
          </Button>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-2 p-3">
          {filtered.map((conv) => {
            const other = getOtherParticipant(conv, userId);
            if (!other) return null;

            const avatar = getAvatarById(other.avatar);
            const isActive = conv.id === activeId;
            const preview = deriveConversationPreview(conv, localMessages[conv.id] ?? [], userId);

            return (
              <motion.button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                whileTap={{ scale: 0.985 }}
                className={`group block w-full overflow-hidden rounded-2xl border p-3 text-left transition-all duration-200 ${
                  isActive
                    ? "border-primary/30 bg-primary/10 shadow-sm"
                    : "border-transparent bg-transparent hover:border-border/40 hover:bg-muted/20"
                }`}
              >
                <div className="grid grid-cols-[auto,minmax(0,1fr),auto] items-start gap-3">
                  <div className="relative shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted/30 text-lg">
                      {avatar.emoji}
                    </div>
                    {other.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                    )}
                  </div>

                  <div className="min-w-0 overflow-hidden">
                    <div className="flex min-w-0 items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
                          <span className="truncate text-sm font-semibold">{other.name}</span>
                          {conv.verified && (
                            <Badge
                              variant="outline"
                              className="shrink-0 border-primary/30 bg-primary/10 px-1 py-0 text-[9px] text-primary"
                            >
                              ✓
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 pt-0.5 text-[10px] text-muted-foreground">
                        {timeAgo(preview.lastMessageTime)}
                      </span>
                    </div>

                    <div className="mt-1 flex min-w-0 items-center gap-1.5 overflow-hidden">
                      <Badge
                        variant="outline"
                        className={`shrink-0 border px-1.5 py-0 text-[8px] ${TYPE_COLORS[conv.type]}`}
                      >
                        {TYPE_LABELS[conv.type]}
                      </Badge>
                      <span className="truncate text-[10px] text-muted-foreground">
                        {other.isOnline ? "Online" : `Last seen ${timeAgo(other.lastSeen ?? conv.lastMessageTime)}`}
                      </span>
                    </div>

                    <p className="mt-1 truncate pr-2 text-xs text-muted-foreground">{preview.lastMessage}</p>
                    {conv.linkedListing && (
                      <p className="mt-1 truncate pr-2 text-[10px] text-primary/70">📦 {conv.linkedListing.title}</p>
                    )}
                  </div>

                  <div className="flex items-start justify-end pt-0.5">
                    {preview.unreadCount > 0 && (
                      <div className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5">
                        <span className="text-[10px] font-bold text-primary-foreground">{preview.unreadCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border/40 bg-muted/10 px-4 py-8 text-center text-sm text-muted-foreground">
              No conversations match your search.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
 * RICH MESSAGE CARD RENDERERS
 * ══════════════════════════════════════════════════════════════════════════════ */
const ListingCard = ({ data }: { data: Record<string, string | number> }) => (
  <div className="rounded-xl border border-border/30 bg-muted/10 p-3 space-y-2 max-w-xs">
    <p className="text-sm font-semibold">{data.title}</p>
    <div className="space-y-1 text-xs text-muted-foreground">
      <div className="flex items-center gap-2"><Cpu className="h-3 w-3" /> {data.cpu}</div>
      <div className="flex items-center gap-2"><Monitor className="h-3 w-3" /> {data.gpu}</div>
      <div className="flex items-center gap-2"><MemoryStick className="h-3 w-3" /> {data.ram}</div>
    </div>
    <div className="flex items-center justify-between pt-1 border-t border-border/20">
      <span className="text-sm font-bold text-primary">£{Number(data.price).toLocaleString()}</span>
      <Button size="sm" variant="outline" className="text-[10px] h-6 px-2 gap-1">
        View <ExternalLink className="h-2.5 w-2.5" />
      </Button>
    </div>
  </div>
);

const SpecsCard = ({ data }: { data: Record<string, string | number> }) => (
  <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-3 max-w-xs">
    <p className="text-xs font-medium text-green-400 mb-1">📊 Benchmark Result</p>
    <div className="space-y-1 text-xs">
      <div className="flex justify-between"><span className="text-muted-foreground">Game</span><span>{data.game}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Resolution</span><span>{data.resolution}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Settings</span><span>{data.settings}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">FPS</span><span className="font-bold text-green-400">{data.fps} FPS</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Latency</span><span>{data.latency}</span></div>
    </div>
  </div>
);

const AiCard = ({ data }: { data: Record<string, string | number> }) => (
  <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 max-w-xs">
    <div className="flex items-center gap-1.5 mb-1">
      <Bot className="h-3.5 w-3.5 text-purple-400" />
      <span className="text-xs font-medium text-purple-400">AI Analysis</span>
    </div>
    <p className="text-sm font-medium">{data.title}</p>
    <p className="text-xs text-muted-foreground mt-1">{data.description}</p>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════════
 * CHAT WINDOW COMPONENT
 * ══════════════════════════════════════════════════════════════════════════════ */
const ChatWindow = ({
  conversation, messages, onSendMessage, prefillMessage, onClearPrefill, userId,
}: {
  conversation: Conversation;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  prefillMessage: string;
  onClearPrefill: () => void;
  userId: string;
}) => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevMsgCountRef = useRef(messages.length);

  // Apply prefill message
  useEffect(() => {
    if (prefillMessage) {
      setInput(prefillMessage);
      onClearPrefill();
    }
  }, [prefillMessage, onClearPrefill]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // Typing indicator: only triggers when the OTHER person sends a message
  // In mock mode, simulate typing after user sends (the "other" is typing a reply)
  useEffect(() => {
    if (messages.length > prevMsgCountRef.current) {
      const last = messages[messages.length - 1];
      // Only show typing if *I* just sent a message (simulating other person drafting a reply)
      if (last && last.senderId === userId) {
        setIsTyping(true);
        const timer = setTimeout(() => setIsTyping(false), 2500);
        prevMsgCountRef.current = messages.length;
        return () => clearTimeout(timer);
      }
    }
    prevMsgCountRef.current = messages.length;
  }, [messages, userId]);

  const other = getOtherParticipant(conversation, userId);
  const otherAvatar = getAvatarById(other?.avatar ?? "man");
  const userRole = getMyParticipant(conversation, userId)?.role;
  const isBusinessView = userRole === "seller";

  const profileLink = conversation.businessSlug && !isBusinessView
    ? `/business/${conversation.businessSlug}`
    : `/user/${other?.username ?? "unknown"}`;

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden">
      {/* Chat header */}
      <div className="p-4 border-b border-border/30 flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-muted/30 flex items-center justify-center text-lg">
            {otherAvatar.emoji}
          </div>
          {other?.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link to={profileLink} className="text-sm font-semibold hover:text-primary transition-colors">{other?.name}</Link>
            {conversation.verified && <Badge variant="outline" className="text-[9px] px-1 py-0 bg-primary/10 text-primary border-primary/30">Verified</Badge>}
            <Badge variant="outline" className={`text-[8px] px-1.5 py-0 ${TYPE_COLORS[conversation.type]}`}>
              {TYPE_LABELS[conversation.type]}
            </Badge>
          </div>
          <p className="text-[10px] text-muted-foreground">
            {other?.isOnline ? "Online" : `Last seen ${timeAgo(other?.lastSeen ?? "")}`}
          </p>
        </div>
        {/* Show business badge when talking to a business */}
        {conversation.businessName && !isBusinessView && (
          <Badge variant="secondary" className="text-xs gap-1">🏢 {conversation.businessName}</Badge>
        )}
        {conversation.linkedOrder && (
          <Badge variant="secondary" className="text-xs gap-1">📦 {conversation.linkedOrder.orderId}</Badge>
        )}
      </div>

      {/* Context banner for linked listing */}
      {conversation.linkedListing && (
        <div className="px-4 py-2 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">📦 Re:</span>
          <span className="text-xs font-medium text-primary">{conversation.linkedListing.title}</span>
          {conversation.linkedOffer && (
            <Badge variant="outline" className="text-[9px] ml-auto bg-amber-500/10 text-amber-400 border-amber-500/30">
              Offer: £{conversation.linkedOffer.offerAmount.toLocaleString()}
            </Badge>
          )}
          {!conversation.linkedOffer && <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />}
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="min-h-0 flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isMine = isMyMessage(msg, userId);
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] ${isMine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  {msg.type === "listing-card" && msg.cardData && <ListingCard data={msg.cardData} />}
                  {msg.type === "specs-card" && msg.cardData && <SpecsCard data={msg.cardData} />}
                  {msg.type === "ai-suggestion" && msg.cardData && <AiCard data={msg.cardData} />}

                  {msg.content && (
                    <div className={`rounded-2xl px-3.5 py-2 text-sm ${
                      isMine
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted/30 text-foreground rounded-bl-md"
                    }`}>
                      {msg.content}
                    </div>
                  )}

                  <div className={`flex items-center gap-1 ${isMine ? "flex-row-reverse" : ""}`}>
                    <span className="text-[10px] text-muted-foreground">{formatTime(msg.timestamp)}</span>
                    {isMine && (
                      msg.read
                        ? <CheckCheck className="h-3 w-3 text-primary" />
                        : <Check className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-muted/30 flex items-center justify-center text-sm">
                {otherAvatar.emoji}
              </div>
              <div className="bg-muted/30 rounded-2xl px-4 py-2 flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-border/20 flex gap-1.5 overflow-x-auto scrollbar-hide">
        {quickActions.slice(0, 4).map((qa) => (
          <Button
            key={qa.id}
            variant="ghost"
            size="sm"
            className="text-[10px] h-7 px-2 shrink-0 gap-1 bg-muted/15 hover:bg-muted/30"
            onClick={() => toast({ title: qa.label, description: "Quick action triggered (demo)" })}
          >
            {qa.emoji} {qa.label}
          </Button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/30">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-muted/20 border-border/30"
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()} className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
 * DYNAMIC CONTEXT PANEL — Renders strictly based on conversation.type
 * ══════════════════════════════════════════════════════════════════════════════ */
const ContextPanel = ({
  conversation, onClose, userId,
}: {
  conversation: Conversation;
  onClose: () => void;
  userId: string;
}) => {
  const me = getMyParticipant(conversation, userId);
  const other = getOtherParticipant(conversation, userId);
  const otherAvatar = getAvatarById(other?.avatar ?? "man");
  const userProfile = other?.username ? getUserProfile(other.username) : undefined;

  const isBusinessView = me?.role === "seller";
  const otherRoleLabel = isBusinessView ? "Customer" : (other?.role === "seller" ? "Seller" : "User");

  const panelTitle = (() => {
    switch (conversation.type) {
      case "product_inquiry": return isBusinessView ? `Inquiry from ${other?.name ?? "Customer"}` : "Product Inquiry";
      case "offer": return isBusinessView ? `Offer from ${other?.name ?? "Customer"}` : "Offer Details";
      case "order": return isBusinessView ? `Order — ${other?.name ?? "Customer"}` : "Order Details";
      case "general": return other?.name ?? "Profile";
    }
  })();

  const otherProfileLink = other?.username
    ? (conversation.businessSlug && !isBusinessView ? `/business/${conversation.businessSlug}` : `/user/${other.username}`)
    : "#";

  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden">
      <div className="p-4 border-b border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{panelTitle}</span>
          <Badge variant="outline" className={`text-[8px] px-1.5 py-0 ${TYPE_COLORS[conversation.type]}`}>
            {TYPE_LABELS[conversation.type]}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1 p-4">
        <div className="space-y-5">

          {/* ─── PRODUCT INQUIRY ─── */}
          {conversation.type === "product_inquiry" && (
            <>
              {!isBusinessView && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Seller</p>
                  <Link to={otherProfileLink} className="block">
                    <Card className="border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center text-xl">{otherAvatar.emoji}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium">{other?.name}</span>
                              {conversation.verified && (
                                <Badge className="text-[9px] bg-primary/10 text-primary border-primary/30">
                                  <ShieldCheck className="h-2.5 w-2.5 mr-0.5" /> Verified
                                </Badge>
                              )}
                            </div>
                            {conversation.businessName && (
                              <p className="text-[10px] text-muted-foreground">🏢 {conversation.businessName}</p>
                            )}
                            {conversation.businessRating && (
                              <p className="text-[10px] text-muted-foreground">⭐ {conversation.businessRating} rating</p>
                            )}
                            <p className="text-[10px] text-primary mt-0.5">View profile →</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )}

              {isBusinessView && other && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</p>
                  <Link to={`/user/${other.username ?? "unknown"}`} className="block">
                    <Card className="border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center text-xl">{otherAvatar.emoji}</div>
                        <div>
                          <p className="text-sm font-medium">{other.name}</p>
                          <p className="text-[10px] text-muted-foreground">{other.isOnline ? "🟢 Online" : "⚫ Offline"}</p>
                          <p className="text-[10px] text-primary mt-0.5">View profile →</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )}

              {conversation.linkedListing ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</p>
                  <Card className="border-border/30 bg-muted/10">
                    <CardContent className="p-3 space-y-2">
                      <p className="text-sm font-medium">{conversation.linkedListing.title}</p>
                      <p className="text-sm font-bold text-primary">£{conversation.linkedListing.price.toLocaleString()}</p>
                      {conversation.linkedListing.cpu && (
                        <div className="space-y-1 text-xs text-muted-foreground pt-1 border-t border-border/20">
                          <div className="flex items-center gap-2"><Cpu className="h-3 w-3" /> {conversation.linkedListing.cpu}</div>
                          <div className="flex items-center gap-2"><Monitor className="h-3 w-3" /> {conversation.linkedListing.gpu}</div>
                          <div className="flex items-center gap-2"><MemoryStick className="h-3 w-3" /> {conversation.linkedListing.ram}</div>
                          <div className="flex items-center gap-2"><HardDrive className="h-3 w-3" /> {conversation.linkedListing.storage}</div>
                        </div>
                      )}
                      <Link to={`/marketplace/${conversation.linkedListing.id}`} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                        View Listing <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground italic p-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3" /> No listing linked to this conversation
                </div>
              )}

              <Separator className="bg-border/20" />

              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Insights</p>
                </div>
                {aiSuggestionsMock.slice(0, 2).map((sug) => (
                  <motion.div key={sug.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                    <Card className="border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/10 transition-colors cursor-pointer">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{sug.emoji}</span>
                          <div className="flex-1">
                            <p className="text-xs font-medium">{sug.title}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{sug.description}</p>
                            <Button
                              variant="ghost" size="sm"
                              className="text-[10px] h-6 px-2 mt-1.5 text-purple-400 hover:text-purple-300 gap-1"
                              onClick={() => toast({ title: sug.actionLabel, description: "AI action triggered (demo)" })}
                            >
                              <Zap className="h-2.5 w-2.5" /> {sug.actionLabel}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* ─── OFFER ─── */}
          {conversation.type === "offer" && (
            <>
              {conversation.linkedOffer ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {isBusinessView ? "Incoming Offer" : "Your Offer"}
                  </p>
                  <Card className="border-amber-500/20 bg-amber-500/5">
                    <CardContent className="p-3 space-y-3">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-amber-400" />
                        <span className="text-sm font-semibold text-amber-400">
                          £{conversation.linkedOffer.offerAmount.toLocaleString()}
                        </span>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ml-auto capitalize ${
                          conversation.linkedOffer.status === "accepted" ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : conversation.linkedOffer.status === "declined" ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}>
                          {conversation.linkedOffer.status}
                        </Badge>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Listing Price</span>
                          <span>£{conversation.linkedOffer.listingPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Offer Amount</span>
                          <span className="font-semibold text-amber-400">£{conversation.linkedOffer.offerAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Difference</span>
                          <span className="text-red-400">
                            -£{(conversation.linkedOffer.listingPrice - conversation.linkedOffer.offerAmount).toLocaleString()}
                            {" "}({Math.round((1 - conversation.linkedOffer.offerAmount / conversation.linkedOffer.listingPrice) * 100)}% off)
                          </span>
                        </div>
                      </div>

                      {isBusinessView && conversation.linkedOffer.status === "pending" && (
                        <div className="flex gap-2 pt-1">
                          <Button
                            size="sm" className="flex-1 text-xs h-8 gap-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => toast({ title: "Offer Accepted", description: "Demo: Offer accepted" })}
                          >
                            <ThumbsUp className="h-3 w-3" /> Accept
                          </Button>
                          <Button
                            size="sm" variant="outline" className="flex-1 text-xs h-8 gap-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                            onClick={() => toast({ title: "Offer Declined", description: "Demo: Offer declined" })}
                          >
                            <ThumbsDown className="h-3 w-3" /> Decline
                          </Button>
                        </div>
                      )}

                      {!isBusinessView && conversation.linkedOffer.status === "pending" && (
                        <p className="text-[10px] text-muted-foreground italic pt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Waiting for seller to respond…
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground italic p-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3" /> No offer data linked
                </div>
              )}

              {conversation.linkedListing && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</p>
                  <Card className="border-border/30 bg-muted/10">
                    <CardContent className="p-3 space-y-2">
                      <p className="text-sm font-medium">{conversation.linkedListing.title}</p>
                      <p className="text-sm font-bold text-primary">£{conversation.linkedListing.price.toLocaleString()}</p>
                      <Link to={`/marketplace/${conversation.linkedListing.id}`} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                        View Listing <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{otherRoleLabel}</p>
                <Link to={`/user/${other?.username ?? "unknown"}`} className="block">
                  <Card className="border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center text-xl">{otherAvatar.emoji}</div>
                      <div>
                        <p className="text-sm font-medium">{other?.name}</p>
                        <p className="text-[10px] text-muted-foreground">{other?.isOnline ? "🟢 Online" : "⚫ Offline"}</p>
                        <p className="text-[10px] text-primary mt-0.5">View profile →</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </>
          )}

          {/* ─── ORDER ─── */}
          {conversation.type === "order" && (
            <>
              {conversation.linkedOrder ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order Status</p>
                  <Card className="border-border/30 bg-muted/10">
                    <CardContent className="p-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{conversation.linkedOrder.orderId}</span>
                        <Badge
                          variant="outline"
                          className={`text-[9px] px-1.5 py-0 capitalize ${
                            conversation.linkedOrder.status === "delivered" ? "bg-green-500/10 text-green-400 border-green-500/30"
                            : conversation.linkedOrder.status === "shipped" ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                          }`}
                        >
                          {conversation.linkedOrder.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {(["building", "testing", "shipped", "delivered"] as const).map((step, i) => {
                          const steps = ["building", "testing", "shipped", "delivered"];
                          const currentIdx = steps.indexOf(conversation.linkedOrder!.status);
                          const isComplete = i <= currentIdx;
                          const isCurrent = i === currentIdx;
                          return (
                            <div key={step} className="flex items-center gap-2">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                                isComplete ? "bg-primary border-primary text-primary-foreground" : "border-border/50 text-muted-foreground"
                              } ${isCurrent ? "ring-2 ring-primary/30" : ""}`}>
                                {isComplete ? "✓" : i + 1}
                              </div>
                              <span className={`text-xs capitalize ${isComplete ? "text-foreground font-medium" : "text-muted-foreground"}`}>{step}</span>
                            </div>
                          );
                        })}
                      </div>

                      <Separator className="bg-border/20" />

                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Est. delivery: {new Date(conversation.linkedOrder.estimatedDelivery).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                        {conversation.linkedOrder.trackingNumber && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Truck className="h-3 w-3" />
                            <span className="font-mono text-[10px]">{conversation.linkedOrder.trackingNumber}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground italic p-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3" /> No order data linked to this conversation
                </div>
              )}

              {conversation.linkedListing && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</p>
                  <Card className="border-border/30 bg-muted/10">
                    <CardContent className="p-3">
                      <p className="text-sm font-medium">{conversation.linkedListing.title}</p>
                      <p className="text-xs text-primary font-semibold mt-0.5">£{conversation.linkedListing.price.toLocaleString()}</p>
                      <Link to={`/marketplace/${conversation.linkedListing.id}`} className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1">
                        View Listing <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{otherRoleLabel}</p>
                <Link to={`/user/${other?.username ?? "unknown"}`} className="block">
                  <Card className="border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center text-xl">{otherAvatar.emoji}</div>
                      <div>
                        <p className="text-sm font-medium">{other?.name}</p>
                        <p className="text-[10px] text-muted-foreground">{other?.isOnline ? "🟢 Online" : "⚫ Offline"}</p>
                        <p className="text-[10px] text-primary mt-0.5">View profile →</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </>
          )}

          {/* ─── GENERAL ─── */}
          {conversation.type === "general" && (
            <>
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Profile</p>
                <Link to={`/user/${other?.username ?? "unknown"}`} className="block">
                  <Card className="border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center text-2xl">
                        {otherAvatar.emoji}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{other?.name}</p>
                        <p className="text-[10px] text-muted-foreground">{other?.isOnline ? "🟢 Online" : "⚫ Offline"}</p>
                        {userProfile && (
                          <p className="text-[10px] text-muted-foreground mt-0.5">⭐ {userProfile.rating} · {userProfile.location}</p>
                        )}
                        <p className="text-[10px] text-primary mt-0.5">View full profile →</p>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {userProfile?.pcSpecs && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Their PC Setup</p>
                  <Card className="border-border/30 bg-muted/10">
                    <CardContent className="p-3 space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><Cpu className="h-3 w-3" /> {userProfile.pcSpecs.cpu}</div>
                      <div className="flex items-center gap-2"><Monitor className="h-3 w-3" /> {userProfile.pcSpecs.gpu}</div>
                      <div className="flex items-center gap-2"><MemoryStick className="h-3 w-3" /> {userProfile.pcSpecs.ram}</div>
                      <div className="flex items-center gap-2"><HardDrive className="h-3 w-3" /> {userProfile.pcSpecs.storage}</div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {userProfile?.gaming && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Gaming</p>
                  <Card className="border-border/30 bg-muted/10">
                    <CardContent className="p-3 space-y-1.5 text-xs">
                      <div className="flex justify-between"><span className="text-muted-foreground">Playstyle</span><span>{userProfile.gaming.playstyle}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Target FPS</span><span>{userProfile.gaming.targetFps}</span></div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {userProfile.gaming.favouriteGames.map((g) => (
                          <Badge key={g} variant="outline" className="text-[9px] px-1.5 py-0">{g}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}

        </div>
      </ScrollArea>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
 * MAIN MESSAGING PAGE
 * ══════════════════════════════════════════════════════════════════════════════ */
const MessagingPage = () => {
  const { user, isLoading } = useAuth();

  // Auth gate
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

  return <MessagingPageContent userId={user.id} userRole={user.role} />;
};

const MessagingPageContent = ({ userId, userRole }: { userId: string; userRole: string }) => {
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showContext, setShowContext] = useState(true);
  const [localMessages, setLocalMessages] = useState<Record<string, ChatMessage[]>>(messagesMock);
  const [localConversations, setLocalConversations] = useState<Conversation[]>(conversationsMock);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [showIntentModal, setShowIntentModal] = useState(false);
  const [prefillMessage, setPrefillMessage] = useState("");

  useEffect(() => { document.title = "Messages — nYield"; }, []);

  // Filter conversations to only those this user participates in
  const myConversations = getConversationsForUser(userId, localConversations);

  // Auto-select first conversation
  useEffect(() => {
    if (!activeConv && myConversations.length > 0) {
      setActiveConv(myConversations[0].id);
    }
  }, [myConversations, activeConv]);

  const activeConversation = myConversations.find((c) => c.id === activeConv);
  const activeMessages = activeConv ? (localMessages[activeConv] ?? []) : [];

  const totalUnread = myConversations.reduce((sum, conv) => {
    const msgs = localMessages[conv.id] ?? [];
    return sum + msgs.filter((m) => m.senderId !== userId && !m.read).length;
  }, 0);

  const handleSend = useCallback((text: string) => {
    if (!activeConv) return;
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      conversationId: activeConv,
      senderId: userId,
      content: text,
      type: "text",
      timestamp: new Date().toISOString(),
      read: false,
    };
    setLocalMessages((prev) => ({
      ...prev,
      [activeConv]: [...(prev[activeConv] ?? []), newMsg],
    }));
  }, [activeConv, userId]);

  const selectConversation = (id: string) => {
    setActiveConv(id);
    setMobileView("chat");
  };

  const handleIntentSelect = (type: ConversationType, prefill: string) => {
    setShowIntentModal(false);

    // Create a new conversation
    const newConvId = `conv-new-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      type,
      participants: [
        { userId, name: "You", avatar: "man", role: "buyer", isOnline: true, username: "you" },
        { userId: "user-new", name: "New Contact", avatar: "man", role: "seller", isOnline: false, username: "new-contact" },
      ],
      lastMessage: prefill,
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
    };
    setLocalConversations((prev) => [newConv, ...prev]);
    setLocalMessages((prev) => ({ ...prev, [newConvId]: [] }));
    setActiveConv(newConvId);
    setPrefillMessage(prefill);
    setMobileView("chat");
    toast({ title: "New conversation created", description: `Type: ${TYPE_LABELS[type]}` });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pb-6 pt-24">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-heading font-bold">Messages</h1>
                {totalUnread > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {totalUnread} unread
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Keep inquiries, offers, orders, and direct chats organised.
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="hidden gap-1.5 text-xs lg:inline-flex"
              onClick={() => setShowContext(!showContext)}
            >
              {showContext ? <PanelRightClose className="h-3.5 w-3.5" /> : <PanelRightOpen className="h-3.5 w-3.5" />}
              {showContext ? "Hide Context" : "Show Context"}
            </Button>
          </motion.div>

          <div
            className={`grid min-h-[38rem] overflow-hidden rounded-3xl border border-border/30 bg-card/60 shadow-sm backdrop-blur-md ${
              showContext && activeConversation
                ? "md:grid-cols-[minmax(21rem,23rem)_minmax(0,1fr)] lg:grid-cols-[minmax(21rem,23rem)_minmax(0,1fr)_minmax(20rem,22rem)]"
                : "md:grid-cols-[minmax(21rem,23rem)_minmax(0,1fr)]"
            }`}
            style={{ height: "calc(100vh - 168px)" }}
          >
            <section
              className={`${mobileView === "chat" ? "hidden md:flex" : "flex"} min-h-0 min-w-0 flex-col overflow-hidden border-b border-border/30 bg-card/30 md:border-b-0 md:border-r`}
            >
              <ConversationList
                conversations={myConversations}
                activeId={activeConv}
                onSelect={selectConversation}
                search={search}
                onSearchChange={setSearch}
                onNewMessage={() => setShowIntentModal(true)}
                userId={userId}
                localMessages={localMessages}
              />
            </section>

            <section
              className={`${mobileView === "list" ? "hidden md:flex" : "flex"} min-h-0 min-w-0 flex-col overflow-hidden bg-background/20`}
            >
              {activeConversation ? (
                <>
                  <div className="shrink-0 border-b border-border/30 bg-card/30 p-2 md:hidden">
                    <Button variant="ghost" size="sm" onClick={() => setMobileView("list")} className="gap-1">
                      <ChevronLeft className="h-4 w-4" /> Back
                    </Button>
                  </div>
                  <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
                    <ChatWindow
                      conversation={activeConversation}
                      messages={activeMessages}
                      onSendMessage={handleSend}
                      prefillMessage={prefillMessage}
                      onClearPrefill={() => setPrefillMessage("")}
                      userId={userId}
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center px-6 text-muted-foreground">
                  <div className="max-w-sm text-center">
                    <MessageCircle className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
                    <p className="text-sm font-medium text-foreground">
                      {myConversations.length === 0 ? "No conversations yet" : "Select a conversation"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {myConversations.length === 0
                        ? "Start a new conversation from a listing or profile page."
                        : "Choose a chat from the left column to open the full thread and context details."}
                    </p>
                  </div>
                </div>
              )}
            </section>

            <AnimatePresence initial={false}>
              {showContext && activeConversation && (
                <motion.aside
                  key={activeConversation.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.18 }}
                  className="hidden min-h-0 min-w-0 flex-col overflow-hidden border-l border-border/30 bg-card/30 lg:flex"
                >
                  <ContextPanel
                    conversation={activeConversation}
                    onClose={() => setShowContext(false)}
                    userId={userId}
                  />
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <MessageSellerModal
        open={showIntentModal}
        onClose={() => setShowIntentModal(false)}
        onSelectIntent={handleIntentSelect}
      />
    </div>
  );
};

export default MessagingPage;
