"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * KPI display card with dynamic status styling
 * More reusable + more scalable than previous raw CSS blocks
 */
export default function MetricCard({ label, value, critical }) {
  return (
    <Card
      className={`shadow-sm transition hover:shadow-md border-none ${
        critical ? "border-red-400 bg-red-50 text-red-700" : "bg-white"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground tracking-tight">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-semibold leading-none">{value}</p>
      </CardContent>
    </Card>
  );
}
