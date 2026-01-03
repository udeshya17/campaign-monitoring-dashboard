"use client";

import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type BarDatum = {
  name: string;
  value: number;
};

export function BarChart({
  data,
  color = "#3b82f6",
}: {
  data: BarDatum[];
  color?: string;
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}

