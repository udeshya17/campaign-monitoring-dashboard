import Link from "next/link";
import { RefreshButton } from "@/components/common/RefreshButton";
import { DateTimeText } from "@/components/common/DateTimeText";

export function OverviewActions({ lastUpdated }: { lastUpdated: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold">Quick Actions</div>
      <div className="mt-1 text-xs text-slate-600">Control refresh & navigation</div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link
          href="/campaigns"
          className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
        >
          View All Campaigns
        </Link>
        <RefreshButton />
        <div className="ml-auto text-xs text-slate-600">
          Last updated:{" "}
          <span className="font-medium">
            <DateTimeText iso={lastUpdated} />
          </span>
        </div>
      </div>
    </div>
  );
}



