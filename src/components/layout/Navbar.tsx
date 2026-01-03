"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/about", label: "Docs / About" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="text-sm font-semibold">
            Campaign Dashboard
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-gradient-to-b from-slate-950 to-slate-900 p-4 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Campaign Dashboard</div>
                <div className="mt-1 text-xs text-white/70">
                  Monitoring & analytics
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
              >
                Close
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1">
              {navItems.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-2 text-sm transition ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 text-xs text-white/60">
              Rate limit: 10 req/min
            </div>
          </div>
        </div>
      ) : null}

      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-gradient-to-b from-slate-950 to-slate-900 text-white md:flex">
        <div className="px-5 py-5">
          <Link href="/dashboard" className="text-sm font-semibold tracking-wide">
            Campaign Dashboard
          </Link>
          <div className="mt-1 text-xs text-white/70">Monitoring & analytics</div>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-5 py-5 text-xs text-white/60">
          Rate limit: 10 req/min
        </div>
      </aside>
    </>
  );
}



