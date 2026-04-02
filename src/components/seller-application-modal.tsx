/**
 * =============================================================================
 * SELLER APPLICATION MODAL — Buyer → Seller conversion flow
 * =============================================================================
 * Low-friction onboarding form that allows standard users to apply for a
 * business account. Uses dialog pattern with glass morphism styling.
 *
 * CONVERSION PSYCHOLOGY:
 *   - Minimal fields (reduces friction)
 *   - Pre-filled email (saves effort)
 *   - Clear benefit framing (motivates action)
 *   - Immediate confirmation (reduces anxiety)
 *
 * SCALING NOTE:
 *   In production, this would POST to a backend endpoint that queues
 *   the application for manual review or auto-approves based on criteria.
 * =============================================================================
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Store, CheckCircle2, Zap, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

interface SellerApplicationModalProps {
  open: boolean;
  onClose: () => void;
}

const benefits = [
  { icon: Store, text: "Sell with verified listings" },
  { icon: BarChart3, text: "Access analytics dashboard" },
  { icon: Users, text: "Reach student gamers across UK" },
];

const SellerApplicationModal = ({ open, onClose }: SellerApplicationModalProps) => {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [sellType, setSellType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission — in production this calls an API
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setSubmitted(false);
      setSellType("");
      setDescription("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={handleClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl glass-elevated border border-border/30 shadow-2xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              /* ── Confirmation State ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Application Submitted</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We'll review your application and get back to you within 24–48 hours.
                  You'll receive an email once approved.
                </p>
                <Button onClick={handleClose} className="rounded-full">
                  Got It
                </Button>
              </motion.div>
            ) : (
              /* ── Application Form ── */
              <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="p-6 pb-4 border-b border-border/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                      <Store className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">Start Selling on nYield</h3>
                      <p className="text-xs text-muted-foreground">List your PC, reach verified buyers, and earn.</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 mt-4">
                    {benefits.map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fields */}
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                    <Input
                      value={user?.fullName ?? ""}
                      disabled
                      className="bg-muted/20 border-border/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                    <Input
                      value={user?.email ?? ""}
                      disabled
                      className="bg-muted/20 border-border/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">What do you want to sell?</label>
                    <Input
                      value={sellType}
                      onChange={(e) => setSellType(e.target.value)}
                      placeholder="e.g. Custom gaming PCs, used components"
                      required
                      className="bg-muted/20 border-border/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tell us more (optional)</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of your business or products..."
                      rows={3}
                      className="bg-muted/20 border-border/30 resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="px-6 pb-6">
                  <Button type="submit" className="w-full rounded-full glow-sm gap-2">
                    <Zap className="h-4 w-4" />
                    Apply for Business Account
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SellerApplicationModal;
