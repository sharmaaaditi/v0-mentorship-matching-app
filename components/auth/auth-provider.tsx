"use client"

import type React from "react"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { auth, db } from "@/lib/firebase"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      signIn: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
      },
      signUp: async (email, password) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        // Create a basic user profile document in Firestore
        const ref = doc(db, "users", cred.user.uid)
        await setDoc(
          ref,
          {
            email,
            createdAt: serverTimestamp(),
          },
          { merge: true },
        )
      },
      signOutUser: async () => {
        await signOut(auth)
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
