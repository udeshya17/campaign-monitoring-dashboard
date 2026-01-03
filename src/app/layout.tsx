import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Campaign Monitoring Dashboard",
  description: "Dashboard for monitoring campaigns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-slate-50 text-slate-900">
        <div className="min-h-dvh md:flex">
          <Navbar />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <div className="text-sm font-semibold">Campaign Dashboard</div>
                <div className="text-xs text-slate-500">
                  Next.js + Tailwind + Recharts
                </div>
              </div>
            </header>
            <div className="mx-auto w-full max-w-6xl px-4 py-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

