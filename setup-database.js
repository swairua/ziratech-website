const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Sirgeorge.12@db.eflkozuqjcjsswiwqckl.supabase.co:5432/postgres';

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const createTables = async () => {
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL database');

    // Create Users table
    await client.query(`
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
    `);
    console.log('✅ Created users table');

    // Create Blog Posts table
    await client.query(`
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
    `);
    console.log('✅ Created blog_posts table');

    // Create Contact Submissions table
    await client.query(`
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
    `);
    console.log('✅ Created contact_submissions table');

    // Create App Settings table
    await client.query(`
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
    `);
    console.log('✅ Created app_settings table');

    // Create User Sessions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        refresh_token VARCHAR(255),
        ip_address INET,
        user_agent TEXT,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created user_sessions table');

    // Create Newsletter Subscriptions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active',
        preferences JSONB DEFAULT '{}',
        subscribed_at TIMESTAMP DEFAULT NOW(),
        unsubscribed_at TIMESTAMP
      );
    `);
    console.log('✅ Created newsletter_subscriptions table');

    // Create Analytics Events table
    await client.query(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_type VARCHAR(100) NOT NULL,
        page_url TEXT,
        user_id UUID REFERENCES users(id),
        session_id VARCHAR(255),
        ip_address INET,
        user_agent TEXT,
        referrer TEXT,
        properties JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created analytics_events table');

    // Insert default settings
    await client.query(`
      INSERT INTO app_settings (key, value, description, category, is_public) VALUES 
      ('site_name', 'Zira Technologies', 'Website name', 'general', true),
      ('admin_email', 'admin@ziratech.com', 'Admin contact email', 'contact', false),
      ('company_address', 'Nairobi, Kenya', 'Company address', 'contact', true),
      ('company_phone', '+254 XXX XXX XXX', 'Company phone number', 'contact', true),
      ('social_twitter', '@zira_tech', 'Twitter handle', 'social', true),
      ('social_linkedin', 'zira-technologies', 'LinkedIn profile', 'social', true),
      ('hero_title', 'Build. Scale. Dominate.', 'Hero section title', 'content', true),
      ('hero_subtitle', 'Four powerful platforms. One vision.', 'Hero section subtitle', 'content', true)
      ON CONFLICT (key) DO NOTHING;
    `);
    console.log('✅ Inserted default settings');

    // Create indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
      CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
      CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
      CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
      CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);
    `);
    console.log('✅ Created database indexes');

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Tables created:');
    console.log('   • users - User accounts and profiles');
    console.log('   • blog_posts - Blog content management');
    console.log('   • contact_submissions - Contact form data');
    console.log('   • app_settings - Application configuration');
    console.log('   • user_sessions - Session management');
    console.log('   • newsletter_subscriptions - Email subscriptions');
    console.log('   • analytics_events - Usage analytics');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
  } finally {
    await client.end();
  }
};

createTables();
