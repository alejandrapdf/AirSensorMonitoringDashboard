import { useState, useEffect } from "react";
import { mockSensorData } from "@/lib/mockSensorData";

// Custom Hook handling extraction + summary calculations
export function useSensorData(metric) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const extracted = mockSensorData.map(d =>
      metric === "moisture" ? d.moisture : d.temp
    );
    setValues(extracted);
  }, [metric]);

  return {
    values,
    latest: values.at(-1),
    min: Math.min(...values),
    max: Math.max(...values),
    timestamps: mockSensorData.map(d => d.time)
  };
}
