"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Message = { from: "me" | "mentor"; text: string }

export function ChatStub({ mentorName }: { mentorName: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { from: "mentor", text: `Hi! I'm ${mentorName}. What would you like to work on first?` },
  ])
  const [text, setText] = useState("")

  function send() {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { from: "me", text }])
    setText("")
    // In a real app, this is where you'd send via WebSocket or server action
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-balance">Chat with {mentorName}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div
          className="rounded-md border p-3 grid gap-2 max-h-80 overflow-auto"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((m, i) => (
            <div key={i} className={m.from === "me" ? "text-right" : "text-left"}>
              <span
                className={
                  m.from === "me"
                    ? "inline-block rounded-lg bg-primary text-primary-foreground px-3 py-2"
                    : "inline-block rounded-lg bg-secondary text-secondary-foreground px-3 py-2"
                }
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Write a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send()
            }}
            aria-label="Message input"
          />
          <Button onClick={send} aria-label="Send message">
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
