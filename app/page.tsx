import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeatureCards } from "@/components/home/feature-cards"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 grid gap-12">
      <section className="grid gap-6 text-center">
        <h1 className="text-4xl font-semibold text-balance">Find your open‑source guide today</h1>
        <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
          MentorLink matches new contributors with experienced mentors based on skills, availability, and communication
          preferences.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/onboarding">Get started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/match">See a sample match</Link>
          </Button>
        </div>
      </section>

      {/* Feature Cards */}
      <section aria-labelledby="features-title" className="grid gap-6">
        <h2 id="features-title" className="text-2xl font-semibold text-balance text-center">
          Why MentorLink?
        </h2>
        <FeatureCards />
      </section>

      {/* How it works */}
      <section aria-labelledby="how-title" className="grid gap-4">
        <h2 id="how-title" className="text-2xl font-semibold text-balance text-center">
          How it works
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">1. Create profile</h3>
            <p className="text-muted-foreground">Share your skills, availability, and communication preferences.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">2. Get matched</h3>
            <p className="text-muted-foreground">We rank mentors with a weighted score for the best fit.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">3. Connect & grow</h3>
            <p className="text-muted-foreground">Message your mentor and start contributing with guidance.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
