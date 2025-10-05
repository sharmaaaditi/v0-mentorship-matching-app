"use client"

import { useSearchParams } from "next/navigation"
import { ChatStub } from "@/components/chat-stub"

export default function ChatPage() {
  const params = useSearchParams()
  const mentorName = params.get("mentor") || "Your Mentor"
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <ChatStub mentorName={mentorName} />
    </main>
  )
}
