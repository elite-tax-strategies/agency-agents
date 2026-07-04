import { EngagementStatus } from "@/lib/mock-data";

const STATUS_CONFIG: Record<EngagementStatus, { color: string; bg: string; icon: string }> = {
  "On Track": { color: "var(--status-good-text)", bg: "color-mix(in srgb, var(--status-good) 14%, transparent)", icon: "●" },
  "At Risk": { color: "#8a5a00", bg: "color-mix(in srgb, var(--status-warning) 22%, transparent)", icon: "▲" },
  Blocked: { color: "var(--status-critical)", bg: "color-mix(in srgb, var(--status-critical) 14%, transparent)", icon: "■" },
};

export function StatusBadge({ status }: { status: EngagementStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      <span aria-hidden style={{ fontSize: "0.55rem" }}>
        {config.icon}
      </span>
      {status}
    </span>
  );
}

const RISK_CONFIG: Record<"Low" | "Medium" | "High", { color: string; bg: string; icon: string }> = {
  Low: { color: "var(--status-good-text)", bg: "color-mix(in srgb, var(--status-good) 14%, transparent)", icon: "●" },
  Medium: { color: "#8a5a00", bg: "color-mix(in srgb, var(--status-warning) 22%, transparent)", icon: "▲" },
  High: { color: "var(--status-critical)", bg: "color-mix(in srgb, var(--status-critical) 14%, transparent)", icon: "■" },
};

export function RiskBadge({ risk }: { risk: "Low" | "Medium" | "High" }) {
  const config = RISK_CONFIG[risk];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      <span aria-hidden style={{ fontSize: "0.55rem" }}>
        {config.icon}
      </span>
      {risk} risk
    </span>
  );
}
