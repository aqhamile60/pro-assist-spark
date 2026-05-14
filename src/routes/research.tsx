import { createFileRoute } from "@tanstack/react-router";
import { Search, Sparkles, Copy } from "lucide-react";
import { useState } from "react";
import { AiToolShell } from "@/components/AiToolShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAi } from "@/lib/useAi";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({ component: Research });

function Research() {
  const { generate, loading, output, setOutput } = useAi();
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("Brief");
  const [audience, setAudience] = useState("");

  async function onGenerate() {
    if (!topic.trim()) return toast.error("Enter a topic");
    const sys = `You are a senior research assistant. Produce a structured ${depth.toLowerCase()} markdown briefing with sections: ## Overview, ## Key Points (bulleted), ## Pros & Cons, ## Notable Examples, ## Recommended Next Steps. Be balanced and cite reasoning, not URLs. Note when information may be outdated.`;
    const user = `Topic: ${topic}\nIntended audience: ${audience || "general professional"}\nDepth: ${depth}`;
    await generate(sys, user);
  }

  return (
    <AiToolShell
      title="AI Research Assistant"
      description="Get a structured briefing on any topic in seconds."
      icon={<Search className="h-6 w-6" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Topic / question</Label>
              <Input placeholder="e.g. Best practices for async standups" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Audience</Label>
              <Input placeholder="e.g. Engineering managers" value={audience} onChange={(e) => setAudience(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Depth</Label>
              <Select value={depth} onValueChange={setDepth}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Brief", "Standard", "In-depth"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={onGenerate} disabled={loading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Researching…" : "Research"}
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <Label>Briefing (editable)</Label>
            <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }} disabled={!output}>
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
            </Button>
          </div>
          <Textarea
            rows={18}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Your briefing will appear here…"
            className="font-mono text-sm"
          />
        </Card>
      </div>
    </AiToolShell>
  );
}
