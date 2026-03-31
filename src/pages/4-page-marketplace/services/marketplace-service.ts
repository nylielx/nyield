/**
 * =============================================================================
 * MARKETPLACE SERVICE — Data fetching layer for marketplace listings
 * =============================================================================
 *
 * PURPOSE:
 * Abstracts data access so the UI never imports data files directly.
 * When a real backend is added, only this file needs to change.
 *
 * CURRENT STATE:
 * Uses a simulated async delay (300ms) to mimic API latency.
 * =============================================================================
 */

import type { MarketplaceListing } from "../types/marketplace-types";

/**
 * Fetch all marketplace listings.
 * Replace the dynamic import with a real API call when backend is ready.
 */
export const getMarketplaceListings = async (): Promise<MarketplaceListing[]> => {
  const { marketplaceListings } = await import("@/data/marketplaceExamples");
  await new Promise((res) => setTimeout(res, 300));
  return marketplaceListings;
};

/**
 * Fetch a single listing by ID.
 * Returns undefined if not found.
 */
export const getMarketplaceListingById = async (id: string): Promise<MarketplaceListing | undefined> => {
  const { marketplaceListings } = await import("@/data/marketplaceExamples");
  await new Promise((res) => setTimeout(res, 300));
  return marketplaceListings.find((item) => item.id === id);
};
