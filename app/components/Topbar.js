"use client";
import { useState, useEffect } from "react";

/**
 * ============================================================================
 * <Topbar />
 * ----------------------------------------------------------------------------
 * Dashboard header with theme-accessibility toggle.
 *
 * Why this design works:
 * • Clear hierarchy — title left, controls right
 * • Toggle remains visually distinct + interactive
 * • Minimal visual weight keeps data as main focus
 *
 * Future-Ready Additions (optional)
 * • Search input, user avatar, notifications
 * • Breadcrumb navigation for deep page structure
 * ============================================================================
 */
export default function Topbar() {
  const [theme, setTheme] = useState("default");

  // Restore saved theme preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "default";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "accessible" ? "default" : "accessible";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <header
      className="flex items-center justify-between w-full px-6 py-4
      bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50
      border-b border-zinc-200 dark:border-zinc-800"
    >
      {/* Title */}
      <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>

      {/* Accessible Theme Toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle accessibility theme"
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        {/* Icon remains neutral — avoids color conflict */}
        <span className="text-lg">👁️</span>

        {/* Switch Track */}
        <div
          className={`relative w-11 h-6 rounded-full transition-colors duration-300
          ${theme === "accessible" ? "bg-blue-600" : "bg-gray-400"}`}
        >
          {/* Switch Knob */}
          <div
            className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow
            transition-transform duration-300
            ${theme === "accessible" ? "translate-x-5" : "translate-x-0"}`}
          />
        </div>
      </button>
    </header>
  );
}
