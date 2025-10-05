"use client"

import { type ReactNode, useEffect } from "react"
import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="min-h-[50vh] grid place-items-center text-muted-foreground">
        <span className="animate-pulse">Loading...</span>
      </div>
    )
  }

  if (!user) return null
  return <>{children}</>
}
