import { createFileRoute } from "@tanstack/react-router";
import { Mail, Sparkles, Copy } from "lucide-react";
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

export const Route = createFileRoute("/email")({ component: EmailGen });

function EmailGen() {
  const { generate, loading, output, setOutput } = useAi();
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("Professional");
  const [context, setContext] = useState("");

  async function onGenerate() {
    if (!context.trim()) return toast.error("Add some context for the email");
    const sys = "You are an expert workplace communication assistant. Write clear, concise, well-structured emails. Output only the email body (no preamble), starting with a greeting and ending with a sign-off.";
    const user = `Write an email with the following details:
Recipient: ${recipient || "(not specified)"}
Subject: ${subject || "(not specified)"}
Tone: ${tone}
Context / key points:
${context}`;
    await generate(sys, user);
  }

  return (
    <AiToolShell
      title="Smart Email Generator"
      description="Generate polished, on-tone emails from a few details."
      icon={<Mail className="h-6 w-6" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Recipient</Label>
              <Input placeholder="e.g. Sarah, Head of Design" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Subject</Label>
              <Input placeholder="e.g. Q3 design review follow-up" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Professional", "Friendly", "Formal", "Concise", "Apologetic", "Persuasive"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Context / key points</Label>
              <Textarea rows={6} placeholder="What do you want to say? Bullet points work great." value={context} onChange={(e) => setContext(e.target.value)} />
            </div>
            <Button onClick={onGenerate} disabled={loading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Generating…" : "Generate Email"}
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <Label>Generated email (editable)</Label>
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
            placeholder="Your generated email will appear here…"
            className="font-mono text-sm"
          />
        </Card>
      </div>
    </AiToolShell>
  );
}
