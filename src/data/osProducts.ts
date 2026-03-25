/**
 * =============================================================================
 * OS PRODUCTS DATA — Mock data for nYield's Custom Operating Systems
 * =============================================================================
 *
 * WHY SEPARATE DATA FROM UI?
 * --------------------------
 * Separating data into its own file follows the "separation of concerns" principle:
 *
 * 1. MAINTAINABILITY: You can update product info without touching UI code.
 * 2. REUSABILITY: Multiple components can import and display this data.
 * 3. TESTABILITY: You can test data transformations without rendering UI.
 * 4. SCALABILITY: Later, this file could be replaced with an API call,
 *    and the UI components wouldn't need to change at all.
 *
 * ARCHITECTURE NOTE:
 * In a production app, this data would come from a database (e.g. Supabase)
 * or a CMS (e.g. Sanity, Strapi). For now, we use static TypeScript objects.
 * =============================================================================
 */

/**
 * TypeScript interface for an OS product.
 * Interfaces define the "shape" of data — they help catch bugs at compile time.
 * For example, if you misspell "description" as "descrption", TypeScript will error.
 */
export interface OSProduct {
  id: string;                // Unique identifier for this product
  name: string;              // Display name (e.g. "Competitive Edition")
  tagline: string;           // Short catchy description
  description: string;       // Longer explanation of features
  features: string[];        // Bullet-point features
  icon: string;              // Lucide icon name (used for visual identification)
  highlighted?: boolean;     // Whether this card should be visually emphasized
}

/**
 * The three OS editions nYield offers.
 * Each is tuned for a different user workflow.
 */
export const osProducts: OSProduct[] = [
  {
    id: "competitive",
    name: "Competitive Edition",
    tagline: "Maximum responsiveness. Zero compromise.",
    description:
      "Built for esports athletes and competitive gamers who need every millisecond of advantage. Strips out background processes, optimizes input latency, and pushes your hardware to its absolute limit.",
    features: [
      "Ultra-low input latency tuning",
      "Background process elimination",
      "GPU & CPU priority optimization",
      "Network stack optimization",
      "Game-specific config profiles",
      "Real-time performance monitoring",
    ],
    icon: "Zap", // Represents speed/performance
    highlighted: true, // This is the flagship product
  },
  {
    id: "balanced",
    name: "Balanced Edition",
    tagline: "Power meets productivity.",
    description:
      "Designed for creators, students, and professionals who need a fast, reliable system for work — but still want solid gaming performance when it's time to play.",
    features: [
      "Optimized for multitasking workflows",
      "Pre-configured productivity tools",
      "Smart resource allocation",
      "Quick-switch gaming mode",
      "Battery optimization (laptops)",
      "Clean, minimal bloatware setup",
    ],
    icon: "Scale", // Represents balance
  },
  {
    id: "education",
    name: "Education Edition",
    tagline: "Study hard. Game harder.",
    description:
      "A quiet, focused setup built for students. Minimal distractions during study time, but flips into a capable gaming machine when you need a break. The best of both worlds.",
    features: [
      "Focus mode with distraction blocking",
      "Quiet background operation",
      "Study-optimized power profiles",
      "One-click gaming mode toggle",
      "Competitive-grade game performance",
      "Parental control support",
    ],
    icon: "GraduationCap", // Represents education
  },
];
