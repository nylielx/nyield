/**
 * =============================================================================
 * MESSAGING PAGE — Full chat system with context panels
 * =============================================================================
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Search, ChevronRight, ChevronLeft, MessageCircle, Sparkles,
  CheckCheck, Check, Circle, ExternalLink, Cpu, Monitor, MemoryStick,
  PanelRightOpen, PanelRightClose, Bot, Zap, X,
} from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { getAvatarById } from "@/data/temp/8-user-profile-mock";
import { toast } from "@/hooks/use-toast";
import {
  conversationsMock, messagesMock, aiSuggestionsMock, quickActions,
  type Conversation, type ChatMessage, type AiSuggestion,
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

/* ══════════════════════════════════════════════════════════════════════════════
 * CONVERSATION LIST COMPONENT
 * ══════════════════════════════════════════════════════════════════════════════ */
const ConversationList = ({
  conversations, activeId, onSelect, search, onSearchChange,
}: {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
}) => {
  const filtered = conversations.filter((c) => {
    const names = c.participants.map((p) => p.name.toLowerCase()).join(" ");
    return names.includes(search.toLowerCase()) || (c.linkedListingTitle ?? "").toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-3 border-b border-border/30">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 h-9 text-sm bg-muted/20 border-border/30"
          />
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-0.5">
          {filtered.map((conv) => {
            const other = conv.participants.find((p) => p.userId !== "user-001");
            if (!other) return null;
            const avatar = getAvatarById(other.avatar);
            const isActive = conv.id === activeId;

            return (
              <motion.button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted/20 border border-transparent"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar with online indicator */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center text-lg">
                      {avatar.emoji}
                    </div>
                    {other.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium truncate">{other.name}</span>
                        {conv.verified && (
                          <Badge variant="outline" className="text-[9px] px-1 py-0 bg-primary/10 text-primary border-primary/30">✓</Badge>
                        )}
                        {conv.type === "support" && (
                          <Badge variant="outline" className="text-[9px] px-1 py-0">Support</Badge>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo(conv.lastMessageTime)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
                    {conv.linkedListingTitle && (
                      <p className="text-[10px] text-primary/70 truncate mt-0.5">📦 {conv.linkedListingTitle}</p>
                    )}
                  </div>
                  {conv.unreadCount > 0 && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-primary-foreground">{conv.unreadCount}</span>
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
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
  conversation, messages, onSendMessage,
}: {
  conversation: Conversation;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}) => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.senderId === user?.id) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [messages, user?.id]);

  const other = conversation.participants.find((p) => p.userId !== "user-001");
  const otherAvatar = getAvatarById(other?.avatar ?? "man");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
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
            <Link to={`/user/${other?.name?.toLowerCase().replace(/\s/g, "")}`} className="text-sm font-semibold hover:text-primary transition-colors">{other?.name}</Link>
            {conversation.verified && <Badge variant="outline" className="text-[9px] px-1 py-0 bg-primary/10 text-primary border-primary/30">Verified</Badge>}
          </div>
          <p className="text-[10px] text-muted-foreground">
            {other?.isOnline ? "Online" : `Last seen ${timeAgo(other?.lastSeen ?? "")}`}
          </p>
        </div>
        {conversation.businessName && (
          <Badge variant="secondary" className="text-xs gap-1">🏢 {conversation.businessName}</Badge>
        )}
      </div>

      {/* Context banner for linked listing */}
      {conversation.linkedListingTitle && (
        <div className="px-4 py-2 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">📦 Re:</span>
          <span className="text-xs font-medium text-primary">{conversation.linkedListingTitle}</span>
          <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isMine = msg.senderId === "user-001";
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] ${isMine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  {/* Rich cards */}
                  {msg.type === "listing-card" && msg.cardData && <ListingCard data={msg.cardData} />}
                  {msg.type === "specs-card" && msg.cardData && <SpecsCard data={msg.cardData} />}
                  {msg.type === "ai-suggestion" && msg.cardData && <AiCard data={msg.cardData} />}

                  {/* Text bubble */}
                  {msg.content && (
                    <div className={`rounded-2xl px-3.5 py-2 text-sm ${
                      isMine
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted/30 text-foreground rounded-bl-md"
                    }`}>
                      {msg.content}
                    </div>
                  )}

                  {/* Meta */}
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

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
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
            onClick={() => toast({ title: qa.label, description: "Quick action triggered (mock)" })}
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
 * CONTEXT + AI PANEL
 * ══════════════════════════════════════════════════════════════════════════════ */
const ContextPanel = ({
  conversation, onClose,
}: {
  conversation: Conversation;
  onClose: () => void;
}) => {
  const other = conversation.participants.find((p) => p.userId !== "user-001");
  const otherAvatar = getAvatarById(other?.avatar ?? "man");

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/30 flex items-center justify-between">
        <span className="text-sm font-semibold">Context</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4 space-y-5">
        <div className="space-y-5">
          {/* Profile Preview */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Profile</p>
            <Link to={`/user/${other?.name?.toLowerCase().replace(/\s/g, "")}`} className="block">
              <Card className="border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center text-2xl">
                    {otherAvatar.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{other?.name}</p>
                    <p className="text-[10px] text-muted-foreground">{other?.isOnline ? "🟢 Online" : "⚫ Offline"}</p>
                    <p className="text-[10px] text-primary mt-0.5">View full profile →</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Business info */}
          {conversation.businessName && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business</p>
              <Link to={`/business/${conversation.businessName.toLowerCase().replace(/\s/g, "-")}`}>
                <Card className="border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{conversation.businessName}</span>
                      {conversation.verified && <Badge className="text-[9px] bg-primary/10 text-primary border-primary/30">✓ Verified</Badge>}
                    </div>
                    {conversation.businessRating && (
                      <div className="flex items-center gap-1 text-xs">
                        <span>⭐</span>
                        <span className="font-medium">{conversation.businessRating}</span>
                        <span className="text-muted-foreground">rating</span>
                      </div>
                    )}
                    <p className="text-[10px] text-primary">View business profile →</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}

          {/* Linked Listing */}
          {conversation.linkedListingTitle && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Linked Listing</p>
              <Card className="border-border/30 bg-muted/10">
                <CardContent className="p-3">
                  <p className="text-sm font-medium">{conversation.linkedListingTitle}</p>
                  <Link to={`/marketplace/${conversation.linkedListingId}`} className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1">
                    View Listing <ExternalLink className="h-2.5 w-2.5" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          <Separator className="bg-border/20" />

          {/* AI Suggestions */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Insights</p>
            </div>
            {aiSuggestionsMock.slice(0, 3).map((sug) => (
              <motion.div
                key={sug.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/10 transition-colors cursor-pointer">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{sug.emoji}</span>
                      <div className="flex-1">
                        <p className="text-xs font-medium">{sug.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{sug.description}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[10px] h-6 px-2 mt-1.5 text-purple-400 hover:text-purple-300 gap-1"
                          onClick={() => toast({ title: sug.actionLabel, description: "AI action triggered" })}
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
        </div>
      </ScrollArea>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
 * MAIN MESSAGING PAGE
 * ══════════════════════════════════════════════════════════════════════════════ */
const MessagingPage = () => {
  const { user } = useAuth();
  const [activeConv, setActiveConv] = useState<string | null>("conv-1");
  const [search, setSearch] = useState("");
  const [showContext, setShowContext] = useState(true);
  const [localMessages, setLocalMessages] = useState(messagesMock);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  useEffect(() => { document.title = "Messages — nYield"; }, []);

  const activeConversation = conversationsMock.find((c) => c.id === activeConv);
  const activeMessages = activeConv ? (localMessages[activeConv] ?? []) : [];

  const handleSend = (text: string) => {
    if (!activeConv || !user) return;
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      conversationId: activeConv,
      senderId: "user-001",
      content: text,
      type: "text",
      timestamp: new Date().toISOString(),
      read: false,
    };
    setLocalMessages((prev) => ({
      ...prev,
      [activeConv]: [...(prev[activeConv] ?? []), newMsg],
    }));
  };

  const selectConversation = (id: string) => {
    setActiveConv(id);
    setMobileView("chat");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-heading font-bold">Messages</h1>
              <Badge variant="secondary" className="text-xs">
                {conversationsMock.reduce((s, c) => s + c.unreadCount, 0)} unread
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs hidden md:flex"
              onClick={() => setShowContext(!showContext)}
            >
              {showContext ? <PanelRightClose className="h-3.5 w-3.5" /> : <PanelRightOpen className="h-3.5 w-3.5" />}
              {showContext ? "Hide Context" : "Show Context"}
            </Button>
          </motion.div>

          {/* Chat layout */}
          <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-md overflow-hidden" style={{ height: "calc(100vh - 160px)" }}>
            <div className="flex h-full">
              {/* Conversation list — hidden on mobile when viewing chat */}
              <div className={`w-full md:w-80 border-r border-border/30 shrink-0 ${mobileView === "chat" ? "hidden md:flex" : "flex"} flex-col`}>
                <ConversationList
                  conversations={conversationsMock}
                  activeId={activeConv}
                  onSelect={selectConversation}
                  search={search}
                  onSearchChange={setSearch}
                />
              </div>

              {/* Chat window */}
              <div className={`flex-1 flex flex-col ${mobileView === "list" ? "hidden md:flex" : "flex"}`}>
                {activeConversation ? (
                  <>
                    {/* Mobile back button */}
                    <div className="md:hidden p-2 border-b border-border/30">
                      <Button variant="ghost" size="sm" onClick={() => setMobileView("list")} className="gap-1">
                        <ChevronLeft className="h-4 w-4" /> Back
                      </Button>
                    </div>
                    <ChatWindow
                      conversation={activeConversation}
                      messages={activeMessages}
                      onSendMessage={handleSend}
                    />
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <MessageCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                      <p className="text-sm">Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Context panel */}
              <AnimatePresence>
                {showContext && activeConversation && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-l border-border/30 hidden lg:flex flex-col overflow-hidden shrink-0"
                  >
                    <ContextPanel conversation={activeConversation} onClose={() => setShowContext(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagingPage;
