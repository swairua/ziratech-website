-- Zira Technologies Database Schema
-- PostgreSQL Database Setup for Ziratech Website

-- Create Users table
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

-- Create Blog Posts table
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

-- Create Contact Submissions table
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

-- Create App Settings table
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

-- Create User Sessions table
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

-- Create Newsletter Subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    preferences JSONB DEFAULT '{}',
    subscribed_at TIMESTAMP DEFAULT NOW(),
    unsubscribed_at TIMESTAMP
);

-- Create Analytics Events table
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

-- Create Services table (for your different platforms)
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    features TEXT[],
    pricing_model VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Performance indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_app_settings_key ON app_settings(key);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);

-- Insert default app settings
INSERT INTO app_settings (key, value, description, category, is_public) VALUES 
('site_name', 'Zira Technologies', 'Website name', 'general', true),
('tagline', 'Smart Digital Platforms for Africa', 'Website tagline', 'general', true),
('admin_email', 'admin@ziratech.com', 'Admin contact email', 'contact', false),
('support_email', 'support@ziratech.com', 'Support email', 'contact', true),
('company_address', 'Nairobi, Kenya', 'Company address', 'contact', true),
('company_phone', '+254 700 000 000', 'Company phone number', 'contact', true),
('social_twitter', '@zira_tech', 'Twitter handle', 'social', true),
('social_linkedin', 'zira-technologies', 'LinkedIn profile', 'social', true),
('social_facebook', 'ziratechnologies', 'Facebook page', 'social', true),
('hero_title', 'Build. Scale. Dominate.', 'Hero section title', 'content', true),
('hero_subtitle', 'Four powerful platforms. One vision.', 'Hero section subtitle', 'content', true),
('about_description', 'We build smart digital platforms that solve real problems for businesses across Africa.', 'About description', 'content', true),
('contact_description', 'Ready to transform your business? Get in touch with our team.', 'Contact section description', 'content', true)
ON CONFLICT (key) DO NOTHING;

-- Insert default services/platforms
INSERT INTO services (name, description, icon, features, pricing_model, status) VALUES 
(
    'PropTech Platform',
    'Comprehensive property management solution',
    'building',
    ARRAY['Property Listings', 'Tenant Management', 'Maintenance Tracking', 'Financial Reports'],
    'subscription',
    'active'
),
(
    'Device Financing',
    'Flexible device financing solutions',
    'credit-card',
    ARRAY['Flexible Payment Plans', 'Quick Approval', 'Device Insurance', 'Credit Scoring'],
    'commission',
    'active'
),
(
    'Bulk SMS Service',
    'Reliable SMS communication platform',
    'message-circle',
    ARRAY['Bulk Messaging', 'API Integration', 'Delivery Reports', 'Contact Management'],
    'pay-per-use',
    'active'
),
(
    'Web Development',
    'Custom web solutions for businesses',
    'code',
    ARRAY['Custom Development', 'E-commerce Solutions', 'Mobile Apps', 'Maintenance Support'],
    'project-based',
    'active'
)
ON CONFLICT DO NOTHING;

-- Insert a default admin user
INSERT INTO users (email, full_name, role) VALUES 
('admin@ziratech.com', 'Zira Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, published, author_id) VALUES 
(
    'Welcome to Zira Technologies',
    'welcome-to-zira-technologies',
    'We are excited to announce the launch of Zira Technologies, your partner in digital transformation across Africa. Our mission is to build smart digital platforms that solve real business problems.',
    'Introducing Zira Technologies - Building smart digital platforms for Africa.',
    true,
    (SELECT id FROM users WHERE email = 'admin@ziratech.com' LIMIT 1)
),
(
    'The Future of PropTech in Kenya',
    'future-of-proptech-kenya',
    'Property technology is revolutionizing how we manage, buy, and sell real estate in Kenya. Our PropTech platform offers comprehensive solutions for property managers and real estate professionals.',
    'Exploring how technology is transforming Kenya''s real estate sector.',
    true,
    (SELECT id FROM users WHERE email = 'admin@ziratech.com' LIMIT 1)
),
(
    'Device Financing: Making Technology Accessible',
    'device-financing-accessible-technology',
    'Access to technology shouldn''t be limited by upfront costs. Our device financing platform makes smartphones, laptops, and other devices accessible through flexible payment plans.',
    'Learn how device financing is making technology accessible to more people.',
    true,
    (SELECT id FROM users WHERE email = 'admin@ziratech.com' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

-- Create a view for published blog posts with author info
CREATE OR REPLACE VIEW published_blog_posts AS
SELECT 
    bp.id,
    bp.title,
    bp.slug,
    bp.content,
    bp.excerpt,
    bp.featured_image,
    bp.tags,
    bp.views,
    bp.created_at,
    bp.updated_at,
    u.full_name as author_name,
    u.avatar_url as author_avatar
FROM blog_posts bp
JOIN users u ON bp.author_id = u.id
WHERE bp.published = true
ORDER BY bp.created_at DESC;

-- Create a view for contact submissions with stats
CREATE OR REPLACE VIEW contact_stats AS
SELECT 
    status,
    COUNT(*) as count,
    DATE_TRUNC('day', created_at) as date
FROM contact_submissions
GROUP BY status, DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- Add some useful functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_app_settings_updated_at BEFORE UPDATE ON app_settings
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable Row Level Security (RLS) for better security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to published content
CREATE POLICY "Public blog posts are viewable by everyone" 
    ON blog_posts FOR SELECT 
    USING (published = true);

CREATE POLICY "Users can view their own data" 
    ON users FOR SELECT 
    USING (auth.uid() = id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;

-- Success message
SELECT 'Database schema created successfully! 🎉' as result;
