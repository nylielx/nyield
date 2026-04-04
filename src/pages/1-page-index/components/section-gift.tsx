/**
 * =============================================================================
 * GIFT SECTION — "Gift nYield" on the landing page
 * =============================================================================
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { giftCardOptions, giftableProducts, giftSocialProof } from "@/data/temp/gift-mock";

const SectionGift = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>("gc-100");

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Gift className="h-3.5 w-3.5" />
            Perfect for gamers
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Gift <span className="text-primary">nYield</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Boost someone's setup instantly. Send a digital gift card or a full optimisation package.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Gift Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-6 space-y-5"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-heading font-semibold text-foreground">Digital Gift Card</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {giftCardOptions.map((gc) => (
                <button
                  key={gc.id}
                  onClick={() => setSelectedCard(gc.id)}
                  className={`relative rounded-xl border p-4 text-center transition-all hover-scale ${
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
                  <span className="text-xl font-bold text-foreground">{gc.label}</span>
                </button>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/gift"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Send Gift Card <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap gap-2 justify-center">
              {giftSocialProof.map((text) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/50 px-2 py-1 rounded-full"
                >
                  <Heart className="h-2.5 w-2.5 text-primary" />
                  {text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Giftable Products */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {giftableProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-xl border border-border/30 bg-card/40 backdrop-blur-md p-4 flex items-center gap-4 hover:border-primary/20 hover:shadow-[0_0_16px_hsl(var(--primary)/0.08)] transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  {product.type === "surprise" ? (
                    <Sparkles className="h-5 w-5 text-primary" />
                  ) : (
                    <Gift className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm">{product.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{product.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-foreground">£{product.price}</span>
                  <Link
                    to="/gift"
                    className="block text-[11px] text-primary hover:underline mt-0.5"
                  >
                    Gift this →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionGift;
