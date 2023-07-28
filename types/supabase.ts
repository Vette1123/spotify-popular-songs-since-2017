export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      spotify: {
        Row: {
          addedAT: string | null
          albumImage: string | null
          albumName: string | null
          albumURL: string | null
          artistName: string | null
          artistURL: string | null
          id: number
          trackName: string | null
          trackURL: string | null
        }
        Insert: {
          addedAT?: string | null
          albumImage?: string | null
          albumName?: string | null
          albumURL?: string | null
          artistName?: string | null
          artistURL?: string | null
          id?: number
          trackName?: string | null
          trackURL?: string | null
        }
        Update: {
          addedAT?: string | null
          albumImage?: string | null
          albumName?: string | null
          albumURL?: string | null
          artistName?: string | null
          artistURL?: string | null
          id?: number
          trackName?: string | null
          trackURL?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export interface SpotifyRow {
  addedAT?: string | null
  albumImage?: string | null
  albumName?: string | null
  albumURL?: string | null
  artistName?: string | null
  artistURL?: string | null
  id?: number
  trackName?: string | null
  trackURL?: string | null
}
