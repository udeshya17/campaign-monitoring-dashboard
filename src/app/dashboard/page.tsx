import { insightsService } from "@/services/insights.service";
import { ApiError } from "@/services/apiClient";
import { PageHeader } from "@/components/layout/PageHeader";
import { KPIGrid } from "@/components/dashboard/KPIGrid";
import { CampaignStatusChart } from "@/components/dashboard/CampaignStatusChart";
import { OverviewActions } from "@/components/dashboard/OverviewActions";
import { ErrorState } from "@/components/common/ErrorState";
import { campaignService } from "@/services/campaign.service";
import { BarChart } from "@/components/charts/BarChart";

export default async function DashboardPage() {
  let errorMessage: string | null = null;
  let insights: Awaited<ReturnType<typeof insightsService.aggregate>>["insights"] | null =
    null;
  let platforms: Record<string, number> = {};

  try {
    const [insRes, campaignsRes] = await Promise.all([
      insightsService.aggregate(),
      campaignService.list(),
    ]);
    insights = insRes.insights;
    platforms = campaignsRes.campaigns.reduce<Record<string, number>>((acc, c) => {
      (c.platforms ?? []).forEach((p) => {
        acc[p] = (acc[p] ?? 0) + 1;
      });
      return acc;
    }, {});
  } catch (err) {
    errorMessage =
      err instanceof ApiError
        ? `${err.message}${
            err.status === 429 && err.retryAfter
              ? ` (retry after ${err.retryAfter}s)`
              : ""
          }`
        : err instanceof Error
          ? err.message
          : "Unknown error";
  }

  return (
    <main>
      <PageHeader
        title="Overview"
        subtitle="High-level campaign performance & health"
      />

      <div className="mt-6 space-y-6">
        {errorMessage ? (
          <ErrorState message={errorMessage} />
        ) : insights ? (
          <>
            <section>
              <div className="text-sm font-semibold">KPI Summary</div>
              <div className="mt-3">
                <KPIGrid insights={insights} />
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <CampaignStatusChart insights={insights} />
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-sm font-semibold">Platform Breakdown</div>
                <div className="mt-1 text-xs text-slate-600">
                  Count of campaigns per platform (from <code>/campaigns</code>)
                </div>
                <div className="mt-4">
                  <BarChart
                    data={Object.entries(platforms)
                      .map(([name, value]) => ({ name, value }))
                      .sort((a, b) => b.value - a.value)}
                    color="#6366f1"
                  />
                </div>
              </div>
            </section>

            <section>
              <OverviewActions lastUpdated={insights.timestamp} />
            </section>
          </>
        ) : (
          <ErrorState message="No insights available." />
        )}
      </div>
    </main>
  );
}



