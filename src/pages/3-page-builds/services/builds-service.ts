/**
 * =============================================================================
 * BUILDS SERVICE — Data access layer for configurator
 * =============================================================================
 * Abstracts mock data. Replace imports with API calls later.
 * =============================================================================
 */

import type { BuildOptionsMap, BuildOption } from "@/data/temp/builds-options-mock";
import type { SavedConfiguration } from "@/data/temp/builds-configurations-mock";
import type { CategoryKey, CompatibilityWarning } from "../types/configurator-types";

/** Fetch all build options */
export const getBuildOptions = async (): Promise<BuildOptionsMap> => {
  const { buildOptions } = await import("@/data/temp/builds-options-mock");
  await new Promise((res) => setTimeout(res, 200));
  return buildOptions;
};

/** Get default selections (first option in each category) */
export const getDefaultSelections = async (): Promise<Record<CategoryKey, string>> => {
  const options = await getBuildOptions();
  const defaults: Record<string, string> = {};
  for (const key of Object.keys(options) as CategoryKey[]) {
    if (options[key].length > 0) {
      defaults[key] = options[key][0].id;
    }
  }
  return defaults as Record<CategoryKey, string>;
};

/** Check compatibility — placeholder logic */
export const checkCompatibility = (
  selections: Record<CategoryKey, string>,
  options: BuildOptionsMap
): CompatibilityWarning[] => {
  const warnings: CompatibilityWarning[] = [];

  // Find selected option objects
  const getSelected = (cat: CategoryKey): BuildOption | undefined =>
    options[cat].find((o) => o.id === selections[cat]);

  const cpu = getSelected("processor");
  const mb = getSelected("motherboard");
  const ram = getSelected("memory");
  const gpu = getSelected("graphics");
  const psu = getSelected("power");

  // DDR4 CPU with DDR5 RAM warning
  if (cpu && ram) {
    const isDDR4CPU = cpu.name.includes("5600") || cpu.name.includes("5800");
    const isDDR5RAM = ram.name.includes("DDR5");
    if (isDDR4CPU && isDDR5RAM) {
      warnings.push({ category: "memory", message: "DDR5 RAM is not compatible with AM4 processors. Consider DDR4." });
    }
  }

  // AM4 board with AM5 CPU warning
  if (cpu && mb) {
    const isAM5CPU = cpu.name.includes("7600") || cpu.name.includes("7800") || cpu.name.includes("7950") || cpu.name.includes("9950");
    const isAM4Board = mb.name.includes("B550");
    if (isAM5CPU && isAM4Board) {
      warnings.push({ category: "motherboard", message: "This motherboard uses AM4 socket. Your CPU requires AM5." });
    }
  }

  // High-end GPU with low PSU
  if (gpu && psu) {
    const isHighGPU = gpu.name.includes("4080") || gpu.name.includes("5090");
    const isLowPSU = psu.name.includes("600W");
    if (isHighGPU && isLowPSU) {
      warnings.push({ category: "power", message: "High-end GPU may require 750W+ PSU for stable operation." });
    }
  }

  return warnings;
};

/** Save a configuration */
export const saveConfiguration = async (config: Omit<SavedConfiguration, "id" | "createdAt">): Promise<SavedConfiguration> => {
  const { savedConfigurations } = await import("@/data/temp/builds-configurations-mock");
  await new Promise((res) => setTimeout(res, 300));
  const saved: SavedConfiguration = {
    ...config,
    id: `cfg-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  savedConfigurations.push(saved);
  return saved;
};

/** Get saved configurations */
export const getConfigurations = async (): Promise<SavedConfiguration[]> => {
  const { savedConfigurations } = await import("@/data/temp/builds-configurations-mock");
  await new Promise((res) => setTimeout(res, 200));
  return [...savedConfigurations];
};
