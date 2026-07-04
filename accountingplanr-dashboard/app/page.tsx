import Link from "next/link";
import { CLIENTS, COMPLIANCE_DEADLINES, PHASES, getClientById } from "@/lib/mock-data";
import { getAgentBySlug } from "@/lib/agents";
import { StatTile } from "@/components/stat-tile";
import { StatusBadge, RiskBadge } from "@/components/status-badge";
import { PhaseBarChart } from "@/components/phase-bar-chart";

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(n: number) {
  if (n === 0) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function DashboardPage() {
  const atRiskOrBlocked = CLIENTS.filter((c) => c.status !== "On Track").length;
  const totalRevenue = CLIENTS.reduce((sum, c) => sum + c.annualRevenue, 0);
  const upcomingDeadlines = [...COMPLIANCE_DEADLINES].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const highRiskCount = COMPLIANCE_DEADLINES.filter((d) => d.riskFlag === "High").length;

  const phaseCounts = Object.fromEntries(PHASES.map((p) => [p, CLIENTS.filter((c) => c.phase === p).length])) as Record<
    (typeof PHASES)[number],
    number
  >;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-xl font-semibold text-ink-primary">Practice Dashboard</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Sample data — illustrates the roster, deadlines, and phase distribution a real practice-management
          data layer would populate.
        </p>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatTile label="Active Engagements" value={String(CLIENTS.length)} sublabel="across all phases" />
        <StatTile
          label="Needs Attention"
          value={String(atRiskOrBlocked)}
          sublabel="at risk or blocked"
          accent={atRiskOrBlocked > 0 ? "warning" : "good"}
        />
        <StatTile
          label="High-Risk Deadlines"
          value={String(highRiskCount)}
          sublabel="in the next 30 days"
          accent={highRiskCount > 0 ? "critical" : "good"}
        />
        <StatTile label="Revenue Under Management" value={formatCurrency(totalRevenue)} sublabel="annualized, active clients" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 rounded-lg border border-border-hairline bg-surface-card p-5">
          <h2 className="text-sm font-semibold text-ink-primary mb-4">Engagements by Phase</h2>
          <PhaseBarChart counts={phaseCounts} />
        </div>

        <div className="lg:col-span-3 rounded-lg border border-border-hairline bg-surface-card p-5">
          <h2 className="text-sm font-semibold text-ink-primary mb-4">Upcoming Filing Deadlines</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-muted uppercase tracking-wide border-b border-gridline">
                  <th className="pb-2 pr-3 font-medium">Client</th>
                  <th className="pb-2 pr-3 font-medium">Filing</th>
                  <th className="pb-2 pr-3 font-medium">Due</th>
                  <th className="pb-2 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody>
                {upcomingDeadlines.map((d) => {
                  const client = getClientById(d.clientId);
                  return (
                    <tr key={d.id} className="border-b border-gridline last:border-0">
                      <td className="py-2.5 pr-3 text-ink-primary font-medium">{client?.name ?? "—"}</td>
                      <td className="py-2.5 pr-3 text-ink-secondary">
                        {d.jurisdiction} · {d.filing}
                      </td>
                      <td className="py-2.5 pr-3 text-ink-secondary" style={{ fontVariantNumeric: "tabular-nums" }}>
                        {formatDate(d.dueDate)}
                      </td>
                      <td className="py-2.5">
                        <RiskBadge risk={d.riskFlag} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border-hairline bg-surface-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-ink-primary">Client Roster</h2>
          <Link href="/chat" className="text-xs font-medium text-accent hover:underline">
            Ask an agent about a client →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-ink-muted uppercase tracking-wide border-b border-gridline">
                <th className="pb-2 pr-3 font-medium">Client</th>
                <th className="pb-2 pr-3 font-medium">Entity Type</th>
                <th className="pb-2 pr-3 font-medium">Phase</th>
                <th className="pb-2 pr-3 font-medium">Status</th>
                <th className="pb-2 pr-3 font-medium">Owning Agent</th>
                <th className="pb-2 font-medium">Next Deadline</th>
              </tr>
            </thead>
            <tbody>
              {CLIENTS.map((client) => {
                const agent = getAgentBySlug(client.owningAgentSlug);
                return (
                  <tr key={client.id} className="border-b border-gridline last:border-0 align-top">
                    <td className="py-2.5 pr-3">
                      <p className="text-ink-primary font-medium">{client.name}</p>
                      <p className="text-xs text-ink-muted mt-0.5">{client.note}</p>
                    </td>
                    <td className="py-2.5 pr-3 text-ink-secondary whitespace-nowrap">{client.entityType}</td>
                    <td className="py-2.5 pr-3 text-ink-secondary whitespace-nowrap">{client.phase}</td>
                    <td className="py-2.5 pr-3">
                      <StatusBadge status={client.status} />
                    </td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">
                      {agent && (
                        <Link href={`/chat?agent=${agent.slug}`} className="text-ink-secondary hover:text-accent">
                          {agent.emoji} {agent.personaName}
                        </Link>
                      )}
                    </td>
                    <td className="py-2.5 whitespace-nowrap">
                      <p className="text-ink-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                        {formatDate(client.nextDeadline)}
                      </p>
                      <p className="text-xs text-ink-muted">{client.nextDeadlineLabel}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
