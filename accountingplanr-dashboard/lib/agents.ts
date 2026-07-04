export type AgentCategory = "finance" | "accountingplanr";

export interface Agent {
  slug: string;
  name: string;
  personaName: string;
  emoji: string;
  vibe: string;
  category: AgentCategory;
  specialty: string;
  whenToUse: string;
  sourceFile: string;
}

// Sourced from agency-agents/finance/*.md and agency-agents/accountingplanr/*.md
// frontmatter + persona identity. Keep in sync if those files change.
export const AGENTS: Agent[] = [
  {
    slug: "bookkeeper-controller",
    name: "Bookkeeper & Controller",
    personaName: "Dana",
    emoji: "📒",
    vibe: "Every penny accounted for, every close on time — the backbone of financial trust.",
    category: "finance",
    specialty: "Month-end close, reconciliation, GAAP compliance, internal controls",
    whenToUse: "Day-to-day accounting operations, audit readiness, financial record-keeping",
    sourceFile: "finance/finance-bookkeeper-controller.md",
  },
  {
    slug: "financial-analyst",
    name: "Financial Analyst",
    personaName: "Morgan",
    emoji: "📊",
    vibe: "Turns spreadsheets into strategy — every number tells a story, every model drives a decision.",
    category: "finance",
    specialty: "Financial modeling, forecasting, scenario analysis, decision support",
    whenToUse: "Three-statement models, variance analysis, data-driven business intelligence",
    sourceFile: "finance/finance-financial-analyst.md",
  },
  {
    slug: "fpa-analyst",
    name: "FP&A Analyst",
    personaName: "Riley",
    emoji: "📈",
    vibe: "The budget whisperer — turns plans into numbers and numbers into action.",
    category: "finance",
    specialty: "Budgeting, rolling forecasts, variance analysis, business reviews",
    whenToUse: "Annual operating plans, monthly business reviews, strategic resource allocation",
    sourceFile: "finance/finance-fpa-analyst.md",
  },
  {
    slug: "investment-researcher",
    name: "Investment Researcher",
    personaName: "Quinn",
    emoji: "🔍",
    vibe: "Digs deeper than the consensus — finds alpha in the footnotes and risks in the narratives.",
    category: "finance",
    specialty: "Due diligence, portfolio analysis, asset valuation, equity research",
    whenToUse: "Investment thesis development, risk assessment, market research",
    sourceFile: "finance/finance-investment-researcher.md",
  },
  {
    slug: "tax-strategist",
    name: "Tax Strategist",
    personaName: "Cassandra",
    emoji: "🏛️",
    vibe: "Finds every legal dollar of savings in the tax code — compliance is the floor, optimization is the mission.",
    category: "finance",
    specialty: "Tax optimization, multi-jurisdictional compliance, transfer pricing",
    whenToUse: "Entity structuring, ETR analysis, audit defense, strategic tax planning",
    sourceFile: "finance/finance-tax-strategist.md",
  },
  {
    slug: "client-intake",
    name: "Client Intake & Engagement Specialist",
    personaName: "Marisol",
    emoji: "🗂️",
    vibe: "The front door of the firm — nothing gets worked until it's scoped, cleared, and signed.",
    category: "accountingplanr",
    specialty: "Prospective client scoping, conflict/independence screening, engagement letters, fee proposals",
    whenToUse: "Onboarding a new client, scoping a new engagement, resolving intake friction",
    sourceFile: "accountingplanr/accountingplanr-client-intake.md",
  },
  {
    slug: "entity-structuring",
    name: "Entity Structuring Advisor",
    personaName: "Marcus",
    emoji: "🧱",
    vibe: "The right entity, elected at the right moment, is worth more than any deduction you'll ever find.",
    category: "accountingplanr",
    specialty: "Small-business entity selection, S-corp election timing, reasonable compensation, SE tax mitigation",
    whenToUse: "Choosing or changing a business entity structure at the individual/small-business level",
    sourceFile: "accountingplanr/accountingplanr-entity-structuring.md",
  },
  {
    slug: "compliance-calendar",
    name: "Compliance Calendar & Deadline Manager",
    personaName: "Renata",
    emoji: "🗓️",
    vibe: "Nothing slips through the cracks — every deadline tracked, every extension filed, every client covered.",
    category: "accountingplanr",
    specialty: "Firm-wide, multi-client filing deadline tracking across every entity type and taxing authority",
    whenToUse: "Building a client's deadline calendar, tracking extensions, prioritizing filing-season workload",
    sourceFile: "accountingplanr/accountingplanr-compliance-calendar.md",
  },
  {
    slug: "client-reporting",
    name: "Client Advisory & Reporting Specialist",
    personaName: "Marisol",
    emoji: "🗣️",
    vibe: "The bridge between the general ledger and the kitchen-table conversation — nobody leaves a meeting confused.",
    category: "accountingplanr",
    specialty: "Translating internal financial/tax analysis into client-facing communication",
    whenToUse: "Quarterly business reviews, annual tax planning letters, client meeting prep",
    sourceFile: "accountingplanr/accountingplanr-client-reporting.md",
  },
  {
    slug: "payroll-administrator",
    name: "Payroll & Workforce Compliance Administrator",
    personaName: "Renata",
    emoji: "🧾",
    vibe: 'Every paycheck on time, every worker classified right — payroll has no "close enough."',
    category: "accountingplanr",
    specialty: "Multi-client payroll setup, worker classification, multi-state payroll tax compliance",
    whenToUse: "Onboarding client payroll, classifying workers, registering new-state payroll tax",
    sourceFile: "accountingplanr/accountingplanr-payroll-administrator.md",
  },
  {
    slug: "engagement-orchestrator",
    name: "Engagement Orchestrator",
    personaName: 'Marguerite "Margo" Alvarado',
    emoji: "🧭",
    vibe: "The conductor who makes sure every client engagement lands on the right desk at the right time — nothing waits, nothing falls through.",
    category: "accountingplanr",
    specialty: "Routes engagement work across all 11 agents, defines handoff criteria, tracks status",
    whenToUse: "Scoping/staffing a new engagement, unblocking a stalled engagement, cross-engagement status rollups",
    sourceFile: "accountingplanr/accountingplanr-engagement-orchestrator.md",
  },
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return AGENTS.find((a) => a.slug === slug);
}
