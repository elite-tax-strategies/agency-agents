# Multi-Agent Workflow: Full-Service Accounting Client Engagement

> A step-by-step example of how the 11-agent AccountingPlanr system runs a client engagement end-to-end — from first intake call through the first quarterly business review.

## The Scenario

A small business owner (a bakery operating as a single-member LLC, ~$220K in annual profit, one employee) has just signed on as a new client of the firm. Over the following weeks the engagement moves through intake, entity structuring, bookkeeping setup, tax planning, payroll setup, ongoing compliance tracking, and the first client-facing quarterly review.

## Agent Team

| Agent | Role in this workflow |
|-------|---------------------|
| Engagement Orchestrator | Routes the engagement through the right specialist at each phase |
| Client Intake & Engagement Specialist | Scopes the engagement, screens for conflicts, drafts the engagement letter |
| Entity Structuring Advisor | Evaluates the S-corp election and reasonable compensation |
| Bookkeeper & Controller | Sets up the chart of accounts and monthly close process |
| Tax Strategist | Confirms the entity recommendation doesn't create broader tax exposure |
| Payroll & Workforce Compliance Administrator | Stands up payroll for the owner's new W-2 wages |
| Compliance Calendar & Deadline Manager | Builds the client's filing deadline calendar |
| Client Advisory & Reporting Specialist | Writes the first quarterly business review |

## The Workflow

### Phase 1: Intake & Scoping

**Step 1 — Activate Engagement Orchestrator**

```
Activate Engagement Orchestrator.

New client: Riverbend Bakery, a single-member LLC, ~$220K annual profit,
1 employee, no prior accounting firm relationship.

Lay out the phase sequence and which specialist owns each phase, plus what
handoff deliverable each phase needs to produce before the next agent starts.
```

**Step 2 — Hand off to Client Intake & Engagement Specialist**

```
Activate Client Intake & Engagement Specialist.

Prospective client: Riverbend Bakery LLC, single-member LLC, owner-operator,
~$220K annual profit, 1 employee. No conflicts identified in initial screen.
Requested services: bookkeeping, tax planning, tax preparation, payroll.

Run intake: independence screening, fee proposal, and a combined engagement
letter covering all four requested services. Also produce the document
request checklist for the first 30 days.
```

### Phase 2: Entity Structuring

**Step 3 — Hand off to Entity Structuring Advisor**

```
Activate Entity Structuring Advisor.

Client: Riverbend Bakery LLC (single-member LLC, default sole-prop tax
treatment). Projected net profit this year: $220,000. Owner currently takes
no formal salary.

Evaluate whether an S-corp election makes sense. Use the
accountingplanr-tax-savings-calculator skill (scripts/entity_comparison.py)
to quantify the savings at a few candidate reasonable-compensation levels,
and produce an Entity Structure Comparison Memo with your recommendation.
```

**Step 4 — Tax Strategist sanity check (in parallel with Step 5)**

```
Activate Tax Strategist.

Here's the Entity Structuring Advisor's recommendation: [paste memo]

Confirm there's no broader tax exposure we're missing (state-level S-corp
recognition, self-employment tax on prior-year income, QBI phase-out risk
at this income level) before we implement.
```

### Phase 3: Bookkeeping & Payroll Setup

**Step 5 — Bookkeeper & Controller sets up the books (in parallel with Step 4)**

```
Activate Bookkeeper & Controller.

New client: Riverbend Bakery LLC, transitioning to S-corp tax treatment
effective January 1. Set up the chart of accounts, connect bank/card feeds,
and use the accountingplanr-close-checklist skill to generate the first
month's close checklist.
```

**Step 6 — Hand off to Payroll & Workforce Compliance Administrator**

```
Activate Payroll & Workforce Compliance Administrator.

Riverbend Bakery LLC is electing S-corp treatment. Owner's reasonable
compensation was set at $85,000/year per the Entity Structuring Advisor's
memo: [paste memo]. One existing hourly employee also needs to be moved
onto the new payroll setup.

Produce the New Client Payroll Setup Checklist and confirm the owner's
W-2 classification is properly documented.
```

### Phase 4: Compliance Tracking & Ongoing Reporting

**Step 7 — Compliance Calendar & Deadline Manager**

```
Activate Compliance Calendar & Deadline Manager.

Client: Riverbend Bakery LLC, now electing S-corp treatment (Form 1120-S),
one employee on payroll, nexus only in [state]. Use the
accountingplanr-compliance-calendar skill to build the client's filing
deadline calendar for the year, including the Form 2553 election deadline.
```

**Step 8 — Client Advisory & Reporting Specialist closes the loop**

```
Activate Client Advisory & Reporting Specialist.

First quarter of data is in for Riverbend Bakery LLC: [paste financials
from Bookkeeper & Controller] and the entity election is now in effect:
[paste Entity Structuring Advisor's memo].

Write the first Quarterly Business Review — plain English, lead with the
estimated tax savings from the S-corp election, and flag the upcoming
Q2 estimated tax payment from the compliance calendar.
```

## Key Patterns

1. **Orchestrator-first**: The Engagement Orchestrator sequences the other 10 agents so nothing starts before its trigger deliverable exists (see its "Full Agent Roster & Phase Mapping" table).
2. **Parallel work**: Entity Structuring Advisor's recommendation, the Tax Strategist's sanity check, and Bookkeeper & Controller's setup can all run in the same window once intake is signed.
3. **Skills do the math and lookups**: the Entity Structuring Advisor calls the `accountingplanr-tax-savings-calculator` skill instead of estimating tax savings freehand; the Compliance Calendar & Deadline Manager calls the `accountingplanr-compliance-calendar` skill instead of hand-tracking dates.
4. **Client communication is a separate, final step**: technical analysis (bookkeeping, structuring, tax) is finished and reviewed before the Client Advisory & Reporting Specialist translates it into anything the client sees.

## Tips

- Copy-paste agent and skill outputs between steps — agents don't share memory, and skill output (the calculator/calendar results) is exactly what the next agent needs as input.
- If the Tax Strategist's sanity check in Step 4 flags an issue, loop back to the Entity Structuring Advisor before Payroll setup begins — don't implement an election that hasn't cleared review.
- Keep the Engagement Orchestrator's phase map in mind as the engagement recurs monthly/quarterly — most of this workflow repeats every filing season and every quarterly review cycle.
