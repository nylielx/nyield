/**
 * =============================================================================
 * SUPPORT HUB PAGE — Contact, tickets, smart FAQ, messaging integration
 * =============================================================================
 */

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle, Mail, FileText, Plus, Search,
  AlertTriangle, CheckCircle2, Clock, ArrowRight,
  HelpCircle, ChevronRight, Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAuth } from "@/contexts/AuthContext";
import { ticketCategories, mockTickets, type SupportTicket, type TicketStatus } from "@/data/temp/support-mock";
import { faqCategories } from "@/data/temp/faq-mock";
import { toast } from "sonner";

const statusConfig: Record<TicketStatus, { label: string; icon: typeof Clock; className: string }> = {
  open: { label: "Open", icon: AlertTriangle, className: "text-yellow-500 bg-yellow-500/10" },
  in_progress: { label: "In Progress", icon: Clock, className: "text-blue-500 bg-blue-500/10" },
  resolved: { label: "Resolved", icon: CheckCircle2, className: "text-green-500 bg-green-500/10" },
};

const SupportPage = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"contact" | "tickets" | "new-ticket">("contact");
  const [tickets, setTickets] = useState<SupportTicket[]>(user ? mockTickets : []);
  const [ticketSearch, setTicketSearch] = useState("");

  // New ticket form
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [orderRef, setOrderRef] = useState("");
  const [description, setDescription] = useState("");

  // Smart suggestions
  const smartSuggestions = useMemo(() => {
    if (!subject && !description) return [];
    const query = (subject + " " + description).toLowerCase();
    return faqCategories
      .flatMap((c) => c.items)
      .filter(
        (i) =>
          i.question.toLowerCase().includes(query) ||
          i.answer.toLowerCase().includes(query)
      )
      .slice(0, 3);
  }, [subject, description]);

  useEffect(() => {
    document.title = "Support — nYield";
  }, []);

  const handleSubmitTicket = () => {
    if (!subject || !category) {
      toast.error("Please fill in the subject and category.");
      return;
    }
    const newTicket: SupportTicket = {
      id: `TK-${String(tickets.length + 1).padStart(3, "0")}`,
      subject,
      category,
      priority,
      status: "open",
      orderRef: orderRef || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        { sender: "user", text: description || subject, timestamp: new Date().toISOString() },
      ],
    };
    setTickets((prev) => [newTicket, ...prev]);
    toast.success("Ticket created!", { description: `Reference: ${newTicket.id}` });
    setSubject("");
    setCategory("");
    setDescription("");
    setOrderRef("");
    setTab("tickets");
  };

  const filteredTickets = ticketSearch
    ? tickets.filter(
        (t) =>
          t.subject.toLowerCase().includes(ticketSearch.toLowerCase()) ||
          t.id.toLowerCase().includes(ticketSearch.toLowerCase())
      )
    : tickets;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Support <span className="text-primary">Hub</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get help fast. Browse FAQs, chat with us, or submit a support ticket.
            </p>
          </motion.div>

          {/* Quick Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-10"
          >
            {[
              {
                icon: MessageCircle,
                title: "Live Chat",
                desc: "Chat with our team",
                action: user ? (
                  <Link to="/messages" className="text-xs text-primary hover:underline flex items-center gap-1">
                    Open Messages <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <span className="text-xs text-muted-foreground">Sign in to chat</span>
                ),
              },
              {
                icon: Mail,
                title: "Email",
                desc: "support@nyield.com",
                action: (
                  <a href="mailto:support@nyield.com" className="text-xs text-primary hover:underline flex items-center gap-1">
                    Send Email <ArrowRight className="h-3 w-3" />
                  </a>
                ),
              },
              {
                icon: FileText,
                title: "FAQ",
                desc: "Browse common questions",
                action: (
                  <Link to="/faq" className="text-xs text-primary hover:underline flex items-center gap-1">
                    View FAQ <ArrowRight className="h-3 w-3" />
                  </Link>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border/30 bg-card/40 backdrop-blur-md p-5 hover:border-primary/20 transition-colors group"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                {item.action}
              </div>
            ))}
          </motion.div>

          {/* Tab navigation */}
          <div className="flex gap-2 p-1 rounded-xl bg-muted/50 w-fit mb-8">
            {[
              { id: "contact" as const, label: "Overview" },
              { id: "tickets" as const, label: `My Tickets${tickets.length ? ` (${tickets.length})` : ""}` },
              { id: "new-ticket" as const, label: "New Ticket" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === t.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Contact / Overview */}
          {tab === "contact" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-6">
                <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" /> Quick FAQ
                </h3>
                <Accordion type="single" collapsible>
                  {faqCategories
                    .flatMap((c) => c.items)
                    .filter((i) => i.popular)
                    .slice(0, 5)
                    .map((item) => (
                      <AccordionItem key={item.id} value={item.id} className="border-border/20">
                        <AccordionTrigger className="text-sm hover:no-underline py-3">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
                <Link to="/faq" className="text-sm text-primary hover:underline mt-4 inline-block">
                  View all FAQs →
                </Link>
              </div>

              {!user && (
                <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-6 text-center">
                  <p className="text-muted-foreground text-sm mb-3">Sign in to submit tickets and access live chat.</p>
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    Sign In <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* Tickets list */}
          {tab === "tickets" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {!user ? (
                <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-8 text-center">
                  <p className="text-muted-foreground mb-3">Sign in to view your support tickets.</p>
                  <Link to="/signin" className="text-sm text-primary hover:underline">
                    Sign In →
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search tickets..."
                        value={ticketSearch}
                        onChange={(e) => setTicketSearch(e.target.value)}
                        className="pl-10 bg-card/60 border-border/40"
                      />
                    </div>
                    <Button onClick={() => setTab("new-ticket")} size="sm" className="gap-1">
                      <Plus className="h-4 w-4" /> New
                    </Button>
                  </div>

                  {filteredTickets.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
                      <p>No tickets yet. Need help?</p>
                      <button onClick={() => setTab("new-ticket")} className="text-sm text-primary hover:underline mt-2">
                        Create your first ticket
                      </button>
                    </div>
                  ) : (
                    filteredTickets.map((ticket) => {
                      const status = statusConfig[ticket.status];
                      const StatusIcon = status.icon;
                      return (
                        <div
                          key={ticket.id}
                          className="rounded-xl border border-border/30 bg-card/40 backdrop-blur-md p-4 hover:border-primary/20 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${status.className}`}>
                                  <StatusIcon className="h-2.5 w-2.5" />
                                  {status.label}
                                </span>
                              </div>
                              <h4 className="font-medium text-foreground text-sm truncate">{ticket.subject}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {ticket.category} · Updated {new Date(ticket.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                          </div>
                        </div>
                      );
                    })
                  )}
                </>
              )}
            </motion.div>
          )}

          {/* New ticket form */}
          {tab === "new-ticket" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {!user ? (
                <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-8 text-center">
                  <p className="text-muted-foreground mb-3">Sign in to submit a support ticket.</p>
                  <Link to="/signin" className="text-sm text-primary hover:underline">
                    Sign In →
                  </Link>
                </div>
              ) : (
                <div className="grid lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-3 rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-6 space-y-5">
                    <h3 className="font-heading font-semibold flex items-center gap-2">
                      <Plus className="h-4 w-4 text-primary" /> New Support Ticket
                    </h3>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Subject *</label>
                      <Input
                        placeholder="Brief description of your issue..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="bg-card/60 border-border/40"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Category *</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="">Select category</option>
                          {ticketCategories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Priority</label>
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Order Reference (optional)</label>
                      <Input
                        placeholder="e.g. ORD-2024-1234"
                        value={orderRef}
                        onChange={(e) => setOrderRef(e.target.value)}
                        className="bg-card/60 border-border/40"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                      <Textarea
                        placeholder="Describe your issue in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-card/60 border-border/40 min-h-[120px]"
                      />
                    </div>

                    <Button onClick={handleSubmitTicket} className="w-full gap-2">
                      <Send className="h-4 w-4" /> Submit Ticket
                    </Button>
                  </div>

                  {/* Smart suggestions */}
                  <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-5 sticky top-28">
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary" /> Related Answers
                      </h4>
                      {smartSuggestions.length > 0 ? (
                        <div className="space-y-3">
                          {smartSuggestions.map((faq) => (
                            <div key={faq.id} className="rounded-lg border border-border/20 p-3">
                              <h5 className="text-xs font-medium text-foreground mb-1">{faq.question}</h5>
                              <p className="text-[11px] text-muted-foreground line-clamp-2">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Start typing your subject or description and we'll suggest relevant FAQ answers that might help.
                        </p>
                      )}

                      <div className="mt-4 pt-4 border-t border-border/20">
                        <Link to="/faq" className="text-xs text-primary hover:underline">
                          Browse all FAQs →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default SupportPage;
