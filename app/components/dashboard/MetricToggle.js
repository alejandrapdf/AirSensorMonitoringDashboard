"use client";

/* ============================================================================
   MetricToggle
   ---------------------------------------------------------------------------
   UI control for switching between two data views:
   › Soil Moisture  (%)  
   › Temperature    (°C)

   Why this matters:
   - Parent component owns state (useState in page.js)
   - This toggle *does not* store its own state — it triggers updates upwards
   - Ensures summary cards + chart both react to selection

   Behaviour:
   - Active selection highlights in brand green + elevated shadow
   - Inactive options use neutral grey with hover feedback
   - Fully keyboard accessible + screen-readable
============================================================================ */


export default function MetricToggle({ metric, setMetric }) {
  return (
    <div className="flex gap-3 mt-6">
      {["moisture", "temperature"].map(m => {
        const active = metric === m;

        return (
          <button
            key={m}
            onClick={() => setMetric(m)}
            className={`
              px-5 py-2 rounded-lg font-semibold transition
              border
              ${active
                ? "bg-[#2e2e2e] text-[#8FFFA2] border-[#72e06a] shadow-sm"  // MATCHES YOUR SIDEBAR
                : "bg-transparent text-gray-300 border-gray-500 hover:text-white hover:border-gray-300"
              }
            `}
          >
            {m === "moisture" ? "Soil Moisture" : "Temperature"}
          </button>
        );
      })}
    </div>
  );
}