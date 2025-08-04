import { createClient } from '@supabase/supabase-js';
import config, { isDevelopment } from '@/lib/config';

const { url: supabaseUrl, anonKey: supabaseAnonKey } = config.supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env configuration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'zira-auth-token',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Export for debugging purposes
if (isDevelopment) {
  console.log('✅ Supabase Client Initialized:', {
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey,
    environment: config.app.environment
  });
}
