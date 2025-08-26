import { createClient } from '@supabase/supabase-js';
import { Presentation } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined in .env');
}

interface Database {
  public: {
    Tables: {
      history: {
        Row: {
          id: string;
          user_id: string;
          action: Presentation;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: Presentation;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: Presentation;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
