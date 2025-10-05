"use client"

import useSWR from "swr"
import { AuthGate } from "@/components/auth/auth-gate"
import { useAuth } from "@/components/auth/auth-provider"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const fetchUserProfile = async (uid: string) => {
  const ref = doc(db, "users", uid)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export default function AccountPage() {
  return (
    <AuthGate>
      <AccountInner />
    </AuthGate>
  )
}

function AccountInner() {
  const { user, signOutUser } = useAuth()
  const uid = user!.uid

  const { data, isLoading, mutate, error } = useSWR(["userProfile", uid], () => fetchUserProfile(uid))

  const [displayName, setDisplayName] = useState((data as any)?.displayName || "")

  const onSave = async () => {
    const ref = doc(db, "users", uid)
    await setDoc(ref, { displayName }, { merge: true })
    await mutate()
  }

  return (
    <main className="container mx-auto max-w-2xl py-10 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Account</h1>
        <Button variant="outline" onClick={() => signOutUser()}>
          Sign out
        </Button>
      </header>

      <section className="grid gap-4 border rounded-md p-4">
        <div>
          <p className="text-sm text-muted-foreground">User ID</p>
          <p className="font-mono text-sm">{uid}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p>{user?.email}</p>
        </div>
      </section>

      <section className="grid gap-3 border rounded-md p-4">
        <h2 className="font-medium">Profile</h2>
        {isLoading ? (
          <p className="text-muted-foreground">Loading profile...</p>
        ) : error ? (
          <p className="text-destructive text-sm">Failed to load profile</p>
        ) : (
          <>
            <Input
              placeholder="Your display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={onSave}>Save</Button>
              <Button variant="ghost" onClick={() => setDisplayName((data as any)?.displayName || "")}>
                Reset
              </Button>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
