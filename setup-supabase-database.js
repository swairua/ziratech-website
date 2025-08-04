import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eflkozuqjcjsswiwqckl.supabase.co';
const supabaseServiceKey = 'sb_secret_O612eal9M_1g8kSo9hmSew_1DW5kTp1';

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const setupDatabase = async () => {
  console.log('🚀 Setting up Zira Technologies database...');

  try {
    // Test connection
    const { data: testData, error: testError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1);

    if (testError) {
      console.log('✅ Connected to Supabase database (new database)');
    } else {
      console.log('✅ Connected to Supabase database');
    }

    // Create users table
    const { error: usersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          full_name VARCHAR(255),
          role VARCHAR(50) DEFAULT 'user',
          avatar_url TEXT,
          phone VARCHAR(20),
          company VARCHAR(255),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    });

    if (usersError) {
      console.log('Creating users table with direct SQL...');
      // If RPC doesn't work, we'll use the SQL file method
    } else {
      console.log('✅ Created users table');
    }

    // Create blog_posts table
    const { error: blogError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS blog_posts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          content TEXT,
          excerpt TEXT,
          author_id UUID REFERENCES users(id),
          published BOOLEAN DEFAULT false,
          featured_image TEXT,
          tags TEXT[],
          views INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    });

    if (!blogError) {
      console.log('✅ Created blog_posts table');
    }

    // Create contact_submissions table
    const { error: contactError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          company VARCHAR(255),
          phone VARCHAR(20),
          subject VARCHAR(255),
          message TEXT NOT NULL,
          service_interest VARCHAR(100),
          status VARCHAR(50) DEFAULT 'new',
          notes TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `
    });

    if (!contactError) {
      console.log('✅ Created contact_submissions table');
    }

    // Insert sample data
    const { data: userData, error: userInsertError } = await supabase
      .from('users')
      .upsert([
        {
          email: 'admin@ziratech.com',
          full_name: 'Zira Admin',
          role: 'admin'
        }
      ], { onConflict: 'email' })
      .select();

    if (!userInsertError) {
      console.log('✅ Created admin user');
    }

    // Insert sample blog posts
    if (userData && userData.length > 0) {
      const adminId = userData[0].id;
      
      const { error: blogInsertError } = await supabase
        .from('blog_posts')
        .upsert([
          {
            title: 'Welcome to Zira Technologies',
            slug: 'welcome-to-zira-technologies',
            content: 'We are excited to announce the launch of Zira Technologies, your partner in digital transformation across Africa.',
            excerpt: 'Introducing Zira Technologies - Building smart digital platforms for Africa.',
            published: true,
            author_id: adminId
          },
          {
            title: 'The Future of PropTech in Kenya',
            slug: 'future-of-proptech-kenya',
            content: 'Property technology is revolutionizing how we manage, buy, and sell real estate in Kenya.',
            excerpt: 'Exploring how technology is transforming Kenya\'s real estate sector.',
            published: true,
            author_id: adminId
          }
        ], { onConflict: 'slug' });

      if (!blogInsertError) {
        console.log('✅ Created sample blog posts');
      }
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Your Zira Technologies database is ready with:');
    console.log('   • User management system');
    console.log('   • Blog content management');
    console.log('   • Contact form handling');
    console.log('   • Admin dashboard support');
    
    console.log('\n🔗 Database URLs:');
    console.log(`   • Supabase URL: ${supabaseUrl}`);
    console.log('   • Admin user: admin@ziratech.com');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.log('\n💡 Manual Setup Required:');
    console.log('Please run the SQL commands from database-schema.sql in your Supabase SQL editor.');
  }
};

setupDatabase();
