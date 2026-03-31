export interface SavedBuild {
  id: string;
  name: string;
  tier: string;
  totalPrice: number;
  savedAt: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
}

export const savedBuildsMock: SavedBuild[] = [
  {
    id: "sb-1",
    name: "Mid-Range 1440p Gaming",
    tier: "Performance",
    totalPrice: 1150,
    savedAt: "2026-03-24",
    specs: { cpu: "Ryzen 7 7700X", gpu: "RTX 4060 Ti", ram: "32GB DDR5", storage: "1TB NVMe" },
  },
  {
    id: "sb-2",
    name: "4K Creator Workstation",
    tier: "Professional",
    totalPrice: 2800,
    savedAt: "2026-03-18",
    specs: { cpu: "Ryzen 9 7950X", gpu: "RTX 4080", ram: "64GB DDR5", storage: "2TB NVMe" },
  },
  {
    id: "sb-3",
    name: "Budget eSports Rig",
    tier: "Entry",
    totalPrice: 620,
    savedAt: "2026-03-10",
    specs: { cpu: "i5-13400F", gpu: "RX 7600", ram: "16GB DDR4", storage: "512GB NVMe" },
  },
  {
    id: "sb-4",
    name: "Streaming Powerhouse",
    tier: "High-End",
    totalPrice: 2100,
    savedAt: "2026-03-05",
    specs: { cpu: "i9-14900K", gpu: "RTX 4070 Ti", ram: "32GB DDR5", storage: "2TB NVMe" },
  },
];
