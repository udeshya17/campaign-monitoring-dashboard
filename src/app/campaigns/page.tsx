import { PageHeader } from "@/components/layout/PageHeader";
import { campaignService } from "@/services/campaign.service";
import { CampaignsClient } from "./ui";
import { ApiError } from "@/services/apiClient";
import { BackendErrorPanel } from "@/components/common/BackendErrorPanel";

export default async function CampaignsPage() {
  try {
    const res = await campaignService.list();
    return (
      <main>
        <PageHeader
          title="Campaigns"
          subtitle="Search, filter, and inspect campaign details"
        />
        <div className="mt-6">
          <CampaignsClient initialCampaigns={res.campaigns} />
        </div>
      </main>
    );
  } catch (e) {
    const err = e instanceof ApiError ? e : null;
    return (
      <main>
        <PageHeader title="Campaigns" subtitle="Failed to load campaigns" />
        <div className="mt-6">
          <BackendErrorPanel
            error={
              err?.payload ?? {
                error: "Request failed",
                message: err?.message ?? "Unknown error",
                status: err?.status ?? 500,
                path: err?.path ?? "/campaigns",
                retry_after: err?.retryAfter,
              }
            }
          />
        </div>
      </main>
    );
  }
}



