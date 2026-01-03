import type { GetCampaignResponse, GetCampaignsResponse } from "@/types/campaign";
import { apiFetch } from "./apiClient";

export const campaignService = {
  list: () => apiFetch<GetCampaignsResponse>("/campaigns"),
  getById: (id: string) =>
    apiFetch<GetCampaignResponse>(`/campaigns/${encodeURIComponent(id)}`),
};



