"use client";

import MetricCard from "./MetricCard";


export default function MetricDisplaySection({ metric, setMetric }) {
  return (
    <section className="flex flex-col gap-6">

      

      {/* Summary Boxes — UI only, no data yet */}
      <div className="grid sm:grid-cols-3 gap-6 mt-3">

        <MetricCard label={`Latest ${metric === "moisture" ? "Soil Moisture" : "Temperature"}`} value="--" />
        <MetricCard label="Minimum" value="--" />
        <MetricCard label="Maximum" value="--" />

      </div>

      {/* Chart Area */}
      <div className="mt-6 p-6 rounded-xl border bg-white shadow-sm flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">
          📊 {metric === "moisture" ? "Soil Moisture Chart" : "Temperature Chart"}  
          <span className="block text-sm opacity-70">(awaiting data + chart setup)</span>
        </p>
      </div>

    </section>
  );
}
