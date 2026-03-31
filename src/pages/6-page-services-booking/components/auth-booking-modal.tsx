/**
 * =============================================================================
 * AUTH BOOKING MODAL — Sign in / Sign up / Guest before confirming
 * =============================================================================
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, UserPlus, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthBookingModalProps {
  open: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
  onGuest: (email: string) => void;
}

type Mode = "choose" | "signin" | "signup" | "guest";

const AuthBookingModal = ({ open, onClose, onAuthenticated, onGuest }: AuthBookingModalProps) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setGuestEmail("");
    setError("");
    setMode("choose");
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    const result = await login({ email, password });
    setLoading(false);
    if (result.success) {
      onAuthenticated();
      resetForm();
    } else {
      setError(result.message);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    const result = await register({ fullName, email, password });
    setLoading(false);
    if (result.success) {
      onAuthenticated();
      resetForm();
    } else {
      setError(result.message);
    }
  };

  const handleGuest = () => {
    if (!guestEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    onGuest(guestEmail);
    resetForm();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
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
              onClick={() => { onClose(); resetForm(); }}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="font-heading text-lg font-bold text-foreground mb-1">
              Save your build & continue
            </h3>
            <p className="text-xs text-muted-foreground mb-5">
              Sign in to manage your bookings, or continue as guest.
            </p>

            {error && (
              <div className="mb-4 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {mode === "choose" && (
                <motion.div key="choose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  <button
                    onClick={() => setMode("signin")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg glass-base hover:border-primary/30 transition-all text-sm font-medium text-foreground"
                  >
                    <LogIn size={16} className="text-primary" /> Sign In
                  </button>
                  <button
                    onClick={() => setMode("signup")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg glass-base hover:border-primary/30 transition-all text-sm font-medium text-foreground"
                  >
                    <UserPlus size={16} className="text-primary" /> Create Account
                  </button>
                  <div className="flex items-center gap-3 my-2">
                    <div className="h-px flex-1 bg-border/50" />
                    <span className="text-[10px] text-muted-foreground uppercase">or</span>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>
                  <button
                    onClick={() => setMode("guest")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg glass-base hover:border-border transition-all text-sm text-muted-foreground"
                  >
                    <Mail size={16} /> Continue as Guest
                  </button>
                </motion.div>
              )}

              {mode === "signin" && (
                <motion.div key="signin" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    onClick={handleSignIn}
                    disabled={loading}
                    className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? "Signing in..." : "Sign In & Confirm"}
                  </button>
                  <button onClick={() => { setMode("choose"); setError(""); }} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
                    ← Back to options
                  </button>
                </motion.div>
              )}

              {mode === "signup" && (
                <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    onClick={handleSignUp}
                    disabled={loading}
                    className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? "Creating account..." : "Create Account & Confirm"}
                  </button>
                  <button onClick={() => { setMode("choose"); setError(""); }} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
                    ← Back to options
                  </button>
                </motion.div>
              )}

              {mode === "guest" && (
                <motion.div key="guest" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Enter your email to receive booking confirmation. You won't be able to manage bookings without an account.
                  </p>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    onClick={handleGuest}
                    className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Continue as Guest
                  </button>
                  <button onClick={() => { setMode("choose"); setError(""); }} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
                    ← Back to options
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthBookingModal;
