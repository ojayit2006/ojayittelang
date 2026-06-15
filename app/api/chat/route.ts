import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { portfolioContext, findResponse } from "@/data/chatbot-responses";

export async function POST(req: NextRequest) {
  const { message, history = [] } = await req.json();

  if (!message?.trim()) {
    return NextResponse.json({ reply: "Say something!" });
  }

  const systemPrompt = portfolioContext;

  // --- Tier 1: Google Gemini Flash (free tier) ---
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt,
      });

      const chat = model.startChat({
        history: history.map((h: { role: string; text: string }) => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.text }],
        })),
      });

      const result = await chat.sendMessage(message);
      const reply = result.response.text();
      return NextResponse.json({ reply, provider: "gemini" });
    } catch {
      // fall through to next tier
    }
  }

  // --- Tier 2: Groq (free tier — Llama 3) ---
  if (process.env.GROQ_API_KEY) {
    try {
      const messages = [
        { role: "system", content: systemPrompt },
        ...history.map((h: { role: string; text: string }) => ({
          role: h.role === "assistant" ? "assistant" : "user",
          content: h.text,
        })),
        { role: "user", content: message },
      ];

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages,
          max_tokens: 256,
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content ?? "";
        if (reply) return NextResponse.json({ reply, provider: "groq" });
      }
    } catch {
      // fall through to predefined
    }
  }

  // --- Tier 3: Predefined rule-based fallback ---
  const reply = findResponse(message);
  return NextResponse.json({ reply, provider: "fallback" });
}
