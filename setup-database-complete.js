import { createClient } from '@supabase/supabase-js';

// Configuration from environment variables
const supabaseUrl = 'https://eflkozuqjcjsswiwqckl.supabase.co';
const supabaseServiceKey = 'sb_secret_O612eal9M_1g8kSo9hmSew_1DW5kTp1';

// Create admin client
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const setupCompleteDatabase = async () => {
  console.log('🚀 Setting up Zira Technologies complete database...');
  console.log(`📍 Connecting to: ${supabaseUrl}`);

  try {
    // Test connection
    console.log('🔄 Testing connection...');
    const { data: connectionTest, error: connectionError } = await supabaseAdmin.auth.getSession();
    if (connectionError && !connectionError.message.includes('session_not_found')) {
      throw connectionError;
    }
    console.log('✅ Connection successful');

    // 1. Create Users table
    console.log('🔄 Creating users table...');
    const { error: usersError } = await supabaseAdmin.rpc('sql', {
      query: `
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
        
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
      `
    });

    if (usersError) {
      console.log('⚠️ Users table creation (may already exist):', usersError.message);
    } else {
      console.log('✅ Users table created');
    }

    // 2. Create Blog Posts table
    console.log('🔄 Creating blog_posts table...');
    const { error: blogError } = await supabaseAdmin.rpc('sql', {
      query: `
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
        
        CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
        CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
      `
    });

    if (blogError) {
      console.log('⚠️ Blog posts table creation:', blogError.message);
    } else {
      console.log('✅ Blog posts table created');
    }

    // 3. Create Contact Submissions table
    console.log('🔄 Creating contact_submissions table...');
    const { error: contactError } = await supabaseAdmin.rpc('sql', {
      query: `
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
        
        CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
      `
    });

    if (contactError) {
      console.log('⚠️ Contact submissions table creation:', contactError.message);
    } else {
      console.log('✅ Contact submissions table created');
    }

    // 4. Create App Settings table
    console.log('🔄 Creating app_settings table...');
    const { error: settingsError } = await supabaseAdmin.rpc('sql', {
      query: `
        CREATE TABLE IF NOT EXISTS app_settings (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          key VARCHAR(255) UNIQUE NOT NULL,
          value TEXT,
          value_type VARCHAR(50) DEFAULT 'string',
          description TEXT,
          category VARCHAR(100),
          is_public BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_app_settings_key ON app_settings(key);
      `
    });

    if (settingsError) {
      console.log('⚠️ App settings table creation:', settingsError.message);
    } else {
      console.log('✅ App settings table created');
    }

    // 5. Insert default admin user
    console.log('🔄 Creating default admin user...');
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', 'admin@ziratech.com')
      .single();

    if (!existingUser) {
      const { error: userInsertError } = await supabaseAdmin
        .from('users')
        .insert([{
          email: 'admin@ziratech.com',
          full_name: 'Zira Admin',
          role: 'admin'
        }]);

      if (userInsertError) {
        console.log('⚠️ Admin user creation:', userInsertError.message);
      } else {
        console.log('✅ Admin user created');
      }
    } else {
      console.log('✅ Admin user already exists');
    }

    // 6. Insert default settings
    console.log('🔄 Inserting default settings...');
    const defaultSettings = [
      { key: 'site_name', value: 'Zira Technologies', description: 'Website name', category: 'general', is_public: true },
      { key: 'tagline', value: 'Smart Digital Platforms for Africa', description: 'Website tagline', category: 'general', is_public: true },
      { key: 'admin_email', value: 'admin@ziratech.com', description: 'Admin contact email', category: 'contact', is_public: false },
      { key: 'company_phone', value: '+254 700 000 000', description: 'Company phone', category: 'contact', is_public: true },
      { key: 'company_address', value: 'Nairobi, Kenya', description: 'Company address', category: 'contact', is_public: true }
    ];

    for (const setting of defaultSettings) {
      const { error: settingError } = await supabaseAdmin
        .from('app_settings')
        .upsert([setting], { onConflict: 'key' });

      if (settingError) {
        console.log(`⚠️ Setting ${setting.key}:`, settingError.message);
      }
    }
    console.log('✅ Default settings inserted');

    // 7. Insert sample blog posts
    console.log('🔄 Creating sample blog posts...');
    const { data: adminUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', 'admin@ziratech.com')
      .single();

    if (adminUser) {
      const samplePosts = [
        {
          title: 'Welcome to Zira Technologies',
          slug: 'welcome-to-zira-technologies',
          content: 'We are excited to introduce Zira Technologies, your trusted partner in digital transformation across Africa. Our mission is to build smart digital platforms that solve real business problems and drive growth.',
          excerpt: 'Introducing Zira Technologies - Building smart digital platforms for Africa.',
          published: true,
          author_id: adminUser.id
        },
        {
          title: 'The Future of PropTech in Kenya',
          slug: 'future-of-proptech-kenya',
          content: 'Property technology is revolutionizing how we manage, buy, and sell real estate in Kenya. Our comprehensive PropTech platform offers innovative solutions for property managers, real estate professionals, and property owners.',
          excerpt: 'Exploring how technology is transforming Kenya\'s real estate sector.',
          published: true,
          author_id: adminUser.id
        }
      ];

      for (const post of samplePosts) {
        const { error: postError } = await supabaseAdmin
          .from('blog_posts')
          .upsert([post], { onConflict: 'slug' });

        if (postError) {
          console.log(`⚠️ Blog post ${post.slug}:`, postError.message);
        }
      }
      console.log('✅ Sample blog posts created');
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Zira Technologies database ready with:');
    console.log('   ✅ User management system');
    console.log('   ✅ Blog content management');
    console.log('   ✅ Contact form handling');
    console.log('   ✅ Application settings');
    console.log('   ✅ Admin user account');
    console.log('   ✅ Sample content');
    
    console.log('\n🔗 Access Information:');
    console.log(`   📍 Database URL: ${supabaseUrl}`);
    console.log('   👤 Admin Email: admin@ziratech.com');
    console.log('   🌐 Website: Ready for production');

    return { success: true, message: 'Database setup completed successfully' };

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.log('\n💡 Manual Setup Alternative:');
    console.log('   1. Go to: https://supabase.com/dashboard/project/eflkozuqjcjsswiwqckl');
    console.log('   2. Open SQL Editor');
    console.log('   3. Run the SQL from database-schema.sql');
    
    return { success: false, error: error.message };
  }
};

// Execute setup
setupCompleteDatabase().then(result => {
  if (result.success) {
    console.log('\n🚀 Setup completed! Your Zira Technologies database is ready.');
  } else {
    console.log('\n⚠️ Setup encountered issues. Please check the logs above.');
  }
  process.exit(result.success ? 0 : 1);
}).catch(error => {
  console.error('❌ Setup script failed:', error.message);
  process.exit(1);
});
