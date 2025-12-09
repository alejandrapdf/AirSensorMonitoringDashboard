"use client";

export default function MetricToggle({ metric, setMetric }) {
  return (
    <div className="flex gap-3 mt-6">
      {["moisture", "temperature"].map(m => (
        <button
          key={m}
          onClick={() => setMetric(m)}
          className={`
            px-4 py-2 rounded-md font-semibold transition
            ${metric === m 
              ? "bg-[var(--green)] text-white shadow" 
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"}
          `}
        >
          {m === "moisture" ? "Soil Moisture" : "Temperature"}
        </button>
      ))}
    </div>
  );
}
