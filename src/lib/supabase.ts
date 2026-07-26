import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  guests: number;
  message: string | null;
  status: string;
  created_at: string;
};

export type ReservationInput = Omit<Reservation, 'id' | 'status' | 'created_at'>;
