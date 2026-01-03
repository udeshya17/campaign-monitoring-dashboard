"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/about", label: "Docs / About" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  return (
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
  );
}



