"use client";

export function LiveStatusIndicator({
  live,
  label,
}: {
  live: boolean;
  label?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 text-xs text-slate-600">
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          live ? "bg-emerald-500" : "bg-slate-300"
        }`}
      />
      <span>{label ?? (live ? "Live" : "Offline")}</span>
    </div>
  );
}


