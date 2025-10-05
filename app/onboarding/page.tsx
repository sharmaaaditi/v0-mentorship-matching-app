import { OnboardingForm } from "@/components/onboarding-form"

export default function OnboardingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-balance">Create your mentee profile</h1>
        <p className="text-muted-foreground">We’ll use this info to recommend mentors who fit your goals.</p>
      </header>
      <OnboardingForm />
    </main>
  )
}
