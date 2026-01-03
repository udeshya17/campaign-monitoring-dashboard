import { PageHeader } from "@/components/layout/PageHeader";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3 text-sm text-slate-700">{children}</div>
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-slate-100 px-1">{children}</code>;
}

export default function AboutPage() {
  return (
    <main className="space-y-6">
      <PageHeader
        title="Docs / About"
        subtitle="Architecture, data flow, and implementation notes (interview-friendly)"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Tech Stack">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <b>Framework</b>: Next.js (App Router)
            </li>
            <li>
              <b>Language</b>: TypeScript
            </li>
            <li>
              <b>Styling</b>: Tailwind CSS
            </li>
            <li>
              <b>Charts</b>: Recharts
            </li>
            <li>
              <b>Real-time</b>: SSE (EventSource)
            </li>
            <li>
              <b>Deployment</b>: Vercel
            </li>
          </ul>
        </Card>

        <Card title="Pages">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <Code>/dashboard</Code>: aggregate KPIs + charts (status + platform)
            </li>
            <li>
              <Code>/campaigns</Code>: list + API-backed search/filter/sort
            </li>
            <li>
              <Code>/campaigns/[id]</Code>: details + KPIs + real-time panel (SSE)
            </li>
          </ul>
        </Card>
      </div>

      <Card title="Backend API (what we call)">
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-left text-sm">
            <thead className="text-xs text-slate-600">
              <tr>
                <th className="py-2 pr-3">Endpoint</th>
                <th className="py-2 pr-3">Used for</th>
                <th className="py-2 pr-3">Notes</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-t border-slate-100">
                <td className="py-2 pr-3">
                  <Code>GET /campaigns</Code>
                </td>
                <td className="py-2 pr-3">Campaign list + platform breakdown</td>
                <td className="py-2 pr-3">
                  Also powers API-backed search/filter via <Code>/api/campaigns</Code>
                </td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="py-2 pr-3">
                  <Code>GET /campaigns/insights</Code>
                </td>
                <td className="py-2 pr-3">Overview KPIs</td>
                <td className="py-2 pr-3">Used on <Code>/dashboard</Code></td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="py-2 pr-3">
                  <Code>GET /campaigns/&lt;id&gt;</Code>
                </td>
                <td className="py-2 pr-3">Campaign detail header</td>
                <td className="py-2 pr-3">Used on <Code>/campaigns/[id]</Code></td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="py-2 pr-3">
                  <Code>GET /campaigns/&lt;id&gt;/insights</Code>
                </td>
                <td className="py-2 pr-3">Campaign KPI metrics</td>
                <td className="py-2 pr-3">Used on <Code>/campaigns/[id]</Code></td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="py-2 pr-3">
                  <Code>GET /campaigns/&lt;id&gt;/insights/stream</Code>
                </td>
                <td className="py-2 pr-3">Real-time updates</td>
                <td className="py-2 pr-3">SSE via <Code>EventSource</Code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Rate limiting & refresh strategy">
          <ul className="list-disc space-y-1 pl-5">
            <li>Backend rate limit is low (10 requests/min).</li>
            <li>
              Overview uses server-side fetch and a manual <b>Refresh</b> button.
            </li>
            <li>
              Campaign search/filter hits <Code>/api/campaigns</Code> with a debounce
              and short cache to reduce backend calls.
            </li>
          </ul>
        </Card>

        <Card title="Real-time (SSE) behavior">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              The campaign detail page opens an SSE stream and shows a <b>LIVE</b>{" "}
              badge when connected.
            </li>
            <li>
              Auto-reconnect is handled by <Code>EventSource</Code>; UI shows{" "}
              <b>Connecting…</b> during manual reconnect.
            </li>
          </ul>
        </Card>
      </div>

      <Card title="Environment variables">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Server-side fetches: <Code>API_BASE_URL</Code>
          </li>
          <li>
            Browser (SSE): <Code>NEXT_PUBLIC_API_BASE_URL</Code>
          </li>
        </ul>
        <div className="mt-3 text-xs text-slate-600">
          Tip: keep them the same base URL in local dev.
        </div>
      </Card>
    </main>
  );
}


