"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Campaign } from "@/types/campaign";
import type { CampaignStatus } from "@/types/common";
import { StatusBadge } from "@/components/common/StatusBadge";

type SortKey = "name" | "status" | "budget" | "daily_budget" | "created_at";
type SortDir = "asc" | "desc";

function sortValue(c: Campaign, key: SortKey): string | number {
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

export function CampaignsClient({
  initialCampaigns,
}: {
  initialCampaigns: Campaign[];
}) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<CampaignStatus | "all">("all");
  const [platform, setPlatform] = useState<string | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const platforms = useMemo(() => {
    const set = new Set<string>();
    initialCampaigns.forEach((c) => (c.platforms ?? []).forEach((p) => set.add(p)));
    return Array.from(set).sort();
  }, [initialCampaigns]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return initialCampaigns
      .filter((c) => (qq ? c.name.toLowerCase().includes(qq) : true))
      .filter((c) => (status === "all" ? true : c.status === status))
      .filter((c) => (platform === "all" ? true : c.platforms?.includes(platform)));
  }, [initialCampaigns, q, status, platform]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = sortValue(a, sortKey);
      const bv = sortValue(b, sortKey);
      const res =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? res : -res;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <div className="md:col-span-1">
          <label className="text-xs font-medium text-slate-600">Search</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by campaign name…"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as CampaignStatus | "all")}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3 flex flex-wrap items-center gap-2">
          <label className="text-xs font-medium text-slate-600">Sort</label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="created_at">Created At</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
            <option value="budget">Budget</option>
            <option value="daily_budget">Daily Budget</option>
          </select>
          <button
            type="button"
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
          >
            {sortDir === "asc" ? "Asc" : "Desc"}
          </button>
          <div className="ml-auto text-xs text-slate-600">
            Showing <span className="font-medium">{sorted.length}</span> results
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-600">
            <tr>
              <th className="px-4 py-3">Campaign Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Platform(s)</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3">Daily Budget</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-600" colSpan={7}>
                  No campaigns match your filters.
                </td>
              </tr>
            ) : (
              sorted.map((c) => (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {(c.platforms ?? []).join(", ")}
                  </td>
                  <td className="px-4 py-3">{c.budget}</td>
                  <td className="px-4 py-3">{c.daily_budget}</td>
                  <td className="px-4 py-3 text-slate-600">{c.created_at}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/campaigns/${c.id}`}
                      className="rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800"
                    >
                      View Insights
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


