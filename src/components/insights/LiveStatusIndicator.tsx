"use client";

export function LiveStatusIndicator({
  live,
  connecting,
  label,
}: {
  live: boolean;
  connecting?: boolean;
  label?: string;
}) {
  const stateLabel = label ?? (connecting ? "Connecting" : live ? "Live" : "Offline");
  return (
    <div className="inline-flex items-center gap-2 text-xs text-slate-600">
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          connecting ? "bg-amber-400" : live ? "bg-emerald-500" : "bg-slate-300"
        }`}
      />
      <span>{stateLabel}</span>
    </div>
  );
}


