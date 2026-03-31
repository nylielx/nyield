/**
 * =============================================================================
 * SHAPE LANDING HERO — Geometric animated hero with elegant floating shapes
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/[0.08]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.04)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/[0.12]"
          className="top-[-10%] left-[-5%] md:left-[0%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-primary/[0.10]"
          className="top-[15%] right-[-8%] md:right-[-2%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-primary/[0.08]"
          className="bottom-[15%] left-[5%] md:left-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-primary/[0.06]"
          className="top-[60%] right-[8%] md:right-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-primary/[0.05]"
          className="top-[75%] left-[40%]"
        />
      </div>

      {/* Hero text content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-elevated border-primary/20 mb-8 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-primary text-primary" />
            <span className="text-sm text-muted-foreground tracking-wide">
              {badge}
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="text-gradient-glow-wrapper">
                <span className="text-gradient-glow">{title1}</span>
              </span>
              <br />
              <span className="text-foreground">{title2}</span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-6 max-w-xl mx-auto">
              Crafting exceptional digital experiences through innovative design
              and cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export { HeroGeometric, ElegantShape };
