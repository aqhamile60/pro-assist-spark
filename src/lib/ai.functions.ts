import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "system" | "user" | "assistant"; content: string };

export const runAi = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: Msg[]; model?: string }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: data.model ?? "google/gemini-3-flash-preview",
        messages: data.messages,
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (resp.status === 402) throw new Error("AI credits depleted. Please add credits in workspace settings.");
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      throw new Error("AI request failed");
    }

    const json = await resp.json();
    const content: string = json?.choices?.[0]?.message?.content ?? "";
    return { content };
  });
