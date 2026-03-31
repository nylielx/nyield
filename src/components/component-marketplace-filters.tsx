/**
 * =============================================================================
 * MARKETPLACE FILTERS — Horizontal inline filter bar for PC listings
 * =============================================================================
 *
 * CyberPower-inspired inline filter system with:
 * - Dropdown panels for each filter category
 * - Multi-select checkboxes
 * - Active filter tags with remove buttons
 * - Sort dropdown
 * - Clear all button
 * - Real-time filtering (no "Apply" button)
 *
 * USAGE: <MarketplaceFilters listings={[...]} onFilteredChange={setFiltered} />
 * =============================================================================
 */

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { MarketplaceListing } from "@/data/marketplaceExamples";

/* --------------------------------------------------------------------------
 * FILTER DEFINITIONS
 * -------------------------------------------------------------------------- */

interface FilterGroup {
  label: string;
  key: string;
  sections: { heading?: string; options: string[] }[];
}

const FILTER_GROUPS: FilterGroup[] = [
  {
    label: "Price Range",
    key: "price",
    sections: [
      {
        options: [
          "Less than £1000",
          "£1000 – £1500",
          "£1500 – £2000",
          "£2000 – £2500",
          "£2500 – £3000",
          "£3000 – £3500",
          "£3500 – £4000",
          "£4000+",
        ],
      },
    ],
  },
  {
    label: "Processor",
    key: "processor",
    sections: [
      { options: ["All AMD", "All Intel"] },
      { heading: "AMD", options: ["Ryzen 5", "Ryzen 7", "Ryzen 9"] },
      { heading: "Intel", options: ["i5", "i7", "i9"] },
    ],
  },
  {
    label: "Processor Generation",
    key: "processorGen",
    sections: [
      { heading: "AMD", options: ["Ryzen 3000", "Ryzen 5000", "Ryzen 7000", "Ryzen 9000"] },
      { heading: "Intel", options: ["10th Gen", "11th Gen", "12th Gen", "13th Gen", "14th Gen"] },
    ],
  },
  {
    label: "Graphics",
    key: "graphics",
    sections: [
      { options: ["All NVIDIA Graphics", "All AMD Graphics"] },
      { heading: "NVIDIA 50 Series", options: ["RTX 5090", "RTX 5080", "RTX 5070", "RTX 5060", "RTX 5050"] },
      { heading: "NVIDIA 40 Series", options: ["RTX 4090", "RTX 4080", "RTX 4070", "RTX 4060", "RTX 4050"] },
      { heading: "AMD RX 9000", options: ["RX 9070 XT", "RX 9060 XT", "RX 9060"] },
      { heading: "AMD Pro", options: ["Radeon Pro Series"] },
    ],
  },
  {
    label: "Memory",
    key: "memory",
    sections: [{ options: ["8GB", "16GB", "32GB", "64GB", "64GB+"] }],
  },
  {
    label: "Type",
    key: "type",
    sections: [{ options: ["Gaming", "Workstation", "Compact / Small Form Factor"] }],
  },
];

const SORT_OPTIONS = ["Relevance", "Price Low → High", "Price High → Low", "Newest Listings"];

/* --------------------------------------------------------------------------
 * FILTER MATCHING HELPERS
 * -------------------------------------------------------------------------- */

/** Check if a listing's price falls within a price range filter */
const matchesPrice = (price: number, filter: string): boolean => {
  if (filter === "Less than £1000") return price < 1000;
  if (filter === "£4000+") return price >= 4000;
  const match = filter.match(/£(\d+)\s*–\s*£(\d+)/);
  if (match) return price >= parseInt(match[1]) && price < parseInt(match[2]);
  return false;
};

/** Check if a listing's CPU matches a processor filter */
const matchesProcessor = (cpu: string, filter: string): boolean => {
  const cpuLower = cpu.toLowerCase();
  if (filter === "All AMD") return cpuLower.includes("ryzen") || cpuLower.includes("amd");
  if (filter === "All Intel") return cpuLower.includes("i5") || cpuLower.includes("i7") || cpuLower.includes("i9") || cpuLower.includes("intel");
  return cpuLower.includes(filter.toLowerCase());
};

/** Check if a listing's CPU matches a processor generation filter */
const matchesProcessorGen = (cpu: string, filter: string): boolean => {
  const cpuLower = cpu.toLowerCase();
  // AMD generations
  if (filter === "Ryzen 3000") return cpuLower.includes("3600") || cpuLower.includes("3700") || cpuLower.includes("3800") || cpuLower.includes("3900") || cpuLower.includes("3950");
  if (filter === "Ryzen 5000") return cpuLower.includes("5600") || cpuLower.includes("5700") || cpuLower.includes("5800") || cpuLower.includes("5900") || cpuLower.includes("5950");
  if (filter === "Ryzen 7000") return cpuLower.includes("7600") || cpuLower.includes("7700") || cpuLower.includes("7800") || cpuLower.includes("7900") || cpuLower.includes("7950");
  if (filter === "Ryzen 9000") return cpuLower.includes("9600") || cpuLower.includes("9700") || cpuLower.includes("9800") || cpuLower.includes("9900") || cpuLower.includes("9950");
  // Intel generations
  if (filter === "10th Gen") return cpuLower.includes("10") && cpuLower.includes("i");
  if (filter === "11th Gen") return cpuLower.includes("11") && cpuLower.includes("i");
  if (filter === "12th Gen") return cpuLower.includes("12") && cpuLower.includes("i");
  if (filter === "13th Gen") return cpuLower.includes("13") && cpuLower.includes("i");
  if (filter === "14th Gen") return cpuLower.includes("14") && cpuLower.includes("i");
  return false;
};

/** Check if a listing's GPU matches a graphics filter */
const matchesGraphics = (gpu: string, filter: string): boolean => {
  const gpuLower = gpu.toLowerCase();
  if (filter === "All NVIDIA Graphics") return gpuLower.includes("rtx") || gpuLower.includes("gtx") || gpuLower.includes("nvidia");
  if (filter === "All AMD Graphics") return gpuLower.includes("rx ") || gpuLower.includes("radeon");
  if (filter === "Radeon Pro Series") return gpuLower.includes("radeon pro");
  return gpuLower.includes(filter.toLowerCase());
};

/** Check if a listing's RAM matches a memory filter */
const matchesMemory = (ram: string, filter: string): boolean => {
  const ramMatch = ram.match(/(\d+)\s*GB/i);
  if (!ramMatch) return false;
  const ramGB = parseInt(ramMatch[1]);
  if (filter === "64GB+") return ramGB > 64;
  const filterMatch = filter.match(/(\d+)GB/);
  if (filterMatch) return ramGB === parseInt(filterMatch[1]);
  return false;
};

/** Check if a listing matches a type filter */
const matchesType = (listing: MarketplaceListing, filter: string): boolean => {
  const combined = `${listing.bestFor} ${listing.tags.join(" ")}`.toLowerCase();
  if (filter === "Gaming") return combined.includes("gaming");
  if (filter === "Workstation") return combined.includes("creator") || combined.includes("workstation") || combined.includes("editing");
  if (filter === "Compact / Small Form Factor") return combined.includes("compact") || combined.includes("sff") || combined.includes("small");
  return false;
};

/* --------------------------------------------------------------------------
 * DROPDOWN PANEL COMPONENT
 * -------------------------------------------------------------------------- */

interface DropdownPanelProps {
  group: FilterGroup;
  selected: Set<string>;
  onToggle: (key: string, option: string) => void;
  isOpen: boolean;
  onOpenToggle: () => void;
}

const DropdownPanel = ({ group, selected, onToggle, isOpen, onOpenToggle }: DropdownPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const activeCount = selected.size;

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={onOpenToggle}
        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all whitespace-nowrap ${
          isOpen
            ? "border-primary bg-primary/10 text-primary"
            : activeCount > 0
              ? "border-primary/50 bg-primary/5 text-primary"
              : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
        }`}
      >
        {group.label}
        {activeCount > 0 && (
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
            {activeCount}
          </span>
        )}
        <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 min-w-[220px] max-h-[320px] overflow-y-auto rounded-xl glass-focus shadow-xl p-3 space-y-3">
          {group.sections.map((section, si) => (
            <div key={si}>
              {section.heading && (
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 px-1">
                  {section.heading}
                </p>
              )}
              <div className="space-y-1">
                {section.options.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-xs transition-colors ${
                      selected.has(option)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Checkbox
                      checked={selected.has(option)}
                      onCheckedChange={() => onToggle(group.key, option)}
                      className="h-3.5 w-3.5"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {si < group.sections.length - 1 && <div className="border-t border-border mt-2" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* --------------------------------------------------------------------------
 * MAIN FILTER COMPONENT
 * -------------------------------------------------------------------------- */

interface MarketplaceFiltersProps {
  listings: MarketplaceListing[];
  onFilteredChange: (filtered: MarketplaceListing[]) => void;
}

const MarketplaceFilters = ({ listings, onFilteredChange }: MarketplaceFiltersProps) => {
  /** Selected filters per category key: Set of selected option strings */
  const [filters, setFilters] = useState<Record<string, Set<string>>>({});
  const [sortBy, setSortBy] = useState("Relevance");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /** Close dropdowns when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /** Toggle a filter option */
  const toggleFilter = useCallback((key: string, option: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      const set = new Set(next[key] || []);
      if (set.has(option)) set.delete(option);
      else set.add(option);
      if (set.size === 0) delete next[key];
      else next[key] = set;
      return next;
    });
  }, []);

  /** Remove a single active filter tag */
  const removeFilter = useCallback((key: string, option: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      const set = new Set(next[key] || []);
      set.delete(option);
      if (set.size === 0) delete next[key];
      else next[key] = set;
      return next;
    });
  }, []);

  /** Clear all filters */
  const clearAll = useCallback(() => {
    setFilters({});
    setSortBy("Relevance");
  }, []);

  /** Collect all active tags for display */
  const activeTags = useMemo(() => {
    const tags: { key: string; label: string; option: string }[] = [];
    for (const [key, set] of Object.entries(filters)) {
      const group = FILTER_GROUPS.find((g) => g.key === key);
      for (const option of set) {
        tags.push({ key, label: group?.label || key, option });
      }
    }
    return tags;
  }, [filters]);

  /** Apply filters + sort to listings */
  useEffect(() => {
    let result = [...listings];

    // Apply each active filter category (OR within category, AND across categories)
    for (const [key, selected] of Object.entries(filters)) {
      if (selected.size === 0) continue;
      const selectedArr = Array.from(selected);

      result = result.filter((listing) => {
        switch (key) {
          case "price":
            return selectedArr.some((f) => matchesPrice(listing.price, f));
          case "processor":
            return selectedArr.some((f) => matchesProcessor(listing.specs.cpu, f));
          case "processorGen":
            return selectedArr.some((f) => matchesProcessorGen(listing.specs.cpu, f));
          case "graphics":
            return selectedArr.some((f) => matchesGraphics(listing.specs.gpu, f));
          case "memory":
            return selectedArr.some((f) => matchesMemory(listing.specs.ram, f));
          case "type":
            return selectedArr.some((f) => matchesType(listing, f));
          default:
            return true;
        }
      });
    }

    // Sort
    switch (sortBy) {
      case "Price Low → High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price High → Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Newest Listings":
        result.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
        break;
    }

    onFilteredChange(result);
  }, [filters, sortBy, listings, onFilteredChange]);

  const totalActive = activeTags.length;

  return (
    <div ref={containerRef} className="space-y-3">
      {/* ── Filter bar row ── */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Label */}
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground uppercase tracking-wider mr-1">
          <SlidersHorizontal size={14} className="text-primary" />
          Filters
        </div>

        {/* Filter dropdowns */}
        {FILTER_GROUPS.map((group) => (
          <DropdownPanel
            key={group.key}
            group={group}
            selected={filters[group.key] || new Set()}
            onToggle={toggleFilter}
            isOpen={openDropdown === group.key}
            onOpenToggle={() => {
              setSortOpen(false);
              setOpenDropdown((prev) => (prev === group.key ? null : group.key));
            }}
          />
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setOpenDropdown(null);
              setSortOpen((p) => !p);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all whitespace-nowrap ${
              sortOpen
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            Sort: {sortBy}
            <ChevronDown size={12} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
          </button>

          {sortOpen && (
            <div className="absolute top-full right-0 mt-2 z-50 min-w-[180px] rounded-xl border border-border bg-card shadow-xl p-2">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors ${
                    sortBy === option
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clear all */}
        {totalActive > 0 && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-xs font-medium hover:bg-destructive/10 transition-colors"
          >
            <X size={12} />
            Clear All
          </button>
        )}
      </div>

      {/* ── Active filter tags ── */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activeTags.map((tag) => (
            <button
              key={`${tag.key}-${tag.option}`}
              onClick={() => removeFilter(tag.key, tag.option)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-medium hover:bg-primary/20 transition-colors"
            >
              {tag.option}
              <X size={10} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplaceFilters;
