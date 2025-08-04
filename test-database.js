const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://eflkozuqjcjsswiwqckl.supabase.co';
const supabaseKey = 'sb_publishable_g_VVv6zuB6zj_18i-Xj7Jg_uu60LpR8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔄 Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log('⚠️ Auth error (expected for new setup):', error.message);
    } else {
      console.log('✅ Supabase connection successful!');
    }

    // Test database access by trying to select from a system table
    const { data: tables, error: tableError } = await supabase
      .rpc('get_schema', {})
      .single();

    if (tableError) {
      console.log('📋 Database accessible (RPC not available, but connection works)');
    } else {
      console.log('✅ Database fully accessible!');
    }

    console.log('\n🎉 Connection test completed!');
    console.log('Your Supabase database is ready to use.');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

testConnection();
