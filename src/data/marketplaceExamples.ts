/**
 * =============================================================================
 * MARKETPLACE DATA — Mock listings for nYield's verified used PC marketplace
 * =============================================================================
 *
 * Each listing represents a used gaming PC that has been stress-tested and
 * verified by nYield's software. This builds buyer confidence by showing
 * real performance data, not just specs.
 *
 * FUTURE SCALABILITY:
 * - This data will come from an API connected to a database
 * - Each listing will be generated after running nYield's diagnostic tool
 * - Sellers will submit their PCs for virtual stress testing
 * - Results are stored and displayed automatically
 * =============================================================================
 */

export interface MarketplaceListing {
  id: string;
  title: string;
  price: number;
  seller: string;
  /** Stress test results — the core of nYield's marketplace value proposition */
  benchmarks: {
    cpuScore: number;         // Out of 100
    gpuScore: number;         // Out of 100
    ramStability: number;     // Percentage
    coolingPerformance: string; // Rating
    estimatedFps: {
      fortnite: number;
      valorant: number;
    };
  };
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  verified: boolean;          // Has this PC passed nYield verification?
  condition: string;
  listedDate: string;
}

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "mp-001",
    title: "RTX 4070 Gaming Build",
    price: 820,
    seller: "TechMike_UK",
    benchmarks: {
      cpuScore: 88,
      gpuScore: 91,
      ramStability: 99.7,
      coolingPerformance: "Excellent",
      estimatedFps: { fortnite: 310, valorant: 480 },
    },
    specs: {
      cpu: "Ryzen 7 5800X",
      gpu: "RTX 4070",
      ram: "32GB DDR4",
      storage: "1TB NVMe",
    },
    verified: true,
    condition: "Excellent",
    listedDate: "2026-03-20",
  },
  {
    id: "mp-002",
    title: "Budget Esports Machine",
    price: 450,
    seller: "GameDeals22",
    benchmarks: {
      cpuScore: 72,
      gpuScore: 68,
      ramStability: 98.2,
      coolingPerformance: "Good",
      estimatedFps: { fortnite: 180, valorant: 290 },
    },
    specs: {
      cpu: "Ryzen 5 3600",
      gpu: "RTX 3060",
      ram: "16GB DDR4",
      storage: "512GB NVMe",
    },
    verified: true,
    condition: "Good",
    listedDate: "2026-03-18",
  },
  {
    id: "mp-003",
    title: "High-End Creator & Gaming Rig",
    price: 1650,
    seller: "ProBuilds_UK",
    benchmarks: {
      cpuScore: 95,
      gpuScore: 94,
      ramStability: 99.9,
      coolingPerformance: "Excellent",
      estimatedFps: { fortnite: 450, valorant: 680 },
    },
    specs: {
      cpu: "Ryzen 9 7900X",
      gpu: "RTX 4080",
      ram: "64GB DDR5",
      storage: "2TB NVMe",
    },
    verified: true,
    condition: "Like New",
    listedDate: "2026-03-22",
  },
];
