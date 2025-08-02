import { createClient } from "@supabase/supabase-js";
import { ChromeStorageAdapter } from "./extention-storage-adapter";


const supabaseUrl = "https://sssymzkmquyikwpybffh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzc3ltemttcXV5aWt3cHliZmZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MzYwNTgsImV4cCI6MjA2ODUxMjA1OH0.z8vFRb4Pv9IKt73P9UgcDHlpeehWVKRLwkmH5t-rEFo";

console.log(supabaseUrl, supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new ChromeStorageAdapter(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, 
  },
});


export const initializeSupabaseClient = async () => {
  try {
    // Get the current session to initialize the client
    const { data: { session } } = await supabase.auth.getSession();
    return { session, error: null };
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return { session: null, error };
  }
};

// Helper to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session?.user;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
};

// Helper to get current user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  } catch (error) {
    console.error('Get user failed:', error);
    return { user: null, error };
  }
};