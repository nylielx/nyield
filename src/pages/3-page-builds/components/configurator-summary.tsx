/**
 * =============================================================================
 * CONFIGURATOR SUMMARY — Live price & selections panel
 * =============================================================================
 * Sticky sidebar showing selected components, total with VAT, and warnings.
 * =============================================================================
 */

import { motion } from "framer-motion";
import { AlertTriangle, Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BuildOptionsMap } from "@/data/temp/builds-options-mock";
import { categoryLabels } from "@/data/temp/builds-options-mock";
import type { CategoryKey, CompatibilityWarning } from "../types/configurator-types";
import BuildNameEditor from "./build-name-editor";

interface ConfiguratorSummaryProps {
  tierName: string;
  basePrice: number;
  totalPrice: number;
  selections: Record<CategoryKey, string>;
  options: BuildOptionsMap;
  warnings: CompatibilityWarning[];
  onConfirm: () => void;
  saving: boolean;
  buildName: string;
  onBuildNameChange: (name: string) => void;
  edition?: string;
}

const ConfiguratorSummary = ({
  tierName,
  basePrice,
  totalPrice,
  selections,
  options,
  warnings,
  onConfirm,
  saving,
  buildName,
  onBuildNameChange,
  edition,
}: ConfiguratorSummaryProps) => {
  const upgradeCost = totalPrice - basePrice;
  const vat = totalPrice * 0.2;
  const grandTotal = totalPrice + vat;

  return (
    <div className="rounded-xl glass-elevated p-5 space-y-4">
      {/* Header */}
      <div>
        <BuildNameEditor name={buildName} onChange={onBuildNameChange} />
        <p className="text-xs text-muted-foreground mt-1">
          {tierName} Tier{edition ? ` · ${edition.charAt(0).toUpperCase() + edition.slice(1)} Edition` : ""}
        </p>
      </div>

      {/* Selected components list */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {categoryLabels.map(({ key, label }) => {
          const selected = options[key].find((o) => o.id === selections[key]);
          if (!selected) return null;
          return (
            <div key={key} className="flex justify-between text-xs gap-2">
              <span className="text-muted-foreground truncate">{label}</span>
              <span className="text-foreground font-medium text-right shrink-0 max-w-[60%] truncate">
                {selected.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Price breakdown */}
      <div className="border-t border-border/30 pt-3 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Base Price</span>
          <span className="text-foreground">£{basePrice.toLocaleString()}</span>
        </div>
        {upgradeCost !== 0 && (
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{upgradeCost > 0 ? "Upgrades" : "Savings"}</span>
            <span className={upgradeCost > 0 ? "text-primary" : "text-green-400"}>
              {upgradeCost > 0 ? `+£${upgradeCost}` : `-£${Math.abs(upgradeCost)}`}
            </span>
          </div>
        )}
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">£{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">VAT (20%)</span>
          <span className="text-foreground">£{vat.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-2 border-t border-border/30">
          <span className="text-foreground">Total</span>
          <motion.span
            key={grandTotal}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-primary font-heading text-lg"
          >
            £{grandTotal.toFixed(2)}
          </motion.span>
        </div>
      </div>

      {/* Compatibility warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          {warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2 text-xs p-2 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertTriangle size={14} className="text-destructive shrink-0 mt-0.5" />
              <span className="text-destructive">{w.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Confirm button */}
      <Button
        onClick={onConfirm}
        disabled={saving || warnings.length > 0}
        className="w-full"
        size="sm"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {saving ? "Saving..." : "Confirm Build"}
      </Button>

      {warnings.length > 0 && (
        <p className="text-[10px] text-muted-foreground text-center">
          Resolve compatibility issues to confirm
        </p>
      )}
    </div>
  );
};

export default ConfiguratorSummary;
