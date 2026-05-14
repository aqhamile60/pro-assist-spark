import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const tools = [
  { url: "/email", title: "Smart Email Generator", desc: "Draft polished emails in seconds with the right tone.", icon: Mail },
  { url: "/summarizer", title: "Meeting Notes Summarizer", desc: "Turn raw transcripts into action-ready summaries.", icon: FileText },
  { url: "/planner", title: "AI Task Planner", desc: "Break goals into prioritized, scheduled tasks.", icon: ListChecks },
  { url: "/research", title: "AI Research Assistant", desc: "Get structured briefings on any topic.", icon: Search },
  { url: "/chat", title: "AI Chatbot", desc: "Ask anything — a free-form workplace assistant.", icon: MessageSquare },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-6 md:p-8">
      <section
        className="relative overflow-hidden rounded-2xl border border-border p-8 md:p-10"
        style={{ background: "var(--gradient-subtle)" }}
      >
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Powered by Lovable AI
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Your AI co-worker for everyday productivity
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Five specialized assistants to help you write, plan, research, and communicate — all in one clean workspace.
          </p>
        </div>
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.url} to={t.url} className="group">
              <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
