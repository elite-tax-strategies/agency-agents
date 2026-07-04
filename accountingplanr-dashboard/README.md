# AccountingPlanr Dashboard

A dashboard and chat interface for the AccountingPlanr multi-agent accounting/tax
practice system defined in this repo's [`finance/`](../finance) and
[`accountingplanr/`](../accountingplanr) agent directories.

- **Dashboard** (`/`) — sample client roster, engagement phase distribution, and
  upcoming filing deadlines, illustrating what a real practice-management data
  layer would surface.
- **Chat** (`/chat`) — pick any of the 11 specialist agents and message them.

## Demo mode

The chat window currently runs on **simulated responses** (`lib/mock-chat.ts`) —
no Anthropic API key or backend is required to try it. Every reply is generated
from canned, per-agent templates so the interaction flow can be built and
demoed before a real model integration is wired up. Swap `generateMockReply`
in `lib/mock-chat.ts` for a real Claude API call (loading the selected agent's
persona markdown file as the system prompt) when ready to make this a working
assistant.

All dashboard data (`lib/mock-data.ts`) is sample data, not a real client roster.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Structure

- `lib/agents.ts` — the 11 agents, sourced from the frontmatter of
  `finance/*.md` and `accountingplanr/*.md` in this repo. Keep in sync if
  those files change.
- `lib/mock-data.ts` — sample clients, engagement phases, and compliance
  deadlines.
- `lib/mock-chat.ts` — the simulated chat reply engine.
- `components/` — dashboard and chat UI components.
- `app/` — Next.js App Router pages (`/` dashboard, `/chat` chat window).
