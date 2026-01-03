import { MetricCard } from "@/components/common/MetricCard";
import type { AggregateInsights } from "@/types/insights";
import { formatCurrency, formatNumber, formatPercent } from "@/utils/formatters";

export function KPIGrid({ insights }: { insights: AggregateInsights }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MetricCard label="Total Campaigns" value={formatNumber(insights.total_campaigns)} />
      <MetricCard label="Active / Paused / Completed" value={`${formatNumber(insights.active_campaigns)} / ${formatNumber(insights.paused_campaigns)} / ${formatNumber(insights.completed_campaigns)}`} />
      <MetricCard label="Total Impressions" value={formatNumber(insights.total_impressions)} />
      <MetricCard label="Total Clicks" value={formatNumber(insights.total_clicks)} />
      <MetricCard label="Total Conversions" value={formatNumber(insights.total_conversions)} />
      <MetricCard label="Total Spend" value={formatCurrency(insights.total_spend)} />
      <MetricCard label="Avg CTR" value={formatPercent(insights.avg_ctr)} />
      <MetricCard label="Avg CPC" value={formatCurrency(insights.avg_cpc)} />
      <MetricCard label="Avg Conversion Rate" value={formatPercent(insights.avg_conversion_rate)} />
    </div>
  );
}



