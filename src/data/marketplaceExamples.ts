/**
 * =============================================================================
 * MARKETPLACE DATA — Comprehensive listing data for nYield's verified marketplace
 * =============================================================================
 *
 * Each listing contains:
 * - Basic info (title, price, seller, condition)
 * - Full component breakdown (exact models)
 * - Stress test results (CPU, GPU, RAM, cooling)
 * - Detailed specs per component (expandable on detail page)
 * - Usage & maintenance history
 * - Transparency scoring
 * - Location info
 *
 * ACTIVE LISTINGS:
 * Only listing with isActive=true is clickable in the beta marketplace.
 * All others appear greyed out with "Coming Soon" overlay.
 * =============================================================================
 */

/* --------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * -------------------------------------------------------------------------- */

export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  verified: boolean;
  condition: string;
  listedDate: string;
  bestFor: string;
  tags: string[];
  /** Whether this listing is active in beta (only 1 should be true) */
  isActive: boolean;

  /** Basic specs shown on card */
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };

  /** Stress test summary scores */
  benchmarks: {
    cpuScore: number;
    gpuScore: number;
    ramStability: number;
    coolingRating: string;
  };

  /** Full parts list with exact models */
  fullParts: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    psu: string;
    motherboard: string;
    case: string;
    cooling: string;
  };

  /** Detailed per-component specs for the detail page */
  detailedSpecs: {
    cpu: {
      architecture: string;
      processNode: string;
      cores: number;
      threads: number;
      baseClock: string;
      boostClock: string;
      cacheL2: string;
      cacheL3: string;
      tdp: string;
      maxTempVerified: string;
      stabilityVerified: string;
    };
    gpu: {
      architecture: string;
      vram: string;
      memoryBus: string;
      coreClock: string;
      boostClock: string;
      cudaCores: number;
      rtCores: number;
      powerConnector: string;
      powerDrawSelfReported: string;
      maxTempVerified: string;
      gpuScoreVerified: number;
    };
    ram: {
      fullKitName: string;
      capacity: string;
      moduleConfig: string;
      speed: string;
      latency: string;
      voltage: string;
      rank: string;
      channels: string;
      slotsUsed: number;
      slotsAvailable: number;
      maxSupported: string;
      xmpSelfReported: string;
    };
    storage: {
      type: string;
      interface: string;
      formFactor: string;
      capacity: string;
      readSpeed: string;
      writeSpeed: string;
      freeM2Slots: number;
      sataAvailability: string;
    };
    cooling: {
      type: string;
      model: string;
      fanCount: number;
      fanSize: string;
      rpm: string;
      intakeExhaustLayout: string;
    };
    psu: {
      model: string;
      wattage: string;
      efficiencyRating: string;
      efficiencyPercent: string;
      modularType: string;
      railType: string;
      protections: string;
      connectorsPcie: string;
      connectorsSata: string;
    };
    motherboard: {
      model: string;
      socket: string;
      chipset: string;
      formFactor: string;
      maxRamCapacity: string;
      maxRamSpeed: string;
      pcieSlots: string;
      m2Slots: string;
      sataPorts: string;
      wifiSelfReported: string;
      bluetoothSelfReported: string;
      biosVersion: string;
    };
    expansion: {
      ramSlotsFree: number;
      m2SlotsFree: number;
      sataPortsFree: number;
      pcieAvailability: string;
    };
  };

  /** Verification info shown on detail page */
  verification: {
    lastVerified: string;
    testDuration: string;
    stressTested: boolean;
    temperatureVerified: boolean;
    stabilityConfirmed: boolean;
  };

  /** Usage history */
  usageHistory: {
    primaryUse: string;
    age: string;
    overclocking: string;
    dailyUsage: string;
  };

  /** Maintenance records */
  maintenance: {
    lastCleaned: string;
    thermalPasteReapplied: string;
    dustCondition: string;
  };

  /** Assembly & sale context */
  assemblyContext: {
    buildType: string;
    reasonForSale: string;
  };

  /** What's included / not included */
  included: string[];
  notIncluded: string[];

  /** Verification file names */
  verificationFiles: string[];

  /** Performance summary for detail page */
  performanceSummary: {
    score: number;
    tier: string;
    estimatedLongevity: string;
  };

  /** Value indicator position 0-100 (0=poor, 100=excellent) */
  valueScore: number;

  /** Data completeness percentage */
  dataCompleteness: number;

  /** Transparency info */
  transparency: {
    score: number;
    verifiedFields: number;
    selfReportedFields: number;
  };

  /** Seller notes */
  sellerNotes: string;

  /** Location info */
  location: {
    city: string;
    approximateRadius: string;
    collectionAvailable: boolean;
    deliveryOptional: boolean;
  };
}

/* --------------------------------------------------------------------------
 * LISTINGS DATA
 * -------------------------------------------------------------------------- */

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "mp-001",
    title: "RTX 4070 Gaming Build",
    description: "A well-maintained gaming PC built for competitive 1440p gaming. Runs cool and quiet under load with excellent thermals throughout stress testing.",
    price: 820,
    seller: "TechMike_UK",
    verified: true,
    condition: "Excellent",
    listedDate: "2026-03-20",
    bestFor: "1440p competitive gaming & streaming",
    tags: ["Best Value", "High Performance"],
    isActive: true,

    specs: {
      cpu: "Ryzen 7 5800X",
      gpu: "RTX 4070",
      ram: "32GB DDR4",
      storage: "1TB NVMe",
    },

    benchmarks: {
      cpuScore: 88,
      gpuScore: 91,
      ramStability: 99.7,
      coolingRating: "Excellent",
    },

    fullParts: {
      cpu: "AMD Ryzen 7 5800X",
      gpu: "NVIDIA GeForce RTX 4070 Founders Edition",
      ram: "Corsair Vengeance LPX 32GB (2x16GB) DDR4-3600 CL18",
      storage: "Samsung 980 Pro 1TB NVMe M.2",
      psu: "Corsair RM750x 750W 80+ Gold",
      motherboard: "ASUS ROG Strix B550-F Gaming WiFi II",
      case: "NZXT H510 Flow",
      cooling: "Noctua NH-D15",
    },

    detailedSpecs: {
      cpu: {
        architecture: "Zen 3",
        processNode: "7nm",
        cores: 8,
        threads: 16,
        baseClock: "3.8 GHz",
        boostClock: "4.7 GHz",
        cacheL2: "4MB",
        cacheL3: "32MB",
        tdp: "105W",
        maxTempVerified: "72°C",
        stabilityVerified: "Stable — 30 min sustained",
      },
      gpu: {
        architecture: "Ada Lovelace",
        vram: "12GB GDDR6X",
        memoryBus: "192-bit",
        coreClock: "1920 MHz",
        boostClock: "2475 MHz",
        cudaCores: 5888,
        rtCores: 46,
        powerConnector: "1x 16-pin",
        powerDrawSelfReported: "200W",
        maxTempVerified: "68°C",
        gpuScoreVerified: 91,
      },
      ram: {
        fullKitName: "Corsair Vengeance LPX CMK32GX4M2D3600C18",
        capacity: "32GB",
        moduleConfig: "2x16GB",
        speed: "DDR4-3600",
        latency: "CL18-22-22-42",
        voltage: "1.35V",
        rank: "Dual Rank",
        channels: "Dual Channel",
        slotsUsed: 2,
        slotsAvailable: 4,
        maxSupported: "128GB",
        xmpSelfReported: "Enabled — XMP Profile 1",
      },
      storage: {
        type: "NVMe SSD",
        interface: "PCIe 4.0 x4",
        formFactor: "M.2 2280",
        capacity: "1TB",
        readSpeed: "7,000 MB/s",
        writeSpeed: "5,100 MB/s",
        freeM2Slots: 1,
        sataAvailability: "4x SATA III free",
      },
      cooling: {
        type: "Air Cooler",
        model: "Noctua NH-D15",
        fanCount: 2,
        fanSize: "140mm",
        rpm: "300–1500 RPM",
        intakeExhaustLayout: "2x 140mm intake (front), 1x 120mm exhaust (rear)",
      },
      psu: {
        model: "Corsair RM750x",
        wattage: "750W",
        efficiencyRating: "80+ Gold",
        efficiencyPercent: "90%",
        modularType: "Fully Modular",
        railType: "Single Rail",
        protections: "OVP, UVP, SCP, OPP",
        connectorsPcie: "3x PCIe 8-pin, 1x 16-pin adapter",
        connectorsSata: "8x SATA",
      },
      motherboard: {
        model: "ASUS ROG Strix B550-F Gaming WiFi II",
        socket: "AM4",
        chipset: "B550",
        formFactor: "ATX",
        maxRamCapacity: "128GB",
        maxRamSpeed: "DDR4-5100 (OC)",
        pcieSlots: "1x PCIe 4.0 x16, 1x PCIe 3.0 x16, 1x PCIe 3.0 x1",
        m2Slots: "2x M.2 (1x PCIe 4.0, 1x PCIe 3.0)",
        sataPorts: "6x SATA III",
        wifiSelfReported: "WiFi 6 (802.11ax)",
        bluetoothSelfReported: "Bluetooth 5.2",
        biosVersion: "BIOS 2803 (Latest)",
      },
      expansion: {
        ramSlotsFree: 2,
        m2SlotsFree: 1,
        sataPortsFree: 4,
        pcieAvailability: "1x PCIe 3.0 x16, 1x PCIe 3.0 x1",
      },
    },

    verification: {
      lastVerified: "2026-03-19",
      testDuration: "2 hours 15 minutes",
      stressTested: true,
      temperatureVerified: true,
      stabilityConfirmed: true,
    },

    usageHistory: {
      primaryUse: "Gaming (competitive FPS titles)",
      age: "14 months",
      overclocking: "None — all components at stock settings",
      dailyUsage: "4–6 hours",
    },

    maintenance: {
      lastCleaned: "2026-03-01",
      thermalPasteReapplied: "2026-01-15 (Noctua NT-H1)",
      dustCondition: "Minimal — regularly filtered",
    },

    assemblyContext: {
      buildType: "Custom Build",
      reasonForSale: "Upgrading to DDR5 platform",
    },

    included: [
      "Full PC (assembled)",
      "All original boxes for GPU + PSU",
      "Spare Noctua fan clips",
      "USB WiFi antenna",
      "Power cable",
    ],
    notIncluded: [
      "Monitor",
      "Keyboard & mouse",
      "Operating system license",
      "HDMI / DisplayPort cable",
    ],

    verificationFiles: [
      "cpu-stress-test-log.pdf",
      "gpu-benchmark-report.pdf",
      "temperature-monitoring-log.pdf",
    ],

    performanceSummary: {
      score: 89,
      tier: "High Performance",
      estimatedLongevity: "3–4 years at 1440p",
    },

    valueScore: 82,
    dataCompleteness: 97,

    transparency: {
      score: 94,
      verifiedFields: 42,
      selfReportedFields: 6,
    },

    sellerNotes: "Built this rig myself 14 months ago. Never overclocked, always kept clean with filtered intakes. Selling because I'm moving to a DDR5 AM5 platform. Happy to answer any questions or do a live demo before purchase. Collection preferred from East London but can arrange delivery.",

    location: {
      city: "London",
      approximateRadius: "~5 miles (East London)",
      collectionAvailable: true,
      deliveryOptional: true,
    },
  },
  {
    id: "mp-002",
    title: "Budget Esports Machine",
    description: "Solid 1080p esports build. Handles Valorant, Fortnite, and CS2 with ease.",
    price: 450,
    seller: "GameDeals22",
    verified: true,
    condition: "Good",
    listedDate: "2026-03-18",
    bestFor: "1080p esports titles on a budget",
    tags: ["Budget"],
    isActive: false,

    specs: { cpu: "Ryzen 5 3600", gpu: "RTX 3060", ram: "16GB DDR4", storage: "512GB NVMe" },
    benchmarks: { cpuScore: 72, gpuScore: 68, ramStability: 98.2, coolingRating: "Good" },
    fullParts: { cpu: "AMD Ryzen 5 3600", gpu: "NVIDIA RTX 3060 12GB", ram: "Corsair Vengeance 16GB DDR4-3200", storage: "WD Blue SN570 512GB", psu: "EVGA 600W 80+ Bronze", motherboard: "MSI B450 Tomahawk Max", case: "Phanteks Eclipse P300A", cooling: "AMD Wraith Stealth (stock)" },
    detailedSpecs: {
      cpu: { architecture: "Zen 2", processNode: "7nm", cores: 6, threads: 12, baseClock: "3.6 GHz", boostClock: "4.2 GHz", cacheL2: "3MB", cacheL3: "32MB", tdp: "65W", maxTempVerified: "78°C", stabilityVerified: "Stable" },
      gpu: { architecture: "Ampere", vram: "12GB GDDR6", memoryBus: "192-bit", coreClock: "1320 MHz", boostClock: "1777 MHz", cudaCores: 3584, rtCores: 28, powerConnector: "1x 8-pin", powerDrawSelfReported: "170W", maxTempVerified: "74°C", gpuScoreVerified: 68 },
      ram: { fullKitName: "Corsair Vengeance LPX 16GB", capacity: "16GB", moduleConfig: "2x8GB", speed: "DDR4-3200", latency: "CL16", voltage: "1.35V", rank: "Single Rank", channels: "Dual Channel", slotsUsed: 2, slotsAvailable: 4, maxSupported: "64GB", xmpSelfReported: "Enabled" },
      storage: { type: "NVMe SSD", interface: "PCIe 3.0 x4", formFactor: "M.2 2280", capacity: "512GB", readSpeed: "3,500 MB/s", writeSpeed: "2,300 MB/s", freeM2Slots: 1, sataAvailability: "4x SATA III free" },
      cooling: { type: "Air Cooler (Stock)", model: "AMD Wraith Stealth", fanCount: 1, fanSize: "92mm", rpm: "2800 RPM", intakeExhaustLayout: "1x 120mm intake, 1x 120mm exhaust" },
      psu: { model: "EVGA 600 BR", wattage: "600W", efficiencyRating: "80+ Bronze", efficiencyPercent: "85%", modularType: "Non-Modular", railType: "Single Rail", protections: "OVP, UVP, SCP", connectorsPcie: "2x PCIe 8-pin", connectorsSata: "6x SATA" },
      motherboard: { model: "MSI B450 Tomahawk Max", socket: "AM4", chipset: "B450", formFactor: "ATX", maxRamCapacity: "64GB", maxRamSpeed: "DDR4-4133 (OC)", pcieSlots: "1x PCIe 3.0 x16, 1x PCIe 2.0 x1", m2Slots: "1x M.2 PCIe 3.0", sataPorts: "6x SATA III", wifiSelfReported: "None", bluetoothSelfReported: "None", biosVersion: "7C02v3E" },
      expansion: { ramSlotsFree: 2, m2SlotsFree: 0, sataPortsFree: 4, pcieAvailability: "1x PCIe 2.0 x1" },
    },
    verification: { lastVerified: "2026-03-17", testDuration: "1 hour 45 minutes", stressTested: true, temperatureVerified: true, stabilityConfirmed: true },
    usageHistory: { primaryUse: "Esports gaming", age: "2 years", overclocking: "None", dailyUsage: "3–5 hours" },
    maintenance: { lastCleaned: "2026-02-20", thermalPasteReapplied: "Never (original)", dustCondition: "Light dust" },
    assemblyContext: { buildType: "Custom Build", reasonForSale: "Upgrading" },
    included: ["Full PC", "Power cable"],
    notIncluded: ["Monitor", "Peripherals", "OS license"],
    verificationFiles: ["cpu-stress-log.pdf", "gpu-benchmark.pdf", "temp-log.pdf"],
    performanceSummary: { score: 70, tier: "Mid-Range", estimatedLongevity: "2–3 years at 1080p" },
    valueScore: 75,
    dataCompleteness: 91,
    transparency: { score: 88, verifiedFields: 38, selfReportedFields: 8 },
    sellerNotes: "Great budget PC for esports. Runs everything at 1080p smoothly.",
    location: { city: "Manchester", approximateRadius: "~10 miles", collectionAvailable: true, deliveryOptional: false },
  },
  {
    id: "mp-003",
    title: "High-End Creator & Gaming Rig",
    description: "Powerhouse build for 4K gaming and content creation workloads.",
    price: 1650,
    seller: "ProBuilds_UK",
    verified: true,
    condition: "Like New",
    listedDate: "2026-03-22",
    bestFor: "4K gaming, video editing & content creation",
    tags: ["High Performance", "Creator"],
    isActive: false,

    specs: { cpu: "Ryzen 9 7900X", gpu: "RTX 4080", ram: "64GB DDR5", storage: "2TB NVMe" },
    benchmarks: { cpuScore: 95, gpuScore: 94, ramStability: 99.9, coolingRating: "Excellent" },
    fullParts: { cpu: "AMD Ryzen 9 7900X", gpu: "NVIDIA RTX 4080 16GB", ram: "G.Skill Trident Z5 64GB DDR5-6000", storage: "Samsung 990 Pro 2TB", psu: "Corsair RM1000x 1000W 80+ Gold", motherboard: "ASUS ROG Crosshair X670E Hero", case: "Lian Li O11 Dynamic EVO", cooling: "NZXT Kraken X73 360mm AIO" },
    detailedSpecs: {
      cpu: { architecture: "Zen 4", processNode: "5nm", cores: 12, threads: 24, baseClock: "4.7 GHz", boostClock: "5.6 GHz", cacheL2: "12MB", cacheL3: "64MB", tdp: "170W", maxTempVerified: "82°C", stabilityVerified: "Stable" },
      gpu: { architecture: "Ada Lovelace", vram: "16GB GDDR6X", memoryBus: "256-bit", coreClock: "2205 MHz", boostClock: "2505 MHz", cudaCores: 9728, rtCores: 76, powerConnector: "1x 16-pin", powerDrawSelfReported: "320W", maxTempVerified: "71°C", gpuScoreVerified: 94 },
      ram: { fullKitName: "G.Skill Trident Z5 F5-6000J3038F32GX2-TZ5RK", capacity: "64GB", moduleConfig: "2x32GB", speed: "DDR5-6000", latency: "CL30-38-38-96", voltage: "1.35V", rank: "Dual Rank", channels: "Dual Channel", slotsUsed: 2, slotsAvailable: 4, maxSupported: "128GB", xmpSelfReported: "EXPO Enabled" },
      storage: { type: "NVMe SSD", interface: "PCIe 4.0 x4", formFactor: "M.2 2280", capacity: "2TB", readSpeed: "7,450 MB/s", writeSpeed: "6,900 MB/s", freeM2Slots: 2, sataAvailability: "4x SATA III free" },
      cooling: { type: "AIO Liquid Cooler", model: "NZXT Kraken X73", fanCount: 3, fanSize: "120mm", rpm: "500–2000 RPM", intakeExhaustLayout: "3x 120mm radiator (top), 3x 120mm intake (side), 1x 120mm exhaust (rear)" },
      psu: { model: "Corsair RM1000x", wattage: "1000W", efficiencyRating: "80+ Gold", efficiencyPercent: "92%", modularType: "Fully Modular", railType: "Single Rail", protections: "OVP, UVP, SCP, OPP, OTP", connectorsPcie: "4x PCIe 8-pin, 1x 16-pin native", connectorsSata: "12x SATA" },
      motherboard: { model: "ASUS ROG Crosshair X670E Hero", socket: "AM5", chipset: "X670E", formFactor: "ATX", maxRamCapacity: "128GB", maxRamSpeed: "DDR5-6400+ (OC)", pcieSlots: "2x PCIe 5.0 x16, 1x PCIe 4.0 x4", m2Slots: "4x M.2 (1x PCIe 5.0, 3x PCIe 4.0)", sataPorts: "6x SATA III", wifiSelfReported: "WiFi 6E", bluetoothSelfReported: "Bluetooth 5.3", biosVersion: "1202" },
      expansion: { ramSlotsFree: 2, m2SlotsFree: 2, sataPortsFree: 4, pcieAvailability: "1x PCIe 5.0 x16, 1x PCIe 4.0 x4" },
    },
    verification: { lastVerified: "2026-03-21", testDuration: "3 hours", stressTested: true, temperatureVerified: true, stabilityConfirmed: true },
    usageHistory: { primaryUse: "Content creation + gaming", age: "8 months", overclocking: "PBO enabled (within spec)", dailyUsage: "6–8 hours" },
    maintenance: { lastCleaned: "2026-03-10", thermalPasteReapplied: "Factory (AIO)", dustCondition: "Pristine" },
    assemblyContext: { buildType: "Custom Build", reasonForSale: "Relocating overseas" },
    included: ["Full PC", "All original boxes", "Extra cables", "Power cable"],
    notIncluded: ["Monitor", "Peripherals", "OS license"],
    verificationFiles: ["cpu-stress-log.pdf", "gpu-benchmark.pdf", "temp-log.pdf"],
    performanceSummary: { score: 95, tier: "Enthusiast", estimatedLongevity: "4–5 years at 4K" },
    valueScore: 78,
    dataCompleteness: 98,
    transparency: { score: 96, verifiedFields: 44, selfReportedFields: 4 },
    sellerNotes: "Built for video editing and 4K gaming. PBO is within AMD spec. Relocating so need a quick sale. Happy to demo.",
    location: { city: "Birmingham", approximateRadius: "~8 miles", collectionAvailable: true, deliveryOptional: true },
  },
  {
    id: "mp-004",
    title: "Intel i5 Starter Build",
    description: "Entry-level gaming PC for casual play and everyday use.",
    price: 320,
    seller: "PCBargins_UK",
    verified: true,
    condition: "Good",
    listedDate: "2026-03-25",
    bestFor: "1080p casual gaming & schoolwork",
    tags: ["Budget"],
    isActive: false,

    specs: { cpu: "Intel i5-12400F", gpu: "GTX 1660 Super", ram: "16GB DDR4", storage: "500GB NVMe" },
    benchmarks: { cpuScore: 65, gpuScore: 58, ramStability: 97.5, coolingRating: "Adequate" },
    fullParts: { cpu: "Intel Core i5-12400F", gpu: "NVIDIA GTX 1660 Super", ram: "Kingston Fury Beast 16GB DDR4-3200", storage: "Kingston NV2 500GB", psu: "Cooler Master MWE 550W 80+ Bronze", motherboard: "Gigabyte B660M DS3H", case: "DeepCool Matrexx 40", cooling: "Intel Stock Cooler" },
    detailedSpecs: {
      cpu: { architecture: "Alder Lake", processNode: "Intel 7 (10nm ESF)", cores: 6, threads: 12, baseClock: "2.5 GHz", boostClock: "4.4 GHz", cacheL2: "7.5MB", cacheL3: "18MB", tdp: "65W", maxTempVerified: "80°C", stabilityVerified: "Stable" },
      gpu: { architecture: "Turing", vram: "6GB GDDR6", memoryBus: "192-bit", coreClock: "1530 MHz", boostClock: "1785 MHz", cudaCores: 1408, rtCores: 0, powerConnector: "1x 8-pin", powerDrawSelfReported: "125W", maxTempVerified: "76°C", gpuScoreVerified: 58 },
      ram: { fullKitName: "Kingston Fury Beast 16GB", capacity: "16GB", moduleConfig: "2x8GB", speed: "DDR4-3200", latency: "CL16", voltage: "1.35V", rank: "Single Rank", channels: "Dual Channel", slotsUsed: 2, slotsAvailable: 2, maxSupported: "64GB", xmpSelfReported: "Enabled" },
      storage: { type: "NVMe SSD", interface: "PCIe 3.0 x4", formFactor: "M.2 2280", capacity: "500GB", readSpeed: "2,100 MB/s", writeSpeed: "1,700 MB/s", freeM2Slots: 0, sataAvailability: "2x SATA III free" },
      cooling: { type: "Air Cooler (Stock)", model: "Intel Laminar RM1", fanCount: 1, fanSize: "90mm", rpm: "3200 RPM", intakeExhaustLayout: "1x 120mm intake, 1x 120mm exhaust" },
      psu: { model: "Cooler Master MWE 550", wattage: "550W", efficiencyRating: "80+ Bronze", efficiencyPercent: "85%", modularType: "Non-Modular", railType: "Single Rail", protections: "OVP, SCP", connectorsPcie: "2x PCIe 8-pin", connectorsSata: "5x SATA" },
      motherboard: { model: "Gigabyte B660M DS3H", socket: "LGA 1700", chipset: "B660", formFactor: "Micro-ATX", maxRamCapacity: "64GB", maxRamSpeed: "DDR4-4800 (OC)", pcieSlots: "1x PCIe 4.0 x16", m2Slots: "1x M.2 PCIe 4.0", sataPorts: "4x SATA III", wifiSelfReported: "None", bluetoothSelfReported: "None", biosVersion: "F8" },
      expansion: { ramSlotsFree: 0, m2SlotsFree: 0, sataPortsFree: 2, pcieAvailability: "None" },
    },
    verification: { lastVerified: "2026-03-24", testDuration: "1 hour 30 minutes", stressTested: true, temperatureVerified: true, stabilityConfirmed: true },
    usageHistory: { primaryUse: "Casual gaming", age: "18 months", overclocking: "None", dailyUsage: "2–3 hours" },
    maintenance: { lastCleaned: "2026-02-01", thermalPasteReapplied: "Never", dustCondition: "Moderate" },
    assemblyContext: { buildType: "Prebuilt (modified)", reasonForSale: "Upgrading" },
    included: ["Full PC", "Power cable"],
    notIncluded: ["Monitor", "Peripherals", "OS license", "Original box"],
    verificationFiles: ["cpu-stress-log.pdf", "gpu-benchmark.pdf", "temp-log.pdf"],
    performanceSummary: { score: 58, tier: "Entry Level", estimatedLongevity: "1–2 years at 1080p medium" },
    valueScore: 70,
    dataCompleteness: 85,
    transparency: { score: 82, verifiedFields: 35, selfReportedFields: 10 },
    sellerNotes: "Good starter PC. Runs most games at 1080p medium settings. Stock cooler can be loud under load — aftermarket cooler recommended.",
    location: { city: "Leeds", approximateRadius: "~6 miles", collectionAvailable: true, deliveryOptional: false },
  },
  {
    id: "mp-005",
    title: "RTX 4060 Ti Compact Build",
    description: "Small form factor build with strong 1440p gaming performance.",
    price: 680,
    seller: "SFF_Mike",
    verified: true,
    condition: "Excellent",
    listedDate: "2026-03-26",
    bestFor: "1440p gaming in a compact form factor",
    tags: ["Best Value"],
    isActive: false,

    specs: { cpu: "Ryzen 5 7600", gpu: "RTX 4060 Ti", ram: "32GB DDR5", storage: "1TB NVMe" },
    benchmarks: { cpuScore: 82, gpuScore: 80, ramStability: 99.5, coolingRating: "Good" },
    fullParts: { cpu: "AMD Ryzen 5 7600", gpu: "NVIDIA RTX 4060 Ti 8GB", ram: "Kingston Fury Beast 32GB DDR5-5600", storage: "WD Black SN770 1TB", psu: "Corsair SF750 750W 80+ Platinum", motherboard: "Gigabyte B650I Aorus Ultra", case: "NR200P Max", cooling: "Noctua NH-L12S" },
    detailedSpecs: {
      cpu: { architecture: "Zen 4", processNode: "5nm", cores: 6, threads: 12, baseClock: "3.8 GHz", boostClock: "5.1 GHz", cacheL2: "6MB", cacheL3: "32MB", tdp: "65W", maxTempVerified: "74°C", stabilityVerified: "Stable" },
      gpu: { architecture: "Ada Lovelace", vram: "8GB GDDR6", memoryBus: "128-bit", coreClock: "2310 MHz", boostClock: "2535 MHz", cudaCores: 4352, rtCores: 34, powerConnector: "1x 8-pin", powerDrawSelfReported: "160W", maxTempVerified: "72°C", gpuScoreVerified: 80 },
      ram: { fullKitName: "Kingston Fury Beast DDR5-5600 32GB", capacity: "32GB", moduleConfig: "2x16GB", speed: "DDR5-5600", latency: "CL36", voltage: "1.25V", rank: "Single Rank", channels: "Dual Channel", slotsUsed: 2, slotsAvailable: 2, maxSupported: "64GB", xmpSelfReported: "EXPO Enabled" },
      storage: { type: "NVMe SSD", interface: "PCIe 4.0 x4", formFactor: "M.2 2280", capacity: "1TB", readSpeed: "5,150 MB/s", writeSpeed: "4,900 MB/s", freeM2Slots: 0, sataAvailability: "None (ITX)" },
      cooling: { type: "Low-Profile Air Cooler", model: "Noctua NH-L12S", fanCount: 1, fanSize: "120mm", rpm: "450–1850 RPM", intakeExhaustLayout: "Ventilated panels (NR200P)" },
      psu: { model: "Corsair SF750", wattage: "750W", efficiencyRating: "80+ Platinum", efficiencyPercent: "94%", modularType: "Fully Modular", railType: "Single Rail", protections: "OVP, UVP, SCP, OPP, OTP", connectorsPcie: "2x PCIe 8-pin", connectorsSata: "4x SATA" },
      motherboard: { model: "Gigabyte B650I Aorus Ultra", socket: "AM5", chipset: "B650", formFactor: "Mini-ITX", maxRamCapacity: "64GB", maxRamSpeed: "DDR5-6400 (OC)", pcieSlots: "1x PCIe 4.0 x16", m2Slots: "2x M.2 PCIe 4.0", sataPorts: "2x SATA III", wifiSelfReported: "WiFi 6E", bluetoothSelfReported: "Bluetooth 5.2", biosVersion: "F10" },
      expansion: { ramSlotsFree: 0, m2SlotsFree: 1, sataPortsFree: 2, pcieAvailability: "None (ITX)" },
    },
    verification: { lastVerified: "2026-03-25", testDuration: "2 hours", stressTested: true, temperatureVerified: true, stabilityConfirmed: true },
    usageHistory: { primaryUse: "Gaming (SFF enthusiast)", age: "6 months", overclocking: "None", dailyUsage: "3–4 hours" },
    maintenance: { lastCleaned: "2026-03-15", thermalPasteReapplied: "Factory", dustCondition: "Clean" },
    assemblyContext: { buildType: "Custom Build", reasonForSale: "Switching to full tower" },
    included: ["Full PC", "All original boxes", "NR200P glass + mesh panel"],
    notIncluded: ["Monitor", "Peripherals", "OS license"],
    verificationFiles: ["cpu-stress-log.pdf", "gpu-benchmark.pdf", "temp-log.pdf"],
    performanceSummary: { score: 81, tier: "High-Mid", estimatedLongevity: "3–4 years at 1440p" },
    valueScore: 85,
    dataCompleteness: 94,
    transparency: { score: 92, verifiedFields: 40, selfReportedFields: 6 },
    sellerNotes: "Great SFF build, runs cool despite the small case. Both mesh and glass panels included.",
    location: { city: "Bristol", approximateRadius: "~5 miles", collectionAvailable: true, deliveryOptional: true },
  },
];
