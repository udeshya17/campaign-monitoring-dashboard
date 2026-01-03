export default function AboutPage() {
  return (
    <main>
      <h1 className="text-xl font-semibold">Docs / About</h1>
      <p className="mt-2 text-sm text-slate-600">
        Backend base URL is configured via <code className="rounded bg-slate-100 px-1">API_BASE_URL</code>{" "}
        (server) and <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_API_BASE_URL</code>{" "}
        (browser).
      </p>
      <div className="mt-4 space-y-2 text-sm text-slate-700">
        <p>
          The API enforces a small rate limit (10 requests/min). The dashboard
          prefers server-side fetches and a manual refresh button to avoid extra
          calls.
        </p>
        <p>
          Real-time metrics use SSE (<code className="rounded bg-slate-100 px-1">EventSource</code>)
          on the campaign detail page. It auto-reconnects if the connection drops.
        </p>
      </div>
    </main>
  );
}


