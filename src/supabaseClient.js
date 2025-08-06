import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pidoqbmwqmbiwkbrsags.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZG9xYm13cW1iaXdrYnJzYWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzOTg1MDMsImV4cCI6MjA2OTk3NDUwM30.Br_QY2_9erl957I8b86m-y8egzC3-wU_eJsyZZx_ai4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
