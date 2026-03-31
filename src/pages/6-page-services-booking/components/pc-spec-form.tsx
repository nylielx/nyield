/**
 * =============================================================================
 * PC SPEC FORM — Structured hardware specification input
 * =============================================================================
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Monitor, MemoryStick, HardDrive, Fan, Zap, Box, StickyNote, Check } from "lucide-react";
import type { PCSpecs } from "../types/booking-types";
import { PC_COMPONENT_OPTIONS } from "../types/booking-types";

interface PCSpecFormProps {
  onComplete: (specs: PCSpecs) => void;
  initialSpecs?: Partial<PCSpecs>;
}

interface FieldConfig {
  key: keyof PCSpecs;
  label: string;
  icon: React.ElementType;
  required: boolean;
  options?: string[];
  type: "select" | "textarea";
}

const fields: FieldConfig[] = [
  { key: "gpu", label: "Graphics Card (GPU)", icon: Monitor, required: true, options: PC_COMPONENT_OPTIONS.gpu, type: "select" },
  { key: "cpu", label: "Processor (CPU)", icon: Cpu, required: true, options: PC_COMPONENT_OPTIONS.cpu, type: "select" },
  { key: "ram", label: "Memory (RAM)", icon: MemoryStick, required: true, options: PC_COMPONENT_OPTIONS.ram, type: "select" },
  { key: "storage", label: "Storage", icon: HardDrive, required: true, options: PC_COMPONENT_OPTIONS.storage, type: "select" },
  { key: "cooling", label: "Cooling", icon: Fan, required: true, options: PC_COMPONENT_OPTIONS.cooling, type: "select" },
  { key: "powerSupply", label: "Power Supply", icon: Zap, required: true, options: PC_COMPONENT_OPTIONS.powerSupply, type: "select" },
  { key: "pcCase", label: "Case (optional)", icon: Box, required: false, type: "select" },
  { key: "notes", label: "Additional Notes (optional)", icon: StickyNote, required: false, type: "textarea" },
];

const PCSpecForm = ({ onComplete, initialSpecs }: PCSpecFormProps) => {
  const [specs, setSpecs] = useState<Partial<PCSpecs>>(initialSpecs ?? {});
  const [submitted, setSubmitted] = useState(false);

  const requiredFields = fields.filter((f) => f.required);
  const completedRequired = requiredFields.filter((f) => specs[f.key]?.trim());
  const isComplete = completedRequired.length === requiredFields.length;
  const progress = (completedRequired.length / requiredFields.length) * 100;

  const handleChange = (key: keyof PCSpecs, value: string) => {
    setSpecs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    setSubmitted(true);
    onComplete(specs as PCSpecs);
  };

  return (
    <div>
      <h3 className="font-heading font-bold text-foreground mb-1 flex items-center gap-2">
        <Cpu size={18} className="text-primary" /> Your PC Setup
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Tell us about your hardware so we can tailor the optimisation.
      </p>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
          <span>{completedRequired.length}/{requiredFields.length} required fields</span>
          {isComplete && <span className="text-primary font-medium flex items-center gap-1"><Check size={10} /> Complete</span>}
        </div>
        <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", damping: 20 }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {fields.map((field, i) => {
          const Icon = field.icon;
          const value = specs[field.key] ?? "";
          const filled = !!value.trim();

          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <label className="flex items-center gap-2 text-xs font-medium text-foreground mb-1.5">
                <Icon size={14} className={filled ? "text-primary" : "text-muted-foreground"} />
                {field.label}
                {field.required && <span className="text-destructive">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  value={value}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  disabled={submitted}
                  placeholder="Any specific requirements or notes..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 min-h-[60px] resize-none"
                />
              ) : field.options ? (
                <select
                  value={value}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  disabled={submitted}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 appearance-none"
                >
                  <option value="">Select {field.label.replace(" (optional)", "")}...</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  value={value}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  disabled={submitted}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {!submitted && (
        <motion.button
          whileHover={isComplete ? { scale: 1.02 } : {}}
          whileTap={isComplete ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          disabled={!isComplete}
          className={`w-full mt-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            isComplete
              ? "bg-primary text-primary-foreground glow-sm hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {isComplete ? "Confirm PC Setup" : "Complete all required fields"}
        </motion.button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2"
        >
          <Check size={16} className="text-primary" />
          <span className="text-xs text-foreground font-medium">PC specs saved — select your date below</span>
        </motion.div>
      )}
    </div>
  );
};

export default PCSpecForm;
