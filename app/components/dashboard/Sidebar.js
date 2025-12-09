"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Icons (lucide-react)
import { Home, Cpu, Map } from "lucide-react";

// Brand assets
import logo from "../../../public/soilScout.png";
import smallLogo from "../../../public/icon.png";

/**
 * =============================================================================
 * <Sidebar />
 * ---------------------------------------------------------------------------
 * Modernised Tailwind + shadcn-style sidebar with collapse functionality.
 *
 * UX Improvements:
 * ✓ Smooth width transition
 * ✓ Active page highlight
 * ✓ Compact mode retains icon-only clarity
 * ✓ Logical structure w/ reusable SidebarItem component
 *
 * UI Philosophy:
 * - Sidebar must never overwhelm primary dashboard content
 * - Collapse saves horizontal space on smaller screens
 * - Visual focus on active route for orientation
 * =============================================================================
 */
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
  className={`
    flex flex-col min-h-screen bg-[var(--sidebar-bg)] transition-all duration-300
    ${collapsed ? "w-20" : "w-60"} h-screen shadow-inner
  `}
>

      {/* Branding */}
      <div className="flex items-center justify-center py-6">
        {!collapsed && <Image src={logo} alt="SoilScout Logo" width={130} />}
        {collapsed && <Image src={smallLogo} alt="SoilScout Compact Logo" width={42} />}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-auto mb-6 rounded-full border border-zinc-700 px-2 py-1 text-xs hover:bg-zinc-800 transition"
        aria-label="Toggle sidebar"
      >
        {collapsed ? ">" : "<"}
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 px-3">
        <SidebarItem href="/" icon={<Home size={18} />}  label="Dashboard"  collapsed={collapsed} pathname={pathname} />
        <SidebarItem href="/secondPage" icon={<Cpu size={18} />} label="Sensors" collapsed={collapsed} pathname={pathname} />
        <SidebarItem href="/thirdPage"  icon={<Map size={18} />} label="Map" collapsed={collapsed} pathname={pathname} />
      </nav>
    </aside>
  );
}

/**
 * =============================================================================
 * <SidebarItem />
 * Reusable navigation item with dynamic active state.
 *
 * Objectively better than static <button> because:
 * • It scales cleanly for new items
 * • Route-based highlight improves spatial awareness
 * • Collapsed mode preserves icon context
 * =============================================================================
 */
function SidebarItem({ icon, label, collapsed, href, pathname }) {
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 cursor-pointer rounded-md px-3 py-2 text-sm font-medium
        transition hover:bg-zinc-800
        ${isActive ? "bg-zinc-800 text-green-300" : "text-zinc-300"}`}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
