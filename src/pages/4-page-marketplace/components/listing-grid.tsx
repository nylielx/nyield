/**
 * =============================================================================
 * LISTING GRID — Maps and renders listing cards in a responsive grid
 * =============================================================================
 */

import type { MarketplaceListing } from "../types/marketplace-types";
import ListingCard from "./listing-card";

interface ListingGridProps {
  listings: MarketplaceListing[];
}

const ListingGrid = ({ listings }: ListingGridProps) => {
  if (listings.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <p className="text-lg font-heading font-bold text-foreground mb-2">No listings match your filters</p>
        <p className="text-sm text-muted-foreground">Try adjusting or clearing your filters to see more results.</p>
      </div>
    );
  }

  return (
    <>
      {listings.map((listing, index) => (
        <ListingCard key={listing.id} listing={listing} index={index} />
      ))}
    </>
  );
};

export default ListingGrid;
