import { Agent } from "./agents";

// This is a simulated chat backend — no real model call is made. Every
// response is generated from canned, per-agent templates so the chat UI
// and interaction flow can be built and demoed without an Anthropic API
// key configured. Swap `generateMockReply` for a real API call when ready.

const GREETING_KEYWORDS = ["hi", "hello", "hey", "morning", "afternoon"];
const HELP_KEYWORDS = ["help", "what can you", "what do you do"];
const THANKS_KEYWORDS = ["thanks", "thank you", "appreciate"];

function containsAny(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

function greeting(agent: Agent): string {
  return `Hi, I'm ${agent.personaName} — ${agent.name}. ${agent.vibe} What are you working on?`;
}

function helpReply(agent: Agent): string {
  return `Here's where I can help: ${agent.specialty.toLowerCase()}. Typical triggers for looping me in: ${agent.whenToUse.toLowerCase()}. What's the situation?`;
}

function thanksReply(): string {
  return `Happy to help. Flag me again once you have the next update — I'll pick the thread back up.`;
}

const FOLLOW_UPS: Record<string, string[]> = {
  "bookkeeper-controller": [
    "Got it. Before I dig in — are all bank and card feeds synced through month-end, and is there anything unreconciled I should know about?",
    "Noted. I'll want the trial balance and prior month's close checklist to start. Any unusual transactions this month I should flag early?",
    "Understood — I'll treat this as a reconciliation item. What's the account and the approximate variance you're seeing?",
  ],
  "financial-analyst": [
    "Okay — let's ground this in assumptions first. What's the base case growth rate and margin you want me to model against?",
    "That's a modeling question. Give me the historical 12-24 months of data and I'll build base/upside/downside scenarios.",
    "Before I quantify that, what's the decision this analysis needs to support — and by when?",
  ],
  "fpa-analyst": [
    "Let's tie this to a driver. What's actually changing — headcount, pricing, or volume?",
    "I'll need the budget-vs-actual for the period in question to explain the variance properly. Can you share that?",
    "Good — I'll fold this into the rolling forecast. Is this a permanent shift or a timing difference?",
  ],
  "investment-researcher": [
    "Let's separate thesis from narrative here. What's the specific, falsifiable claim you want me to test?",
    "I'll need primary sources — filings, transcripts, or the actual data room — before I can give you a real read.",
    "What's the investment horizon we're working with? That changes which risks actually matter.",
  ],
  "tax-strategist": [
    "Let's get the facts straight first — entity structure, jurisdictions involved, and the transaction or position in question.",
    "I'll flag the authority level and risk on this before we go further — what's the dollar amount at stake?",
    "Is this a planning question or something already in motion? That changes how aggressive I can be here.",
  ],
  "client-intake": [
    "Before we scope this, let's clear conflicts — is there any existing relationship with the other party here?",
    "I'll draft the engagement letter once I know which service lines apply. Tax prep, planning, bookkeeping, payroll, or a combination?",
    "Got it — I'll get the document request checklist out. What's the client's entity type?",
  ],
  "entity-structuring": [
    "Let's run the numbers. What's projected net profit before owner compensation, and what reasonable comp figure are we considering?",
    "Before I recommend an election, I need a defensible reasonable-comp benchmark — do we have comparable wage data for this role?",
    "Good question. Is this a new entity or a conversion from an existing structure? Timing changes the analysis.",
  ],
  "compliance-calendar": [
    "Let me pull the filing calendar for that client — what's their entity type and every state where they have nexus?",
    "That's flagged already — it's inside the at-risk window. Want me to escalate it to the client now or wait for the extension confirmation?",
    "I'll add that to the dashboard. Is an extension already on file, or are we still inside the original due date?",
  ],
  "client-reporting": [
    "I'll translate that into the client's language. What's the one number they need to walk away remembering?",
    "Let's lead with the headline. What changed this quarter, and what should they actually do about it?",
    "Good — I'll draft that for the next review. Do you want the quarterly format or the annual planning letter format?",
  ],
  "payroll-administrator": [
    "Before setup, I need the worker's classification confirmed — W-2 or 1099, and on what basis?",
    "Let's check state nexus first — does this employee work in a state where the client isn't yet registered for payroll tax?",
    "Got it — I'll build the setup checklist. What's the pay frequency and start date?",
  ],
  "engagement-orchestrator": [
    "Let's map this to the phase model. Where is this engagement right now, and what's the blocking deliverable?",
    "I'll check the handoff criteria — has the prior phase's deliverable actually been produced, or are we jumping ahead?",
    "Understood. I'll route this to the right specialist — can you confirm the client's entity type and current phase?",
  ],
};

const rollingIndexByAgent = new Map<string, number>();

export function generateMockReply(agent: Agent, userMessage: string): string {
  if (containsAny(userMessage, GREETING_KEYWORDS) && userMessage.trim().split(/\s+/).length <= 4) {
    return greeting(agent);
  }
  if (containsAny(userMessage, THANKS_KEYWORDS)) {
    return thanksReply();
  }
  if (containsAny(userMessage, HELP_KEYWORDS)) {
    return helpReply(agent);
  }

  const pool = FOLLOW_UPS[agent.slug] ?? [
    "Understood — tell me a bit more about the client and the timeline, and I'll take it from there.",
  ];
  const next = ((rollingIndexByAgent.get(agent.slug) ?? -1) + 1) % pool.length;
  rollingIndexByAgent.set(agent.slug, next);
  return pool[next];
}
