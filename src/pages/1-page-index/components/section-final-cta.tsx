/**
 * FINAL CTA SECTION — Closing conversion block
 */

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassButton } from "@/components/ui/glass-button";

const FinalCtaSection = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Choose Your Edition <span className="text-gradient">Today</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Unlock your PC's full performance instantly
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <GlassButton size="lg" className="inline-flex items-center gap-2">
                Get Started
                <ArrowRight size={20} />
              </GlassButton>
            </Link>
            <Link to="/services">
              <GlassButton size="lg" className="inline-flex items-center gap-2">
                View Editions
              </GlassButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
