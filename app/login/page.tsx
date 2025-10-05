"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  const { signIn } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
      router.push("/account")
    } catch (err: any) {
      setError(err?.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto max-w-md py-10">
      <h1 className="text-2xl font-semibold text-balance mb-6">Sign in</h1>
      <form onSubmit={onSubmit} className="grid gap-4">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <p className="text-sm text-destructive" aria-live="polite">
            {error}
          </p>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground mt-4">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/register">
          Create one
        </Link>
      </p>
    </main>
  )
}
