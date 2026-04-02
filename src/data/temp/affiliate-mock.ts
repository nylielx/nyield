/**
 * =============================================================================
 * AFFILIATE SYSTEM MOCK DATA — ExitLag-style affiliate program
 * =============================================================================
 */

export interface AffiliateLevel {
  id: number;
  name: string;
  minSales: number;
  commission: number;
  emoji: string;
  colour: string;
}

export interface AffiliateData {
  userId: string;
  level: AffiliateLevel;
  referralCode: string;
  referralLink: string;
  balance: { available: number; maturation: number; withdrawn: number };
  totalEarnings: number;
  totalReferrals: number;
  activeReferrals: number;
  challenges: AffiliateChallenge[];
  commissions: CommissionEntry[];
  withdrawals: WithdrawalEntry[];
  paypalEmail: string | null;
}

export interface AffiliateChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: string;
  emoji: string;
}

export interface CommissionEntry {
  id: string;
  date: string;
  referralName: string;
  product: string;
  amount: number;
  status: "confirmed" | "pending" | "maturation";
}

export interface WithdrawalEntry {
  id: string;
  date: string;
  amount: number;
  status: "completed" | "processing" | "failed";
  method: string;
}

export interface RewardItem {
  id: string;
  name: string;
  image: string;
  discount: string;
  category: string;
  costPoints: number;
  available: boolean;
}

export interface RedemptionEntry {
  id: string;
  code: string;
  plan: string;
  requestDate: string;
  status: "active" | "used" | "expired";
}

export interface MaterialAsset {
  id: string;
  title: string;
  description: string;
  type: "banner" | "logo" | "guide" | "video";
  downloadUrl: string;
  emoji: string;
}

/* -------------------------------------------------------------------------- */

export const affiliateLevels: AffiliateLevel[] = [
  { id: 1, name: "Silver", minSales: 0, commission: 5, emoji: "🥈", colour: "text-muted-foreground" },
  { id: 2, name: "Gold", minSales: 10, commission: 8, emoji: "🥇", colour: "text-yellow-500" },
  { id: 3, name: "Platinum", minSales: 30, commission: 12, emoji: "💎", colour: "text-cyan-400" },
  { id: 4, name: "Diamond", minSales: 75, commission: 15, emoji: "👑", colour: "text-purple-400" },
];

export const affiliateDataMock: AffiliateData = {
  userId: "user-001",
  level: affiliateLevels[0],
  referralCode: "HASSAN2026",
  referralLink: "https://nyield.com/ref/HASSAN2026",
  balance: { available: 45.50, maturation: 22.00, withdrawn: 120.00 },
  totalEarnings: 187.50,
  totalReferrals: 8,
  activeReferrals: 5,
  challenges: [
    { id: "ch-1", title: "Get 3 new sales", description: "Refer 3 new customers who complete a purchase", target: 3, current: 1, reward: "£15 bonus", emoji: "🎯" },
    { id: "ch-2", title: "Share on social media", description: "Post your referral link on any social platform", target: 1, current: 0, reward: "£5 bonus", emoji: "📱" },
    { id: "ch-3", title: "Reach Gold level", description: "Complete 10 total referral sales", target: 10, current: 8, reward: "Level up + 8% commission", emoji: "🥇" },
  ],
  commissions: [
    { id: "c1", date: "2026-04-01", referralName: "JohnD", product: "nYield Performance Edition", amount: 7.50, status: "confirmed" },
    { id: "c2", date: "2026-03-28", referralName: "SarahK", product: "RTX 4070 Gaming Build", amount: 12.00, status: "maturation" },
    { id: "c3", date: "2026-03-20", referralName: "MikeR", product: "Optimisation Service", amount: 5.00, status: "confirmed" },
    { id: "c4", date: "2026-03-15", referralName: "EmmaL", product: "nYield Standard Edition", amount: 4.50, status: "confirmed" },
    { id: "c5", date: "2026-03-10", referralName: "TomW", product: "Budget Esports Machine", amount: 8.00, status: "pending" },
    { id: "c6", date: "2026-02-28", referralName: "LisaP", product: "nYield Elite Edition", amount: 10.00, status: "confirmed" },
  ],
  withdrawals: [
    { id: "w1", date: "2026-03-01", amount: 60.00, status: "completed", method: "PayPal" },
    { id: "w2", date: "2026-02-01", amount: 60.00, status: "completed", method: "PayPal" },
  ],
  paypalEmail: null,
};

export const rewardsMock: RewardItem[] = [
  { id: "rw-1", name: "nYield Pro License", image: "🖥️", discount: "Up to 20% OFF", category: "Software", costPoints: 500, available: true },
  { id: "rw-2", name: "Gaming Peripherals Bundle", image: "🎮", discount: "15% OFF", category: "Hardware", costPoints: 300, available: true },
  { id: "rw-3", name: "Optimisation Service Credit", image: "⚡", discount: "Free Session", category: "Services", costPoints: 200, available: true },
  { id: "rw-4", name: "Custom PC Build Discount", image: "🏗️", discount: "Up to 10% OFF", category: "Builds", costPoints: 800, available: true },
  { id: "rw-5", name: "nYield Merch Pack", image: "👕", discount: "Exclusive", category: "Merch", costPoints: 150, available: false },
  { id: "rw-6", name: "Premium Discord Role", image: "💜", discount: "Lifetime", category: "Social", costPoints: 100, available: true },
];

export const redemptionsMock: RedemptionEntry[] = [
  { id: "rd-1", code: "NYD-PRO-A1B2C3", plan: "nYield Pro 1-Month", requestDate: "2026-03-01", status: "active" },
  { id: "rd-2", code: "NYD-OPT-X4Y5Z6", plan: "Free Optimisation", requestDate: "2026-02-15", status: "used" },
];

export const materialsMock: MaterialAsset[] = [
  { id: "mat-1", title: "nYield Logo Pack", description: "High-res logos in PNG, SVG, and WebP formats", type: "logo", downloadUrl: "#", emoji: "🎨" },
  { id: "mat-2", title: "Social Media Banners", description: "Pre-made banners for Twitter, Discord, and YouTube", type: "banner", downloadUrl: "#", emoji: "🖼️" },
  { id: "mat-3", title: "Affiliate Sales Guide", description: "Tips and strategies for maximising your referrals", type: "guide", downloadUrl: "#", emoji: "📖" },
  { id: "mat-4", title: "Product Demo Videos", description: "Short clips showcasing nYield features", type: "video", downloadUrl: "#", emoji: "🎬" },
];
