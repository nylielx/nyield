/**
 * =============================================================================
 * HERO SECTION — Premium shader + geometric hero for nYield
 * =============================================================================
 */

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { ShaderPlane, EnergyRing } from "@/components/ui/shader-background";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Shader background layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: "transparent" }}
            gl={{ alpha: true, antialias: true }}
          >
            <ShaderPlane position={[0, 0, -2]} color1="#dc2626" color2="#1a1a2e" />
            <EnergyRing radius={2.5} position={[0, 0, -1.5]} />
          </Canvas>
        </Suspense>
      </div>

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/80 via-background/60 to-background" />

      {/* Hero content */}
      <div className="relative z-10 w-full">
        <HeroGeometric
          badge="PC Optimization & Gaming Systems"
          title1="Unlock Your PC's"
          title2="True Power"
        />

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center -mt-12 px-6"
        >
          <Link
            to="/services"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all glow relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            Choose Your Edition
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/marketplace"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-semibold text-lg hover:bg-secondary transition-colors"
          >
            View Gaming PCs
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
