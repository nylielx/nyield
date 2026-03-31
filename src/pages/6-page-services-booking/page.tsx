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
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Navbar from "@/components/component-navbar";
import SiteFooter from "@/components/component-site-footer";

/* ── Fixed pricing per edition ─────────────────────────────────────────── */
const editionPricing: Record<string, { name: string; price: number }> = {
  competitive: { name: "Competitive Edition", price: 50 },
  balanced: { name: "Balanced Edition", price: 50 },
  education: { name: "Education Edition", price: 80 },
};

const technicians = [
  { id: "hassan", name: "Hassan", role: "Lead Technician" },
  { id: "alisher", name: "Alisher", role: "Systems Engineer" },
];

const timeSlots = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const timeLabels: Record<string, string> = {
  "13:00": "1:00 PM",
  "14:00": "2:00 PM",
  "15:00": "3:00 PM",
  "16:00": "4:00 PM",
  "17:00": "5:00 PM",
  "18:00": "6:00 PM",
};

/* ── Calendar helpers ──────────────────────────────────────────────────── */
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // JS getDay: 0=Sun. We want Mon=0
  let startOffset = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();
  const days: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= totalDays; d++) days.push(new Date(year, month, d));
  return days;
}

function isPremiumDay(date: Date) {
  const day = date.getDay(); // 0=Sun,1=Mon...
  return day >= 1 && day <= 4; // Mon–Thu
}

function isSunday(date: Date) {
  return date.getDay() === 0;
}

function isPast(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/* ── Component ─────────────────────────────────────────────────────────── */
const ServicesBookingPage = () => {
  const [searchParams] = useSearchParams();
  const editionId = searchParams.get("edition") || "competitive";
  const edition = editionPricing[editionId] || editionPricing.competitive;

  const canUpgrade = editionId === "competitive" || editionId === "balanced";
  const [upgraded, setUpgraded] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [timeModalOpen, setTimeModalOpen] = useState(false);

  // Calendar month navigation
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  const calendarDays = getCalendarDays(calYear, calMonth);
  const monthLabel = new Date(calYear, calMonth).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const activeEditionName = upgraded ? "Education Edition" : edition.name;
  const basePrice = upgraded ? 80 : edition.price;
  const surcharge = selectedDate && isPremiumDay(selectedDate) ? basePrice * 0.05 : 0;
  const subtotal = basePrice + surcharge;
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  const canConfirm = selectedDate && selectedTime && selectedTech;

  useEffect(() => {
    document.title = `Book ${activeEditionName} — nYield`;
  }, [activeEditionName]);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  const handleDateClick = (date: Date) => {
    if (isPast(date) || isSunday(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setTimeModalOpen(true);
  };

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
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
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
                  backgroundColor: [
                    "hsl(0 72% 51%)",
                    "hsl(0 0% 95%)",
                    "hsl(45 100% 60%)",
                    "hsl(200 80% 60%)",
                  ][i % 4],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time Selection Modal */}
      <AnimatePresence>
        {timeModalOpen && selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setTimeModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-focus rounded-2xl p-6 w-full max-w-sm mx-4 relative"
            >
              <button
                onClick={() => setTimeModalOpen(false)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <Clock size={18} className="text-primary" />
                <h3 className="font-heading font-bold text-foreground">Select a Time</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-5">
                {selectedDate.toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
                {isPremiumDay(selectedDate) && (
                  <span className="ml-2 text-secondary">• Premium Day (+5%)</span>
                )}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time, i) => (
                  <motion.button
                    key={time}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3, scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelectedTime(time);
                      setTimeModalOpen(false);
                    }}
                    className={`rounded-lg py-3 text-sm font-medium transition-all ${
                      selectedTime === time
                        ? "bg-primary text-primary-foreground glow-sm"
                        : "glass-base hover:border-primary/30"
                    }`}
                  >
                    {timeLabels[time]}
                  </motion.button>
                ))}
              </div>
            </motion.div>
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
              Book <span className="text-gradient-glow">{activeEditionName}</span>
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
                  Your {activeEditionName} session is booked for{" "}
                  {selectedDate?.toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}{" "}
                  at {selectedTime && timeLabels[selectedTime]}.
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
                  {/* Education Upgrade */}
                  {canUpgrade && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.button
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setUpgraded(!upgraded)}
                        className={`w-full rounded-xl p-5 text-left transition-all ${
                          upgraded
                            ? "glass-elevated border-primary glow-sm"
                            : "glass-base hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Sparkles size={20} className="text-primary" />
                            <div>
                              <p className="font-heading font-bold text-foreground text-sm">
                                Upgrade to Education Edition
                                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">
                                  Best Value
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Includes Competitive + Balanced — Save ~20%
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-heading text-xl font-bold text-foreground">£80</p>
                            <p className="text-[10px] text-muted-foreground">
                              vs £100 separate
                            </p>
                          </div>
                        </div>
                        {upgraded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2"
                          >
                            <Check size={14} className="text-primary" />
                            <span className="text-xs text-muted-foreground">
                              Education Edition selected — both editions included
                            </span>
                          </motion.div>
                        )}
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Calendar */}
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <CalendarIcon size={18} className="text-primary" /> Select a Date
                    </h3>

                    <div className="glass-base rounded-xl p-4">
                      {/* Month nav */}
                      <div className="flex items-center justify-between mb-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={prevMonth}
                          className="p-1.5 rounded-lg glass-base hover:border-primary/30 transition-all"
                        >
                          <ChevronLeft size={16} />
                        </motion.button>
                        <span className="font-heading font-bold text-sm text-foreground">
                          {monthLabel}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={nextMonth}
                          className="p-1.5 rounded-lg glass-base hover:border-primary/30 transition-all"
                        >
                          <ChevronRight size={16} />
                        </motion.button>
                      </div>

                      {/* Weekday headers */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {WEEKDAYS.map((wd) => (
                          <div
                            key={wd}
                            className="text-center text-[10px] font-medium text-muted-foreground py-1"
                          >
                            {wd}
                          </div>
                        ))}
                      </div>

                      {/* Day grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((date, i) => {
                          if (!date) {
                            return <div key={`empty-${i}`} className="aspect-square" />;
                          }

                          const past = isPast(date);
                          const sunday = isSunday(date);
                          const disabled = past || sunday;
                          const premium = isPremiumDay(date);
                          const isSelected =
                            selectedDate?.toDateString() === date.toDateString();

                          return (
                            <motion.button
                              key={date.toISOString()}
                              whileHover={disabled ? {} : { y: -3, scale: 1.03 }}
                              whileTap={disabled ? {} : { scale: 0.95 }}
                              onClick={() => !disabled && handleDateClick(date)}
                              disabled={disabled}
                              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all relative ${
                                disabled
                                  ? "opacity-30 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-primary text-primary-foreground glow-sm"
                                  : premium
                                  ? "glass-base border-secondary/30 hover:border-secondary/60 hover:shadow-[0_0_12px_hsl(var(--secondary)/0.15)]"
                                  : "glass-base border-primary/20 hover:border-primary/40 hover:shadow-[0_0_12px_hsl(var(--primary)/0.1)]"
                              }`}
                            >
                              <span className="font-bold text-sm leading-none">
                                {date.getDate()}
                              </span>
                              {!disabled && premium && !isSelected && (
                                <span className="text-[8px] text-secondary mt-0.5 leading-none">
                                  +5%
                                </span>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Legend */}
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/20">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-sm border border-primary/30 glass-base" />
                          <span className="text-[10px] text-muted-foreground">
                            Fri–Sun (Standard)
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-sm border border-secondary/30 glass-base" />
                          <span className="text-[10px] text-muted-foreground">
                            Mon–Thu (Premium +5%)
                          </span>
                        </div>
                      </div>
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
                              <p className="font-heading font-bold text-foreground">
                                {tech.name}
                              </p>
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
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Order Summary
                    </h3>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Edition</span>
                        <span className="text-foreground font-medium">
                          {activeEditionName}
                        </span>
                      </div>
                      {upgraded && canUpgrade && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Upgrade</span>
                          <span className="text-primary font-medium text-xs">
                            Education Bundle Applied
                          </span>
                        </div>
                      )}
                      {selectedDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="text-foreground font-medium">
                            {selectedDate.toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              weekday: "short",
                            })}
                          </span>
                        </div>
                      )}
                      {selectedTime && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time</span>
                          <span className="text-foreground font-medium">
                            {timeLabels[selectedTime]}
                          </span>
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
                        <span className="text-foreground">£{basePrice.toFixed(2)}</span>
                      </div>
                      {surcharge > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-secondary">Premium Day (+5%)</span>
                          <span className="text-secondary">
                            £{surcharge.toFixed(2)}
                          </span>
                        </div>
                      )}
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
