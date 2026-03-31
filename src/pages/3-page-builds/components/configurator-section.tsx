/**
 * =============================================================================
 * CONFIGURATOR SECTION — Collapsible category with option cards
 * =============================================================================
 * Accordion-style section that contains selectable option cards.
 * =============================================================================
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, RotateCcw } from "lucide-react";
import type { BuildOption } from "@/data/temp/builds-options-mock";
import ConfiguratorOptionCard from "./configurator-option-card";

interface ConfiguratorSectionProps {
  label: string;
  options: BuildOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  onReset: () => void;
  defaultOpen?: boolean;
}

const ConfiguratorSection = ({
  label,
  options,
  selectedId,
  onSelect,
  onReset,
  defaultOpen = false,
}: ConfiguratorSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const selectedOption = options.find((o) => o.id === selectedId);

  return (
    <div className="rounded-xl glass-base overflow-hidden">
      {/* Clickable header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <span className="font-heading font-semibold text-foreground">{label}</span>
          {selectedOption && (
            <span className="text-xs text-muted-foreground hidden sm:inline">
              — {selectedOption.name}
              {selectedOption.price !== 0 && (
                <span className={selectedOption.price > 0 ? "text-primary ml-1" : "text-green-400 ml-1"}>
                  {selectedOption.price > 0 ? `+£${selectedOption.price}` : `-£${Math.abs(selectedOption.price)}`}
                </span>
              )}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-muted-foreground" />
        </motion.div>
      </button>

      {/* Collapsible content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border/30">
              {/* Reset button */}
              <div className="flex justify-end py-2">
                <button
                  onClick={onReset}
                  className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                >
                  <RotateCcw size={12} /> Reset to Default
                </button>
              </div>

              {/* Option cards grid */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {options.map((option, i) => (
                  <ConfiguratorOptionCard
                    key={option.id}
                    option={option}
                    selected={option.id === selectedId}
                    onSelect={() => onSelect(option.id)}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfiguratorSection;
