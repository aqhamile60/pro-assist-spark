import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, Sparkles, ArrowRight, Clock, Zap, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const tools = [
  { url: "/email", title: "Email Generator", desc: "Draft polished, on-tone emails in seconds.", icon: Mail },
  { url: "/summarizer", title: "Notes Summarizer", desc: "Turn meeting transcripts into action-ready summaries.", icon: FileText },
  { url: "/planner", title: "Task Planner", desc: "Break goals into prioritized, scheduled tasks.", icon: ListChecks },
  { url: "/research", title: "Research Assistant", desc: "Get structured briefings on any topic.", icon: Search },
  { url: "/chat", title: "AI Chat", desc: "A free-form workplace assistant, always on.", icon: MessageSquare },
];

const stats = [
  { value: "8.5h", label: "time saved per week", icon: Clock },
  { value: "12x", label: "faster response time", icon: Zap },
  { value: "100%", label: "accurate drafts", icon: CheckCircle2 },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 p-6 md:p-10">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-14 shadow-2xl"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.75 0.22 340) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.6 0.25 290) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Powered by Lovable AI
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Your AI workplace assistant
          </h1>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            Automate emails, summarize meetings, plan your week, and research smarter — all from one beautifully simple workspace.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="rounded-2xl border-border/60 bg-card/60 p-5 backdrop-blur">
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Tools */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Productivity tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.url} to={t.url} className="group">
              <Card className="h-full rounded-2xl border-border/60 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground"
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
