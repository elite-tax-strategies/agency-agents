"use client";

import { EngagementPhase, PHASES } from "@/lib/mock-data";

export function PhaseBarChart({ counts }: { counts: Record<EngagementPhase, number> }) {
  const max = Math.max(1, ...PHASES.map((p) => counts[p] ?? 0));

  return (
    <div className="space-y-2.5" role="img" aria-label="Engagement count by phase">
      {PHASES.map((phase) => {
        const count = counts[phase] ?? 0;
        const widthPct = (count / max) * 100;
        return (
          <div key={phase} className="group flex items-center gap-3 rounded-md px-1 py-1 hover:bg-surface-page">
            <span className="w-36 shrink-0 text-xs text-ink-secondary truncate">{phase}</span>
            <div className="flex-1 h-4 rounded bg-surface-page overflow-hidden">
              <div
                className="h-full rounded bg-accent transition-[width]"
                style={{ width: `${count === 0 ? 0 : Math.max(widthPct, 4)}%` }}
              />
            </div>
            <span
              className="w-6 shrink-0 text-right text-xs font-medium text-ink-primary"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
