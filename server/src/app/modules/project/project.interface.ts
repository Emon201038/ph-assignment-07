import { Document } from "mongoose"

export interface IProject extends Document {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  live: string
  featured: boolean
  details: IDetails
}

export interface IDetails {
  techStack: string[]
  features: string[]
  role: string
  duration: {
    from: Date,
    to: Date
  }
}