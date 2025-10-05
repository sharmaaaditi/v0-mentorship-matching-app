"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { MatchResult } from "@/lib/types"

export function MentorCard({ result, onConnect }: { result: MatchResult; onConnect?: (name: string) => void }) {
  const m = result.mentor
  const percent = Math.round(result.score * 100)

  return (
    <Card role="article">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-pretty">{m.name}</span>
          <span className="text-sm font-medium text-muted-foreground">{percent}% match</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="text-sm">
          <span className="font-medium">Skills:</span> {m.skills.join(", ")}
        </div>
        <div className="text-sm">
          <span className="font-medium">Availability:</span> {m.availability} •{" "}
          <span className="font-medium">Prefers:</span> {m.communication}
        </div>
        {m.github ? (
          <a
            className="text-sm text-primary underline underline-offset-4"
            href={m.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub
          </a>
        ) : null}
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <Button onClick={() => onConnect?.(m.name)}>Connect</Button>
      </CardFooter>
    </Card>
  )
}
