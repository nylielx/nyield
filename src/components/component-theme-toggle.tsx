/**
 * =============================================================================
 * THEME TOGGLE — Switches between light and dark mode
 * =============================================================================
 *
 * HOW IT WORKS:
 * - Toggles the "dark" class on the <html> element
 * - Persists the user's choice in localStorage
 * - Shows a sun icon in dark mode, moon icon in light mode
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, default to dark
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nyield-theme");
      return stored ? stored === "dark" : true;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("nyield-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} className="text-foreground" /> : <Moon size={18} className="text-foreground" />}
    </button>
  );
};

export default ThemeToggle;
