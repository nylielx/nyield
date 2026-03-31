/**
 * =============================================================================
 * SERVICES SECTION — nYield's Custom Operating Systems (Landing page)
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Zap, Scale, GraduationCap, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { osProducts, type OSProduct } from "@/data/osProducts";

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Scale,
  GraduationCap,
};

const OSCard = ({ product, index }: { product: OSProduct; index: number }) => {
  const IconComponent = iconMap[product.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className={`relative rounded-xl p-8 transition-shadow duration-300 cursor-pointer ${
        product.highlighted
          ? "glass-elevated border-primary/50 shadow-lg glow-sm"
          : "glass-base hover:shadow-lg hover:glow-sm"
      }`}
    >
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

      <ul className="space-y-2 mb-6">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        to={`/booking?edition=${product.id}`}
        className="group inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all relative overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        Get {product.name}
      </Link>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
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
