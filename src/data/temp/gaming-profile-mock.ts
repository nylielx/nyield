/**
 * =============================================================================
 * GAMING PROFILE & SOCIAL LINKS MOCK DATA
 * =============================================================================
 */

export interface SocialLink {
  platform: "discord" | "steam" | "twitch" | "youtube" | "twitter";
  username: string;
  url: string;
  emoji: string;
}

export interface GamingProfile {
  playstyle: "competitive" | "casual" | "creative" | "explorer";
  dailyHours: number;
  favouriteGames: string[];
  targetFps: number;
  bio: string;
}

export interface PcSetup {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  monitor: string;
  os: string;
}

export interface PublicProfile {
  username: string;
  userId: string;
  avatar: string;
  fullName: string;
  bio: string;
  xp: number;
  memberSince: string;
  gaming: GamingProfile;
  pcSetup: PcSetup;
  socialLinks: SocialLink[];
  savedBuilds: number;
  followers: number;
  following: number;
}

export const socialPlatforms: { key: SocialLink["platform"]; label: string; emoji: string; baseUrl: string }[] = [
  { key: "discord", label: "Discord", emoji: "🎮", baseUrl: "https://discord.com/users/" },
  { key: "steam", label: "Steam", emoji: "🎯", baseUrl: "https://steamcommunity.com/id/" },
  { key: "twitch", label: "Twitch", emoji: "📺", baseUrl: "https://twitch.tv/" },
  { key: "youtube", label: "YouTube", emoji: "▶️", baseUrl: "https://youtube.com/@" },
  { key: "twitter", label: "X / Twitter", emoji: "🐦", baseUrl: "https://x.com/" },
];

export const defaultGamingProfile: GamingProfile = {
  playstyle: "competitive",
  dailyHours: 4,
  favouriteGames: ["Valorant", "CS2", "Apex Legends", "Fortnite"],
  targetFps: 144,
  bio: "Competitive FPS player. Always chasing the next upgrade.",
};

export const defaultPcSetup: PcSetup = {
  cpu: "AMD Ryzen 7 7800X3D",
  gpu: "NVIDIA RTX 4070 Ti Super",
  ram: "32GB DDR5 6000MHz",
  storage: "2TB NVMe Gen4",
  monitor: "27\" 1440p 165Hz IPS",
  os: "nYield Performance Edition",
};

export const defaultSocialLinks: SocialLink[] = [
  { platform: "discord", username: "hassan#1337", url: "https://discord.com/users/hassan", emoji: "🎮" },
  { platform: "steam", username: "HassanYield", url: "https://steamcommunity.com/id/hassanyield", emoji: "🎯" },
  { platform: "twitch", username: "nYieldHassan", url: "https://twitch.tv/nyieldhassan", emoji: "📺" },
];

export const publicProfileMock: PublicProfile = {
  username: "hassan",
  userId: "user-001",
  avatar: "dragon",
  fullName: "Hassan",
  bio: "Competitive FPS player. Always chasing the next upgrade. nYield founder.",
  xp: 450,
  memberSince: "2025-09-14",
  gaming: defaultGamingProfile,
  pcSetup: defaultPcSetup,
  socialLinks: defaultSocialLinks,
  savedBuilds: 3,
  followers: 42,
  following: 15,
};

/** Mock community profiles */
export const communityProfiles: PublicProfile[] = [
  publicProfileMock,
  {
    username: "demouser",
    userId: "user-002",
    avatar: "fox",
    fullName: "Demo User",
    bio: "Casual gamer who loves RPGs and open world exploration.",
    xp: 220,
    memberSince: "2026-01-10",
    gaming: { playstyle: "explorer", dailyHours: 2, favouriteGames: ["Elden Ring", "Baldur's Gate 3", "Skyrim"], targetFps: 60, bio: "" },
    pcSetup: { cpu: "Intel i5-13600K", gpu: "RTX 4060", ram: "16GB DDR5", storage: "1TB NVMe", monitor: "24\" 1080p 144Hz", os: "nYield Standard" },
    socialLinks: [{ platform: "steam", username: "DemoGamer", url: "#", emoji: "🎯" }],
    savedBuilds: 1,
    followers: 8,
    following: 23,
  },
  {
    username: "probuilder",
    userId: "user-004",
    avatar: "eagle",
    fullName: "Alex Chen",
    bio: "Professional PC builder. 200+ builds completed. nYield verified.",
    xp: 5200,
    memberSince: "2025-06-01",
    gaming: { playstyle: "creative", dailyHours: 6, favouriteGames: ["Flight Simulator", "Cities Skylines", "Blender"], targetFps: 60, bio: "" },
    pcSetup: { cpu: "AMD Ryzen 9 7950X", gpu: "RTX 4090", ram: "64GB DDR5", storage: "4TB NVMe RAID", monitor: "32\" 4K 144Hz", os: "nYield Elite Edition" },
    socialLinks: [
      { platform: "youtube", username: "ProBuilderAlex", url: "#", emoji: "▶️" },
      { platform: "twitter", username: "alexbuildspc", url: "#", emoji: "🐦" },
    ],
    savedBuilds: 12,
    followers: 340,
    following: 45,
  },
  {
    username: "speedrunner",
    userId: "user-005",
    avatar: "ninja",
    fullName: "Kai Martinez",
    bio: "Speedrun enthusiast. If it has a timer, I'm racing it.",
    xp: 3800,
    memberSince: "2025-08-20",
    gaming: { playstyle: "competitive", dailyHours: 8, favouriteGames: ["Celeste", "Hollow Knight", "Hades", "Sekiro"], targetFps: 240, bio: "" },
    pcSetup: { cpu: "Intel i9-14900K", gpu: "RTX 4080 Super", ram: "32GB DDR5", storage: "2TB NVMe", monitor: "24.5\" 1080p 360Hz", os: "nYield Performance" },
    socialLinks: [
      { platform: "twitch", username: "SpeedKai", url: "#", emoji: "📺" },
      { platform: "discord", username: "kai#0001", url: "#", emoji: "🎮" },
    ],
    savedBuilds: 5,
    followers: 890,
    following: 120,
  },
];

/** Activity feed items */
export interface ActivityFeedItem {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  action: string;
  detail: string;
  timestamp: string;
  type: "build" | "purchase" | "achievement" | "review" | "follow" | "share";
}

export const activityFeedMock: ActivityFeedItem[] = [
  { id: "f1", userId: "user-005", username: "speedrunner", avatar: "ninja", action: "shared a build", detail: "Ultra Low Latency 360Hz Rig", timestamp: "2026-04-02T10:30:00Z", type: "build" },
  { id: "f2", userId: "user-004", username: "probuilder", avatar: "eagle", action: "earned achievement", detail: "🐲 Dragon Tamer", timestamp: "2026-04-02T09:15:00Z", type: "achievement" },
  { id: "f3", userId: "user-002", username: "demouser", avatar: "fox", action: "wrote a review", detail: "RTX 4060 — Great value GPU", timestamp: "2026-04-01T18:00:00Z", type: "review" },
  { id: "f4", userId: "user-005", username: "speedrunner", avatar: "ninja", action: "followed", detail: "probuilder", timestamp: "2026-04-01T14:20:00Z", type: "follow" },
  { id: "f5", userId: "user-004", username: "probuilder", avatar: "eagle", action: "purchased", detail: "nYield Elite Edition", timestamp: "2026-04-01T11:00:00Z", type: "purchase" },
  { id: "f6", userId: "user-001", username: "hassan", avatar: "dragon", action: "saved a build", detail: "Budget Gaming Setup", timestamp: "2026-03-31T16:45:00Z", type: "build" },
];

/** Leaderboard */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  xp: number;
  level: string;
  levelEmoji: string;
}

export const leaderboardMock: LeaderboardEntry[] = [
  { rank: 1, userId: "user-005", username: "speedrunner", avatar: "ninja", xp: 3800, level: "Dragon Slayer", levelEmoji: "🐉" },
  { rank: 2, userId: "user-004", username: "probuilder", avatar: "eagle", xp: 5200, level: "Dragon Slayer", levelEmoji: "🐉" },
  { rank: 3, userId: "user-001", username: "hassan", avatar: "dragon", xp: 450, level: "Peasant", levelEmoji: "🏰" },
  { rank: 4, userId: "user-002", username: "demouser", avatar: "fox", xp: 220, level: "Peasant", levelEmoji: "🏰" },
];
