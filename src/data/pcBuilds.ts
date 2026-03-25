/**
 * =============================================================================
 * PC BUILDS DATA — Mock data for nYield's Pre-built Gaming PCs
 * =============================================================================
 *
 * This file contains the pricing tiers and specs for nYield's gaming PCs.
 * Each tier targets a different budget and performance level.
 *
 * WHY MOCK DATA?
 * In early development, mock data lets you build and style the UI without
 * needing a real backend. When the backend is ready, you simply swap the
 * import for an API call — the component structure stays the same.
 * =============================================================================
 */

/** Type definition for a PC build tier */
export interface PCBuild {
  id: string;
  tier: string;               // Display name like "Entry" or "Pro"
  price: number;              // Price in GBP (£)
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    formFactor: string;
  };
  estimatedFps: {             // Expected FPS in popular games
    fortnite: number;
    valorant: number;
    warzone: number;
  };
  popular?: boolean;          // Highlight as "most popular" choice
}

export const pcBuilds: PCBuild[] = [
  {
    id: "entry",
    tier: "Entry",
    price: 750,
    specs: {
      cpu: "AMD Ryzen 5 5600",
      gpu: "RTX 4060",
      ram: "16GB DDR4",
      storage: "500GB NVMe SSD",
      formFactor: "Compact ATX",
    },
    estimatedFps: { fortnite: 165, valorant: 280, warzone: 110 },
  },
  {
    id: "performance",
    tier: "Performance",
    price: 1000,
    specs: {
      cpu: "AMD Ryzen 5 7600X",
      gpu: "RTX 4060 Ti",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
      formFactor: "Compact ATX",
    },
    estimatedFps: { fortnite: 240, valorant: 400, warzone: 140 },
    popular: true,
  },
  {
    id: "pro",
    tier: "Pro",
    price: 1500,
    specs: {
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 4070 Super",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      formFactor: "Compact ATX",
    },
    estimatedFps: { fortnite: 360, valorant: 550, warzone: 180 },
  },
  {
    id: "elite",
    tier: "Elite",
    price: 2500,
    specs: {
      cpu: "AMD Ryzen 9 7950X3D",
      gpu: "RTX 4080 Super",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD",
      formFactor: "Compact ATX",
    },
    estimatedFps: { fortnite: 480, valorant: 700, warzone: 220 },
  },
  {
    id: "ultimate",
    tier: "Ultimate",
    price: 3500,
    specs: {
      cpu: "AMD Ryzen 9 9950X3D",
      gpu: "RTX 5090",
      ram: "64GB DDR5",
      storage: "4TB NVMe SSD",
      formFactor: "Compact ATX",
    },
    estimatedFps: { fortnite: 600, valorant: 900, warzone: 300 },
  },
];

/** The two color editions available for all builds */
export const editions = [
  {
    id: "blackout",
    name: "Blackout",
    description: "Stealth matte black finish. Zero distractions.",
  },
  {
    id: "whiteout",
    name: "Whiteout",
    description: "Clean arctic white finish. Stand out.",
  },
];
