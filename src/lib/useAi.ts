import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { runAi } from "./ai.functions";
import { toast } from "sonner";

export function useAi() {
  const fn = useServerFn(runAi);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  async function generate(systemPrompt: string, userPrompt: string) {
    setLoading(true);
    try {
      const res = await fn({
        data: {
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        },
      });
      setOutput(res.content);
    } catch (e: any) {
      toast.error(e?.message ?? "AI request failed");
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading, output, setOutput };
}
