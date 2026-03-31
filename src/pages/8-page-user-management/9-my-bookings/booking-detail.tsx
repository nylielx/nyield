/**
 * =============================================================================
 * BOOKING DETAIL PAGE — Full view of a single booking
 * =============================================================================
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Monitor,
  Cpu,
  MemoryStick,
  HardDrive,
  Fan,
  Zap,
  CheckCircle2,
  Loader2,
  XCircle,
  MessageSquare,
} from "lucide-react";
import { getBookingById } from "@/pages/6-page-services-booking/services/booking-service";
import type { Booking, BookingStatus } from "@/pages/6-page-services-booking/types/booking-types";

const statusSteps: { key: BookingStatus; label: string }[] = [
  { key: "processing", label: "Processing" },
  { key: "scheduled", label: "Scheduled" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

const specFields: { key: string; label: string; icon: React.ElementType }[] = [
  { key: "gpu", label: "Graphics Card", icon: Monitor },
  { key: "cpu", label: "Processor", icon: Cpu },
  { key: "ram", label: "Memory", icon: MemoryStick },
  { key: "storage", label: "Storage", icon: HardDrive },
  { key: "cooling", label: "Cooling", icon: Fan },
  { key: "powerSupply", label: "Power Supply", icon: Zap },
];

const BookingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getBookingById(id).then((data) => {
        setBooking(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">Booking not found</p>
        <Link to="/account/bookings" className="text-primary text-sm hover:underline">
          ← Back to bookings
        </Link>
      </div>
    );
  }

  const isCancelled = booking.status === "cancelled";
  const currentStepIndex = isCancelled ? -1 : statusSteps.findIndex((s) => s.key === booking.status);

  return (
    <div>
      <Link
        to="/account/bookings"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Back to Bookings
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">{booking.editionName}</h1>
        <span className="text-xs font-mono text-muted-foreground">{booking.id}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-base rounded-xl p-5"
          >
            <h3 className="font-heading font-bold text-foreground mb-4">Status</h3>
            {isCancelled ? (
              <div className="flex items-center gap-2 text-destructive">
                <XCircle size={18} />
                <span className="font-medium">Booking Cancelled</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {statusSteps.map((step, i) => {
                  const isActive = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <div key={step.key} className="flex items-center gap-2 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isCurrent
                            ? "bg-primary text-primary-foreground"
                            : isActive
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isActive ? <CheckCircle2 size={16} /> : <span className="text-xs">{i + 1}</span>}
                      </div>
                      <span className={`text-xs hidden sm:block ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {step.label}
                      </span>
                      {i < statusSteps.length - 1 && (
                        <div className={`h-px flex-1 ${isActive ? "bg-primary/40" : "bg-border/30"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Booking Overview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-base rounded-xl p-5"
          >
            <h3 className="font-heading font-bold text-foreground mb-4">Booking Details</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-primary shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">Date</p>
                  <p className="text-foreground font-medium">
                    {new Date(booking.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-primary shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">Time</p>
                  <p className="text-foreground font-medium">{booking.timeLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User size={16} className="text-primary shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">Technician</p>
                  <p className="text-foreground font-medium">{booking.technicianName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-muted-foreground shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">Booked on</p>
                  <p className="text-foreground font-medium">
                    {new Date(booking.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Full PC Specs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-base rounded-xl p-5"
          >
            <h3 className="font-heading font-bold text-foreground mb-4">PC Specifications</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {specFields.map(({ key, label, icon: Icon }) => {
                const val = booking.pcSpecs[key as keyof typeof booking.pcSpecs];
                if (!val) return null;
                return (
                  <div key={key} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                    <Icon size={16} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">{label}</p>
                      <p className="text-sm text-foreground font-medium">{val}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {booking.pcSpecs.pcCase && (
              <div className="mt-3 p-3 rounded-lg bg-muted/20">
                <p className="text-[10px] text-muted-foreground">Case</p>
                <p className="text-sm text-foreground font-medium">{booking.pcSpecs.pcCase}</p>
              </div>
            )}
            {booking.pcSpecs.notes && (
              <div className="mt-3 p-3 rounded-lg bg-muted/20">
                <p className="text-[10px] text-muted-foreground">Notes</p>
                <p className="text-sm text-foreground">{booking.pcSpecs.notes}</p>
              </div>
            )}
          </motion.div>

          {/* Chat placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-base rounded-xl p-5 opacity-60"
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={18} className="text-muted-foreground" />
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm">Chat with Technician</h3>
                <p className="text-xs text-muted-foreground">Coming soon — direct messaging with your assigned technician</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right panel — pricing */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass-elevated rounded-xl p-5 space-y-3">
            <h3 className="font-heading font-bold text-foreground">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Price</span>
                <span className="text-foreground">£{booking.price.toFixed(2)}</span>
              </div>
              {booking.surcharge > 0 && (
                <div className="flex justify-between">
                  <span className="text-primary/70">Premium Day</span>
                  <span className="text-primary/70">£{booking.surcharge.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT (20%)</span>
                <span className="text-foreground">£{booking.vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-border/30">
                <span>Total</span>
                <span className="text-primary font-heading">£{booking.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
