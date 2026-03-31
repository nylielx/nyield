/**
 * =============================================================================
 * BOOKING TYPES — PC Specs, Booking data, and status definitions
 * =============================================================================
 */

export interface PCSpecs {
  gpu: string;
  cpu: string;
  ram: string;
  storage: string;
  cooling: string;
  powerSupply: string;
  pcCase?: string;
  notes?: string;
}

export type BookingStatus = "processing" | "scheduled" | "in-progress" | "completed" | "cancelled";

export interface Booking {
  id: string;
  userId?: string;
  guestEmail?: string;
  edition: string;
  editionName: string;
  pcSpecs: PCSpecs;
  date: string;
  time: string;
  timeLabel: string;
  technicianId: string;
  technicianName: string;
  status: BookingStatus;
  price: number;
  surcharge: number;
  vat: number;
  total: number;
  createdAt: string;
  notes?: string;
}

export const PC_COMPONENT_OPTIONS = {
  gpu: [
    "NVIDIA RTX 4090",
    "NVIDIA RTX 4080 SUPER",
    "NVIDIA RTX 4070 Ti SUPER",
    "NVIDIA RTX 4070",
    "NVIDIA RTX 4060 Ti",
    "NVIDIA RTX 4060",
    "NVIDIA RTX 3090",
    "NVIDIA RTX 3080",
    "NVIDIA RTX 3070",
    "NVIDIA RTX 3060",
    "AMD RX 7900 XTX",
    "AMD RX 7900 XT",
    "AMD RX 7800 XT",
    "AMD RX 7700 XT",
    "AMD RX 7600",
  ],
  cpu: [
    "Intel Core i9-14900K",
    "Intel Core i9-13900K",
    "Intel Core i7-14700K",
    "Intel Core i7-13700K",
    "Intel Core i5-14600K",
    "Intel Core i5-13600K",
    "AMD Ryzen 9 7950X",
    "AMD Ryzen 9 7900X",
    "AMD Ryzen 7 7800X3D",
    "AMD Ryzen 7 7700X",
    "AMD Ryzen 5 7600X",
    "AMD Ryzen 5 7600",
  ],
  ram: [
    "16GB DDR5-5600",
    "32GB DDR5-5600",
    "32GB DDR5-6000",
    "64GB DDR5-5600",
    "64GB DDR5-6000",
    "16GB DDR4-3200",
    "32GB DDR4-3200",
    "32GB DDR4-3600",
  ],
  storage: [
    "1TB NVMe SSD",
    "2TB NVMe SSD",
    "4TB NVMe SSD",
    "1TB SATA SSD",
    "2TB SATA SSD",
    "500GB NVMe SSD",
    "1TB NVMe + 2TB HDD",
    "2TB NVMe + 4TB HDD",
  ],
  cooling: [
    "360mm AIO Liquid Cooler",
    "280mm AIO Liquid Cooler",
    "240mm AIO Liquid Cooler",
    "Noctua NH-D15",
    "be quiet! Dark Rock Pro 4",
    "Custom Loop (Water)",
    "Stock Cooler",
  ],
  powerSupply: [
    "1000W 80+ Platinum",
    "850W 80+ Gold",
    "750W 80+ Gold",
    "650W 80+ Gold",
    "1200W 80+ Titanium",
    "550W 80+ Bronze",
  ],
};
