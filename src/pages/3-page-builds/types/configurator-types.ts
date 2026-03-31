/**
 * =============================================================================
 * CONFIGURATOR TYPES
 * =============================================================================
 */

import type { BuildOptionsMap } from "@/data/temp/builds-options-mock";

export type CategoryKey = keyof BuildOptionsMap;

export interface ConfiguratorState {
  selections: Record<CategoryKey, string>; // category → selected option id
}

export interface CompatibilityWarning {
  category: CategoryKey;
  message: string;
}
