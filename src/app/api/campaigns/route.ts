import { envServer } from "@/config/env.server";
import type { GetCampaignsResponse } from "@/types/campaign";

type SortKey = "name" | "status" | "budget" | "daily_budget" | "created_at";
type SortDir = "asc" | "desc";

let cache:
  | { ts: number; data: GetCampaignsResponse }
  | null = null;

const CACHE_TTL_MS = 15_000;

function sortValue(c: GetCampaignsResponse["campaigns"][number], key: SortKey) {
  switch (key) {
    case "budget":
      return c.budget;
    case "daily_budget":
      return c.daily_budget;
    case "created_at":
      return c.created_at;
    case "status":
      return c.status;
    case "name":
    default:
      return c.name;
  }
}

async function getCampaigns(): Promise<{
  res: GetCampaignsResponse;
  cacheHit: boolean;
}> {
  const now = Date.now();
  if (cache && now - cache.ts < CACHE_TTL_MS) {
    return { res: cache.data, cacheHit: true };
  }

  const url = `${envServer.API_BASE_URL}/campaigns`;
  const r = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!r.ok) {
    const text = await r.text();
    let payload: unknown = text;
    try {
      payload = JSON.parse(text) as unknown;
    } catch {
      // leave payload as raw text
    }
    return Response.json(payload, { status: r.status }) as never;
  }

  const json = (await r.json()) as GetCampaignsResponse;
  cache = { ts: now, data: json };
  return { res: json, cacheHit: false };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const status = searchParams.get("status") ?? "all";
  const platform = searchParams.get("platform") ?? "all";
  const sortKey = (searchParams.get("sortKey") ?? "created_at") as SortKey;
  const sortDir = (searchParams.get("sortDir") ?? "desc") as SortDir;

  const { res, cacheHit } = await getCampaigns();

  let campaigns = res.campaigns ?? [];

  if (q) campaigns = campaigns.filter((c) => c.name.toLowerCase().includes(q));
  if (status !== "all") campaigns = campaigns.filter((c) => c.status === status);
  if (platform !== "all")
    campaigns = campaigns.filter((c) => c.platforms?.includes(platform));

  campaigns = [...campaigns].sort((a, b) => {
    const av = sortValue(a, sortKey);
    const bv = sortValue(b, sortKey);
    const cmp =
      typeof av === "number" && typeof bv === "number"
        ? av - bv
        : String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  return Response.json(
    { campaigns, total: campaigns.length },
    { headers: { "x-cache": cacheHit ? "hit" : "miss" } },
  );
}


