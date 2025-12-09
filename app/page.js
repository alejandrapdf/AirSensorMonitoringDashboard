"use client";

import MetricCard from "./components/dashboard/MetricCard";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import MetricToggle from "./components/dashboard/MetricToggle";


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
        <h3 className="text-xl font-semibold mb-6">Metrics</h3>
      <MetricToggle metric={metric} setMetric={setMetric} />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          
          <MetricCard label="Avg Soil Health" value="78%" />
          <MetricCard label="Sensors Online" value="24" />
          <MetricCard label="Critical Scouts" value="3" critical />
        </div>
      </section>



    </div>
  );
}
