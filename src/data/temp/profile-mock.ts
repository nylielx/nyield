/**
 * =============================================================================
 * PROFILE MOCK DATA — User & Business profiles (eBay-style)
 * =============================================================================
 */

export interface UserReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  listingTitle: string;
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  fullName: string;
  rating: number;
  totalRatings: number;
  joinDate: string;
  location: string;
  bio: string;
  verified: boolean;
  pcSpecs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    monitor: string;
    os: string;
  };
  gaming: {
    playstyle: string;
    favouriteGames: string[];
    targetFps: number;
  };
  socialLinks: { platform: string; username: string; emoji: string }[];
  listings: string[]; // listing IDs from marketplace
  reviews: UserReview[];
  stats: {
    totalSales: number;
    totalPurchases: number;
    responseTime: string;
    completionRate: number;
  };
}

export interface BusinessProfile {
  id: string;
  slug: string;
  name: string;
  logo: string;
  rating: number;
  totalRatings: number;
  verified: boolean;
  joinDate: string;
  location: string;
  description: string;
  specialisation: string;
  listings: string[];
  reviews: UserReview[];
  metrics: {
    totalSales: number;
    responseTime: string;
    avgBenchmarkScore: number;
    completionRate: number;
    repeatCustomers: number;
  };
  socialLinks: { platform: string; username: string; emoji: string }[];
  badges: string[];
}

/* -------------------------------------------------------------------------- */

const sharedReviews: UserReview[] = [
  { id: "r1", reviewerId: "user-002", reviewerName: "Demo User", reviewerAvatar: "fox", rating: 5, comment: "Incredible build quality, exactly as described. Fast shipping too!", date: "2026-03-28", listingTitle: "RTX 4070 Gaming Build" },
  { id: "r2", reviewerId: "user-005", reviewerName: "Kai Martinez", reviewerAvatar: "ninja", rating: 4, comment: "Great value for the price. Minor cosmetic marks but runs perfectly.", date: "2026-03-15", listingTitle: "Budget Esports Machine" },
  { id: "r3", reviewerId: "user-004", reviewerName: "Alex Chen", reviewerAvatar: "eagle", rating: 5, comment: "Beast of a machine. 360+ FPS in Valorant. Highly recommend this seller.", date: "2026-03-20", listingTitle: "High-End Creator & Gaming Rig" },
  { id: "r4", reviewerId: "user-002", reviewerName: "Demo User", reviewerAvatar: "fox", rating: 5, comment: "Professional seller. Everything was tested and documented. A+", date: "2026-02-28", listingTitle: "RTX 4070 Gaming Build" },
  { id: "r5", reviewerId: "user-005", reviewerName: "Kai Martinez", reviewerAvatar: "ninja", rating: 4, comment: "Good communication and fair pricing. Would buy again.", date: "2026-02-10", listingTitle: "Budget Esports Machine" },
  { id: "r6", reviewerId: "user-004", reviewerName: "Alex Chen", reviewerAvatar: "eagle", rating: 5, comment: "Top-notch cable management. Clean build.", date: "2026-01-22", listingTitle: "RTX 4070 Gaming Build" },
  { id: "r7", reviewerId: "user-002", reviewerName: "Demo User", reviewerAvatar: "fox", rating: 5, comment: "Arrived sooner than expected. Very pleased.", date: "2026-01-10", listingTitle: "Budget Esports Machine" },
  { id: "r8", reviewerId: "user-005", reviewerName: "Kai Martinez", reviewerAvatar: "ninja", rating: 5, comment: "Rock solid thermals under load. Great job.", date: "2025-12-18", listingTitle: "High-End Creator & Gaming Rig" },
  { id: "r9", reviewerId: "user-004", reviewerName: "Alex Chen", reviewerAvatar: "eagle", rating: 4, comment: "Good build, minor delay on shipping but overall happy.", date: "2025-12-05", listingTitle: "RTX 4070 Gaming Build" },
  { id: "r10", reviewerId: "user-002", reviewerName: "Demo User", reviewerAvatar: "fox", rating: 5, comment: "Excellent packaging and build quality.", date: "2025-11-20", listingTitle: "Budget Esports Machine" },
  { id: "r11", reviewerId: "user-005", reviewerName: "Kai Martinez", reviewerAvatar: "ninja", rating: 5, comment: "Perfect for 1440p gaming. Exactly what I needed.", date: "2025-11-08", listingTitle: "High-End Creator & Gaming Rig" },
  { id: "r12", reviewerId: "user-004", reviewerName: "Alex Chen", reviewerAvatar: "eagle", rating: 5, comment: "Would recommend to anyone looking for a custom PC.", date: "2025-10-25", listingTitle: "RTX 4070 Gaming Build" },
];

export const userProfilesMock: UserProfile[] = [
  {
    id: "user-001",
    username: "hassan",
    avatar: "dragon",
    fullName: "Hassan",
    rating: 4.9,
    totalRatings: 12,
    joinDate: "2025-09-14",
    location: "London, UK",
    bio: "Competitive FPS player. Always chasing the next upgrade. nYield founder & power user.",
    verified: true,
    pcSpecs: { cpu: "AMD Ryzen 7 7800X3D", gpu: "NVIDIA RTX 4070 Ti Super", ram: "32GB DDR5 6000MHz", storage: "2TB NVMe Gen4", monitor: "27\" 1440p 165Hz IPS", os: "nYield Performance Edition" },
    gaming: { playstyle: "Competitive", favouriteGames: ["Valorant", "CS2", "Apex Legends", "Fortnite"], targetFps: 144 },
    socialLinks: [
      { platform: "Discord", username: "hassan#1337", emoji: "🎮" },
      { platform: "Steam", username: "HassanYield", emoji: "🎯" },
      { platform: "Twitch", username: "nYieldHassan", emoji: "📺" },
    ],
    listings: ["mp-001"],
    reviews: sharedReviews,
    stats: { totalSales: 3, totalPurchases: 8, responseTime: "< 1 hour", completionRate: 100 },
  },
  {
    id: "user-002",
    username: "demouser",
    avatar: "fox",
    fullName: "Demo User",
    rating: 4.5,
    totalRatings: 5,
    joinDate: "2026-01-10",
    location: "Manchester, UK",
    bio: "Casual gamer who loves RPGs and open world exploration.",
    verified: false,
    pcSpecs: { cpu: "Intel i5-13600K", gpu: "RTX 4060", ram: "16GB DDR5", storage: "1TB NVMe", monitor: "24\" 1080p 144Hz", os: "nYield Standard" },
    gaming: { playstyle: "Explorer", favouriteGames: ["Elden Ring", "Baldur's Gate 3", "Skyrim"], targetFps: 60 },
    socialLinks: [{ platform: "Steam", username: "DemoGamer", emoji: "🎯" }],
    listings: [],
    reviews: [sharedReviews[1]],
    stats: { totalSales: 0, totalPurchases: 2, responseTime: "< 4 hours", completionRate: 100 },
  },
  {
    id: "user-004",
    username: "probuilder",
    avatar: "eagle",
    fullName: "Alex Chen",
    rating: 4.9,
    totalRatings: 48,
    joinDate: "2025-06-01",
    location: "Birmingham, UK",
    bio: "Professional PC builder. 200+ builds completed. nYield verified seller.",
    verified: true,
    pcSpecs: { cpu: "AMD Ryzen 9 7950X", gpu: "RTX 4090", ram: "64GB DDR5", storage: "4TB NVMe RAID", monitor: "32\" 4K 144Hz", os: "nYield Elite Edition" },
    gaming: { playstyle: "Creative", favouriteGames: ["Flight Simulator", "Cities Skylines", "Blender"], targetFps: 60 },
    socialLinks: [
      { platform: "YouTube", username: "ProBuilderAlex", emoji: "▶️" },
      { platform: "Twitter", username: "alexbuildspc", emoji: "🐦" },
    ],
    listings: ["mp-001", "mp-003"],
    reviews: [sharedReviews[2], sharedReviews[3], sharedReviews[4]],
    stats: { totalSales: 47, totalPurchases: 12, responseTime: "< 30 min", completionRate: 98 },
  },
  {
    id: "user-005",
    username: "speedrunner",
    avatar: "ninja",
    fullName: "Kai Martinez",
    rating: 4.8,
    totalRatings: 22,
    joinDate: "2025-08-20",
    location: "Bristol, UK",
    bio: "Speedrun enthusiast. If it has a timer, I'm racing it.",
    verified: true,
    pcSpecs: { cpu: "Intel i9-14900K", gpu: "RTX 4080 Super", ram: "32GB DDR5", storage: "2TB NVMe", monitor: "24.5\" 1080p 360Hz", os: "nYield Performance" },
    gaming: { playstyle: "Competitive", favouriteGames: ["Celeste", "Hollow Knight", "Hades", "Sekiro"], targetFps: 240 },
    socialLinks: [
      { platform: "Twitch", username: "SpeedKai", emoji: "📺" },
      { platform: "Discord", username: "kai#0001", emoji: "🎮" },
    ],
    listings: ["mp-003"],
    reviews: [sharedReviews[2]],
    stats: { totalSales: 15, totalPurchases: 6, responseTime: "< 2 hours", completionRate: 100 },
  },
];

export const businessProfilesMock: BusinessProfile[] = [
  {
    id: "biz-001",
    slug: "probuilder-pcs",
    name: "ProBuilder PCs",
    logo: "🏗️",
    rating: 4.9,
    totalRatings: 128,
    verified: true,
    joinDate: "2025-03-01",
    location: "Birmingham, UK",
    description: "Professional PC building service. Custom gaming rigs, workstations, and creative machines built with passion and precision. Every build is stress-tested and benchmarked before delivery.",
    specialisation: "Custom Gaming & Workstation Builds",
    listings: ["mp-001", "mp-003"],
    reviews: sharedReviews,
    metrics: { totalSales: 234, responseTime: "< 15 min", avgBenchmarkScore: 91, completionRate: 99, repeatCustomers: 42 },
    socialLinks: [
      { platform: "YouTube", username: "ProBuilderPCs", emoji: "▶️" },
      { platform: "Twitter", username: "probuilder_pcs", emoji: "🐦" },
      { platform: "Discord", username: "ProBuilder Community", emoji: "🎮" },
    ],
    badges: ["Top Seller", "Verified Builder", "Fast Shipper", "100+ Sales"],
  },
  {
    id: "biz-002",
    slug: "speed-rigs",
    name: "Speed Rigs",
    logo: "⚡",
    rating: 4.7,
    totalRatings: 56,
    verified: true,
    joinDate: "2025-07-15",
    location: "Bristol, UK",
    description: "Specialising in ultra-low-latency competitive gaming PCs. Every rig is tuned for maximum FPS and minimum input lag.",
    specialisation: "Competitive Esports Machines",
    listings: ["mp-002"],
    reviews: [sharedReviews[2], sharedReviews[4]],
    metrics: { totalSales: 89, responseTime: "< 1 hour", avgBenchmarkScore: 87, completionRate: 97, repeatCustomers: 18 },
    socialLinks: [
      { platform: "Twitch", username: "SpeedRigsLive", emoji: "📺" },
    ],
    badges: ["Verified Builder", "Fast Shipper"],
  },
];

/** Lookup helpers */
export function getUserProfile(username: string): UserProfile | undefined {
  return userProfilesMock.find((p) => p.username === username);
}

export function getBusinessProfile(slug: string): BusinessProfile | undefined {
  return businessProfilesMock.find((p) => p.slug === slug);
}
