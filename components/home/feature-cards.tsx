import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FeatureCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">Smart matching</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Weighted scoring across skill overlap, availability, and communication preference.
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-balance">Built‑in messaging</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Start conversations immediately and align on goals from day one.
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-balance">Progress first</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          A simple journey from onboarding to first PR with clear next steps.
        </CardContent>
      </Card>
    </div>
  )
}
