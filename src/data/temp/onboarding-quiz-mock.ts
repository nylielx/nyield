/**
 * =============================================================================
 * ONBOARDING QUIZ DATA — "Need Help Choosing?" questionnaire
 * =============================================================================
 */

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  type: "single" | "multi";
  options: { value: string; label: string; emoji: string; description?: string }[];
}

export interface QuizAnswers {
  field: string;
  userType: string;
  dailyHours: string;
  travelFrequency: string;
  games: string[];
  playstyle: string;
  targetFps: string;
}

export interface QuizResult {
  recommendedOs: string;
  osReason: string;
  buildTier: number;
  buildTierName: string;
  buildReason: string;
  optimisationLevel: string;
  optimisationReason: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "field",
    question: "What's your primary field?",
    subtitle: "This helps us understand your workflow",
    type: "single",
    options: [
      { value: "cs", label: "Computer Science", emoji: "💻", description: "Programming, development, data" },
      { value: "engineering", label: "Engineering", emoji: "⚙️", description: "CAD, simulations, modelling" },
      { value: "design", label: "Design / Creative", emoji: "🎨", description: "Photoshop, Blender, video editing" },
      { value: "gaming", label: "Pure Gaming", emoji: "🎮", description: "Gaming is my primary use" },
      { value: "business", label: "Business / Office", emoji: "📊", description: "Excel, browsing, productivity" },
      { value: "student", label: "Student (General)", emoji: "📚", description: "Mixed usage, assignments + gaming" },
    ],
  },
  {
    id: "userType",
    question: "How would you describe yourself?",
    subtitle: "Select the closest match",
    type: "single",
    options: [
      { value: "student", label: "Student", emoji: "🎓" },
      { value: "casual", label: "Casual Gamer", emoji: "🎲" },
      { value: "competitive", label: "Competitive Gamer", emoji: "🏆" },
      { value: "professional", label: "Professional / Creator", emoji: "💼" },
    ],
  },
  {
    id: "dailyHours",
    question: "How many hours do you use your PC daily?",
    subtitle: "Average across the week",
    type: "single",
    options: [
      { value: "1-3", label: "1–3 hours", emoji: "🕐" },
      { value: "4-6", label: "4–6 hours", emoji: "🕓" },
      { value: "7-10", label: "7–10 hours", emoji: "🕖" },
      { value: "10+", label: "10+ hours", emoji: "🔥" },
    ],
  },
  {
    id: "travelFrequency",
    question: "How often do you travel?",
    subtitle: "Affects portability recommendations",
    type: "single",
    options: [
      { value: "never", label: "Rarely / Desktop only", emoji: "🏠" },
      { value: "sometimes", label: "Occasionally", emoji: "🚗" },
      { value: "often", label: "Frequently", emoji: "✈️" },
      { value: "always", label: "Always on the move", emoji: "🌍" },
    ],
  },
  {
    id: "games",
    question: "Which games do you play?",
    subtitle: "Select all that apply",
    type: "multi",
    options: [
      { value: "valorant", label: "Valorant", emoji: "🎯" },
      { value: "cs2", label: "CS2", emoji: "🔫" },
      { value: "fortnite", label: "Fortnite", emoji: "🏗️" },
      { value: "apex", label: "Apex Legends", emoji: "🦅" },
      { value: "cod", label: "Call of Duty", emoji: "💥" },
      { value: "minecraft", label: "Minecraft", emoji: "⛏️" },
      { value: "rpg", label: "RPGs (Elden Ring, etc.)", emoji: "⚔️" },
      { value: "simulation", label: "Simulation Games", emoji: "✈️" },
      { value: "none", label: "I don't game much", emoji: "📱" },
    ],
  },
  {
    id: "playstyle",
    question: "Are you competitive or casual?",
    subtitle: "This affects performance tuning",
    type: "single",
    options: [
      { value: "competitive", label: "Competitive", emoji: "🏆", description: "Every frame matters" },
      { value: "casual", label: "Casual", emoji: "😎", description: "Smooth & enjoyable" },
      { value: "mixed", label: "Mix of both", emoji: "⚡" },
    ],
  },
  {
    id: "targetFps",
    question: "What FPS do you target?",
    subtitle: "Higher FPS = smoother gameplay",
    type: "single",
    options: [
      { value: "60", label: "60 FPS", emoji: "🟢", description: "Smooth for casual" },
      { value: "144", label: "144 FPS", emoji: "🔵", description: "Competitive standard" },
      { value: "240", label: "240+ FPS", emoji: "🟣", description: "Pro-level smoothness" },
      { value: "any", label: "I don't mind", emoji: "🤷" },
    ],
  },
];

/** Generate recommendation from answers */
export function generateRecommendation(answers: QuizAnswers): QuizResult {
  const isCompetitive = answers.playstyle === "competitive" || answers.targetFps === "240";
  const isHeavy = answers.dailyHours === "7-10" || answers.dailyHours === "10+";
  const isCreative = answers.field === "design" || answers.field === "engineering";

  let buildTier = 2;
  if (isCompetitive && isHeavy) buildTier = 4;
  else if (isCompetitive || isCreative) buildTier = 3;
  else if (answers.userType === "professional") buildTier = 4;
  else if (answers.userType === "student" && !isHeavy) buildTier = 1;
  if (answers.targetFps === "240") buildTier = Math.max(buildTier, 4);

  const tierNames: Record<number, string> = {
    1: "Foundation (Tier 1)", 2: "Performance (Tier 2)", 3: "Advanced (Tier 3)",
    4: "Elite (Tier 4)", 5: "Extreme (Tier 5)",
  };

  let recommendedOs = "nYield Standard Edition";
  let osReason = "Great all-rounder for everyday tasks and casual gaming.";
  if (isCompetitive) {
    recommendedOs = "nYield Performance Edition";
    osReason = "Optimised for low latency and competitive FPS gaming.";
  }
  if (buildTier >= 4) {
    recommendedOs = "nYield Elite Edition";
    osReason = "Maximum performance with hardware-level tweaks for top-tier rigs.";
  }

  let optimisationLevel = "Standard";
  let optimisationReason = "Balanced settings for smooth performance.";
  if (isCompetitive) {
    optimisationLevel = "Aggressive";
    optimisationReason = "Every ms counts — we'll strip unnecessary processes and tune for raw speed.";
  } else if (isCreative) {
    optimisationLevel = "Workstation";
    optimisationReason = "Priority on render speed, RAM management, and multi-threaded performance.";
  }

  return {
    recommendedOs,
    osReason,
    buildTier,
    buildTierName: tierNames[buildTier] ?? tierNames[2],
    buildReason: `Based on your ${answers.playstyle} playstyle, ${answers.dailyHours}h daily usage, and ${answers.targetFps} FPS target.`,
    optimisationLevel,
    optimisationReason,
  };
}
