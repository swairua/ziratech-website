// Mock database service for local development
export const mockDatabase = {
  // Mock user data
  users: [
    { id: '1', email: 'admin@ziratech.com', full_name: 'Admin User' },
    { id: '2', email: 'user@ziratech.com', full_name: 'Regular User' }
  ],

  // Mock blog posts
  blogPosts: [
    {
      id: '1',
      title: 'Welcome to Zira Technologies',
      content: 'We are building the future of African digital platforms...',
      author_id: '1',
      created_at: new Date().toISOString()
    }
  ],

  // Mock authentication
  auth: {
    signIn: async (email: string, password: string) => {
      // Mock sign in
      return { user: mockDatabase.users[0], session: { access_token: 'mock_token' } };
    },
    
    signUp: async (email: string, password: string) => {
      // Mock sign up
      const newUser = {
        id: Date.now().toString(),
        email,
        full_name: email.split('@')[0]
      };
      mockDatabase.users.push(newUser);
      return { user: newUser, session: { access_token: 'mock_token' } };
    },

    signOut: async () => {
      // Mock sign out
      return { error: null };
    }
  }
};
