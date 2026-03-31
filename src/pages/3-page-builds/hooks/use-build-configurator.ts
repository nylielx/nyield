/**
 * =============================================================================
 * USE BUILD CONFIGURATOR — State management hook
 * =============================================================================
 * Manages selected options, total price, and compatibility warnings.
 * =============================================================================
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import type { BuildOptionsMap } from "@/data/temp/builds-options-mock";
import type { CategoryKey, CompatibilityWarning } from "../types/configurator-types";
import {
  getBuildOptions,
  getDefaultSelections,
  checkCompatibility,
  saveConfiguration,
} from "../services/builds-service";

interface UseBuildConfiguratorProps {
  tierId: string;
  tierName: string;
  basePrice: number;
}

export const useBuildConfigurator = ({ tierId, tierName, basePrice }: UseBuildConfiguratorProps) => {
  const [options, setOptions] = useState<BuildOptionsMap | null>(null);
  const [selections, setSelections] = useState<Record<CategoryKey, string> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /** Load options and defaults on mount */
  useEffect(() => {
    Promise.all([getBuildOptions(), getDefaultSelections()]).then(([opts, defaults]) => {
      setOptions(opts);
      setSelections(defaults);
      setLoading(false);
    });
  }, []);

  /** Select an option in a category */
  const selectOption = useCallback((category: CategoryKey, optionId: string) => {
    setSelections((prev) => prev ? { ...prev, [category]: optionId } : prev);
  }, []);

  /** Reset a category to its default (first option) */
  const resetCategory = useCallback((category: CategoryKey) => {
    if (!options) return;
    const firstId = options[category][0]?.id;
    if (firstId) selectOption(category, firstId);
  }, [options, selectOption]);

  /** Calculate total price */
  const totalPrice = useMemo(() => {
    if (!options || !selections) return basePrice;
    let total = basePrice;
    for (const key of Object.keys(selections) as CategoryKey[]) {
      const selected = options[key].find((o) => o.id === selections[key]);
      if (selected) total += selected.price;
    }
    return total;
  }, [options, selections, basePrice]);

  /** Get compatibility warnings */
  const warnings: CompatibilityWarning[] = useMemo(() => {
    if (!options || !selections) return [];
    return checkCompatibility(selections, options);
  }, [options, selections]);

  /** Save current configuration */
  const confirmBuild = useCallback(async () => {
    if (!selections) return;
    setSaving(true);
    try {
      await saveConfiguration({
        tierId,
        tierName,
        basePrice,
        totalPrice,
        selections,
      });
    } finally {
      setSaving(false);
    }
  }, [selections, tierId, tierName, basePrice, totalPrice]);

  return {
    options,
    selections,
    loading,
    saving,
    totalPrice,
    warnings,
    selectOption,
    resetCategory,
    confirmBuild,
  };
};
