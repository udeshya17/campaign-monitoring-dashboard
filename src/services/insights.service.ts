import type {
  GetCampaignInsightsResponse,
  GetCampaignsInsightsResponse,
} from "@/types/insights";
import { apiFetch } from "./apiClient";

export const insightsService = {
  aggregate: () => apiFetch<GetCampaignsInsightsResponse>("/campaigns/insights"),
  byCampaign: (id: string) =>
    apiFetch<GetCampaignInsightsResponse>(
      `/campaigns/${encodeURIComponent(id)}/insights`,
    ),
};



