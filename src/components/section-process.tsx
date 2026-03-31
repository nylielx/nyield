/**
 * =============================================================================
 * PROCESS SECTION — Animated journey with glowing orb + trust strip + CTA
 * =============================================================================
 */

import { motion, useInView } from "framer-motion";
import { Monitor, HardDrive, CalendarDays, Settings, Gamepad2, AlertCircle, Shield, CheckCircle, Clock } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const steps = [
  { icon: AlertCircle, title: "Realise Your PC Isn't Performing", description: "Lag, stuttering, low FPS — your hardware can do more." },
  { icon: Monitor, title: "Visit nYield", description: "Discover a platform built to unlock your PC's true potential." },
  { icon: HardDrive, title: "Choose Your Edition", description: "Pick Competitive, Balanced, or Education based on your needs." },
  { icon: CalendarDays, title: "Book a Session", description: "Select a date and time — our team handles the rest remotely." },
  { icon: Settings, title: "We Optimise Your System", description: "Drivers, services, power plans — all fine-tuned for peak performance." },
  { icon: Gamepad2, title: "Install & Play", description: "Your PC is ready. More FPS, less lag — immediately." },
];

const trustPoints = [
  { icon: Shield, text: "Safe & reversible optimisations" },
  { icon: CheckCircle, text: "No risk to your system" },
  { icon: CheckCircle, text: "Tested by real users" },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(-1);

  /* Animate through steps sequentially when in view */
  useEffect(() => {
    if (!isInView) return;
    let step = 0;
    const interval = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step >= steps.length) clearInterval(interval);
    }, 1200);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="process" className="py-24 glass-base" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient-glow-wrapper"><span className="text-gradient-glow">Works</span></span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Five simple steps from stock Windows to peak performance.
          </p>
        </motion.div>

        {/* Time expectation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-muted-foreground mb-4"
        >
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm">Full setup takes ~60–90 minutes</span>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 mb-16"
        >
          {trustPoints.map((tp) => (
            <div key={tp.text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <tp.icon className="w-4 h-4 text-primary" />
              <span>{tp.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Journey timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical connector line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2 hidden sm:block" />

          {/* Animated orb traveling down the line */}
          <motion.div
            className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full hidden sm:block z-20"
            style={{
              background: `radial-gradient(circle, hsl(var(--primary)), hsl(var(--primary) / 0.4))`,
              boxShadow: `0 0 16px hsl(var(--glow) / 0.5), 0 0 40px hsl(var(--glow) / 0.2)`,
            }}
            animate={{
              top: activeStep >= 0
                ? `${Math.min(activeStep, steps.length - 1) * (100 / (steps.length - 1))}%`
                : "0%",
              scale: activeStep >= steps.length - 1 ? [1, 1.6] : [1, 1.3, 1],
              opacity: isInView ? 1 : 0,
            }}
            transition={{
              top: { duration: 0.8, ease: "easeInOut" },
              scale: {
                duration: activeStep >= steps.length - 1 ? 0.6 : 1.5,
                repeat: activeStep >= steps.length - 1 ? 0 : Infinity,
              },
            }}
          />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const isFinal = index === steps.length - 1;
              const isActive = index <= activeStep;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative flex items-start gap-6 ${
                    index % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
                  }`}
                >
                  {/* Step icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isFinal && isActive
                        ? "glass-focus border-primary/60"
                        : isActive
                          ? "bg-primary/20 border border-primary/50"
                          : "bg-primary/10 border border-primary/30"
                    }`}
                    style={
                      isActive
                        ? { boxShadow: `0 0 ${12 + index * 4}px hsl(var(--glow) / ${0.15 + index * 0.05})` }
                        : undefined
                    }
                  >
                    <step.icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-primary" : "text-primary/60"}`} />
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className={`flex-1 rounded-xl p-5 transition-all duration-500 ${
                      isFinal && isActive
                        ? "glass-focus"
                        : "glass-base"
                    } hover:shadow-lg`}
                  >
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {isFinal && isActive ? (
                        <span className="text-gradient-glow-wrapper">
                          <span className="text-gradient-glow">{step.title}</span>
                        </span>
                      ) : (
                        step.title
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isFinal && isActive
                        ? "You're ready to game."
                        : step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl md:text-2xl font-heading font-bold text-foreground mb-6">
            Don't settle for low performance.
          </p>
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg glow transition-shadow duration-300 hover:shadow-[0_0_30px_hsl(var(--glow)/0.4)]"
            >
              Choose Your Edition
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
