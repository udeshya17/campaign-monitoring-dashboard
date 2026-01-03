import type { CampaignStatus, Platform } from "./common";

export type Campaign = {
  id: string;
  name: string;
  brand_id: string;
  status: CampaignStatus;
  budget: number;
  daily_budget: number;
  platforms: Platform[];
  created_at: string; // ISO date string
};

export type GetCampaignsResponse = {
  campaigns: Campaign[];
  total: number;
};

export type GetCampaignResponse = {
  campaign: Campaign;
};



