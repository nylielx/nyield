/**
 * =============================================================================
 * AFFILIATE LANDING PAGE — High-converting marketing page for the affiliate program
 * =============================================================================
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, TrendingUp, Users, Gift, ChevronRight,
  Zap, Shield, Award, Star, Copy, ArrowRight,
  Rocket, Target, DollarSign, Crown,
} from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { affiliateLevels } from "@/data/temp/affiliate-mock";

/* ── animation variants ── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

/* ── floating badge component ── */
const FloatingBadge = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 0.8 + delay, duration: 0.5, ease: "easeOut" }}
    className={className}
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}
      className="px-3 py-1.5 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-lg shadow-primary/10 text-xs font-medium flex items-center gap-1.5"
    >
      {children}
    </motion.div>
  </motion.div>
);

/* ── level card icons ── */
const levelIcons = [Shield, Award, Crown, Sparkles];
const levelGradients = [
  "from-zinc-400/20 to-zinc-500/10",
  "from-yellow-500/20 to-amber-500/10",
  "from-cyan-400/20 to-blue-400/10",
  "from-purple-400/20 to-pink-400/10",
];
const levelGlows = [
  "hover:shadow-zinc-400/20",
  "hover:shadow-yellow-500/20",
  "hover:shadow-cyan-400/20",
  "hover:shadow-purple-400/20",
];

/* ── process steps ── */
const steps = [
  { icon: Users, title: "Create Account", desc: "Sign up for free and get instant approval to the affiliate program." },
  { icon: Copy, title: "Share Your Link", desc: "Get your unique referral link and share it with your audience." },
  { icon: DollarSign, title: "Earn Commission", desc: "Every sale through your link earns you up to 15% commission." },
  { icon: TrendingUp, title: "Level Up", desc: "Hit milestones to unlock higher tiers, better rates, and exclusive perks." },
];

/* ── testimonials ── */
const testimonials = [
  { name: "Alex Turner", role: "Content Creator", quote: "I earned over £500 in my first month just by sharing nYield with my Discord community. The dashboard makes tracking everything super easy." },
  { name: "Sarah Mitchell", role: "Twitch Affiliate", quote: "The level system keeps me motivated. I just hit Gold and the commission bump was instant. Best affiliate program I've joined." },
  { name: "James Rivera", role: "Tech Reviewer", quote: "My audience loves nYield's optimisation tools. The conversion rate is insane — nearly 1 in 4 clicks converts to a sale." },
];

/* ── benefits ── */
const benefits = [
  { icon: DollarSign, title: "Earn Real Commission", desc: "Get paid up to 15% on every referral sale. Commissions are tracked in real-time and paid out monthly via PayPal." },
  { icon: Gift, title: "Access the Rewards Store", desc: "Trade your affiliate points for exclusive discounts, free licenses, merch, and premium Discord roles." },
  { icon: Zap, title: "Marketing Materials", desc: "Download professional banners, logos, and guides. Everything you need to promote nYield effectively." },
  { icon: Shield, title: "Dedicated Team Support", desc: "Get priority support from our affiliate team. We help you grow with tips, strategies, and personalised advice." },
];

const AffiliateLandingPage = () => {
  useEffect(() => {
    document.title = "Affiliate Program — nYield";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
              <motion.div variants={fadeUp}>
                <Badge variant="outline" className="text-xs gap-1 px-3 py-1 border-primary/30 bg-primary/5">
                  <Sparkles className="h-3 w-3 text-primary" /> Affiliate Program
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight"
              >
                SHARE n<span className="text-primary">Yield</span>.
                <br />
                EARN REWARDS
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  & REAL CASH.
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base text-muted-foreground max-w-md leading-relaxed">
                Join our affiliate program and earn up to <span className="text-foreground font-semibold">15% commission</span> on
                every sale. Access exclusive rewards, level up through tiers, and grow your income with nYield.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link to="/signup">
                  <Button size="lg" className="gap-2 glow-sm font-semibold">
                    Join the Program <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/affiliate">
                  <Button size="lg" variant="outline" className="gap-2 border-border/50">
                    View Dashboard <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — visual with floating badges */}
            <motion.div variants={fadeIn} initial="hidden" animate="show" className="relative flex justify-center">
              {/* Main visual card */}
              <div className="relative w-full max-w-sm">
                <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-primary/10 via-card/50 to-primary/5 border border-border/30 backdrop-blur-md overflow-hidden flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <TrendingUp className="h-10 w-10 text-primary" />
                    </div>
                    <p className="text-4xl font-bold font-heading">15%</p>
                    <p className="text-sm text-muted-foreground">Max Commission Rate</p>
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Trusted by 500+ affiliates</p>
                  </div>
                </div>

                {/* Floating badges */}
                <FloatingBadge className="absolute -top-3 -left-4 sm:-left-10" delay={0}>
                  <Zap className="h-3.5 w-3.5 text-primary" /> Instant approval
                </FloatingBadge>
                <FloatingBadge className="absolute top-1/3 -right-4 sm:-right-12" delay={0.3}>
                  <Gift className="h-3.5 w-3.5 text-primary" /> Exclusive benefits
                </FloatingBadge>
                <FloatingBadge className="absolute bottom-16 -left-4 sm:-left-14" delay={0.6}>
                  <DollarSign className="h-3.5 w-3.5 text-primary" /> Commission payments
                </FloatingBadge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ LEVEL SYSTEM ═══════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <motion.div
          className="max-w-6xl mx-auto px-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14 space-y-3">
            <Badge variant="outline" className="text-xs gap-1 px-3 py-1 border-primary/30 bg-primary/5">
              <Award className="h-3 w-3 text-primary" /> Progression
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">
              LEVEL UP AS AN <span className="text-primary">AFFILIATE</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Hit sales milestones to unlock higher commission rates, exclusive rewards, and premium perks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {affiliateLevels.map((level, i) => {
              const Icon = levelIcons[i];
              return (
                <motion.div key={level.id} variants={scaleIn}>
                  <Card
                    className={`border-border/30 bg-card/50 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl ${levelGlows[i]} h-full`}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4 h-full">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${levelGradients[i]} border border-border/20 flex items-center justify-center`}
                      >
                        <Icon className={`h-6 w-6 ${level.colour}`} />
                      </div>
                      <div>
                        <p className="text-lg font-bold font-heading">{level.emoji} {level.name}</p>
                        <p className="text-xs text-muted-foreground">Level {level.id}</p>
                      </div>
                      <div className="w-full space-y-2 flex-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Commission</span>
                          <span className="font-semibold text-primary">{level.commission}%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Min Sales</span>
                          <span className="font-medium">{level.minSales === 0 ? "None" : level.minSales}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Rewards Store</span>
                          <span className="text-green-400">✓</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Media Kit</span>
                          <span className="text-green-400">✓</span>
                        </div>
                        {i >= 2 && (
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Priority Support</span>
                            <span className="text-green-400">✓</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ BENEFITS ═══════════════════ */}
      <section className="py-24 bg-muted/5">
        <motion.div
          className="max-w-6xl mx-auto px-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">
              WHY JOIN THE <span className="text-primary">PROGRAM</span>?
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Everything you need to monetise your audience and grow alongside nYield.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="border-border/30 bg-card/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <b.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{b.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ START YOUR QUEST ═══════════════════ */}
      <section className="py-24 relative">
        <motion.div
          className="max-w-6xl mx-auto px-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14 space-y-3">
            <Badge variant="outline" className="text-xs gap-1 px-3 py-1 border-primary/30 bg-primary/5">
              <Rocket className="h-3 w-3 text-primary" /> Get Started
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">
              START YOUR <span className="text-primary">QUEST</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Four simple steps to start earning with nYield.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
              >
                <Card className="border-border/30 bg-card/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full relative overflow-hidden">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div className="absolute top-3 right-3 text-[10px] font-bold text-muted-foreground/30 font-heading">
                      0{i + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ REWARDS PROMO ═══════════════════ */}
      <section className="py-24 bg-muted/5">
        <motion.div
          className="max-w-6xl mx-auto px-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-card/80 to-primary/5 backdrop-blur-md overflow-hidden">
              <CardContent className="p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <Badge variant="outline" className="text-xs gap-1 border-primary/30 bg-primary/10">
                    <Gift className="h-3 w-3 text-primary" /> Rewards
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold">
                    TRADE YOUR BALANCE
                    <br />
                    FOR <span className="text-primary">BENEFITS</span>
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                    Use your affiliate points to redeem exclusive discounts, free licenses, gaming peripherals,
                    merch packs, and more from the Rewards Store.
                  </p>
                  <Link to="/affiliate">
                    <Button className="gap-2 glow-sm font-semibold">
                      <Target className="h-4 w-4" /> Press Start
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3 shrink-0">
                  {["🖥️", "🎮", "⚡", "👕"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      variants={scaleIn}
                      className="w-20 h-20 rounded-2xl bg-card/60 border border-border/20 backdrop-blur-sm flex items-center justify-center text-3xl"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="py-24">
        <motion.div
          className="max-w-6xl mx-auto px-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">
              WHAT OUR <span className="text-primary">AFFILIATES</span> SAY
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Real stories from real affiliates growing with nYield.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="border-border/30 bg-card/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-[10px] text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/8 rounded-full blur-[120px]" />
        </div>

        <motion.div
          className="max-w-6xl mx-auto px-6 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">
              READY TO <span className="text-primary">EARN</span>?
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Join hundreds of affiliates already earning with nYield. It's free, instant, and packed with rewards.
            </p>
            <div className="flex justify-center gap-3">
              <Link to="/signup">
                <Button size="lg" className="gap-2 glow-sm font-semibold">
                  Join Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default AffiliateLandingPage;
