"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Message = { id: string; role: "user" | "assistant"; content: string }

const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init).then((r) => {
    if (!r.ok) throw new Error("Failed to fetch")
    return r.json()
  })

export default function ChatUI() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hi! I’m your MentorLink AI assistant. Tell me your goals, interests, and time commitment. I’ll help you find mentors and plan next steps.",
    },
  ])
  const [input, setInput] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  async function send() {
    if (!input.trim() || pending) return
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: input.trim() }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setPending(true)
    try {
      const data = await fetcher("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.text as string,
      }
      setMessages((m) => [...m, assistantMsg])
      // optional: focus back to input
      inputRef.current?.focus()
    } catch (e) {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "I had trouble responding. Please try again in a moment or rephrase your question.",
      }
      setMessages((m) => [...m, assistantMsg])
    } finally {
      setPending(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      void send()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="border-muted/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "rounded-md border p-3 text-sm leading-relaxed",
                  m.role === "assistant" ? "bg-muted/30 border-muted" : "bg-background border-primary/30",
                )}
                aria-live="polite"
              >
                <div className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {m.role === "assistant" ? "Assistant" : "You"}
                </div>
                <p className="whitespace-pre-wrap text-pretty">{m.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={input}
          placeholder="Ask about mentors, roadmaps, or projects..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Chat prompt"
        />
        <Button onClick={() => void send()} disabled={pending}>
          {pending ? "Thinking..." : "Send"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Tip: Be specific. For example, “I want a web dev mentor for 4 weeks, 5 hrs/week, focusing on React and OSS.”
      </p>
    </div>
  )
}
