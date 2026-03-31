/**
 * =============================================================================
 * LISTING HEADER — Hero section for the marketplace page
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ListingHeader = () => {
  return (
    <section className="pt-32 pb-12 bg-background">
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Verified <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Compare verified PCs with full specs and real performance data.
            Every listing is stress-tested by nYield — no guesswork, no hidden specs.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ListingHeader;
