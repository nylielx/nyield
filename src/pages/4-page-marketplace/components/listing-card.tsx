/**
 * =============================================================================
 * LISTING CARD — Single marketplace listing card component
 * =============================================================================
 *
 * Renders a single PC listing with specs, benchmarks, tags, and action buttons.
 * Handles both active and disabled (coming soon) states.
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Cpu,
  Monitor,
  MemoryStick,
  HardDrive,
  Gauge,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MarketplaceListing } from "../types/marketplace-types";

/** Tag color styles */
const getTagStyle = (tag: string) => {
  switch (tag) {
    case "Best Value":
    case "High Performance":
      return "bg-primary/15 text-primary border-primary/30";
    case "Budget":
      return "bg-muted text-muted-foreground border-border";
    case "Creator":
      return "bg-accent/15 text-accent border-accent/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

interface ListingCardProps {
  listing: MarketplaceListing;
  index: number;
}

const ListingCard = ({ listing, index }: ListingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={listing.isActive ? { y: -4 } : undefined}
      className={`rounded-xl border overflow-hidden flex flex-col relative ${
        listing.isActive
          ? "border-border bg-card"
          : "border-border/50 bg-card/50 opacity-50 pointer-events-none select-none"
      }`}
    >
      {/* Disabled overlay */}
      {!listing.isActive && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm rounded-xl">
          <Lock className="w-8 h-8 text-muted-foreground mb-3" />
          <p className="font-heading text-sm font-bold text-foreground">Coming Soon</p>
          <p className="text-xs text-muted-foreground text-center max-w-[200px] mt-1">
            This listing will be available in the full marketplace launch.
          </p>
        </div>
      )}

      {/* Card Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading text-lg font-bold text-foreground leading-tight">{listing.title}</h3>
          {listing.verified && (
            <div className="flex items-center gap-1 text-primary text-xs font-semibold shrink-0 ml-2">
              <ShieldCheck size={14} /> Verified
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {listing.tags.map((tag) => (
            <span key={tag} className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getTagStyle(tag)}`}>
              {tag}
            </span>
          ))}
        </div>

        <p className="text-3xl font-heading font-bold text-foreground mb-1">£{listing.price.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">Seller: {listing.seller} · {listing.condition}</p>
      </div>

      {/* Specs */}
      <div className="p-5 border-b border-border space-y-1.5 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground"><Cpu size={14} className="text-primary shrink-0" /> {listing.specs.cpu}</div>
        <div className="flex items-center gap-2 text-muted-foreground"><Monitor size={14} className="text-primary shrink-0" /> {listing.specs.gpu}</div>
        <div className="flex items-center gap-2 text-muted-foreground"><MemoryStick size={14} className="text-primary shrink-0" /> {listing.specs.ram}</div>
        <div className="flex items-center gap-2 text-muted-foreground"><HardDrive size={14} className="text-primary shrink-0" /> {listing.specs.storage}</div>
      </div>

      {/* Stress Test Summary */}
      <div className="p-5 border-b border-border">
        <p className="text-xs font-semibold text-primary mb-3 flex items-center gap-1"><Gauge size={12} /> STRESS TEST RESULTS</p>

        <div className="space-y-2.5">
          {/* CPU Score bar */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">CPU Score</span>
              <span className="text-foreground font-semibold">{listing.benchmarks.cpuScore}/100</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-secondary">
              <motion.div className="h-1.5 rounded-full bg-primary" initial={{ width: 0 }} whileInView={{ width: `${listing.benchmarks.cpuScore}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
            </div>
          </div>

          {/* GPU Score bar */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">GPU Score</span>
              <span className="text-foreground font-semibold">{listing.benchmarks.gpuScore}/100</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-secondary">
              <motion.div className="h-1.5 rounded-full bg-primary" initial={{ width: 0 }} whileInView={{ width: `${listing.benchmarks.gpuScore}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} />
            </div>
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">RAM Stability</span>
            <span className="text-foreground font-semibold">{listing.benchmarks.ramStability}%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Cooling</span>
            <span className="text-foreground font-semibold">{listing.benchmarks.coolingRating}</span>
          </div>
        </div>
      </div>

      {/* Best For + Buttons */}
      <div className="p-5 mt-auto">
        <p className="text-xs text-muted-foreground mb-3">
          <span className="font-semibold text-foreground">Best For:</span> {listing.bestFor}
        </p>

        <div className="space-y-2">
          {listing.isActive ? (
            <Link to={`/marketplace/${listing.id}`}>
              <Button className="w-full" size="sm">View Full Details</Button>
            </Link>
          ) : (
            <Button className="w-full" size="sm" disabled>View Full Details</Button>
          )}
          <Button variant="outline" className="w-full" size="sm" disabled>Make Offer (Coming Soon)</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;
