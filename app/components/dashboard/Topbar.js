"use client";
import { useState, useEffect, useRef } from "react";
import { LogIn, LogOut } from "lucide-react"; // Lucide icon set used for menu options

/**
 * =============================================================================
 * <Topbar />
 * -----------------------------------------------------------------------------
 * Global dashboard header containing:
 *  • Search input field
 *  • User avatar with dropdown menu
 *  • Theme toggle (Light ↔ Dark) with full persistence
 *
 * Design Intent:
 *  - Search and user controls grouped to the right → improves visual hierarchy
 *  - Menu uses absolute positioning to avoid layout shift when opening
 *  - Theme selection persists using <localStorage> to respect user preference
 *  - Avatar only shows first character (placeholder) until auth is added
 *
 * Future Scalability:
 *  - Replace dummy login/logout with authentication handler logic
 *  - Search can later be wired to API-driven dataset filtering
 *  - Dropdown supports expansion for notifications, user settings, etc.
 * =============================================================================
 */
export default function Topbar() {

  /* ==========================================================================
   🌓 Theme State & Persistence
   --------------------------------------------------------------------------
   - Stores theme as "light" | "dark"
   - Restores saved value on page load
   - Applies <html class="dark"> for full Tailwind theme switching
  ========================================================================== */
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };


  /* ==========================================================================
   👤 Avatar Dropdown Menu (Profile + Theme)
   --------------------------------------------------------------------------
   - menuOpen controls dropdown visibility
   - Clicking outside the menu closes it (accessibility smart behaviour)
  ========================================================================== */
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);


  /* ==========================================================================
   🔸 Render Header
   --------------------------------------------------------------------------
   Layout:
   ┌─────────────────────────┬─────────────────────────────────────────┐
   │        Dashboard        │ Search + Avatar + Dropdown              │
   └─────────────────────────┴─────────────────────────────────────────┘
  ========================================================================== */
  return (
    <header
      className="flex items-center justify-between w-full px-6 py-4
      bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50
      border-b border-zinc-200 dark:border-zinc-800"
    >

      {/* Left Section → Page Title */}
      <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>


      {/* Right Section → Search + Profile + Theme Toggle */}
      <div className="flex items-center gap-4">

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="w-64 px-3 py-2 rounded-lg text-sm
          bg-white dark:bg-zinc-800 shadow-sm border border-zinc-300 dark:border-zinc-700
          focus:outline-none focus:ring-2 focus:ring-green-500"
        />


        {/* 👤 User Avatar w/ Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full bg-green-700 text-white font-bold
            flex items-center justify-center uppercase"
          >
            A
          </button>

          {/* Dropdown Panel */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800
            border border-zinc-300 dark:border-zinc-700 rounded-md shadow-lg p-3
            text-sm space-y-2 z-50">

              {/* Menu Options */}
              <button className="w-full flex items-center gap-2 p-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded">
                <LogIn size={16} /> Login
              </button>

              <button className="w-full flex items-center gap-2 p-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded">
                <LogOut size={16} /> Logout
              </button>

              {/* 🌓 Theme Toggle with Label */}
              <div className="flex items-center justify-between pt-2">
                <span>Dark Mode</span>
                <button
                  onClick={toggleTheme}
                  className={`w-10 h-5 rounded-full flex items-center p-1 transition
                  ${theme === "dark" ? "bg-green-600" : "bg-gray-400"}`}
                >
                  <div
                    className={`h-4 w-4 bg-white rounded-full shadow transition-transform
                    ${theme === "dark" ? "translate-x-5" : ""}`}
                  />
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}
