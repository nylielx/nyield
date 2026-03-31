/**
 * LISTING CARD — Marketplace card with AwardBadge verification tiers,
 * animated like/save controls (top-left), and badge (top-right).
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu,
  Monitor,
  MemoryStick,
  HardDrive,
  Gauge,
  Lock,
  Heart,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AwardBadge, tierDescriptions } from "@/components/ui/award-badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { MarketplaceListing } from "../types/marketplace-types";

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

/** Map verification tier to AwardBadge props */
const tierToBadge = (tier: "gold" | "silver" | "bronze") => {
  const map = {
    gold: { type: "product-of-the-month" as const, place: 1 as const },
    silver: { type: "product-of-the-week" as const, place: 2 as const },
    bronze: { type: "product-of-the-day" as const, place: 3 as const },
  };
  return map[tier];
};

const tierTooltips: Record<string, string> = {
  gold: "Advanced verified: latency, WiFi, FPS, stability, and multi-game benchmark tested",
  silver: "Performance verified: basic third-party benchmark suite completed",
  bronze: "Seller verified: trusted seller listing",
};

interface ListingCardProps {
  listing: MarketplaceListing;
  index: number;
}

const ListingCard = ({ listing, index }: ListingCardProps) => {
  const [favourited, setFavourited] = useState(false);
  const [saved, setSaved] = useState(false);

  const verification = (listing as any).verification_tier ?? {
    tier: listing.verified ? "gold" : "bronze",
    label: listing.verified ? "Advanced Verified" : "Seller Verified",
  };

  const badgeProps = tierToBadge(verification.tier);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={listing.isActive ? { y: -4 } : undefined}
      className={`rounded-xl overflow-hidden flex flex-col relative ${
        listing.isActive
          ? "glass-elevated"
          : "glass-base opacity-50 pointer-events-none select-none"
      }`}
    >
      {/* Disabled overlay */}
      {!listing.isActive && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/70 backdrop-blur-md rounded-xl">
          <Lock className="w-8 h-8 text-muted-foreground mb-3" />
          <p className="font-heading text-sm font-bold text-foreground">Coming Soon</p>
          <p className="text-xs text-muted-foreground text-center max-w-[200px] mt-1">
            This listing will be available in the full marketplace launch.
          </p>
        </div>
      )}

      {/* Like + Save — TOP LEFT */}
      {listing.isActive && (
        <div className="absolute top-3 left-3 flex gap-1.5 z-20">
          <motion.button
            onClick={() => setFavourited(!favourited)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center transition-colors"
            title={favourited ? "Remove from favourites" : "Add to favourites"}
          >
            <motion.div
              animate={favourited ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={14}
                className={`transition-colors duration-200 ${
                  favourited ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            </motion.div>
          </motion.button>
          <motion.button
            onClick={() => setSaved(!saved)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center transition-colors"
            title={saved ? "Remove from list" : "Save to list"}
          >
            <motion.div
              animate={saved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Bookmark
                size={14}
                className={`transition-colors duration-200 ${
                  saved ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            </motion.div>
          </motion.button>
        </div>
      )}

      {/* Verification badge — TOP RIGHT */}
      {listing.isActive && (
        <div className="absolute top-3 right-3 z-20">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <AwardBadge type={badgeProps.type} place={badgeProps.place} size="sm" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[220px] text-xs">
              {tierTooltips[verification.tier]}
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Card Header */}
      <div className="p-5 pt-14 border-b border-border">
        <h3 className="font-heading text-lg font-bold text-foreground leading-tight mb-2">
          {listing.title}
        </h3>

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
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">CPU Score</span>
              <span className="text-foreground font-semibold">{listing.benchmarks.cpuScore}/100</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-secondary">
              <motion.div className="h-1.5 rounded-full bg-primary" initial={{ width: 0 }} whileInView={{ width: `${listing.benchmarks.cpuScore}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
            </div>
          </div>
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

      {/* Best For + Buttons — pinned to bottom */}
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
