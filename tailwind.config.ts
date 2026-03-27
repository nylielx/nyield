/**
 * =============================================================================
 * TAILWIND CONFIGURATION — nYield Design System
 * =============================================================================
 *
 * PURPOSE:
 * This file extends Tailwind CSS with our custom design tokens, animations,
 * fonts, and color mappings. It bridges CSS variables (defined in index.css)
 * with Tailwind utility classes.
 *
 * WHY EXTEND vs OVERRIDE?
 * We use `extend` to ADD to Tailwind's defaults rather than replace them.
 * This means we keep all of Tailwind's built-in utilities AND add our own.
 *
 * ARCHITECTURE NOTE:
 * Colors reference CSS custom properties (e.g. hsl(var(--primary))).
 * This allows light/dark mode switching without changing any component code.
 * =============================================================================
 */

import type { Config } from "tailwindcss";

export default {
  // Enable class-based dark mode (toggled by adding "dark" class to <html>)
  darkMode: ["class"],

  // Tell Tailwind which files to scan for class names
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* ----------------------------------------------------------------
       * FONTS
       * "Space Grotesk" = headings (techy, distinctive)
       * "Inter" = body text (clean, readable at all sizes)
       * ---------------------------------------------------------------- */
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
      },

      /* ----------------------------------------------------------------
       * COLORS
       * Each maps to a CSS variable so themes can swap palettes.
       * The hsl() wrapper + var(--name) pattern lets Tailwind add
       * opacity modifiers like bg-primary/50.
       * ---------------------------------------------------------------- */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Custom nYield color */
        glow: "hsl(var(--glow))",
        "surface-elevated": "hsl(var(--surface-elevated))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* ----------------------------------------------------------------
       * KEYFRAME ANIMATIONS
       * Defined here so we can use them as Tailwind classes.
       * e.g. className="animate-fade-up"
       * ---------------------------------------------------------------- */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(0 72% 51% / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(0 72% 51% / 0.6)" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "count-up": "count-up 0.5s ease-out forwards",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;
