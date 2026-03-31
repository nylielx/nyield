/**
 * =============================================================================
 * BUILDS CONFIGURATIONS MOCK — Stores saved user configurations
 * =============================================================================
 * In-memory store for saved builds. Replace with API later.
 * =============================================================================
 */

export interface SavedConfiguration {
  id: string;
  tierId: string;
  tierName: string;
  basePrice: number;
  totalPrice: number;
  selections: Record<string, string>; // category → option id
  createdAt: string;
}

/** In-memory store — acts as mock database */
export const savedConfigurations: SavedConfiguration[] = [];
