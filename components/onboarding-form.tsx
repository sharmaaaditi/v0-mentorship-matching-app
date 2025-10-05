"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { AvailabilityPref, CommunicationPref, ExperienceLevel, MenteeProfile } from "@/lib/types"

export function OnboardingForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [github, setGithub] = useState("")
  const [skillsText, setSkillsText] = useState("React, TypeScript, Git")
  const [availability, setAvailability] = useState<AvailabilityPref>("Weeknights")
  const [communication, setCommunication] = useState<CommunicationPref>("Chat")
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("Beginner")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const skills = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    const profile: MenteeProfile = {
      role: "Mentee",
      name,
      github,
      skills,
      availability,
      communication,
      experienceLevel,
    }

    try {
      localStorage.setItem("mentorlink.profile", JSON.stringify(profile))
    } catch {}

    router.push("/match")
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-balance">Tell us about you</CardTitle>
        <CardDescription>We will use this to suggest mentors who best fit your goals and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Doe" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="github">GitHub (optional)</Label>
            <Input
              id="github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skills">Skills and interests</Label>
            <Input
              id="skills"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="Comma-separated, e.g. React, Python, Git"
            />
            <p className="text-sm text-muted-foreground">
              Tip: include the stack you want to learn and contribute with.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label>Availability</Label>
              <Select value={availability} onValueChange={(v) => setAvailability(v as any)}>
                <SelectTrigger aria-label="Availability">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weeknights">Weeknights</SelectItem>
                  <SelectItem value="Weekends">Weekends</SelectItem>
                  <SelectItem value="Weekdays">Weekdays</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Communication</Label>
              <Select value={communication} onValueChange={(v) => setCommunication(v as any)}>
                <SelectTrigger aria-label="Preferred communication">
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chat">Chat</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Experience level</Label>
              <Select value={experienceLevel} onValueChange={(v) => setExperienceLevel(v as any)}>
                <SelectTrigger aria-label="Experience level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="submit">Find my mentors</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
