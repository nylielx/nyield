/**
 * =============================================================================
 * FAQ SECTION — Landing page accordion FAQ with search & feedback
 * =============================================================================
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { faqCategories, popularFaqs } from "@/data/temp/faq-mock";
import { Link } from "react-router-dom";

const SectionFaq = () => {
  const [search, setSearch] = useState("");
  const [helpful, setHelpful] = useState<Record<string, boolean | null>>({});

  const filtered = search.trim()
    ? faqCategories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (i) =>
              i.question.toLowerCase().includes(search.toLowerCase()) ||
              i.answer.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : faqCategories;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Quick answers to the most common questions about nYield.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card/60 border-border/40 backdrop-blur-sm"
            />
          </div>
        </motion.div>

        {/* Popular questions chips */}
        {!search && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {popularFaqs.slice(0, 4).map((faq) => (
              <button
                key={faq.id}
                onClick={() => setSearch(faq.question)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Star className="h-3 w-3" />
                {faq.question.length > 40 ? faq.question.slice(0, 40) + "…" : faq.question}
              </button>
            ))}
          </motion.div>
        )}

        {/* Category accordions */}
        <div className="space-y-6">
          {filtered.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.08 }}
                className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-5 hover:border-primary/20 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">{category.label}</h3>
                </div>

                <Accordion type="single" collapsible className="space-y-0">
                  {category.items.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-border/20">
                      <AccordionTrigger className="text-sm text-foreground/90 hover:text-foreground hover:no-underline py-3">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        <p>{item.answer}</p>
                        {/* Feedback */}
                        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/20">
                          <span className="text-xs text-muted-foreground">Did this help?</span>
                          <button
                            onClick={() => setHelpful((p) => ({ ...p, [item.id]: true }))}
                            className={`p-1.5 rounded-md transition-colors ${
                              helpful[item.id] === true
                                ? "bg-primary/20 text-primary"
                                : "hover:bg-muted text-muted-foreground"
                            }`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setHelpful((p) => ({ ...p, [item.id]: false }))}
                            className={`p-1.5 rounded-md transition-colors ${
                              helpful[item.id] === false
                                ? "bg-destructive/20 text-destructive"
                                : "hover:bg-muted text-muted-foreground"
                            }`}
                          >
                            <ThumbsDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No results found. Try a different search term or{" "}
            <Link to="/support" className="text-primary hover:underline">
              contact support
            </Link>
            .
          </p>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm mb-3">Still have questions?</p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/faq"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all FAQs →
            </Link>
            <span className="text-border">|</span>
            <Link
              to="/support"
              className="text-sm font-medium text-primary hover:underline"
            >
              Contact Support →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionFaq;
