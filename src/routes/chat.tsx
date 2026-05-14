import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Send, Loader2, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AiToolShell } from "@/components/AiToolShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { runAi } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({ component: Chat });

type Msg = { role: "user" | "assistant"; content: string };

function Chat() {
  const fn = useServerFn(runAi);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fn({
        data: {
          messages: [
            { role: "system", content: "You are a helpful, professional workplace assistant. Be concise, friendly, and accurate. Use markdown when helpful." },
            ...next,
          ],
        },
      });
      setMessages((m) => [...m, { role: "assistant", content: res.content }]);
    } catch (e: any) {
      toast.error(e?.message ?? "Chat failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AiToolShell
      title="AI Chatbot"
      description="A free-form workplace assistant. Ask anything."
      icon={<MessageSquare className="h-6 w-6" />}
    >
      <div className="flex h-[60vh] flex-col rounded-xl border border-border bg-card shadow-sm">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <Sparkles className="mb-3 h-8 w-8 opacity-60" />
              <p className="text-sm">Start a conversation — ask for help drafting, brainstorming, or thinking through a problem.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-border p-3">
          <div className="flex items-end gap-2">
            <Textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Type a message… (Shift+Enter for newline)"
              className="min-h-[44px] resize-none"
            />
            <Button onClick={send} disabled={loading || !input.trim()} size="icon" className="h-11 w-11 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AiToolShell>
  );
}
