import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-8 grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <p className="font-semibold">MentorLink</p>
          <p className="text-sm text-muted-foreground">
            Matching newcomers to mentors for meaningful open‑source contributions.
          </p>
        </div>
        <div className="grid gap-2">
          <p className="font-medium">Product</p>
          <Link className="text-sm text-muted-foreground hover:underline underline-offset-4" href="/onboarding">
            Onboarding
          </Link>
          <Link className="text-sm text-muted-foreground hover:underline underline-offset-4" href="/match">
            Matches
          </Link>
        </div>
        <div className="grid gap-2">
          <p className="font-medium">Support</p>
          <a
            className="text-sm text-muted-foreground hover:underline underline-offset-4"
            href="https://vercel.com/help"
            target="_blank"
            rel="noopener noreferrer"
          >
            Help & Support
          </a>
          <Link className="text-sm text-muted-foreground hover:underline underline-offset-4" href="/">
            Status
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} MentorLink. All rights reserved.
      </div>
    </footer>
  )
}
