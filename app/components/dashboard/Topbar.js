"use client";
import { useState, useEffect, useRef } from "react";
import { LogIn, LogOut } from "lucide-react";   // icons added

/**
 * ============================================================================
 *  Topbar — Search + Profile Dropdown + Dark/Light Theme Switch
 * ============================================================================
 * Features:
 *  ✔ Search field beside avatar
 *  ✔ Profile dropdown using initial avatar
 *  ✔ Login + Logout buttons (placeholder)
 *  ✔ Dark/Light mode toggle (real theme change!)
 *  ✔ Persists theme upon reload via localStorage
 * ============================================================================
 */

export default function Topbar() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  /* Restore theme on load */
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  /* Toggle dark <-> light */
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const close = e => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <header
      className="flex items-center justify-between w-full px-6 py-4
      bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50
      border-b border-zinc-200 dark:border-zinc-800"
    >
      {/* Left — Page Title */}
      <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>

      {/* Right — Search + Avatar */}
      <div className="flex items-center gap-4">

        {/* Search Field */}
        <input
          type="text"
          placeholder="Search sensors..."
          className="w-64 px-3 py-2 rounded-lg text-sm
          bg-white dark:bg-zinc-800 dark:border-zinc-600 shadow-sm border
          focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Avatar + Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full bg-green-700 text-white font-bold
            flex items-center justify-center uppercase"
          >
            A
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800
            border border-zinc-300 dark:border-zinc-700 rounded-md shadow-lg p-3
            text-sm space-y-2 z-50">

              {/* LOGIN */}
              <button className="w-full flex items-center gap-2 p-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded">
                <LogIn size={16} /> Login
              </button>

              {/* LOGOUT */}
              <button className="w-full flex items-center gap-2 p-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded">
                <LogOut size={16} /> Logout
              </button>

              {/* DARK MODE SWITCH */}
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
