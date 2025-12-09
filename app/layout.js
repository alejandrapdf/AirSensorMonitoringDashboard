// ---------------------------------------------------------------
// Global Layout
// ----------------------------------------------------------------
// - Sidebar persists across navigation using App Router
// - Topbar stays fixed at top of content region (clean hierarchy)
// - {children} renders dynamic page content per route
// ---------------------------------------------------------------

import "./globals.css";
import Sidebar from "./components/dashboard/Sidebar";
import Topbar from "./components/dashboard/Topbar";

export const metadata = {
  title: "SoilScout Dashboard",
  description: "Live system monitoring interface",
};

/**
 * ============================================================================
 * RootLayout()
 * ----------------------------------------------------------------------------
 * Wraps every dashboard page with global UI chrome:
 *
 * ┌──────────────────────────────────────────────────────────────┐
 * │ Sidebar ┆ Content Wrapper                                     │
 * │         ┆ ┌───────────── Topbar ─────────────┐                │
 * │         ┆ │   Page children render here      │                │
 * │         ┆ └─────────────────────────────────┘                │
 * └──────────────────────────────────────────────────────────────┘
 *
 * Design Decisions:
 * • Sidebar sits left persistently → stable spatial orientation
 * • Content scrolls independently from Sidebar
 * • Topbar separated from Sidebar for clear hierarchy
 * ============================================================================
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-background text-foreground">

        {/* Left-side Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">

          <Topbar />

          <main className="p-6 lg:p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
