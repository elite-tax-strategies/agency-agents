"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AGENTS, Agent, getAgentBySlug } from "@/lib/agents";
import { generateMockReply } from "@/lib/mock-chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function greetingMessage(agent: Agent): Message {
  return {
    id: `greeting-${agent.slug}`,
    role: "assistant",
    content: `Hi, I'm ${agent.personaName} — ${agent.name}. ${agent.vibe} What are you working on?`,
  };
}

export function ChatWindow() {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get("agent");

  const [activeSlug, setActiveSlug] = useState<string>(() => getAgentBySlug(requestedSlug ?? "")?.slug ?? AGENTS[0].slug);
  const [lastRequestedSlug, setLastRequestedSlug] = useState(requestedSlug);
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Adjust state during render when the ?agent= query param changes
  // (e.g. a link from the dashboard), per React's guidance for deriving
  // state from props without an effect.
  if (requestedSlug !== lastRequestedSlug) {
    setLastRequestedSlug(requestedSlug);
    const found = getAgentBySlug(requestedSlug ?? "");
    if (found) setActiveSlug(found.slug);
  }

  const activeAgent = getAgentBySlug(activeSlug) ?? AGENTS[0];

  const messages = useMemo(() => conversations[activeSlug] ?? [greetingMessage(activeAgent)], [conversations, activeSlug, activeAgent]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  function selectAgent(slug: string) {
    setActiveSlug(slug);
  }

  function send() {
    const text = draft.trim();
    if (!text || isThinking) return;

    const userMessage: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    const base = conversations[activeSlug] ?? [greetingMessage(activeAgent)];
    setConversations((prev) => ({ ...prev, [activeSlug]: [...base, userMessage] }));
    setDraft("");
    setIsThinking(true);

    const agentForReply = activeAgent;
    window.setTimeout(() => {
      const reply: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: generateMockReply(agentForReply, text),
      };
      setConversations((prev) => ({
        ...prev,
        [agentForReply.slug]: [...(prev[agentForReply.slug] ?? base), reply],
      }));
      setIsThinking(false);
    }, 500 + Math.random() * 500);
  }

  return (
    <div className="flex h-full min-h-0">
      <aside className="w-72 shrink-0 border-r border-border-hairline overflow-y-auto">
        <div className="px-4 py-3 sticky top-0 bg-surface-page/95 backdrop-blur border-b border-border-hairline">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Agents</p>
        </div>
        <AgentGroup title="AccountingPlanr" agents={AGENTS.filter((a) => a.category === "accountingplanr")} activeSlug={activeSlug} onSelect={selectAgent} />
        <AgentGroup title="Finance" agents={AGENTS.filter((a) => a.category === "finance")} activeSlug={activeSlug} onSelect={selectAgent} />
      </aside>

      <section className="flex-1 min-w-0 flex flex-col">
        <div className="px-6 py-4 border-b border-border-hairline flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden>
              {activeAgent.emoji}
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-primary">{activeAgent.name}</p>
              <p className="text-xs text-ink-muted">{activeAgent.personaName} · {activeAgent.specialty}</p>
            </div>
          </div>
          <span className="text-[0.65rem] font-medium uppercase tracking-wide text-ink-muted border border-border-hairline rounded-full px-2.5 py-1">
            Demo mode · simulated responses
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-lg rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user" ? "bg-accent text-white" : "bg-surface-card border border-border-hairline text-ink-primary"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2.5 text-sm bg-surface-card border border-border-hairline text-ink-muted">
                {activeAgent.personaName} is typing…
              </div>
            </div>
          )}
        </div>

        <form
          className="border-t border-border-hairline px-6 py-4 flex items-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Message ${activeAgent.personaName}…`}
            className="flex-1 rounded-md border border-border-hairline bg-surface-card px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <button
            type="submit"
            disabled={!draft.trim() || isThinking}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

function AgentGroup({
  title,
  agents,
  activeSlug,
  onSelect,
}: {
  title: string;
  agents: Agent[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="py-2">
      <p className="px-4 pt-2 pb-1 text-[0.65rem] font-semibold uppercase tracking-wide text-ink-muted">{title}</p>
      {agents.map((agent) => {
        const active = agent.slug === activeSlug;
        return (
          <button
            key={agent.slug}
            onClick={() => onSelect(agent.slug)}
            className={`w-full text-left px-4 py-2.5 flex items-start gap-2.5 transition-colors ${
              active ? "bg-accent/10" : "hover:bg-surface-card"
            }`}
          >
            <span className="text-lg leading-tight" aria-hidden>
              {agent.emoji}
            </span>
            <span className="min-w-0">
              <span className={`block text-sm font-medium truncate ${active ? "text-accent" : "text-ink-primary"}`}>{agent.name}</span>
              <span className="block text-xs text-ink-muted truncate">{agent.personaName}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
