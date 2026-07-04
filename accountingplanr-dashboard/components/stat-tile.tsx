export function StatTile({
  label,
  value,
  sublabel,
  accent,
}: {
  label: string;
  value: string;
  sublabel?: string;
  accent?: "good" | "warning" | "critical" | "neutral";
}) {
  const accentColor =
    accent === "good"
      ? "var(--status-good-text)"
      : accent === "warning"
      ? "#8a5a00"
      : accent === "critical"
      ? "var(--status-critical)"
      : "var(--ink-primary)";

  return (
    <div className="rounded-lg border border-border-hairline bg-surface-card px-5 py-4">
      <p className="text-xs font-medium text-ink-muted uppercase tracking-wide">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold" style={{ color: accentColor, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </p>
      {sublabel && <p className="mt-1 text-xs text-ink-secondary">{sublabel}</p>}
    </div>
  );
}
