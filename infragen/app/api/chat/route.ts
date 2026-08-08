import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { chatTools } from "@/lib/chatTools";
import { searchKnowledge, searchKnowledgeKeywordMode } from "@/lib/ragKnowledge";
import { ChatRequest, ChatApiResponse } from "@/lib/types";

const GEMINI_MODEL = "gemini-3.5-flash";

const BASE_SYSTEM_INSTRUCTION = `You are Vizhi AI, the official AI assistant for Vizhi Infragen Realtors LLP — a trusted real estate and property management company based in Coimbatore, Tamil Nadu, India.

LANGUAGE RULE — CRITICAL:
• You MUST respond ONLY in English at all times, regardless of what language the user writes in.
• If the user writes in Tamil, Hindi, or any other language, you still reply in English only.

ANSWER SOURCE RULE — CRITICAL:
• You MUST answer ONLY using the information provided in the RAG CONTEXT below.
• Do NOT invent, assume, or add any information that is not present in the RAG CONTEXT.
• If the user's question cannot be answered from the RAG CONTEXT, respond with:
  "I'm sorry, I don't have specific information on that. Please contact our team directly at <strong>+91 96888 89420</strong> or email <strong>vizhiinfragen@gmail.com</strong> for accurate assistance."
• Do NOT answer questions about general real estate laws, prices, or market data unless they are explicitly stated in the RAG CONTEXT.

SCOPE RULE:
• ONLY discuss topics related to Vizhi Infragen Realtors LLP and real estate in Coimbatore.
• Politely decline all off-topic questions (politics, general knowledge, other cities, etc.) and redirect the user to property-related topics.

TOOL RULES:
• Use searchProperties() when users ask to see available properties, plots, or land with any filter.
• Use contactAgent() when the user wants to speak to a human advisor or agent.
• Use bookSiteVisit() when the user wants to schedule or book a site visit.
• Use getCompanyInfo() to look up any service, area, or company detail from the knowledge base.

FORMAT RULES:
• Always respond in clear, professional English.
• Use HTML tags for formatting: <strong> for emphasis, <br/> for line breaks, bullet points (•) for lists.
• Be warm, concise, and helpful. Avoid unnecessary filler text.

RAG CONTEXT FROM OFFICIAL COMPANY DOCUMENTS:
{RAG_CONTEXT}

CURRENT SESSION MEMORY:
{SESSION_MEMORY}

Remember: You represent Vizhi Infragen Realtors LLP. Answer only from the documents provided. English only. No invented facts.`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as ChatRequest;
    const { messages, sessionMemory, toolResult, mode = "rag" } = body;

    // Extract last user message
    const lastUserMsg = messages[messages.length - 1]?.content || "";

    // ── Keyword Search Mode (Fast direct index search) ─────────────────────
    if (mode === "keyword") {
      try {
        const pyRes = await fetch("http://localhost:8000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: lastUserMsg, mode: "keyword" }),
        });
        if (pyRes.ok) {
          const pyData = await pyRes.json();
          if (pyData.success && pyData.answer) {
            return NextResponse.json({
              type: "message",
              text: pyData.answer,
              mode: "keyword",
              sources: pyData.sources,
              confidence: pyData.confidence,
              category: pyData.category,
            } as ChatApiResponse);
          }
        }
      } catch {
        // Python backend offline, use local TS keyword engine fallback
      }

      const kwRes = searchKnowledgeKeywordMode(lastUserMsg, 3);
      return NextResponse.json({
        type: "message",
        text: kwRes.text,
        mode: "keyword",
        sources: kwRes.sources,
      } as ChatApiResponse);
    }

    // ── RAG AI Mode ────────────────────────────────────────────────────────
    // Try querying the Python RAG Backend Server first
    try {
      const pyRes = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: lastUserMsg, mode: "rag" }),
      });
      if (pyRes.ok) {
        const pyData = await pyRes.json();
        if (pyData.success && pyData.answer) {
          return NextResponse.json({
            type: "message",
            text: pyData.answer,
            mode: "rag",
            sources: pyData.sources,
            confidence: pyData.confidence,
            category: pyData.category,
          } as ChatApiResponse);
        }
      }
    } catch {
      // Python backend unreachable, proceed to Gemini fallback
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback RAG search using internal knowledge base
      const ragChunks = searchKnowledge(lastUserMsg, 2);
      const fallbackText = ragChunks.length > 0 
        ? ragChunks[0].content 
        : "Vizhi Infragen Realtors LLP is a trusted real estate and property management company in Coimbatore. Call +91 96888 89420 or email vizhiinfragen@gmail.com for inquiries.";
      return NextResponse.json({
        type: "message",
        text: fallbackText,
        mode: "rag",
        sources: ragChunks.map((c) => c.title),
      } as ChatApiResponse);
    }

    const ragChunks = searchKnowledge(lastUserMsg, 3);
    const ragContextText = ragChunks.map((c) => `[${c.title}]\n${c.content}`).join("\n\n");

    const systemInstruction = BASE_SYSTEM_INSTRUCTION
      .replace("{RAG_CONTEXT}", ragContextText || "General Vizhi Infragen company information.")
      .replace(
        "{SESSION_MEMORY}",
        Object.keys(sessionMemory || {}).length > 0
          ? JSON.stringify(sessionMemory, null, 2)
          : "No facts captured yet."
      );

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      tools: chatTools,
      systemInstruction,
    });

    const history: Content[] = [];

    if (!toolResult) {
      for (let i = 0; i < messages.length - 1; i++) {
        const msg = messages[i];
        if (!msg.content.trim()) continue;
        history.push({
          role: msg.role,
          parts: [{ text: msg.content }],
        });
      }
    } else {
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        if (!msg.content.trim()) continue;
        history.push({
          role: msg.role,
          parts: [{ text: msg.content }],
        });
      }
      history.push({
        role: "model",
        parts: [{ functionCall: { name: toolResult.name, args: {} } }],
      });
      history.push({
        role: "user",
        parts: [{ functionResponse: { name: toolResult.name, response: { result: toolResult.content } } }],
      });
    }

    const chat = model.startChat({ history });
    const sendContent = toolResult
      ? "Please provide the final response based on the tool result above."
      : messages[messages.length - 1].content;

    const result = await chat.sendMessage(sendContent);
    const response = result.response;

    const functionCall = response.functionCalls()?.[0];
    if (functionCall) {
      return NextResponse.json({
        type: "tool_call",
        name: functionCall.name,
        args: functionCall.args as Record<string, unknown>,
      } as ChatApiResponse);
    }

    const text = response.text();
    if (!text) {
      return NextResponse.json(
        { type: "error", message: "Empty response from Gemini." } as ChatApiResponse,
        { status: 500 }
      );
    }

    return NextResponse.json({
      type: "message",
      text,
      mode: "rag",
      sources: ragChunks.map((c) => c.title),
    } as ChatApiResponse);
  } catch (err: unknown) {
    console.error("[/api/chat] Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unexpected error";

    if (errorMessage.includes("429")) {
      return NextResponse.json(
        { type: "error", message: "Rate limit reached. Try again in 30s." } as ChatApiResponse,
        { status: 429 }
      );
    }

    return NextResponse.json(
      { type: "error", message: errorMessage } as ChatApiResponse,
      { status: 500 }
    );
  }
}

