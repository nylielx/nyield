/**
 * =============================================================================
 * FAQ PAGE — Full dedicated FAQ page with all categories
 * =============================================================================
 */

import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ThumbsUp, ThumbsDown, Star, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { faqCategories, popularFaqs } from "@/data/temp/faq-mock";

const FaqPage = () => {
  const [search, setSearch] = useState("");
  const [helpful, setHelpful] = useState<Record<string, boolean | null>>({});

  useEffect(() => {
    document.title = "FAQ — nYield";
  }, []);

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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              How can we <span className="text-primary">help</span>?
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Browse our frequently asked questions or search for specific answers.
            </p>

            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for answers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 text-base bg-card/60 border-border/40 backdrop-blur-sm rounded-xl"
              />
            </div>
          </motion.div>

          {/* Popular chips */}
          {!search && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 text-center">
                Most Asked
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {popularFaqs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => setSearch(faq.question)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    <Star className="h-3 w-3" />
                    {faq.question.length > 45 ? faq.question.slice(0, 45) + "…" : faq.question}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* All categories */}
          <div className="space-y-8">
            {filtered.map((category, catIdx) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIdx * 0.06 }}
                  className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-6 hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-foreground">{category.label}</h2>
                    <span className="ml-auto text-xs text-muted-foreground">{category.items.length} questions</span>
                  </div>

                  <Accordion type="single" collapsible>
                    {category.items.map((item) => (
                      <AccordionItem key={item.id} value={item.id} className="border-border/20">
                        <AccordionTrigger className="text-sm text-foreground/90 hover:text-foreground hover:no-underline py-3">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                          <p>{item.answer}</p>
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
            <div className="text-center py-16">
              <HelpCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">No results found for "{search}"</p>
              <Link to="/support" className="text-sm text-primary hover:underline">
                Contact support instead →
              </Link>
            </div>
          )}

          {/* Need help choosing CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-8 text-center"
          >
            <h3 className="font-heading text-xl font-semibold mb-2">Need help choosing?</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Not sure which edition is right for you? Our support team and FAQ can guide you.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/support"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Contact Support <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/50 text-foreground font-medium text-sm hover:bg-muted transition-colors"
              >
                Take the Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default FaqPage;
