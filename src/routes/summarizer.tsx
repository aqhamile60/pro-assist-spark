import { createFileRoute } from "@tanstack/react-router";
import { FileText, Sparkles, Copy } from "lucide-react";
import { useState } from "react";
import { AiToolShell } from "@/components/AiToolShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAi } from "@/lib/useAi";
import { toast } from "sonner";

export const Route = createFileRoute("/summarizer")({ component: Summarizer });

function Summarizer() {
  const { generate, loading, output, setOutput } = useAi();
  const [notes, setNotes] = useState("");

  async function onGenerate() {
    if (!notes.trim()) return toast.error("Paste some meeting notes first");
    const sys = "You are an expert meeting notes summarizer. Produce a markdown summary with these sections: ## Summary (2-3 sentences), ## Key Decisions, ## Action Items (with owner if mentioned), ## Open Questions. Be concise and faithful to the source.";
    await generate(sys, `Summarize the following meeting notes/transcript:\n\n${notes}`);
  }

  return (
    <AiToolShell
      title="Meeting Notes Summarizer"
      description="Turn raw notes or transcripts into structured summaries with action items."
      icon={<FileText className="h-6 w-6" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Meeting notes / transcript</Label>
              <Textarea
                rows={16}
                placeholder="Paste your raw meeting notes or transcript here…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <Button onClick={onGenerate} disabled={loading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Summarizing…" : "Summarize"}
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <Label>Summary (editable)</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}
              disabled={!output}
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
            </Button>
          </div>
          <Textarea
            rows={18}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Structured summary will appear here…"
            className="font-mono text-sm"
          />
        </Card>
      </div>
    </AiToolShell>
  );
}
