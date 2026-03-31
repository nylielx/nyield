/**
 * =============================================================================
 * TEAM DATA — Core team members for nYield
 * =============================================================================
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  roleColor: string; // Tailwind-compatible HSL token
  socials?: { platform: string; url: string }[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "hassan",
    name: "Hassan",
    role: "CEO / Founder / Developer",
    description: "Medicine student turned tech entrepreneur. Built nYield to solve real PC performance problems students face daily.",
    image: "/placeholder.svg",
    roleColor: "0 72% 51%",       // Red — Founder
    socials: [
      { platform: "tiktok", url: "#" },
      { platform: "twitch", url: "#" },
    ],
  },
  {
    id: "alisher",
    name: "Alisher",
    role: "Co-Founder / Developer",
    description: "Pharmacy student and performance optimization specialist. Leads the technical architecture behind nYield's OS editions.",
    image: "/placeholder.svg",
    roleColor: "0 72% 51%",       // Red — Founder
    socials: [
      { platform: "tiktok", url: "#" },
      { platform: "twitch", url: "#" },
    ],
  },
  {
    id: "james",
    name: "James",
    role: "Lead Tester",
    description: "Stress-tests every build and OS edition to ensure stability. If it passes James, it's production-ready.",
    image: "/placeholder.svg",
    roleColor: "270 60% 55%",     // Purple — Tester
    socials: [
      { platform: "twitch", url: "#" },
    ],
  },
  {
    id: "sofia",
    name: "Sofia",
    role: "Community & Support",
    description: "First point of contact for all nYield users. Ensures every customer feels heard and supported.",
    image: "/placeholder.svg",
    roleColor: "185 70% 50%",     // Cyan — Support
    socials: [
      { platform: "tiktok", url: "#" },
    ],
  },
  {
    id: "marcus",
    name: "Marcus",
    role: "Systems Engineer",
    description: "Builds and maintains the optimisation pipelines. Obsessed with squeezing every last frame out of hardware.",
    image: "/placeholder.svg",
    roleColor: "215 70% 55%",     // Blue — Engineer
    socials: [
      { platform: "twitch", url: "#" },
    ],
  },
];
