"use client";

import type { AggregateInsights } from "@/types/insights";
import { PieChart } from "@/components/charts/PieChart";

export function CampaignStatusChart({ insights }: { insights: AggregateInsights }) {
  const data = [
    { name: "Active", value: insights.active_campaigns, color: "#10b981" },
    { name: "Paused", value: insights.paused_campaigns, color: "#f59e0b" },
    { name: "Completed", value: insights.completed_campaigns, color: "#64748b" },
  ];
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold">Campaign Status Breakdown</div>
      <div className="mt-1 text-xs text-slate-600">
        Active vs Paused vs Completed
      </div>
      <div className="mt-4">
        <PieChart data={data} />
      </div>
    </div>
  );
}



