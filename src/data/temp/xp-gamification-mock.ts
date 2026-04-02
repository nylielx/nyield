/**
 * =============================================================================
 * XP & GAMIFICATION MOCK DATA — Progression system
 * =============================================================================
 */

export interface XpLevel {
  id: number;
  name: string;
  emoji: string;
  minXp: number;
  maxXp: number;
  color: string; // tailwind-compatible
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  xpReward: number;
  category: "profile" | "social" | "marketplace" | "builds" | "special";
  unlocked: boolean;
  unlockedAt?: string;
}

export interface XpEvent {
  id: string;
  action: string;
  xp: number;
  timestamp: string;
  emoji: string;
}

export const xpLevels: XpLevel[] = [
  { id: 1, name: "Peasant", emoji: "🏰", minXp: 0, maxXp: 500, color: "text-muted-foreground" },
  { id: 2, name: "Knight", emoji: "⚔️", minXp: 500, maxXp: 1500, color: "text-blue-400" },
  { id: 3, name: "Elite Guard", emoji: "🛡️", minXp: 1500, maxXp: 3500, color: "text-purple-400" },
  { id: 4, name: "Dragon Slayer", emoji: "🐉", minXp: 3500, maxXp: 7000, color: "text-orange-400" },
  { id: 5, name: "King", emoji: "👑", minXp: 7000, maxXp: 15000, color: "text-yellow-400" },
];

export const xpActions: Record<string, { xp: number; emoji: string }> = {
  signup: { xp: 100, emoji: "🎉" },
  profile_complete: { xp: 150, emoji: "✨" },
  avatar_set: { xp: 50, emoji: "🎭" },
  first_purchase: { xp: 200, emoji: "🛒" },
  review_written: { xp: 75, emoji: "⭐" },
  build_saved: { xp: 50, emoji: "💾" },
  build_shared: { xp: 100, emoji: "📤" },
  social_connected: { xp: 30, emoji: "🔗" },
  daily_login: { xp: 10, emoji: "📅" },
  referral: { xp: 300, emoji: "👥" },
  first_booking: { xp: 150, emoji: "📋" },
  quiz_completed: { xp: 100, emoji: "🧠" },
  pc_analyzed: { xp: 75, emoji: "🔬" },
};

export const achievementsMock: Achievement[] = [
  { id: "ach-1", title: "First Steps", description: "Create your nYield account", emoji: "👣", xpReward: 100, category: "profile", unlocked: true, unlockedAt: "2025-09-14" },
  { id: "ach-2", title: "Identity Crisis", description: "Set your profile avatar", emoji: "🎭", xpReward: 50, category: "profile", unlocked: true, unlockedAt: "2025-09-14" },
  { id: "ach-3", title: "The Full Picture", description: "Complete your gaming profile", emoji: "🖼️", xpReward: 150, category: "profile", unlocked: true, unlockedAt: "2025-09-20" },
  { id: "ach-4", title: "Connected", description: "Link a social account", emoji: "🔗", xpReward: 30, category: "social", unlocked: true, unlockedAt: "2025-10-01" },
  { id: "ach-5", title: "Window Shopper", description: "Save your first marketplace item", emoji: "👀", xpReward: 50, category: "marketplace", unlocked: true, unlockedAt: "2025-10-15" },
  { id: "ach-6", title: "Builder", description: "Save your first PC build", emoji: "🔧", xpReward: 50, category: "builds", unlocked: true, unlockedAt: "2025-11-01" },
  { id: "ach-7", title: "First Blood", description: "Complete your first purchase", emoji: "🩸", xpReward: 200, category: "marketplace", unlocked: false },
  { id: "ach-8", title: "Critic", description: "Write your first review", emoji: "📝", xpReward: 75, category: "marketplace", unlocked: false },
  { id: "ach-9", title: "Socialite", description: "Follow 5 users", emoji: "🤝", xpReward: 100, category: "social", unlocked: false },
  { id: "ach-10", title: "PC Whisperer", description: "Analyze your PC specs", emoji: "🔬", xpReward: 75, category: "builds", unlocked: false },
  { id: "ach-11", title: "Optimizer", description: "Complete the onboarding quiz", emoji: "🧠", xpReward: 100, category: "special", unlocked: false },
  { id: "ach-12", title: "Dragon Tamer", description: "Reach Dragon Slayer level", emoji: "🐲", xpReward: 500, category: "special", unlocked: false },
];

export const xpHistoryMock: XpEvent[] = [
  { id: "xp-1", action: "Account created", xp: 100, timestamp: "2025-09-14T10:00:00Z", emoji: "🎉" },
  { id: "xp-2", action: "Avatar set", xp: 50, timestamp: "2025-09-14T10:05:00Z", emoji: "🎭" },
  { id: "xp-3", action: "Profile completed", xp: 150, timestamp: "2025-09-20T14:30:00Z", emoji: "✨" },
  { id: "xp-4", action: "Discord connected", xp: 30, timestamp: "2025-10-01T09:00:00Z", emoji: "🔗" },
  { id: "xp-5", action: "Item saved", xp: 50, timestamp: "2025-10-15T16:20:00Z", emoji: "👀" },
  { id: "xp-6", action: "Build saved", xp: 50, timestamp: "2025-11-01T11:45:00Z", emoji: "💾" },
  { id: "xp-7", action: "Daily login", xp: 10, timestamp: "2025-12-01T08:00:00Z", emoji: "📅" },
  { id: "xp-8", action: "Daily login", xp: 10, timestamp: "2025-12-02T08:00:00Z", emoji: "📅" },
];

/** Get current level from XP */
export function getLevelFromXp(xp: number): XpLevel {
  for (let i = xpLevels.length - 1; i >= 0; i--) {
    if (xp >= xpLevels[i].minXp) return xpLevels[i];
  }
  return xpLevels[0];
}

/** Get progress % within current level */
export function getLevelProgress(xp: number): number {
  const level = getLevelFromXp(xp);
  const range = level.maxXp - level.minXp;
  const progress = xp - level.minXp;
  return Math.min(Math.round((progress / range) * 100), 100);
}

/** Mock total XP for default user */
export const defaultUserXp = 450;
