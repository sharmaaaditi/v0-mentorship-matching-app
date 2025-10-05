import { NextResponse } from "next/server"
import { generateText } from "ai"

// Simple instruction for a focused, helpful assistant tailored to mentor matching context.
const SYSTEM_INSTRUCTIONS = `You are MentorLink AI, a concise, helpful assistant for open-source mentorship.
- Ask clarifying questions only when needed.
- Provide actionable steps, suggested mentor attributes, and follow-up resources.
- Keep responses structured with short paragraphs or bullet points.
`

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as {
      messages: Array<{ role: "user" | "assistant"; content: string }>
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? ""

    const { text } = await generateText({
      model: "openai/gpt-5-mini",
      prompt: `${SYSTEM_INSTRUCTIONS}\n\nUser: ${lastUser}\n\nAssistant:`,
    })

    return NextResponse.json({ text })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
