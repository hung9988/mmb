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
      activities: {
        Row: {
          desc: string | null
          finish_time: string | null
          id: number
          image: string | null
          name: string | null
          place: string | null
          start_time: string | null
        }
        Insert: {
          desc?: string | null
          finish_time?: string | null
          id?: number
          image?: string | null
          name?: string | null
          place?: string | null
          start_time?: string | null
        }
        Update: {
          desc?: string | null
          finish_time?: string | null
          id?: number
          image?: string | null
          name?: string | null
          place?: string | null
          start_time?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          "tong drl": number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          "tong drl"?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          "tong drl"?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
