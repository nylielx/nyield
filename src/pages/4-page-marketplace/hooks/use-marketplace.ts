/**
 * =============================================================================
 * USE MARKETPLACE — Custom hook for marketplace state management
 * =============================================================================
 *
 * Handles:
 * - Fetching listings via the service layer
 * - Loading state
 * - Filtered listings state (driven by MarketplaceFilters component)
 * =============================================================================
 */

import { useState, useEffect, useCallback } from "react";
import type { MarketplaceListing } from "../types/marketplace-types";
import { getMarketplaceListings } from "../services/marketplace-service";

export const useMarketplace = () => {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMarketplaceListings().then((data) => {
      setListings(data);
      setFilteredListings(data);
      setLoading(false);
    });
  }, []);

  const handleFilteredChange = useCallback((filtered: MarketplaceListing[]) => {
    setFilteredListings(filtered);
  }, []);

  return { listings, filteredListings, loading, handleFilteredChange };
};
