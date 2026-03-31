/**
 * =============================================================================
 * SERVICES BOOKING PAGE — Calendar + scheduling for OS editions
 * =============================================================================
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  Check,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";

/** Pricing tiers per edition */
const editionPricing: Record<string, { name: string; tiers: { label: string; price: number; bestValue?: boolean }[] }> = {
  competitive: {
    name: "Competitive Edition",
    tiers: [
      { label: "Basic", price: 39 },
      { label: "Standard", price: 49, bestValue: true },
      { label: "Premium", price: 59 },
    ],
  },
  balanced: {
    name: "Balanced Edition",
    tiers: [
      { label: "Basic", price: 49 },
      { label: "Standard", price: 59, bestValue: true },
      { label: "Premium", price: 69 },
    ],
  },
  education: {
    name: "Education Edition",
    tiers: [
      { label: "Basic", price: 59 },
      { label: "Standard", price: 69, bestValue: true },
      { label: "Premium", price: 79 },
    ],
  },
};

const technicians = [
  { id: "hassan", name: "Hassan", role: "Lead Technician" },
  { id: "alisher", name: "Alisher", role: "Systems Engineer" },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00",
];

const generateDays = () => {
  const days: Date[] = [];
  const now = new Date();
  for (let i = 1; i <= 28; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    if (d.getDay() !== 0) days.push(d); // skip sundays
  }
  return days;
};

const ServicesBookingPage = () => {
  const [searchParams] = useSearchParams();
  const editionId = searchParams.get("edition") || "competitive";
  const edition = editionPricing[editionId] || editionPricing.competitive;

  const [selectedTier, setSelectedTier] = useState(1); // default to Standard
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const days = generateDays();
  const tier = edition.tiers[selectedTier];
  const vat = tier.price * 0.2;
  const total = tier.price + vat;

  const canConfirm = selectedDate && selectedTime && selectedTech;

  useEffect(() => {
    document.title = `Book ${edition.name} — nYield`;
  }, [edition.name]);

  const handleConfirm = () => {
    setConfetti(true);
    setTimeout(() => setConfirmed(true), 600);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Confetti overlay */}
      <AnimatePresence>
        {confetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                animate={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  scale: Math.random() * 2,
                  rotate: Math.random() * 720,
                }}
                transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: ["hsl(0 72% 51%)", "hsl(0 0% 95%)", "hsl(45 100% 60%)", "hsl(200 80% 60%)"][i % 4],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Services
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-2">
              Book <span className="text-gradient-glow">{edition.name}</span>
            </h1>
            <p className="text-muted-foreground mb-10">
              Choose your date, time, and technician.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg mx-auto text-center glass-elevated rounded-2xl p-10"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Check size={32} className="text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-4">
                  Your {edition.name} session is booked for{" "}
                  {selectedDate?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} at {selectedTime}.
                </p>
                <p className="text-xs text-muted-foreground">
                  {/* TODO: Send confirmation email via backend */}
                  A confirmation email will be sent shortly.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Back to Home
                </Link>
              </motion.div>
            ) : (
              <motion.div key="form" className="grid lg:grid-cols-3 gap-8">
                {/* LEFT — Booking form */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Pricing tiers */}
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <Sparkles size={18} className="text-primary" /> Choose Your Plan
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {edition.tiers.map((t, i) => (
                        <motion.button
                          key={t.label}
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedTier(i)}
                          className={`relative rounded-xl p-5 text-center transition-all ${
                            selectedTier === i
                              ? "glass-elevated border-primary glow-sm"
                              : "glass-base hover:border-border"
                          }`}
                        >
                          {t.bestValue && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                              Best Value
                            </span>
                          )}
                          <p className="text-sm text-muted-foreground mb-1">{t.label}</p>
                          <p className="font-heading text-2xl font-bold text-foreground">£{t.price}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Date selection */}
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <CalendarIcon size={18} className="text-primary" /> Select a Date
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {days.slice(0, 21).map((day) => {
                        const isSelected = selectedDate?.toDateString() === day.toDateString();
                        return (
                          <motion.button
                            key={day.toISOString()}
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedDate(day)}
                            className={`rounded-lg p-2 text-center text-xs transition-all ${
                              isSelected
                                ? "bg-primary text-primary-foreground glow-sm"
                                : "glass-base hover:border-primary/30"
                            }`}
                          >
                            <span className="block text-[10px] opacity-70">
                              {day.toLocaleDateString("en-GB", { weekday: "short" })}
                            </span>
                            <span className="block font-bold text-sm">{day.getDate()}</span>
                            <span className="block text-[10px] opacity-70">
                              {day.toLocaleDateString("en-GB", { month: "short" })}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time selection */}
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <Clock size={18} className="text-primary" /> Select a Time
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ y: -2, scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg py-3 text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground glow-sm"
                              : "glass-base hover:border-primary/30"
                          }`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Technician selection */}
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <User size={18} className="text-primary" /> Choose Your Technician
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {technicians.map((tech) => (
                        <motion.button
                          key={tech.id}
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedTech(tech.id)}
                          className={`rounded-xl p-5 text-left transition-all ${
                            selectedTech === tech.id
                              ? "glass-elevated border-primary glow-sm"
                              : "glass-base hover:border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <User size={20} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-heading font-bold text-foreground">{tech.name}</p>
                              <p className="text-xs text-muted-foreground">{tech.role}</p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT — Order summary */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <div className="rounded-xl glass-elevated p-6 space-y-4">
                    <h3 className="font-heading text-lg font-bold text-foreground">Order Summary</h3>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Edition</span>
                        <span className="text-foreground font-medium">{edition.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan</span>
                        <span className="text-foreground font-medium">{tier.label}</span>
                      </div>
                      {selectedDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="text-foreground font-medium">
                            {selectedDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                      )}
                      {selectedTime && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time</span>
                          <span className="text-foreground font-medium">{selectedTime}</span>
                        </div>
                      )}
                      {selectedTech && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Technician</span>
                          <span className="text-foreground font-medium">
                            {technicians.find((t) => t.id === selectedTech)?.name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-border/30 pt-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">£{tier.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">VAT (20%)</span>
                        <span className="text-foreground">£{vat.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold pt-2 border-t border-border/30">
                        <span className="text-foreground">Total</span>
                        <motion.span
                          key={total}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          className="text-primary font-heading text-xl"
                        >
                          £{total.toFixed(2)}
                        </motion.span>
                      </div>
                    </div>

                    {/* TODO: Integrate Stripe payment */}
                    {/* TODO: Connect to backend booking system */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirm}
                      disabled={!canConfirm}
                      className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                        canConfirm
                          ? "bg-primary text-primary-foreground glow-sm hover:opacity-90"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      {canConfirm ? "Confirm Booking" : "Complete all selections"}
                    </motion.button>

                    {!canConfirm && (
                      <p className="text-[10px] text-muted-foreground text-center">
                        Select date, time & technician to continue
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ServicesBookingPage;
