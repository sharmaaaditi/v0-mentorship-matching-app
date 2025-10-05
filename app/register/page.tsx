"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function RegisterPage() {
  const { signUp } = useAuth()
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
      await signUp(email, password)
      router.push("/account")
    } catch (err: any) {
      setError(err?.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto max-w-md py-10">
      <h1 className="text-2xl font-semibold text-balance mb-6">Create account</h1>
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
          placeholder="Choose a strong password"
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
          {loading ? "Creating..." : "Create account"}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          Sign in
        </Link>
      </p>
    </main>
  )
}
