/**
 * =============================================================================
 * MY BOOKINGS PAGE — List of user bookings with status cards
 * =============================================================================
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Monitor,
  Cpu,
  User,
  ChevronRight,
  XCircle,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getUserBookings, cancelBooking } from "@/pages/6-page-services-booking/services/booking-service";
import type { Booking, BookingStatus } from "@/pages/6-page-services-booking/types/booking-types";
import { useAuth } from "@/contexts/AuthContext";

const statusConfig: Record<BookingStatus, { label: string; icon: React.ElementType; color: string }> = {
  processing: { label: "Processing", icon: Loader2, color: "text-yellow-500" },
  scheduled: { label: "Scheduled", icon: Calendar, color: "text-blue-500" },
  "in-progress": { label: "In Progress", icon: Loader2, color: "text-primary" },
  completed: { label: "Completed", icon: CheckCircle2, color: "text-green-500" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-muted-foreground" },
};

const MyBookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserBookings(user?.id).then((data) => {
      setBookings(data);
      setLoading(false);
    });
  }, [user?.id]);

  const handleCancel = async (id: string) => {
    await cancelBooking(id);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as BookingStatus } : b))
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-1">My Bookings</h1>
      <p className="text-sm text-muted-foreground mb-6">Track and manage your optimisation sessions.</p>

      {bookings.length === 0 ? (
        <div className="text-center py-16 glass-base rounded-xl">
          <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No bookings yet</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Book a Service
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, i) => {
            const status = statusConfig[booking.status];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-base rounded-xl p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-muted-foreground">{booking.id}</span>
                      <div className={`flex items-center gap-1.5 text-xs font-medium ${status.color}`}>
                        <StatusIcon size={14} className={booking.status === "processing" || booking.status === "in-progress" ? "animate-spin" : ""} />
                        {status.label}
                      </div>
                    </div>

                    {/* Edition & details */}
                    <h3 className="font-heading font-bold text-foreground mb-2">{booking.editionName}</h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar size={12} />
                        {new Date(booking.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock size={12} />
                        {booking.timeLabel}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <User size={12} />
                        {booking.technicianName}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Monitor size={12} />
                        {booking.pcSpecs.gpu.split(" ").slice(-1)[0]}
                      </div>
                    </div>

                    {/* PC specs summary */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {[booking.pcSpecs.gpu, booking.pcSpecs.cpu, booking.pcSpecs.ram].map((spec) => (
                        <span key={spec} className="px-2 py-0.5 rounded-full bg-muted/50 text-[10px] text-muted-foreground">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right side — price & actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <p className="font-heading text-lg font-bold text-primary">£{booking.total.toFixed(2)}</p>

                    <div className="flex gap-2">
                      {(booking.status === "processing" || booking.status === "scheduled") && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="px-3 py-1.5 rounded-lg text-xs text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      <Link
                        to={`/account/bookings/${booking.id}`}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                      >
                        Details <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
