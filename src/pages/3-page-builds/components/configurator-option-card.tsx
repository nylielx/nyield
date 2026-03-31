/**
 * =============================================================================
 * CONFIGURATOR OPTION CARD — Selectable option within a category
 * =============================================================================
 * Radio-style selection: clicking selects, only one per category.
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { BuildOption } from "@/data/temp/builds-options-mock";

interface ConfiguratorOptionCardProps {
  option: BuildOption;
  selected: boolean;
  onSelect: () => void;
  index: number;
}

const ConfiguratorOptionCard = ({ option, selected, onSelect, index }: ConfiguratorOptionCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ y: -2 }}
      onClick={onSelect}
      className={`relative text-left rounded-lg border p-4 transition-all ${
        selected
          ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
          : "border-border/50 bg-background/50 hover:border-border hover:bg-muted/20"
      }`}
    >
      {/* Selection indicator */}
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <Check size={12} className="text-primary-foreground" />
        </div>
      )}

      {/* Option name */}
      <p className="font-medium text-sm text-foreground pr-6 mb-1">{option.name}</p>

      {/* Price delta */}
      <p className={`text-xs font-semibold mb-2 ${
        option.price === 0
          ? "text-muted-foreground"
          : option.price > 0
          ? "text-primary"
          : "text-green-400"
      }`}>
        {option.price === 0 ? "Included" : option.price > 0 ? `+£${option.price}` : `-£${Math.abs(option.price)}`}
      </p>

      {/* Features */}
      {option.features && option.features.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {option.features.map((feat) => (
            <span key={feat} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              {feat}
            </span>
          ))}
        </div>
      )}
    </motion.button>
  );
};

export default ConfiguratorOptionCard;
