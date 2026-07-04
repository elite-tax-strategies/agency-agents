export type EngagementPhase =
  | "Intake"
  | "Entity Structuring"
  | "Bookkeeping"
  | "Tax Planning"
  | "Payroll Setup"
  | "Compliance Tracking"
  | "Client Reporting";

export type EngagementStatus = "On Track" | "At Risk" | "Blocked";

export interface Client {
  id: string;
  name: string;
  entityType: string;
  phase: EngagementPhase;
  status: EngagementStatus;
  owningAgentSlug: string;
  nextDeadline: string; // ISO date
  nextDeadlineLabel: string;
  annualRevenue: number;
  note: string;
}

// Sample/demo data — not real clients. Illustrates the shape a real
// practice-management data layer would populate.
export const CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Riverbend Bakery LLC",
    entityType: "S-Corp (elected)",
    phase: "Payroll Setup",
    status: "On Track",
    owningAgentSlug: "payroll-administrator",
    nextDeadline: "2026-07-15",
    nextDeadlineLabel: "Q2 Form 941 deposit",
    annualRevenue: 220000,
    note: "S-corp election implemented; owner payroll going live this month.",
  },
  {
    id: "c2",
    name: "Harbor Line Consulting",
    entityType: "Single-Member LLC",
    phase: "Entity Structuring",
    status: "At Risk",
    owningAgentSlug: "entity-structuring",
    nextDeadline: "2026-07-10",
    nextDeadlineLabel: "Form 2553 election window closes",
    annualRevenue: 310000,
    note: "Reasonable comp figure still needs client sign-off before election is filed.",
  },
  {
    id: "c3",
    name: "Solace Wellness Studio",
    entityType: "Partnership",
    phase: "Bookkeeping",
    status: "On Track",
    owningAgentSlug: "bookkeeper-controller",
    nextDeadline: "2026-07-08",
    nextDeadlineLabel: "June close delivery",
    annualRevenue: 145000,
    note: "Monthly close running on schedule for 4 consecutive months.",
  },
  {
    id: "c4",
    name: "Vantage Point Realty Holdings",
    entityType: "Multi-Entity (LLC + S-Corp)",
    phase: "Tax Planning",
    status: "On Track",
    owningAgentSlug: "tax-strategist",
    nextDeadline: "2026-09-15",
    nextDeadlineLabel: "1120-S extended deadline",
    annualRevenue: 890000,
    note: "Cost segregation study in progress alongside multi-entity structure review.",
  },
  {
    id: "c5",
    name: "Cobalt Robotics Inc.",
    entityType: "C-Corp",
    phase: "Compliance Tracking",
    status: "Blocked",
    owningAgentSlug: "compliance-calendar",
    nextDeadline: "2026-07-05",
    nextDeadlineLabel: "DE franchise tax report",
    annualRevenue: 1250000,
    note: "Awaiting registered agent confirmation before filing; escalated to owner.",
  },
  {
    id: "c6",
    name: "Marlowe & Fitch Design Co.",
    entityType: "Partnership",
    phase: "Client Reporting",
    status: "On Track",
    owningAgentSlug: "client-reporting",
    nextDeadline: "2026-07-20",
    nextDeadlineLabel: "Q2 business review meeting",
    annualRevenue: 410000,
    note: "Quarterly review deck drafted; awaiting final revenue numbers from close.",
  },
  {
    id: "c7",
    name: "Pinehollow Family Trust",
    entityType: "Trust",
    phase: "Intake",
    status: "On Track",
    owningAgentSlug: "client-intake",
    nextDeadline: "2026-07-12",
    nextDeadlineLabel: "Engagement letter signature",
    annualRevenue: 0,
    note: "Independence screening cleared; fee proposal sent.",
  },
  {
    id: "c8",
    name: "Nimbus Freight Brokers LLC",
    entityType: "Single-Member LLC",
    phase: "Entity Structuring",
    status: "At Risk",
    owningAgentSlug: "entity-structuring",
    nextDeadline: "2026-07-18",
    nextDeadlineLabel: "Reasonable comp benchmarking due",
    annualRevenue: 265000,
    note: "Profit grew faster than expected — re-running the S-corp comparison at new numbers.",
  },
];

export interface ComplianceDeadline {
  id: string;
  clientId: string;
  jurisdiction: string;
  filing: string;
  dueDate: string; // ISO date
  riskFlag: "Low" | "Medium" | "High";
}

export const COMPLIANCE_DEADLINES: ComplianceDeadline[] = [
  { id: "d1", clientId: "c5", jurisdiction: "Delaware", filing: "Annual Franchise Tax Report", dueDate: "2026-07-05", riskFlag: "High" },
  { id: "d2", clientId: "c2", jurisdiction: "Federal", filing: "Form 2553 (S-corp election)", dueDate: "2026-07-10", riskFlag: "High" },
  { id: "d3", clientId: "c7", jurisdiction: "Firm", filing: "Engagement letter signature", dueDate: "2026-07-12", riskFlag: "Medium" },
  { id: "d4", clientId: "c1", jurisdiction: "Federal", filing: "Form 941 (Q2 payroll tax deposit)", dueDate: "2026-07-15", riskFlag: "Medium" },
  { id: "d5", clientId: "c8", jurisdiction: "Firm", filing: "Reasonable comp benchmarking", dueDate: "2026-07-18", riskFlag: "Low" },
  { id: "d6", clientId: "c6", jurisdiction: "Firm", filing: "Q2 business review meeting", dueDate: "2026-07-20", riskFlag: "Low" },
  { id: "d7", clientId: "c4", jurisdiction: "Federal", filing: "Form 1120-S (extended)", dueDate: "2026-09-15", riskFlag: "Low" },
];

export function getClientById(id: string): Client | undefined {
  return CLIENTS.find((c) => c.id === id);
}

export const PHASES: EngagementPhase[] = [
  "Intake",
  "Entity Structuring",
  "Bookkeeping",
  "Tax Planning",
  "Payroll Setup",
  "Compliance Tracking",
  "Client Reporting",
];
