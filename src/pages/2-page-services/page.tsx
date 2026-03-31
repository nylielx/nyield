/**
 * =============================================================================
 * SERVICES PAGE — In-depth page for nYield's Custom Operating Systems
 * =============================================================================
 *
 * FILE NAME: ServicesPage.tsx
 * Named clearly so you know this is the FULL PAGE for the Services section.
 * This is different from the ServicesSection component (which is just a
 * summary section on the landing page).
 *
 * ROLE:
 * Provides detailed information about each OS edition — features, use cases,
 * comparisons, and FAQs. This is where users go to learn everything before
 * making a purchase decision.
 *
 * ROUTE: /services (defined in App.tsx)
 *
 * DATA FLOW:
 * Imports OS product data from src/data/osProducts.ts — same data source
 * as the landing page section, maintaining the "single source of truth".
 * =============================================================================
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap,
  Scale,
  GraduationCap,
  Check,
  ArrowLeft,
  ArrowRight,
  Shield,
  Gauge,
  Laptop,
  Clock,
} from "lucide-react";
import { osProducts, type OSProduct } from "@/data/osProducts";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";

/**
 * Maps string icon names from data → real Lucide components.
 * This pattern lets us store icon names as strings in our data files
 * (since JSON can't hold React components) and resolve them at render time.
 */
const iconMap: Record<string, React.ElementType> = {
  Zap,
  Scale,
  GraduationCap,
};

/**
 * Additional detail for each OS edition — things too long for the landing page.
 * In production, this would come from a CMS or database.
 */
const osDetails: Record<string, { useCases: string[]; whyChoose: string }> = {
  competitive: {
    useCases: [
      "Professional esports athletes competing in tournaments",
      "Ranked ladder grinders who need every frame advantage",
      "FPS players where input lag directly impacts performance",
      "Streamers who need high FPS while broadcasting",
    ],
    whyChoose:
      "The Competitive Edition strips your OS down to the essentials. Every unnecessary service, background process, and telemetry call is removed or disabled. Your CPU and GPU focus entirely on your game, delivering the lowest possible input latency and the highest possible frame rates.",
  },
  balanced: {
    useCases: [
      "Students who game between study sessions",
      "Content creators using Adobe suite and gaming",
      "Remote workers who want a gaming-ready workstation",
      "Casual gamers who also need a productive daily driver",
    ],
    whyChoose:
      "The Balanced Edition gives you the best of both worlds. It keeps your system snappy for productivity tasks like web browsing, document editing, and creative software — but includes a one-click Gaming Mode that shifts resources to maximize game performance when you're ready to play.",
  },
  education: {
    useCases: [
      "School and university students needing focus tools",
      "Parents wanting a safe, distraction-free setup for kids",
      "Learners who use their gaming PC for coursework",
      "Students on a budget who need their PC to do everything",
    ],
    whyChoose:
      "The Education Edition includes built-in focus tools like distraction blocking, quiet background operation, and study-friendly power profiles. When it's time to relax, toggle into gaming mode for competitive-grade performance. It's designed to help students succeed without giving up gaming.",
  },
};

const ServicesPage = () => {
  /**
   * Set the page title for SEO.
   * Each page should have a unique, descriptive title.
   */
  useEffect(() => {
    document.title = "Custom Operating Systems — nYield Services";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ----------------------------------------------------------------
       * PAGE HERO
       * Every dedicated page gets its own hero section. This is smaller
       * than the landing page hero — it's informational, not promotional.
       * ---------------------------------------------------------------- */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6">
          {/* Back navigation — helps users return to landing page */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              Custom <span className="text-gradient-glow-wrapper"><span className="text-gradient-glow">Operating Systems</span></span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Performance-tuned Windows configurations that squeeze every last
              drop of power from your hardware. Choose the edition built for
              your workflow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
       * WHY NYIELD OS — Value proposition section
       * Explains the core benefit before diving into specific editions.
       * ---------------------------------------------------------------- */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why a Custom OS?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stock Windows comes loaded with background processes, telemetry,
              and bloatware that steal your performance. Our custom builds
              remove the noise so your hardware can breathe.
            </p>
          </motion.div>

          {/* Benefit cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Gauge,
                title: "Higher FPS",
                desc: "Up to 30% more frames by eliminating background resource drain.",
              },
              {
                icon: Clock,
                title: "Lower Latency",
                desc: "Reduced input lag for competitive advantage in fast-paced games.",
              },
              {
                icon: Shield,
                title: "Cleaner System",
                desc: "No bloatware, no unnecessary services, no telemetry phoning home.",
              },
              {
                icon: Laptop,
                title: "Better Battery",
                desc: "Laptop users see improved battery life from reduced background activity.",
              },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border text-center"
              >
                <benefit.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
       * OS EDITION DETAIL CARDS
       * Each edition gets a full-width detailed breakdown with features,
       * use cases, and a "why choose this" explanation.
       * ---------------------------------------------------------------- */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 space-y-20">
          {osProducts.map((product, index) => {
            const IconComponent = iconMap[product.icon] || Zap;
            const details = osDetails[product.id];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? "md:direction-rtl" : ""
                }`}
              >
                {/* Left: Product info */}
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    {product.highlighted && (
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-3xl font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">
                    {product.tagline}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {product.description}
                  </p>

                  {/* Extended description */}
                  {details && (
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      {details.whyChoose}
                    </p>
                  )}

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    Get {product.name} <ArrowRight size={16} />
                  </a>
                </div>

                {/* Right: Features + use cases */}
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  {/* Features list */}
                  <div className="rounded-xl border border-border bg-card p-6 mb-6">
                    <h4 className="font-heading font-bold text-foreground mb-4">
                      Features
                    </h4>
                    <ul className="space-y-3">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <Check
                            size={16}
                            className="text-primary mt-0.5 flex-shrink-0"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use cases */}
                  {details && (
                    <div className="rounded-xl border border-border bg-card p-6">
                      <h4 className="font-heading font-bold text-foreground mb-4">
                        Ideal For
                      </h4>
                      <ul className="space-y-3">
                        {details.useCases.map((useCase) => (
                          <li
                            key={useCase}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <ArrowRight
                              size={14}
                              className="text-primary mt-0.5 flex-shrink-0"
                            />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ServicesPage;
