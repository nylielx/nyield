/**
 * =============================================================================
 * FAQ MOCK DATA — Categorised questions for the FAQ system
 * =============================================================================
 */

import {
  ShoppingCart,
  Zap,
  Monitor,
  Shield,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  popular?: boolean;
}

export interface FaqCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "orders",
    label: "Orders & Delivery",
    icon: ShoppingCart,
    items: [
      {
        id: "orders-1",
        question: "How long does delivery take?",
        answer:
          "Digital products are delivered instantly after purchase. Custom PC builds typically ship within 5–10 business days depending on component availability and configuration complexity.",
        popular: true,
      },
      {
        id: "orders-2",
        question: "Can I track my order?",
        answer:
          "Yes. Once your order ships, you'll receive a tracking link via email. You can also view real-time status updates in your Account → My Orders dashboard.",
      },
      {
        id: "orders-3",
        question: "What if my order arrives damaged?",
        answer:
          "Contact us within 48 hours with photos of the damage. We'll arrange a replacement or full refund at no extra cost.",
      },
    ],
  },
  {
    id: "performance",
    label: "Performance & Optimisation",
    icon: Zap,
    items: [
      {
        id: "perf-1",
        question: "What performance improvements can I expect?",
        answer:
          "Most users see 15–40% FPS gains and noticeably smoother frame pacing. Results vary by hardware, but our optimisation profiles are tuned for measurable, real-world improvements across popular titles.",
        popular: true,
      },
      {
        id: "perf-2",
        question: "How long does optimisation take?",
        answer:
          "The automated optimisation process takes 5–15 minutes depending on your system. Manual fine-tuning sessions with our team typically run 30–60 minutes.",
        popular: true,
      },
      {
        id: "perf-3",
        question: "Is this safe for my system?",
        answer:
          "Absolutely. All optimisations stay within manufacturer-safe parameters. We create a system restore point before any changes, so you can always roll back instantly.",
        popular: true,
      },
    ],
  },
  {
    id: "compatibility",
    label: "Compatibility",
    icon: Monitor,
    items: [
      {
        id: "compat-1",
        question: "Which operating systems are supported?",
        answer:
          "We currently support Windows 10 (21H2+) and Windows 11. macOS and Linux support is on our roadmap for 2025.",
      },
      {
        id: "compat-2",
        question: "Will this work with my hardware?",
        answer:
          "Our optimisations support Intel (6th gen+) and AMD Ryzen processors, plus NVIDIA GTX 1060+ and AMD RX 580+ GPUs. Use our free PC Analyzer tool to check compatibility.",
      },
      {
        id: "compat-3",
        question: "Can I use this alongside other software?",
        answer:
          "Yes. nYield is designed to work alongside your existing software stack including antivirus, streaming tools, and game launchers without conflicts.",
      },
    ],
  },
  {
    id: "warranty",
    label: "Warranty & Support",
    icon: Shield,
    items: [
      {
        id: "warranty-1",
        question: "Do you offer support after purchase?",
        answer:
          "Yes. All editions include email support. Competitive and Education editions include priority support with faster response times and dedicated assistance.",
        popular: true,
      },
      {
        id: "warranty-2",
        question: "What's your refund policy?",
        answer:
          "We offer a 30-day money-back guarantee on all software editions. If you're not satisfied with the performance improvements, we'll issue a full refund — no questions asked.",
      },
      {
        id: "warranty-3",
        question: "Can I upgrade later?",
        answer:
          "Absolutely. You can upgrade from any edition to a higher tier at any time. You'll only pay the price difference between your current and new edition.",
        popular: true,
      },
    ],
  },
  {
    id: "payments",
    label: "Payments & Pricing",
    icon: CreditCard,
    items: [
      {
        id: "pay-1",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All transactions are secured with 256-bit encryption.",
      },
      {
        id: "pay-2",
        question: "Are there any hidden fees?",
        answer:
          "No. The price you see is the price you pay. There are no subscriptions, recurring charges, or hidden fees. One-time purchase, lifetime access.",
      },
      {
        id: "pay-3",
        question: "Do you offer student discounts?",
        answer:
          "Yes. Our Education edition is specially priced for students and educators. Verify your student status during checkout to receive your discount automatically.",
      },
    ],
  },
];

export const popularFaqs = faqCategories
  .flatMap((c) => c.items.filter((i) => i.popular).map((i) => ({ ...i, categoryLabel: c.label })))
  .slice(0, 6);
