"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="MentorLink home">
          <Image src="/placeholder-logo.svg" alt="MentorLink logo" width={28} height={28} />
          <span className="font-semibold">MentorLink</span>
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          <Link className="text-sm hover:underline underline-offset-4" href="/onboarding">
            Onboarding
          </Link>
          <Link className="text-sm hover:underline underline-offset-4" href="/match">
            Matches
          </Link>
          <Link className="text-sm hover:underline underline-offset-4" href="/chat">
            Chat
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href="/onboarding">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
