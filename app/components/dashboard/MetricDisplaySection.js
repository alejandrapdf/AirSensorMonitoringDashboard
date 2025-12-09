"use client";

/* =============================================================================
   MetricDisplaySection
   -----------------------------------------------------------------------------
   Presents sensor readings in a way optimised for fast human interpretation.

   Users can:
   • Read the latest recorded measurement immediately
   • Compare it against historic minimum & maximum values
   • Understand how the value has trended over time

   This component works with externally supplied data and can be connected to
   live streaming or API retrieval without requiring UI changes.
============================================================================= */

import MetricCard from "./MetricCard";
import { mockSensorData } from "@/lib/data/mockSensorData";
import { Line } from "react-chartjs-2";
import { useSensorData } from "../hooks/useSensorData";

// Chart.js modules (visual rendering pipeline)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

// Registered globally reduces repetition across components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);


export default function MetricDisplaySection({ metric }) {

  // Extract processed values & summary statistics via custom hook
  const { values, latest, min, max } = useSensorData(metric);

  // Formats timestamps into compact, human-readable dates for chart labels
  const formattedDates = mockSensorData.map(entry =>
    new Intl.DateTimeFormat("en-GB", {
      weekday: "short",   // Mon, Tue, Wed...
      day: "numeric",     // 1, 2, 3...
      month: "short"      // Jan, Feb, Mar...
    }).format(entry.time)
  );


  /* ---------------------------------------------------------------------------
     Chart Visualization Principles
     ---------------------------------------------------------------------------
     • A single line chart keeps the visual footprint clean and focused
     • Curved strokes (tension 0.35) make directional movement easy to track
     • Green palette communicates organic/biometric/environmental data
     • Visible points reassure users that each reading is discrete (not interpolated)
  --------------------------------------------------------------------------- */
  const chartData = {
    labels: formattedDates,
    datasets: [
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
      legend: { labels: { color: "#ddd" } }, // Soft legend contrast keeps attention on the line
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.raw}${metric === "moisture" ? "%" : "°C"}`
        }
      }
    },
    scales: {
      x: { ticks: { color: "#ccc" } },
      y: { ticks: { color: "#ccc" } }
    }
  };


  /* =============================================================================
     Layout & Visual Hierarchy
     -----------------------------------------------------------------------------
     1. Numeric summaries are placed before the chart — numbers are parsed faster
     2. Three-card layout provides balance and predictable reading rhythm
     3. The chart is visually segmented with a dark background + rounded container
     4. Generous spacing (gap-6) reduces cognitive load while scanning
============================================================================= */
  return (
    <section className="flex flex-col gap-6">

      {/* --- SUMMARY CARDS (highest-priority information) --- */}
      <div className="grid sm:grid-cols-3 gap-6 mt-3" data-cy="metric-cards">

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

      <h3 className="text-xl font-semibold mb-1 text-zinc-200">Trend</h3>


      {/* --- TIME-SERIES VISUALIZATION --- */}
      <div className="rounded-xl bg-[#2B2F31] shadow-lg h-[420px] p-2 sm:p-4 md:p-6 flex items-center justify-center">

        <Line
          data={chartData}
          options={{
            ...chartOptions,
            datasets: [
              {
                ...chartData.datasets[0],
                borderWidth: 4,      
                pointRadius: 7,     
                pointHoverRadius: 11,
                borderColor: "rgb(16,185,129)",
                backgroundColor: "rgba(16,185,129,0.22)"
              }
            ],
            scales: {
              x: {
                ticks: { color: "#E5E5E5", font: { size: 14 }},
                grid: { color: "rgba(255,255,255,0.05)" }
              },
              y: {
                ticks: { color: "#E5E5E5", font: { size: 14 }},
                grid: { color: "rgba(255,255,255,0.07)" },

                // Adding light padding above and below prevents the plotted line from
                // touching the edges of the chart. This makes the slope easier to read,
                // avoids perceived cutoffs, and keeps the chart visually breathable.
                suggestedMin: min - 2,
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
