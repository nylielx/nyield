export interface SavedItem {
  id: string;
  title: string;
  price: number;
  seller: string;
  condition: string;
  savedAt: string;
  specs: string;
  verified: boolean;
}

export const savedItemsMock: SavedItem[] = [
  {
    id: "si-1",
    title: "Ryzen 9 7950X Workstation",
    price: 2450,
    seller: "TechBuilder_UK",
    condition: "Used — Excellent",
    savedAt: "2026-03-27",
    specs: "R9 7950X • RTX 4080 • 64GB DDR5 • 2TB NVMe",
    verified: true,
  },
  {
    id: "si-2",
    title: "RTX 4090 Ultra Build",
    price: 3200,
    seller: "ProRigs",
    condition: "Used — Like New",
    savedAt: "2026-03-25",
    specs: "i9-14900K • RTX 4090 • 64GB DDR5 • 4TB NVMe",
    verified: true,
  },
  {
    id: "si-3",
    title: "Compact ITX Gaming PC",
    price: 980,
    seller: "SmallFormFan",
    condition: "Used — Good",
    savedAt: "2026-03-22",
    specs: "R5 7600 • RTX 4060 • 16GB DDR5 • 1TB NVMe",
    verified: false,
  },
  {
    id: "si-4",
    title: "i7-14700K Streaming Setup",
    price: 1750,
    seller: "StreamKing",
    condition: "Used — Excellent",
    savedAt: "2026-03-20",
    specs: "i7-14700K • RTX 4070 Ti • 32GB DDR5 • 2TB NVMe",
    verified: true,
  },
  {
    id: "si-5",
    title: "Budget 1080p Starter",
    price: 420,
    seller: "PCDeals_London",
    condition: "Used — Fair",
    savedAt: "2026-03-18",
    specs: "i3-12100F • GTX 1660S • 16GB DDR4 • 512GB SSD",
    verified: false,
  },
  {
    id: "si-6",
    title: "AMD RX 7800 XT Build",
    price: 1100,
    seller: "RedTeamRigs",
    condition: "Used — Good",
    savedAt: "2026-03-15",
    specs: "R7 7700X • RX 7800 XT • 32GB DDR5 • 1TB NVMe",
    verified: true,
  },
  {
    id: "si-7",
    title: "Dual GPU Compute Server",
    price: 4500,
    seller: "DataLab_UK",
    condition: "Used — Excellent",
    savedAt: "2026-03-10",
    specs: "Threadripper 7960X • 2x RTX 4090 • 128GB DDR5 • 8TB NVMe",
    verified: true,
  },
];
