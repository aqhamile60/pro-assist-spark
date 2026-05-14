import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Sparkles, Copy } from "lucide-react";
import { useState } from "react";
import { AiToolShell } from "@/components/AiToolShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAi } from "@/lib/useAi";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({ component: Planner });

function Planner() {
  const { generate, loading, output, setOutput } = useAi();
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [constraints, setConstraints] = useState("");

  async function onGenerate() {
    if (!goal.trim()) return toast.error("Describe your goal");
    const sys = "You are a senior project planner. Break the user's goal into a clear, prioritized task plan as markdown. Use sections: ## Plan Overview, ## Milestones (with target dates), ## Tasks (numbered, with priority [High/Med/Low] and estimated effort), ## Risks. Keep it actionable.";
    const user = `Goal: ${goal}\nDeadline: ${deadline || "(none)"}\nConstraints / context: ${constraints || "(none)"}`;
    await generate(sys, user);
  }

  return (
    <AiToolShell
      title="AI Task Planner"
      description="Turn a goal into a prioritized, scheduled task plan."
      icon={<ListChecks className="h-6 w-6" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Goal</Label>
              <Input placeholder="e.g. Launch new pricing page" value={goal} onChange={(e) => setGoal(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Deadline (optional)</Label>
              <Input placeholder="e.g. by end of next month" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Constraints / context</Label>
              <Textarea rows={5} placeholder="Team size, tools, dependencies…" value={constraints} onChange={(e) => setConstraints(e.target.value)} />
            </div>
            <Button onClick={onGenerate} disabled={loading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Planning…" : "Generate Plan"}
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <Label>Plan (editable)</Label>
            <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }} disabled={!output}>
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
            </Button>
          </div>
          <Textarea
            rows={18}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Your plan will appear here…"
            className="font-mono text-sm"
          />
        </Card>
      </div>
    </AiToolShell>
  );
}
