export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  category: string
  coverImage: string
  tags: string[]
  role: string
  year: string
  link?: string
  repo?: string
  featured?: boolean
}

export interface Profile {
  name: string
  role: string
  tagline: string
  bio: string
  email: string
  location: string
  photo: string | null // data URL (jpg/png/gif) atau null jika belum diunggah
  skills: string[]
  social: {
    twitter?: string
    github?: string
    instagram?: string
  }
}

export interface GuestComment {
  id: string
  name: string
  message: string
  created_at: string
}

export interface GalleryImage {
  id: string
  url: string
  created_at: string
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}
