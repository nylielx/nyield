/**
 * =============================================================================
 * PC ANALYZER & PERFORMANCE SIMULATOR MOCK DATA
 * =============================================================================
 */

export interface PcSpec {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
}

export interface AnalysisResult {
  overallScore: number; // 0-100
  cpuScore: number;
  gpuScore: number;
  ramScore: number;
  storageScore: number;
  bottleneck: string;
  bottleneckSeverity: "none" | "mild" | "moderate" | "severe";
  fpsEstimates: { game: string; resolution: string; fps: number; settings: string }[];
  upgradeSuggestions: { component: string; current: string; suggested: string; expectedGain: string; priority: "high" | "medium" | "low" }[];
  recommendedOs: string;
}

export const cpuOptions = [
  "Intel i3-12100F", "Intel i5-12400F", "Intel i5-13600K", "Intel i7-13700K", "Intel i9-13900K",
  "Intel i5-14600K", "Intel i7-14700K", "Intel i9-14900K",
  "AMD Ryzen 5 5600X", "AMD Ryzen 7 5800X3D", "AMD Ryzen 5 7600X", "AMD Ryzen 7 7700X",
  "AMD Ryzen 7 7800X3D", "AMD Ryzen 9 7900X", "AMD Ryzen 9 7950X",
];

export const gpuOptions = [
  "GTX 1660 Super", "RTX 3060", "RTX 3060 Ti", "RTX 3070", "RTX 3070 Ti", "RTX 3080",
  "RTX 4060", "RTX 4060 Ti", "RTX 4070", "RTX 4070 Super", "RTX 4070 Ti Super",
  "RTX 4080 Super", "RTX 4090",
  "RX 6600 XT", "RX 6700 XT", "RX 6800 XT", "RX 7600", "RX 7800 XT", "RX 7900 XTX",
];

export const ramOptions = ["8GB DDR4", "16GB DDR4", "32GB DDR4", "16GB DDR5", "32GB DDR5", "64GB DDR5"];
export const storageOptions = ["256GB SATA SSD", "500GB SATA SSD", "1TB NVMe Gen3", "1TB NVMe Gen4", "2TB NVMe Gen4", "4TB NVMe Gen4"];

/** Mock analysis — in production this would be computed server-side */
export function analyzeSpecs(specs: PcSpec): AnalysisResult {
  const gpuTier = gpuOptions.indexOf(specs.gpu);
  const cpuTier = cpuOptions.indexOf(specs.cpu);
  const gpuScore = Math.min(100, Math.round(((gpuTier + 1) / gpuOptions.length) * 100));
  const cpuScore = Math.min(100, Math.round(((cpuTier + 1) / cpuOptions.length) * 100));
  const ramScore = specs.ram.includes("32GB") ? 85 : specs.ram.includes("16GB") ? 65 : specs.ram.includes("64GB") ? 95 : 40;
  const storageScore = specs.storage.includes("NVMe Gen4") ? 90 : specs.storage.includes("NVMe") ? 70 : 45;
  const overallScore = Math.round(gpuScore * 0.4 + cpuScore * 0.3 + ramScore * 0.15 + storageScore * 0.15);

  let bottleneck = "None detected";
  let bottleneckSeverity: AnalysisResult["bottleneckSeverity"] = "none";
  if (Math.abs(gpuScore - cpuScore) > 30) {
    bottleneck = gpuScore > cpuScore ? `CPU bottleneck — ${specs.cpu} limits your ${specs.gpu}` : `GPU bottleneck — ${specs.gpu} limits your ${specs.cpu}`;
    bottleneckSeverity = Math.abs(gpuScore - cpuScore) > 50 ? "severe" : "moderate";
  } else if (ramScore < 50) {
    bottleneck = "RAM bottleneck — consider upgrading to 16GB+";
    bottleneckSeverity = "mild";
  }

  const baseFps = overallScore * 2.5;
  const fpsEstimates = [
    { game: "Valorant", resolution: "1080p", fps: Math.round(baseFps * 1.8), settings: "High" },
    { game: "CS2", resolution: "1080p", fps: Math.round(baseFps * 1.5), settings: "High" },
    { game: "Fortnite", resolution: "1080p", fps: Math.round(baseFps * 1.4), settings: "Epic" },
    { game: "Cyberpunk 2077", resolution: "1440p", fps: Math.round(baseFps * 0.6), settings: "Ultra" },
    { game: "Elden Ring", resolution: "1440p", fps: Math.round(baseFps * 0.8), settings: "Max" },
    { game: "Flight Simulator", resolution: "4K", fps: Math.round(baseFps * 0.3), settings: "Ultra" },
  ];

  const upgradeSuggestions: AnalysisResult["upgradeSuggestions"] = [];
  if (gpuScore < 60) upgradeSuggestions.push({ component: "GPU", current: specs.gpu, suggested: "RTX 4070 Ti Super", expectedGain: "+40-60% FPS", priority: "high" });
  if (cpuScore < 60) upgradeSuggestions.push({ component: "CPU", current: specs.cpu, suggested: "AMD Ryzen 7 7800X3D", expectedGain: "+25-40% in CPU-bound games", priority: "high" });
  if (ramScore < 60) upgradeSuggestions.push({ component: "RAM", current: specs.ram, suggested: "32GB DDR5 6000MHz", expectedGain: "+5-15% stability", priority: "medium" });
  if (storageScore < 60) upgradeSuggestions.push({ component: "Storage", current: specs.storage, suggested: "2TB NVMe Gen4", expectedGain: "Faster load times", priority: "low" });

  const recommendedOs = overallScore >= 80 ? "nYield Elite Edition" : overallScore >= 50 ? "nYield Performance Edition" : "nYield Standard Edition";

  return { overallScore, cpuScore, gpuScore, ramScore, storageScore, bottleneck, bottleneckSeverity, fpsEstimates, upgradeSuggestions, recommendedOs };
}

/** Performance simulator games */
export const simulatorGames = [
  { name: "Valorant", genre: "FPS", icon: "🎯" },
  { name: "CS2", genre: "FPS", icon: "🔫" },
  { name: "Fortnite", genre: "Battle Royale", icon: "🏗️" },
  { name: "Apex Legends", genre: "FPS", icon: "🦅" },
  { name: "Cyberpunk 2077", genre: "RPG", icon: "🌆" },
  { name: "Elden Ring", genre: "Action RPG", icon: "⚔️" },
  { name: "Baldur's Gate 3", genre: "RPG", icon: "🎲" },
  { name: "Flight Simulator", genre: "Simulation", icon: "✈️" },
];

export const resolutionOptions = ["1080p", "1440p", "4K"];
export const settingsOptions = ["Low", "Medium", "High", "Ultra", "Max"];
