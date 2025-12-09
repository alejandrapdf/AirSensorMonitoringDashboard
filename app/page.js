"use client";

import MetricCard from "./components/dashboard/MetricCard";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import MetricToggle from "./components/dashboard/MetricToggle";
import MetricDisplaySection from "./components/dashboard/MetricDisplaySection";

/**
 * Dashboard Home
 * Displays metric overview + sensor map + navigation link
 */
export default function HomePage() {
  const [metric, setMetric] = useState("moisture");
  return (
    <div className="flex flex-col gap-10">

      {/* ========== METRIC OVERVIEW ========== */}
      <section>
        <h3 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-200">
  Metrics
</h3>
      <MetricToggle metric={metric} setMetric={setMetric} />
      <MetricDisplaySection metric={metric} setMetric={setMetric} />
        
      </section>



    </div>
  );
}
