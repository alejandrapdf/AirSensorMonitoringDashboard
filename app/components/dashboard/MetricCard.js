"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * KPI display card with dynamic status styling
 * More reusable + more scalable than previous raw CSS blocks
 */
export default function MetricCard({ label, value, critical }) {
  return (
    <Card
         className={`shadow-sm transition hover:shadow-md
      rounded-xl border border-[#444B4F]
      ${critical 
        ? "bg-[#3A2F31] text-red-400 border-red-500"   // critical stays highlighted
        : "bg-[#2B2F31] text-gray-200"                 // default grey theme
      }`}
    >
      <CardHeader>
        <CardTitle className="text-sm  text-muted-foreground tracking-tight">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-semibold leading-none">{value}</p>
      </CardContent>
    </Card>
  );
}
