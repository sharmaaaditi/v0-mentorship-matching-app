export type CommunicationPref = "Chat" | "Video" | "Email"
export type AvailabilityPref = "Weeknights" | "Weekends" | "Weekdays" | "Flexible"
export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced"

export type Role = "Mentee" | "Mentor"

export interface BaseProfile {
  name: string
  github?: string
  skills: string[] // e.g. ["React","Python","Git"]
  availability: AvailabilityPref
  communication: CommunicationPref
}

export interface MenteeProfile extends BaseProfile {
  role: "Mentee"
  experienceLevel: ExperienceLevel
}

export interface MentorProfile extends BaseProfile {
  role: "Mentor"
  languages?: string[]
  openToNewMentees: boolean
  endorsements?: number
  menteeCount?: number
}

export interface MatchResult {
  mentor: MentorProfile
  score: number
  breakdown: {
    skillOverlap: number
    availabilityMatch: number
    communicationMatch: number
  }
}
