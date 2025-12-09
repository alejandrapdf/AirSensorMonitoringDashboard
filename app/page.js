"use client";

import MetricCard from "./components/MetricCard";
import Image from "next/image";
import Link from "next/link";


/**
 * Dashboard Home
 * Displays metric overview + sensor map + navigation link
 */
export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">

      {/* ========== METRIC OVERVIEW ========== */}
      <section>
        <h3 className="text-xl font-semibold mb-6">Metrics</h3>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <MetricCard label="Avg Soil Health" value="78%" />
          <MetricCard label="Sensors Online" value="24" />
          <MetricCard label="Critical Scouts" value="3" critical />
        </div>
      </section>


      {/* ========== SCOUT MAP ========== */}
      <section>
        <h3 className="text-xl font-semibold mb-6">Scout Map</h3>

        <div className="rounded-xl overflow-hidden shadow-md border">
          <Image src="/map.jpg" width={1000} height={500} alt="Sensor Map" className="object-cover w-full" />
        </div>
      </section>


      {/* ========== PAGE NAVIGATION CTA ========== */}
      <section>
        <Link href="/secondPage">
          <button className="px-5 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">
            Go to Second Page
          </button>
        </Link>
      </section>

    </div>
  );
}
