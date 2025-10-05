"use client"

import useSWR from "swr"
import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { MentorCard } from "@/components/mentor-card"
import { Button } from "@/components/ui/button"
import type { MenteeProfile, MatchResult } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fetcher = async ([url, profile]: [string, MenteeProfile]) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile }),
  })
  if (!res.ok) throw new Error("Failed to fetch matches")
  return (await res.json()) as { matches: MatchResult[] }
}

function useStoredProfile(): MenteeProfile | null {
  // Reading localStorage is not a network fetch; we only read once at render time.
  // We intentionally avoid useEffect for fetching; SWR handles network.
  const profile = useMemo(() => {
    try {
      const raw = localStorage.getItem("mentorlink.profile")
      if (!raw) return null
      const parsed = JSON.parse(raw) as MenteeProfile
      return parsed?.role === "Mentee" ? parsed : null
    } catch {
      return null
    }
  }, [])
  return profile
}

export default function MatchPage() {
  const router = useRouter()
  const profile = useStoredProfile()

  const { data, error, isLoading } = useSWR(profile ? ["/api/match", profile] : null, fetcher)

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 grid gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-balance">Your mentor matches</h1>
          <p className="text-muted-foreground">
            Top suggestions based on your skills, availability, and communication preference.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => router.push("/onboarding")}>
            Edit profile
          </Button>
        </div>
      </header>

      {!profile ? (
        <Card>
          <CardHeader>
            <CardTitle>No profile found</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-muted-foreground">Please create your profile to see mentor suggestions.</p>
            <Button onClick={() => router.push("/onboarding")}>Create profile</Button>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <p className="text-muted-foreground">Finding your best mentors…</p>
      ) : error ? (
        <p className="text-destructive">There was an error fetching your matches.</p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {data?.matches?.map((result) => (
            <MentorCard
              key={result.mentor.name}
              result={result}
              onConnect={(name) => router.push(`/chat?mentor=${encodeURIComponent(name)}`)}
            />
          ))}
        </section>
      )}
    </main>
  )
}
