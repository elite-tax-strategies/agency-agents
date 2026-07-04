"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/chat", label: "Chat", icon: "💬" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-border-hairline bg-surface-card flex flex-col">
      <div className="px-5 py-5 border-b border-border-hairline">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧭</span>
          <div>
            <p className="font-semibold text-ink-primary leading-tight">AccountingPlanr</p>
            <p className="text-xs text-ink-muted leading-tight">Practice operations system</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent/10 text-accent"
                  : "text-ink-secondary hover:bg-surface-page hover:text-ink-primary"
              }`}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-border-hairline">
        <p className="text-xs text-ink-muted leading-snug">
          11 specialist agents · Demo data shown throughout
        </p>
      </div>
    </aside>
  );
}
