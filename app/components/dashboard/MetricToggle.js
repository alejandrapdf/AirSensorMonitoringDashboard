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

      {/* Two buttons generated dynamically */}
      {["moisture", "temperature"].map(option => (
        <button
          key={option}
          onClick={() => setMetric(option)}         // Lift state update to parent

          /* Tailwind styling: active = green highlight, inactive = grey base */
          className={`
            px-4 py-2 rounded-md font-semibold transition
            ${metric === option 
              ? "bg-[var(--green)] text-white shadow"   // Selected state
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"}  // Unselected
          `}
        >
          {/* Label transforms internal values into human-readable names */}
          {option === "moisture" ? "Soil Moisture" : "Temperature"}
        </button>
      ))}
    </div>
  );
}
