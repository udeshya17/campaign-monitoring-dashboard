import type { CampaignStatus } from "@/types/common";

const styles: Record<CampaignStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-slate-50 text-slate-700 border-slate-200",
};

export function StatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}



