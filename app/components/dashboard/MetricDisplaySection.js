"use client";

import MetricCard from "./MetricCard";

/* ============================================================================
   MetricDisplaySection
   ---------------------------------------------------------------------------
   Displays summary metric values (Latest / Min / Max) + dynamic chart area.
   This component receives the selected metric from the parent (page.js)
   and updates UI text automatically based on the current metric.

   NOTE:
   - Currently shows placeholder values ("--")
   - Chart container is rendered but not yet data-driven
   - Next step: inject mock sensor dataset + compute summary values
============================================================================ */
export default function MetricDisplaySection({ metric, setMetric }) {
  return (
    <section className="flex flex-col gap-6">

      {/* ==================================================================
         Metric Summary Cards
         ------------------------------------------------------------------
         These reflect currently selected metric (moisture/temperature)
         Values are placeholders — will map to derived data next phase.
      ================================================================== */}
      <div className="grid sm:grid-cols-3 gap-6 mt-3 ">
        <MetricCard
          label={`Latest ${metric === "moisture" ? "Soil Moisture" : "Temperature"}`}
          value="--" // to be populated from dataset
        />
        <MetricCard label="Minimum" value="--" />
        <MetricCard label="Maximum" value="--" />
      </div>

      {/* ==================================================================
         Chart Display Area
         ------------------------------------------------------------------
         Placeholder UI only — reacts to metric toggle via text label.
         Will later be replaced with <SensorChart data={...} metric={metric} />
         using Recharts/Chart.js once dataset is implemented.
      ================================================================== */}
      <div className="mt-6 p-6 rounded-xl  bg-white shadow-sm flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg text-center">
          📊 {metric === "moisture" ? "Soil Moisture Chart" : "Temperature Chart"}
          <span className="block text-sm opacity-70">
            (chart renders here once data + logic added)
          </span>
        </p>
      </div>

    </section>
  );
}
