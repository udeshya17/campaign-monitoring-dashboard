export default function LoadingCampaignDetail() {
  return (
    <main className="space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-80 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-64 animate-pulse rounded bg-slate-100" />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="h-12 animate-pulse rounded bg-slate-100" />
          <div className="h-12 animate-pulse rounded bg-slate-100" />
          <div className="h-12 animate-pulse rounded bg-slate-100" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl border border-slate-200 bg-white shadow-sm"
          />
        ))}
      </div>

      <div className="h-56 animate-pulse rounded-xl border border-slate-200 bg-white shadow-sm" />
    </main>
  );
}


