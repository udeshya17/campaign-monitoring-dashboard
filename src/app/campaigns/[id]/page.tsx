import { PageHeader } from "@/components/layout/PageHeader";
import { campaignService } from "@/services/campaign.service";
import { insightsService } from "@/services/insights.service";
import { LiveMetricsPanel } from "@/components/insights/LiveMetricsPanel";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MetricCard } from "@/components/common/MetricCard";
import { formatCurrency, formatNumber, formatPercent } from "@/utils/formatters";

export default async function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [campaignRes, insightsRes] = await Promise.all([
    campaignService.getById(params.id),
    insightsService.byCampaign(params.id),
  ]);

  const campaign = campaignRes.campaign;
  const insights = insightsRes.insights;

  return (
    <main className="space-y-6">
      <PageHeader
        title={campaign.name}
        subtitle={`Campaign ID: ${campaign.id} • Platform: ${(campaign.platforms ?? []).join(", ")}`}
        actions={<StatusBadge status={campaign.status} />}
      />

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold">Campaign Header</div>
        <div className="mt-3 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
          <div>
            <div className="text-xs text-slate-500">Budget</div>
            <div className="font-medium">{campaign.budget}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Daily Budget</div>
            <div className="font-medium">{campaign.daily_budget}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Created At</div>
            <div className="font-medium">{campaign.created_at}</div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-sm font-semibold">KPI Metrics</div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          <MetricCard label="Impressions" value={formatNumber(insights.impressions)} />
          <MetricCard label="Clicks" value={formatNumber(insights.clicks)} />
          <MetricCard label="Conversions" value={formatNumber(insights.conversions)} />
          <MetricCard label="Spend" value={formatCurrency(insights.spend)} />
          <MetricCard label="CTR" value={formatPercent(insights.ctr)} />
          <MetricCard label="CPC" value={formatCurrency(insights.cpc)} />
          <MetricCard
            label="Conversion Rate"
            value={formatPercent(insights.conversion_rate)}
          />
        </div>
      </section>

      <section>
        <LiveMetricsPanel campaignId={campaign.id} initial={insights} />
      </section>
    </main>
  );
}



