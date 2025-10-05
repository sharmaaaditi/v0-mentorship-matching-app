import type { Metadata } from "next"
import Overview from "@/components/dashboard/overview"

export const metadata: Metadata = {
  title: "Dashboard • MentorLink",
  description: "Your matches, messages, and progress at a glance.",
}

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-balance text-3xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review your mentor matches, jump back into chats, and track your progress.
        </p>
      </header>
      <Overview />
    </main>
  )
}
