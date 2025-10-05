"use client"

import useSWR from "swr"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MentorCard } from "@/components/mentor-card"

type Match = {
  id: string
  name: string
  skills: string[]
  score: number
}

const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init).then((r) => {
    if (!r.ok) throw new Error("Failed")
    return r.json()
  })

export default function Overview() {
  const { data: matches, isLoading } = useSWR<Match[]>(
    "/api/match",
    (url) =>
      fetcher(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}), // leverage existing matching API defaults if any
      }),
    { revalidateOnFocus: false },
  )

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Your Matches</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-sm text-muted-foreground">Loading matches…</p>}
          {!isLoading && (!matches || matches.length === 0) && (
            <p className="text-sm text-muted-foreground">
              No matches yet. Start with{" "}
              <Link className="underline" href="/onboarding">
                Onboarding
              </Link>{" "}
              to generate tailored suggestions.
            </p>
          )}
          {!isLoading && matches?.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {matches.slice(0, 4).map((m) => (
                <MentorCard key={m.id} mentor={{ name: m.name, skills: m.skills, score: m.score }} />
              ))}
            </div>
          ) : null}
          <div className="mt-4">
            <Link href="/match">
              <Button variant="secondary">See all matches</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Link href="/ai">
            <Button className="w-full">Ask the AI Assistant</Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" className="w-full bg-transparent">
              Open Chat
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button variant="ghost" className="w-full">
              Update Preferences
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Track milestones and contributions here. We can wire this to a database or GitHub metrics next.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
