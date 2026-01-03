"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export type PieDatum = {
  name: string;
  value: number;
  color?: string;
};

export function PieChart({ data }: { data: PieDatum[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Tooltip />
          <Legend />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
          >
            {data.map((entry, idx) => (
              <Cell
                key={`${entry.name}-${idx}`}
                fill={entry.color ?? "#94a3b8"}
              />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
}


