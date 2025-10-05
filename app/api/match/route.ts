import { NextResponse } from "next/server"
import { mentors } from "@/data/mentors"
import type { MenteeProfile, MatchResult, MentorProfile } from "@/lib/types"

function computeSkillOverlap(menteeSkills: string[], mentorSkills: string[]) {
  if (!menteeSkills.length) return 0
  const setMentee = new Set(menteeSkills.map((s) => s.toLowerCase().trim()))
  const setMentor = new Set(mentorSkills.map((s) => s.toLowerCase().trim()))
  let common = 0
  setMentee.forEach((s) => {
    if (setMentor.has(s)) common += 1
  })
  return common / setMentee.size
}

function availabilityMatch(a: string, b: string) {
  return a === b ? 1 : 0
}

function communicationMatch(a: string, b: string) {
  return a === b ? 1 : 0
}

function scoreMatch(mentee: MenteeProfile, mentor: MentorProfile): MatchResult {
  const skillOverlap = computeSkillOverlap(mentee.skills, mentor.skills)
  const aMatch = availabilityMatch(mentee.availability, mentor.availability)
  const cMatch = communicationMatch(mentee.communication, mentor.communication)

  const score = skillOverlap * 0.5 + aMatch * 0.3 + cMatch * 0.2

  return {
    mentor,
    score,
    breakdown: {
      skillOverlap,
      availabilityMatch: aMatch,
      communicationMatch: cMatch,
    },
  }
}

export async function POST(req: Request) {
  const body = (await req.json()) as { profile: MenteeProfile }
  const profile = body?.profile
  if (!profile || profile.role !== "Mentee") {
    return NextResponse.json({ error: "Invalid mentee profile" }, { status: 400 })
  }

  const openMentors = mentors.filter((m) => m.openToNewMentees)
  const results = openMentors.map((m) => scoreMatch(profile, m))
  results.sort((a, b) => b.score - a.score)

  // Top 3 suggestions
  const top = results.slice(0, 3)
  return NextResponse.json({ matches: top })
}
