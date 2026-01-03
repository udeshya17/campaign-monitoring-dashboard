export type AggregateInsights = {
  timestamp: string; // ISO date string
  total_campaigns: number;
  active_campaigns: number;
  paused_campaigns: number;
  completed_campaigns: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_spend: number;
  avg_ctr: number;
  avg_cpc: number;
  avg_conversion_rate: number;
};

export type GetCampaignsInsightsResponse = {
  insights: AggregateInsights;
};

export type CampaignInsights = {
  campaign_id: string;
  timestamp: string; // ISO date string
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
};

export type GetCampaignInsightsResponse = {
  insights: CampaignInsights;
};



