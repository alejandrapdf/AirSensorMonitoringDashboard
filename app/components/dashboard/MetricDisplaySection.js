"use client";

/* =============================================================================
   MetricDisplaySection (UI & UX rationale)
   -----------------------------------------------------------------------------
   This component presents sensor readings in a format suited for quick monitoring.
   The UI is intentionally structured so a user can:

   • Immediately see the latest reading in a large, high-contrast card (high priority)
   • Compare that reading against minimum + maximum values from the dataset
   • Visually observe how values trend over time via a line chart

   Data is mocked locally per assignment requirements — but UI is designed so a
   live API feed can replace mock data later without redesign.
============================================================================= */

import MetricCard from "./MetricCard";
import { mockSensorData } from "@/lib/mockSensorData";
import { Line } from "react-chartjs-2";
import { useSensorData } from "../hooks/useSensorData";

// Chart.js modules (visual output layer)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

// Registered once globally → keeps component clean
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);


export default function MetricDisplaySection({ metric }) {

 
//"Custom Hook" requirement
const { values, latest, min, max } = useSensorData(metric);


  const formattedDates = mockSensorData.map(entry =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",   // Mon, Tue, Wed
    day: "numeric",     // 1, 2, 3
    month: "short"      // Jan, Feb, Mar
  }).format(entry.time)
);



  /* ---------------------------------------------------------------------------
     CHART UI DESIGN DECISIONS:
     • Single line graph -> reduces visual noise, follows requirement scope
     • Smooth curves (tension: 0.35) make trend easier to visually follow
     • Green theme communicates "environmental metric" subconsciously
     • Dots enabled so each reading is visually discrete → reinforces time-series data

     This visualization complements summary cards by answering: "How are values trending?"
  --------------------------------------------------------------------------- */
  const chartData = {
    labels: formattedDates, datasets: [
      {
        label: metric === "moisture" ? "Soil Moisture (%)" : "Temperature (°C)",
        data: values,
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.4)",
        tension: 0.35,
        pointRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#ddd" } }, // Low-contrast legend so the line stays dominant
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.raw}${metric === "moisture" ? "%" : "°C"}`
        }
      }
    },
    scales: {
      // Muted axis ticks keep attention on the trend line instead of grid
      x: { ticks: { color: "#ccc" } },
      y: { ticks: { color: "#ccc" } }
    }
  };


  /* =============================================================================
     UI Layout Summary
     -----------------------------------------------------------------------------
     - Metric summary cards appear ABOVE the chart because humans scan numbers first
     - Three-card grid → balanced layout, symmetric, digestible
     - Chart sits in a dark rounded container, giving clear visual separation
     - Component spacing (gap-6) increases readability and reduces cognitive load
============================================================================= */
  return (
    <section className="flex flex-col gap-6">

      {/* ========= SUMMARY CARDS ========= */}
      <div className="grid sm:grid-cols-3 gap-6 mt-3 ">
        <MetricCard
          label={`Latest ${metric === "moisture" ? "Soil Moisture" : "Temperature"}`}
          value={`${latest}${metric === "moisture" ? "%" : "°C"}`}
        />
        <MetricCard
          label="Minimum"
          value={`${min}${metric === "moisture" ? "%" : "°C"}`}
        />
        <MetricCard
          label="Maximum"
          value={`${max}${metric === "moisture" ? "%" : "°C"}`}
        />
      </div>
  <h3 className="text-xl font-semibold mb-1 text-zinc-200">
  Trend
</h3>
      {/* ========= TIME-SERIES TREND CHART ========= */}
 <div className="rounded-xl bg-[#2B2F31] shadow-lg h-[420px] p-2 sm:p-4 md:p-6 flex items-center justify-center">

  <Line
    data={chartData}
    options={{
      ...chartOptions,
      datasets: [
        {
          ...chartData.datasets[0],
          borderWidth: 4,           // THICKER = visually confident
          pointRadius: 7,           // Each data point stands strong
          pointHoverRadius: 11,
          borderColor: "rgb(16,185,129)",  // brighter green (more alive)
          backgroundColor: "rgba(16,185,129,0.22)",
        }
      ],
      scales: {
        x: {
          ticks: { color: "#E5E5E5", font: { size: 14 } },
          grid: { color: "rgba(255,255,255,0.05)" }
        },
        y: {
          ticks: { color: "#E5E5E5", font: { size: 14 } },
          grid: { color: "rgba(255,255,255,0.07)" },
          suggestedMin: min - 2,      // Makes chart breathe vertically
          suggestedMax: max + 2
        }
      },
      plugins: {
        legend: {
          labels: {
            color: "#fff",
            padding: 20,
            font: { weight: "bold", size: 14 }
          }
        }
      }
    }}
  />
</div>
    </section>
  );
}
