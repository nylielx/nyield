/**
 * =============================================================================
 * SERVICES SECTION — nYield's Custom Operating Systems
 * =============================================================================
 *
 * ROLE:
 * Showcases the three OS editions as feature cards. Each card explains
 * what the edition does and who it's for.
 *
 * DATA FLOW:
 * This component IMPORTS data from src/data/osProducts.ts.
 * It doesn't hardcode product info — if products change, we only
 * update the data file. This is the "single source of truth" pattern.
 *
 * WHY CARDS?
 * Cards are the standard UI pattern for displaying a collection of
 * similar items. They're scannable, responsive, and visually clean.
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Zap, Scale, GraduationCap, Check } from "lucide-react";
import { osProducts, type OSProduct } from "@/data/osProducts";

/**
 * Maps icon string names to actual Lucide icon components.
 * We do this because JSON/data files can't store React components —
 * they store strings, and we map them here.
 */
const iconMap: Record<string, React.ElementType> = {
  Zap,
  Scale,
  GraduationCap,
};

/**
 * Individual OS card component.
 * Extracted as a sub-component for clarity and potential reuse.
 *
 * PROPS:
 * @param product - The OS product data to display
 * @param index  - Position in the list (used for staggered animation delay)
 */
const OSCard = ({ product, index }: { product: OSProduct; index: number }) => {
  const IconComponent = iconMap[product.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      /**
       * whileHover adds interactive feedback.
       * Scaling up slightly (1.02) gives a "lifted" feeling.
       * The y: -5 adds a subtle upward shift.
       */
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative rounded-xl p-8 transition-shadow duration-300 ${
        product.highlighted
          ? "glass-elevated border-primary/50 shadow-lg glow-sm"
          : "glass-base hover:shadow-lg"
      }`}
    >
      {/* "Popular" badge for highlighted product */}
      {product.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          Most Popular
        </div>
      )}

      <IconComponent className="w-10 h-10 text-primary mb-4" />
      <div className="text-gradient-glow-wrapper">
        <h3 className="font-heading text-xl font-bold text-gradient-glow mb-2">
          {product.name}
        </h3>
      </div>
      <p className="text-primary text-sm font-medium mb-3">{product.tagline}</p>
      <p className="text-muted-foreground text-sm mb-6">{product.description}</p>

      {/* Feature list with check icons */}
      <ul className="space-y-2">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Custom <span className="text-gradient-glow-wrapper"><span className="text-gradient-glow">Operating Systems</span></span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Performance-tuned configurations delivered through the nYield app.
            Choose the edition that matches your workflow.
          </p>
        </motion.div>

        {/* OS cards grid — responsive: 1 col on mobile, 3 on desktop */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {osProducts.map((product, index) => (
            <OSCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
