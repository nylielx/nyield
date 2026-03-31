/**
 * =============================================================================
 * BUILDS OPTIONS MOCK DATA — Configurable component options per category
 * =============================================================================
 *
 * Each category contains an array of selectable options.
 * Options have a price delta (positive = upgrade, negative = downgrade).
 * The base price comes from the tier; these deltas adjust it.
 *
 * Replace with API call later — service layer will handle the swap.
 * =============================================================================
 */

export interface BuildOption {
  id: string;
  name: string;
  price: number; // positive = add, negative = subtract from base
  features?: string[];
}

export interface BuildOptionsMap {
  case: BuildOption[];
  processor: BuildOption[];
  motherboard: BuildOption[];
  memory: BuildOption[];
  graphics: BuildOption[];
  storage: BuildOption[];
  cooling: BuildOption[];
  power: BuildOption[];
  software: BuildOption[];
  peripherals: BuildOption[];
  warranty: BuildOption[];
  delivery: BuildOption[];
}

export const buildOptions: BuildOptionsMap = {
  case: [
    { id: "case-1", name: "NZXT H5 Flow (Black)", price: 0, features: ["ATX Mid-Tower", "Tempered Glass", "Good Airflow"] },
    { id: "case-2", name: "NZXT H5 Flow (White)", price: 0, features: ["ATX Mid-Tower", "Tempered Glass", "Good Airflow"] },
    { id: "case-3", name: "Corsair 4000D Airflow", price: 15, features: ["ATX Mid-Tower", "High Airflow Mesh", "Tool-Free Panels"] },
    { id: "case-4", name: "Lian Li Lancool III", price: 40, features: ["ATX Full Tower", "Premium Airflow", "Reversible Layout"] },
    { id: "case-5", name: "Fractal Torrent Compact", price: 55, features: ["Compact ATX", "180mm Front Fans", "Top-Tier Thermals"] },
  ],

  processor: [
    { id: "cpu-1", name: "AMD Ryzen 5 5600", price: 0, features: ["6 Cores / 12 Threads", "3.5GHz Base / 4.4GHz Boost", "65W TDP"] },
    { id: "cpu-2", name: "AMD Ryzen 5 7600X", price: 80, features: ["6 Cores / 12 Threads", "4.7GHz Base / 5.3GHz Boost", "105W TDP"] },
    { id: "cpu-3", name: "AMD Ryzen 7 7800X3D", price: 200, features: ["8 Cores / 16 Threads", "4.2GHz Base / 5.0GHz Boost", "3D V-Cache"] },
    { id: "cpu-4", name: "AMD Ryzen 9 7950X3D", price: 420, features: ["16 Cores / 32 Threads", "4.2GHz Base / 5.7GHz Boost", "Dual CCD + 3D V-Cache"] },
    { id: "cpu-5", name: "AMD Ryzen 9 9950X3D", price: 600, features: ["16 Cores / 32 Threads", "Next-Gen Zen 5", "3D V-Cache Gen 2"] },
  ],

  motherboard: [
    { id: "mb-1", name: "MSI B550 Pro-VDH WiFi", price: 0, features: ["AM4 Socket", "DDR4", "WiFi 6"] },
    { id: "mb-2", name: "ASUS ROG Strix B650-A", price: 60, features: ["AM5 Socket", "DDR5", "WiFi 6E"] },
    { id: "mb-3", name: "MSI MAG X670E Tomahawk", price: 120, features: ["AM5 Socket", "DDR5", "PCIe 5.0"] },
    { id: "mb-4", name: "ASUS ROG Crosshair X670E Hero", price: 250, features: ["AM5 Socket", "DDR5", "Premium VRM"] },
  ],

  memory: [
    { id: "ram-1", name: "16GB DDR4-3200 (2x8GB)", price: 0, features: ["Corsair Vengeance LPX", "CL16"] },
    { id: "ram-2", name: "16GB DDR5-5600 (2x8GB)", price: 30, features: ["G.Skill Flare X5", "CL36"] },
    { id: "ram-3", name: "32GB DDR4-3600 (2x16GB)", price: 40, features: ["Corsair Vengeance LPX", "CL18"] },
    { id: "ram-4", name: "32GB DDR5-6000 (2x16GB)", price: 80, features: ["G.Skill Trident Z5", "CL30"] },
    { id: "ram-5", name: "64GB DDR5-6000 (2x32GB)", price: 180, features: ["G.Skill Trident Z5", "CL30"] },
  ],

  graphics: [
    { id: "gpu-1", name: "NVIDIA RTX 4060 8GB", price: 0, features: ["Ada Lovelace", "DLSS 3", "1080p Ultra"] },
    { id: "gpu-2", name: "NVIDIA RTX 4060 Ti 8GB", price: 80, features: ["Ada Lovelace", "DLSS 3", "1440p High"] },
    { id: "gpu-3", name: "NVIDIA RTX 4070 12GB", price: 180, features: ["Ada Lovelace", "DLSS 3", "1440p Ultra"] },
    { id: "gpu-4", name: "NVIDIA RTX 4070 Super 12GB", price: 260, features: ["Ada Lovelace", "DLSS 3", "1440p Ultra+"] },
    { id: "gpu-5", name: "NVIDIA RTX 4080 Super 16GB", price: 500, features: ["Ada Lovelace", "DLSS 3", "4K Gaming"] },
    { id: "gpu-6", name: "NVIDIA RTX 5090 32GB", price: 1200, features: ["Blackwell", "DLSS 4", "4K Ultra+"] },
  ],

  storage: [
    { id: "stor-1", name: "500GB NVMe SSD", price: 0, features: ["PCIe 3.0", "WD Blue SN570"] },
    { id: "stor-2", name: "1TB NVMe SSD", price: 35, features: ["PCIe 4.0", "Samsung 980 Pro"] },
    { id: "stor-3", name: "2TB NVMe SSD", price: 90, features: ["PCIe 4.0", "Samsung 990 Pro"] },
    { id: "stor-4", name: "4TB NVMe SSD", price: 220, features: ["PCIe 4.0", "Samsung 990 Pro"] },
    { id: "stor-5", name: "1TB + 2TB Combo", price: 130, features: ["NVMe Boot + SATA Storage"] },
  ],

  cooling: [
    { id: "cool-1", name: "AMD Wraith Stealth (Stock)", price: 0, features: ["Basic Air Cooler", "Included with CPU"] },
    { id: "cool-2", name: "Noctua NH-U12S", price: 40, features: ["120mm Tower Cooler", "Quiet Operation"] },
    { id: "cool-3", name: "Noctua NH-D15", price: 70, features: ["Dual Tower", "Premium Cooling"] },
    { id: "cool-4", name: "NZXT Kraken 240mm AIO", price: 90, features: ["240mm AIO Liquid", "LCD Display"] },
    { id: "cool-5", name: "NZXT Kraken 360mm AIO", price: 140, features: ["360mm AIO Liquid", "Maximum Cooling"] },
  ],

  power: [
    { id: "psu-1", name: "600W 80+ Bronze", price: 0, features: ["EVGA 600 BR", "Non-Modular"] },
    { id: "psu-2", name: "750W 80+ Gold", price: 40, features: ["Corsair RM750x", "Fully Modular"] },
    { id: "psu-3", name: "850W 80+ Gold", price: 60, features: ["Corsair RM850x", "Fully Modular"] },
    { id: "psu-4", name: "1000W 80+ Gold", price: 100, features: ["Corsair RM1000x", "Fully Modular"] },
    { id: "psu-5", name: "1000W 80+ Platinum", price: 150, features: ["Corsair HX1000", "Fully Modular", "Premium Efficiency"] },
  ],

  software: [
    { id: "sw-1", name: "nYield Competitive OS", price: 0, features: ["Pre-installed", "Performance Optimized"] },
    { id: "sw-2", name: "nYield Competitive OS + Windows 11 Home", price: 100, features: ["Dual Boot Ready", "Full Windows License"] },
    { id: "sw-3", name: "nYield Competitive OS + Windows 11 Pro", price: 140, features: ["Dual Boot Ready", "BitLocker", "Remote Desktop"] },
  ],

  peripherals: [
    { id: "per-1", name: "No Peripherals", price: 0 },
    { id: "per-2", name: "Gaming Keyboard + Mouse Bundle", price: 60, features: ["Mechanical RGB Keyboard", "Lightweight Gaming Mouse"] },
    { id: "per-3", name: "Premium Keyboard + Mouse", price: 150, features: ["Corsair K70 RGB", "Logitech G Pro X Superlight"] },
    { id: "per-4", name: "Full Peripheral Kit", price: 220, features: ["Keyboard", "Mouse", "Headset", "Mouse Pad"] },
  ],

  warranty: [
    { id: "war-1", name: "1-Year Standard Warranty", price: 0, features: ["Hardware coverage", "Email support"] },
    { id: "war-2", name: "2-Year Extended Warranty", price: 50, features: ["Hardware coverage", "Priority support"] },
    { id: "war-3", name: "3-Year Premium Warranty", price: 100, features: ["Hardware + accidental damage", "24hr support", "Free repairs"] },
  ],

  delivery: [
    { id: "del-1", name: "Standard Delivery (5-7 days)", price: 0, features: ["Free UK Mainland"] },
    { id: "del-2", name: "Express Delivery (2-3 days)", price: 25, features: ["Tracked + Insured"] },
    { id: "del-3", name: "Next-Day Delivery", price: 50, features: ["Priority Handling", "Tracked + Insured"] },
  ],
};

/** Category display labels and order */
export const categoryLabels: { key: keyof BuildOptionsMap; label: string; icon: string }[] = [
  { key: "case", label: "Case", icon: "Box" },
  { key: "processor", label: "Processor", icon: "Cpu" },
  { key: "motherboard", label: "Motherboard", icon: "CircuitBoard" },
  { key: "memory", label: "Memory (RAM)", icon: "MemoryStick" },
  { key: "graphics", label: "Graphics Card", icon: "Monitor" },
  { key: "storage", label: "Storage", icon: "HardDrive" },
  { key: "cooling", label: "Cooling", icon: "Thermometer" },
  { key: "power", label: "Power Supply", icon: "Zap" },
  { key: "software", label: "Software", icon: "AppWindow" },
  { key: "peripherals", label: "Peripherals", icon: "Gamepad2" },
  { key: "warranty", label: "Warranty", icon: "ShieldCheck" },
  { key: "delivery", label: "Delivery", icon: "Truck" },
];
