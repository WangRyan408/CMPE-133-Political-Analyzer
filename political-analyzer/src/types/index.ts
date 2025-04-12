export type PoliticalLeaning = "Far Left" | "Left" | "Moderate" | "Right" | "Far Right"

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  createdAt: Date
}

export interface Article {
  id: string
  title: string
  url: string
  source: string
  date: string
  leaning: PoliticalLeaning
  content?: string
  politicalTerms?: PoliticalTerm[]
  userId?: string
}

export interface PoliticalTerm {
  term: string
  count: number
  leaning: "left" | "right"
}

export interface AnalysisResult {
  leaning: PoliticalLeaning
  leaningScore: number // 0-100 scale
  confidence: number // 0-100 scale
  keyTerms: PoliticalTerm[]
  sourceInfo: {
    publication: string
    knownBias: string
    publishedDate: string
    author: string
  }
}

export interface UserStats {
  totalUsers: number
  activeUsers: number
  growthRate: number
}

export interface ArticleStats {
  totalAnalyzed: number
  savedCount: number
  growthRate: number
}

export interface PoliticalDistribution {
  farLeft: number
  left: number
  moderate: number
  right: number
  farRight: number
}

export interface NewsSource {
  name: string
  count: number
  percentage: number
}
