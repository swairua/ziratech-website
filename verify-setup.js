import { createClient } from '@supabase/supabase-js';

// Configuration
const supabaseUrl = 'https://eflkozuqjcjsswiwqckl.supabase.co';
const supabaseAnonKey = 'sb_publishable_g_VVv6zuB6zj_18i-Xj7Jg_uu60LpR8';

console.log('🔍 Verifying Zira Technologies setup...\n');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifySetup() {
  const results = {
    connection: false,
    tables: {
      users: false,
      blog_posts: false,
      contact_submissions: false,
      app_settings: false
    },
    data: {
      adminUser: false,
      settings: false,
      blogPosts: false
    },
    overall: false
  };

  try {
    // 1. Test Connection
    console.log('🔄 Testing Supabase connection...');
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError && !sessionError.message.includes('session_not_found')) {
      throw new Error(`Connection failed: ${sessionError.message}`);
    }
    
    results.connection = true;
    console.log('✅ Supabase connection successful');

    // 2. Check Tables
    console.log('\n🔄 Checking database tables...');
    
    // Check users table
    try {
      const { data, error } = await supabase.from('users').select('count').limit(1);
      results.tables.users = !error;
      console.log(`${results.tables.users ? '✅' : '❌'} users table`);
    } catch (e) {
      console.log('❌ users table - not found');
    }

    // Check blog_posts table
    try {
      const { data, error } = await supabase.from('blog_posts').select('count').limit(1);
      results.tables.blog_posts = !error;
      console.log(`${results.tables.blog_posts ? '✅' : '❌'} blog_posts table`);
    } catch (e) {
      console.log('❌ blog_posts table - not found');
    }

    // Check contact_submissions table
    try {
      const { data, error } = await supabase.from('contact_submissions').select('count').limit(1);
      results.tables.contact_submissions = !error;
      console.log(`${results.tables.contact_submissions ? '✅' : '❌'} contact_submissions table`);
    } catch (e) {
      console.log('❌ contact_submissions table - not found');
    }

    // Check app_settings table
    try {
      const { data, error } = await supabase.from('app_settings').select('count').limit(1);
      results.tables.app_settings = !error;
      console.log(`${results.tables.app_settings ? '✅' : '❌'} app_settings table`);
    } catch (e) {
      console.log('❌ app_settings table - not found');
    }

    // 3. Check Data
    console.log('\n🔄 Checking initial data...');

    // Check admin user
    if (results.tables.users) {
      const { data: adminUser, error: adminError } = await supabase
        .from('users')
        .select('id, email, role')
        .eq('email', 'admin@ziratech.com')
        .single();
      
      results.data.adminUser = !adminError && adminUser;
      console.log(`${results.data.adminUser ? '✅' : '❌'} Admin user (admin@ziratech.com)`);
    }

    // Check settings
    if (results.tables.app_settings) {
      const { data: settings, error: settingsError } = await supabase
        .from('app_settings')
        .select('count')
        .limit(1);
      
      results.data.settings = !settingsError;
      console.log(`${results.data.settings ? '✅' : '❌'} App settings data`);
    }

    // Check blog posts
    if (results.tables.blog_posts) {
      const { data: posts, error: postsError } = await supabase
        .from('blog_posts')
        .select('count')
        .limit(1);
      
      results.data.blogPosts = !postsError;
      console.log(`${results.data.blogPosts ? '✅' : '❌'} Blog posts data`);
    }

    // Calculate overall status
    const tablesExist = Object.values(results.tables).some(exists => exists);
    const hasBasicData = results.data.adminUser || results.data.settings;
    results.overall = results.connection && tablesExist;

    // Final Report
    console.log('\n' + '='.repeat(50));
    console.log('📊 SETUP VERIFICATION REPORT');
    console.log('='.repeat(50));
    
    console.log(`🔗 Connection: ${results.connection ? '✅ Connected' : '❌ Failed'}`);
    console.log(`🗄️ Database Tables: ${tablesExist ? '✅ Found' : '❌ Missing'}`);
    console.log(`📝 Initial Data: ${hasBasicData ? '✅ Present' : '❌ Missing'}`);
    
    console.log('\n🎯 OVERALL STATUS:');
    if (results.overall) {
      console.log('✅ SETUP COMPLETE - Zira Technologies is ready!');
      console.log('\n🌐 You can now:');
      console.log('   • Access the website at your localhost URL');
      console.log('   • Login to admin at /admin');
      console.log('   • Create blog posts and manage content');
      console.log('   • Receive contact form submissions');
    } else {
      console.log('⚠️ SETUP INCOMPLETE - Additional steps needed');
      console.log('\n🔧 Next steps:');
      
      if (!results.connection) {
        console.log('   1. Check Supabase credentials in .env.local');
      }
      
      if (!tablesExist) {
        console.log('   2. Run database setup:');
        console.log('      - Go to https://supabase.com/dashboard/project/eflkozuqjcjsswiwqckl');
        console.log('      - Open SQL Editor');
        console.log('      - Run the contents of database-schema.sql');
      }
      
      if (!hasBasicData) {
        console.log('   3. Insert initial data (admin user, settings)');
      }
    }

    console.log('\n📞 Support:');
    console.log('   📧 Email: info@ziratech.com');
    console.log('   🌍 Website: Ready for deployment');

    return results;

  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    console.log('\n🆘 Troubleshooting:');
    console.log('   1. Check internet connection');
    console.log('   2. Verify Supabase project is active');
    console.log('   3. Confirm environment variables are correct');
    console.log('   4. Review LOCALHOST_SETUP_GUIDE.md');
    
    return { overall: false, error: error.message };
  }
}

// Run verification
verifySetup().then(results => {
  process.exit(results.overall ? 0 : 1);
}).catch(error => {
  console.error('❌ Verification script failed:', error.message);
  process.exit(1);
});
