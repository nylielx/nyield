/**
 * =============================================================================
 * ABOUT SECTION — Brand story, social proof, testimonials, and team
 * =============================================================================
 */

import { motion, useInView } from "framer-motion";
import { Target, Heart, Shield, Users, Lightbulb, Wrench, Cpu, FlaskConical, Quote, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { teamMembers, type TeamMember } from "@/data/team";
import { AnimatePresence } from "framer-motion";

/* ── Story + Values data ── */
const storyBlocks = [
  {
    icon: Users,
    title: "Built by Students, for Students",
    description:
      "nYield was founded by medicine and pharmacy students in the UK who were frustrated with poor PC performance. We knew there had to be a better way.",
  },
  {
    icon: Lightbulb,
    title: "The Problem We Saw",
    description:
      "eBay, Facebook Marketplace — full of overpriced PCs with zero transparency. No real specs, no performance data, no trust. We wanted to change that.",
  },
  {
    icon: Wrench,
    title: "Our Solution",
    description:
      "The nYield ecosystem: custom operating systems that maximize your hardware, pre-built PCs with verified specs, and a marketplace built on transparency.",
  },
];

const values = [
  { icon: Target, title: "Performance First", description: "Every decision we make optimizes for real-world performance. No gimmicks, no bloat — just results." },
  { icon: Shield, title: "Transparency", description: "From stress test results to pricing — we believe you deserve to know exactly what you're getting." },
  { icon: Heart, title: "Accessible to All", description: "From GCSE students to university gamers and creators — nYield is for anyone who wants their PC to perform at its best." },
];

/* ── Social proof stats ── */
const socialProof = [
  { value: 5000, suffix: "+", label: "Systems Optimised" },
  { value: 100, suffix: "s", prefix: "", label: "of Students Across the UK" },
  { value: 0, suffix: "", label: "Trusted by Competitive Gamers", isText: true },
];

/* ── Testimonials ── */
const testimonials = [
  { quote: "Gained 200+ FPS instantly. I didn't think my rig had it in it.", author: "Alex T.", role: "Competitive Gamer" },
  { quote: "Finally feels smooth. No stutters, no lag — just pure gameplay.", author: "Priya K.", role: "University Student" },
  { quote: "Best decision I made for my setup. Worth every penny.", author: "Jordan M.", role: "Content Creator" },
];

/* ── Credibility items ── */
const credibilityPoints = [
  { icon: FlaskConical, title: "Stress-Tested", description: "Every OS edition undergoes hours of stress testing — thermals, stability, and performance benchmarks." },
  { icon: Cpu, title: "Real-World Validated", description: "Tested across dozens of hardware configurations by real users in real gaming sessions." },
  { icon: Users, title: "Community Driven", description: "Feedback from hundreds of students and gamers shapes every update we release." },
];

/* ── Animated counter hook ── */
function useCounter(target: number, inView: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || target === 0) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

/* ── Social proof stat component ── */
const StatItem = ({ stat, inView }: { stat: typeof socialProof[0]; inView: boolean }) => {
  const count = useCounter(stat.value, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.div
        animate={inView ? { textShadow: ["0 0 8px hsl(var(--glow) / 0)", "0 0 14px hsl(var(--glow) / 0.3)", "0 0 8px hsl(var(--glow) / 0)"] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        className="font-heading text-2xl md:text-3xl font-bold text-primary"
      >
        {stat.isText ? "✔" : <>{count.toLocaleString()}{stat.suffix}</>}
      </motion.div>
      <p className="text-sm text-muted-foreground mt-1">
        {stat.isText ? stat.label : stat.label}
      </p>
    </motion.div>
  );
};

/* ── Team card component ── */
const TeamCard = ({ member }: { member: TeamMember }) => {
  const [showSocials, setShowSocials] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-elevated rounded-xl p-6 text-center relative transition-all duration-300 group cursor-pointer"
      style={{
        borderColor: `hsl(${member.roleColor} / 0.15)`,
      }}
      onMouseEnter={() => {}}
    >
      {/* Avatar */}
      <motion.div
        className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 transition-all duration-300"
        style={{ borderColor: `hsl(${member.roleColor} / 0.4)` }}
        whileHover={{
          boxShadow: `0 0 20px hsl(${member.roleColor} / 0.3)`,
        }}
      >
        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
      </motion.div>

      {/* Name + role */}
      <h4 className="font-heading text-lg font-bold text-foreground">{member.name}</h4>
      <p
        className="text-xs font-medium mb-2"
        style={{ color: `hsl(${member.roleColor})` }}
      >
        {member.role}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.description}</p>

      {/* Social toggle */}
      {member.socials && member.socials.length > 0 && (
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSocials(!showSocials)}
            className="mx-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Socials
          </motion.button>
          <AnimatePresence>
            {showSocials && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="flex items-center justify-center gap-3 mt-2"
              >
                {member.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors capitalize"
                  >
                    {s.platform}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

/* ── Main About Section ── */
const AboutSection = () => {
  const proofRef = useRef<HTMLDivElement>(null);
  const proofInView = useInView(proofRef, { once: true });

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-5xl mx-auto">
          {/* Hero heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-glow-wrapper">
                <span className="text-gradient-glow">Built by Students</span>
              </span>
              , for Students
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We exist to unlock the full performance potential of every system —
              and make PC gaming accessible, transparent, and fair.
            </p>
          </motion.div>

          {/* Live social proof strip */}
          <div ref={proofRef} className="grid grid-cols-3 gap-4 mb-20 glass-elevated rounded-xl p-6">
            {socialProof.map((stat, i) => (
              <StatItem key={i} stat={stat} inView={proofInView} />
            ))}
          </div>

          {/* Story blocks */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {storyBlocks.map((block, index) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-base rounded-xl p-6 transition-shadow hover:shadow-lg"
              >
                <block.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{block.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{block.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mission statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 glass-elevated rounded-2xl p-8 md:p-12"
          >
            <p className="text-primary font-medium text-sm mb-2">Our Mission</p>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              "Unlock the full performance potential of every system"
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We believe every gamer and student deserves a machine that works at
              its best — without needing a computer science degree to set it up.
            </p>
          </motion.div>

          {/* Credibility / testing section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
              Tested. <span className="text-gradient-glow-wrapper"><span className="text-gradient-glow">Verified.</span></span> Trusted.
            </h3>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
              Every optimisation is validated through rigorous real-world testing before it reaches your system.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {credibilityPoints.map((cp, i) => (
                <motion.div
                  key={cp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-base rounded-xl p-6 text-center transition-shadow hover:shadow-lg"
                >
                  <cp.icon className="w-9 h-9 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-foreground mb-1">{cp.title}</h4>
                  <p className="text-sm text-muted-foreground">{cp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
              What Our Users Say
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-elevated rounded-xl p-6 relative transition-shadow hover:shadow-lg"
                >
                  <Quote className="w-6 h-6 text-primary/30 absolute top-4 right-4" />
                  <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center p-6 rounded-xl glass-elevated transition-shadow hover:shadow-lg"
              >
                <value.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Meet the Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
              Meet the <span className="text-gradient-glow-wrapper"><span className="text-gradient-glow">Team</span></span>
            </h3>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
              The people behind nYield — students, gamers, and engineers on a mission.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {teamMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
