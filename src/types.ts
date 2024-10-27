export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: Organizer
  images: string[]
}

export interface Student {
  id: number
  studentId: string
  name: string
  surname: string
  gpa: number
  penAmount: number
  description: string
}

export interface Organizer {
  id: number
  name: string
  images: string[]
  roles: string[]
}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}
