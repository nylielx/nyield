/**
 * =============================================================================
 * GIFT MOCK DATA — Gift cards and gifting options
 * =============================================================================
 */

export interface GiftCard {
  id: string;
  value: number;
  label: string;
  popular?: boolean;
}

export interface GiftableProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  type: "edition" | "service" | "surprise";
}

export const giftCardOptions: GiftCard[] = [
  { id: "gc-50", value: 50, label: "£50" },
  { id: "gc-100", value: 100, label: "£100", popular: true },
  { id: "gc-250", value: 250, label: "£250" },
];

export const giftableProducts: GiftableProduct[] = [
  {
    id: "gift-competitive",
    name: "Competitive Edition",
    description: "Full competitive optimisation package — perfect for gamers who want every edge.",
    price: 79,
    type: "edition",
  },
  {
    id: "gift-balanced",
    name: "Balanced Edition",
    description: "All-round performance boost for gaming, streaming, and everyday use.",
    price: 49,
    type: "edition",
  },
  {
    id: "gift-optimisation",
    name: "Optimisation Session",
    description: "One-on-one expert session to fine-tune their system for peak performance.",
    price: 39,
    type: "service",
  },
  {
    id: "gift-surprise",
    name: "Surprise Upgrade",
    description: "We pick the best upgrade within the budget — a true surprise for any PC enthusiast.",
    price: 99,
    type: "surprise",
  },
];

export const giftSocialProof = [
  "Popular gift among students",
  "Top choice for birthdays",
  "Most gifted during holidays",
];
