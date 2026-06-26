import { createClient } from '@supabase/supabase-js';

// Vite lee las variables del .env.local usando import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Creamos e exportamos el cliente para usarlo en cualquier pantalla
export const supabase = createClient(supabaseUrl, supabaseAnonKey);