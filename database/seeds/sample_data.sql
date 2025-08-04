-- Sample Data for Zira Technologies Database
-- Run this after the main schema to add additional test data

-- Additional sample users
INSERT INTO users (email, full_name, role, phone, company) VALUES 
('john.doe@example.com', 'John Doe', 'customer', '+254 722 123456', 'Tech Solutions Ltd'),
('jane.smith@proptech.co.ke', 'Jane Smith', 'customer', '+254 733 654321', 'Property Masters'),
('mike.johnson@sms.com', 'Mike Johnson', 'customer', '+254 744 987654', 'Communication Plus')
ON CONFLICT (email) DO NOTHING;

-- Additional blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, published, author_id) VALUES 
(
    'SMS Marketing in Kenya: Best Practices',
    'sms-marketing-kenya-best-practices',
    'SMS marketing remains one of the most effective digital marketing channels in Kenya. With mobile penetration exceeding 95%, businesses can reach customers directly through their most personal device.',
    'Learn the best practices for SMS marketing campaigns in the Kenyan market.',
    true,
    (SELECT id FROM users WHERE email = 'admin@ziratech.com' LIMIT 1)
),
(
    'Web Development Trends 2024',
    'web-development-trends-2024',
    'The web development landscape continues to evolve rapidly. From AI-powered development tools to progressive web apps, businesses need to stay ahead of the curve.',
    'Explore the latest web development trends that will shape business websites in 2024.',
    true,
    (SELECT id FROM users WHERE email = 'admin@ziratech.com' LIMIT 1)
),
(
    'Digital Transformation for African SMEs',
    'digital-transformation-african-smes',
    'Small and medium enterprises across Africa are embracing digital transformation to remain competitive. Our platforms provide the tools needed for this transition.',
    'How African SMEs can leverage digital platforms for growth and efficiency.',
    false,
    (SELECT id FROM users WHERE email = 'admin@ziratech.com' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;

-- Sample contact submissions
INSERT INTO contact_submissions (name, email, company, phone, subject, message, service_interest, status) VALUES 
('Alice Wanjiku', 'alice@realtykenya.com', 'Realty Kenya Ltd', '+254 722 111222', 'PropTech Platform Inquiry', 'I am interested in learning more about your property management platform for our real estate business.', 'PropTech Platform', 'new'),
('David Kiprotich', 'david@techstart.co.ke', 'TechStart Kenya', '+254 733 333444', 'Device Financing Options', 'Our startup needs laptops for our team. Can you help with financing options?', 'Device Financing', 'new'),
('Grace Nyong''o', 'grace@marketing.co.ke', 'Marketing Solutions', '+254 744 555666', 'Bulk SMS Service', 'We need a reliable bulk SMS service for our marketing campaigns. What are your rates?', 'Bulk SMS Service', 'new')
ON CONFLICT DO NOTHING;

-- Additional app settings
INSERT INTO app_settings (key, value, description, category, is_public) VALUES 
('maintenance_mode', 'false', 'Enable maintenance mode', 'system', false),
('max_file_upload', '10MB', 'Maximum file upload size', 'system', false),
('smtp_host', 'smtp.gmail.com', 'SMTP server host', 'email', false),
('smtp_port', '587', 'SMTP server port', 'email', false),
('analytics_tracking_id', 'GA-XXXXX-X', 'Google Analytics tracking ID', 'analytics', false),
('blog_posts_per_page', '10', 'Number of blog posts per page', 'content', true),
('contact_form_enabled', 'true', 'Enable contact form', 'features', true),
('newsletter_enabled', 'true', 'Enable newsletter signup', 'features', true)
ON CONFLICT (key) DO NOTHING;

-- Newsletter subscriptions
INSERT INTO newsletter_subscriptions (email, name, status) VALUES 
('subscriber1@example.com', 'Tech Enthusiast', 'active'),
('subscriber2@example.com', 'Property Manager', 'active'),
('subscriber3@example.com', 'Business Owner', 'active')
ON CONFLICT (email) DO NOTHING;

-- Analytics events (sample data)
INSERT INTO analytics_events (event_type, page_url, session_id, properties) VALUES 
('page_view', '/', 'session_' || gen_random_uuid(), '{"user_agent": "Mozilla/5.0", "referrer": "google.com"}'),
('page_view', '/blog', 'session_' || gen_random_uuid(), '{"user_agent": "Mozilla/5.0", "referrer": "direct"}'),
('contact_form_submit', '/contact', 'session_' || gen_random_uuid(), '{"form_id": "contact", "service": "PropTech Platform"}'),
('blog_post_view', '/blog/welcome-to-zira-technologies', 'session_' || gen_random_uuid(), '{"post_id": "welcome-to-zira-technologies", "reading_time": 120}')
ON CONFLICT DO NOTHING;

SELECT 'Sample data inserted successfully! 🎉' as result;
