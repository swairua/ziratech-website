import { supabase } from '@/integrations/supabase/client';
import { mockDatabase } from './mockDatabase';

const isDevelopment = import.meta.env.MODE === 'development';
const useMock = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co';

export const database = {
  auth: {
    signIn: async (email: string, password: string) => {
      if (useMock) {
        return mockDatabase.auth.signIn(email, password);
      }
      return await supabase.auth.signInWithPassword({ email, password });
    },

    signUp: async (email: string, password: string) => {
      if (useMock) {
        return mockDatabase.auth.signUp(email, password);
      }
      return await supabase.auth.signUp({ email, password });
    },

    signOut: async () => {
      if (useMock) {
        return mockDatabase.auth.signOut();
      }
      return await supabase.auth.signOut();
    },

    getUser: () => {
      if (useMock) {
        return { data: { user: mockDatabase.users[0] } };
      }
      return supabase.auth.getUser();
    }
  },

  blog: {
    getPosts: async () => {
      if (useMock) {
        return { data: mockDatabase.blogPosts, error: null };
      }
      return await supabase.from('blog_posts').select('*');
    }
  }
};
