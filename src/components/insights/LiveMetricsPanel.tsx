"use client";

import { envClient } from "@/config/env.client";
import type { CampaignInsights } from "@/types/insights";
import { formatCurrency, formatNumber, formatPercent } from "@/utils/formatters";
import { useLiveCampaignInsights } from "@/hooks/useLiveCampaignInsights";
import { LiveStatusIndicator } from "./LiveStatusIndicator";
import { Button } from "@/components/common/Button";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-xs text-slate-600">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

export function LiveMetricsPanel({
  campaignId,
  initial,
}: {
  campaignId: string;
  initial: CampaignInsights;
}) {
  const base = envClient.NEXT_PUBLIC_API_BASE_URL || "";
  const url = base
    ? `${base}/campaigns/${encodeURIComponent(campaignId)}/insights/stream`
    : null;

  const { live, data, error, lastUpdated, connect } = useLiveCampaignInsights({
    url,
    autoConnect: true,
  });

  const d = data ?? initial;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Real-Time Metrics (SSE)</div>
          <div className="mt-1 flex items-center gap-3">
            <LiveStatusIndicator live={live} />
            <div className="text-xs text-slate-600">
              Last updated:{" "}
              <span className="font-medium">{lastUpdated ?? d.timestamp}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" onClick={() => connect()}>
            Reconnect
          </Button>
        </div>
      </div>

      {error ? <div className="mt-3 text-xs text-amber-700">{error}</div> : null}

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Metric label="Impressions" value={formatNumber(d.impressions)} />
        <Metric label="Clicks" value={formatNumber(d.clicks)} />
        <Metric label="Conversions" value={formatNumber(d.conversions)} />
        <Metric label="Spend" value={formatCurrency(d.spend)} />
        <Metric label="CTR" value={formatPercent(d.ctr)} />
        <Metric label="CPC" value={formatCurrency(d.cpc)} />
        <Metric label="Conv. Rate" value={formatPercent(d.conversion_rate)} />
      </div>
    </div>
  );
}


