"use client";
import { useState, useEffect, useRef } from "react";
import { LogOut } from "lucide-react"; // Lucide icons for UI clarity

/* =============================================================================
   <Topbar />
   -----------------------------------------------------------------------------
   Global navigation and interaction toolbar.

   Contains:
   • Dynamic theme switcher (dark/light)
   • Search box for dataset queries
   • User avatar with dropdown menu for future account controls

   UX Intent:
   - Controls grouped right to minimise distraction and improve scan rhythm
   - Dropdown is anchored absolutely to avoid layout shift when opened

   Forward Scalability:
   • Avatar menu can expand to profile/settings/notifications
   • Search input ready for API-based filtering or keyword queries
============================================================================= */

export default function Topbar() {



  /* ==========================================================================
     USER DROPDOWN MENU
     --------------------------------------------------------------------------
     - menuOpen controls dropdown visibility
     - Click-outside behavior auto-closes panel
     - Future space for authentication controls and settings
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
     UI LAYOUT STRUCTURE
     --------------------------------------------------------------------------
     ┌───────────────────── Left ─────────────────────┐
     │  Page Title                                       │
     │───────────────────────────────────────────────────│
     │                Search • Avatar • Theme Toggle     │
     └───────────────────── Right ──────────────────────┘

     Title first → confirms page context  
     Tools aligned right → predictable, efficient interaction cluster  
  ========================================================================== */

  return (
    <header
      className="flex items-center justify-between w-full px-6 py-4 dark:bg--zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50
      border-b border-zinc-200 dark:border-zinc-800"
    >

      {/* Title */}
      <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>

      {/* Search + Profile + Theme Controls */}
      <div className="flex items-center gap-4">

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          className="w-64 px-3 py-2 rounded-lg text-sm
          bg-white dark:bg-zinc-800 shadow-sm border border-zinc-300 dark:border-zinc-700
          focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Avatar + Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="w-9 h-9 rounded-full bg-green-700 text-white font-bold
            flex items-center justify-center uppercase"
          >
            A
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800
            border border-zinc-300 dark:border-zinc-700 rounded-md shadow-lg p-3
            text-sm space-y-2 z-50">

              {/* Logout Placeholder
                 → to be replaced with authenticated session actions */}
              <button className="w-full flex items-center gap-2 p-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded">
                <LogOut size={16} /> Logout
              </button>

              {/* Theme Switcher */}
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
