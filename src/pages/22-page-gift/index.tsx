/**
 * =============================================================================
 * GIFT PAGE — Full gifting experience with cards, products, custom message
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, Heart, ArrowRight, Calendar, MessageSquare, Send } from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { giftCardOptions, giftableProducts, giftSocialProof } from "@/data/temp/gift-mock";
import { toast } from "sonner";

const GiftPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>("gc-100");
  const [customAmount, setCustomAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [tab, setTab] = useState<"card" | "product">("card");

  useEffect(() => {
    document.title = "Gift nYield — Send the Perfect Gaming Gift";
  }, []);

  const handleSend = () => {
    if (!recipientEmail) {
      toast.error("Please enter the recipient's email address.");
      return;
    }
    toast.success("Gift sent! 🎉", {
      description: `A gift notification has been sent to ${recipientEmail}.`,
    });
  };

  const selectedGc = giftCardOptions.find((gc) => gc.id === selectedCard);
  const selectedProd = giftableProducts.find((p) => p.id === selectedProduct);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              <Gift className="h-3.5 w-3.5" />
              Boost someone's setup
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Gift <span className="text-primary">nYield</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              The perfect gift for any PC enthusiast. Send a digital gift card or a full optimisation package instantly.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Selection */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tab toggle */}
              <div className="flex gap-2 p-1 rounded-xl bg-muted/50 w-fit">
                <button
                  onClick={() => setTab("card")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tab === "card" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Gift Card
                </button>
                <button
                  onClick={() => setTab("product")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tab === "product" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Gift a Product
                </button>
              </div>

              {tab === "card" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-6 space-y-5"
                >
                  <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" /> Choose Amount
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {giftCardOptions.map((gc) => (
                      <button
                        key={gc.id}
                        onClick={() => { setSelectedCard(gc.id); setCustomAmount(""); }}
                        className={`relative rounded-xl border p-5 text-center transition-all hover-scale ${
                          selectedCard === gc.id
                            ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                            : "border-border/30 bg-card/60 hover:border-primary/30"
                        }`}
                      >
                        {gc.popular && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full">
                            Popular
                          </span>
                        )}
                        <span className="text-2xl font-bold text-foreground">{gc.label}</span>
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Custom amount (£)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount..."
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedCard(null); }}
                      className="bg-card/60 border-border/40"
                    />
                  </div>
                </motion.div>
              )}

              {tab === "product" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  {giftableProducts.map((product, idx) => (
                    <motion.button
                      key={product.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedProduct(product.id)}
                      className={`w-full rounded-xl border p-5 flex items-center gap-4 transition-all text-left ${
                        selectedProduct === product.id
                          ? "border-primary bg-primary/10 shadow-[0_0_16px_hsl(var(--primary)/0.1)]"
                          : "border-border/30 bg-card/40 backdrop-blur-md hover:border-primary/20"
                      }`}
                    >
                      <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {product.type === "surprise" ? (
                          <Sparkles className="h-5 w-5 text-primary" />
                        ) : (
                          <Gift className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground">{product.name}</h4>
                        <p className="text-xs text-muted-foreground">{product.description}</p>
                      </div>
                      <span className="text-lg font-bold text-foreground shrink-0">£{product.price}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right: Details form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-6 space-y-5 sticky top-28"
              >
                <h3 className="font-heading font-semibold text-foreground">Gift Details</h3>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Recipient's Email *</label>
                  <Input
                    type="email"
                    placeholder="friend@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="bg-card/60 border-border/40"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> Personal Message
                  </label>
                  <Textarea
                    placeholder="Happy birthday! Enjoy the upgrade 🎮"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-card/60 border-border/40 min-h-[80px]"
                  />
                </div>

                <div className="rounded-xl bg-muted/30 p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gift</span>
                    <span className="font-medium text-foreground">
                      {tab === "card"
                        ? customAmount
                          ? `£${customAmount}`
                          : selectedGc?.label ?? "—"
                        : selectedProd
                        ? `£${selectedProd.price}`
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground">Digital (Instant)</span>
                  </div>
                </div>

                <Button onClick={handleSend} className="w-full gap-2">
                  <Send className="h-4 w-4" /> Send Gift
                </Button>

                {/* Social proof */}
                <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                  {giftSocialProof.map((text) => (
                    <span
                      key={text}
                      className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full"
                    >
                      <Heart className="h-2.5 w-2.5 text-primary" />
                      {text}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default GiftPage;
