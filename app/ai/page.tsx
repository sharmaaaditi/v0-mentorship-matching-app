import type { Metadata } from "next"
import ChatUI from "@/components/ai/chat-ui"

export const metadata: Metadata = {
  title: "AI Assistant • MentorLink",
  description: "Ask the AI assistant for help finding mentors, planning study paths, and navigating open source.",
}

export default function AIPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-balance text-3xl font-semibold tracking-tight">AI Assistant</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Chat with an AI to refine your goals, discover mentors, and get next steps.
        </p>
      </header>
      <ChatUI />
    </main>
  )
}
