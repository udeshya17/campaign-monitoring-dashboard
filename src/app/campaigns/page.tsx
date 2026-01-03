import { PageHeader } from "@/components/layout/PageHeader";
import { campaignService } from "@/services/campaign.service";
import { CampaignsClient } from "./ui";

export default async function CampaignsPage() {
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
}



