// Database Connection Test for Zira Technologies
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eflkozuqjcjsswiwqckl.supabase.co';
const supabaseAnonKey = 'sb_publishable_g_VVv6zuB6zj_18i-Xj7Jg_uu60LpR8';

console.log('🔍 Testing Zira Technologies database connection...\n');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  const results = {
    connection: false,
    tables: [],
    errors: []
  };

  try {
    console.log('1. 🔄 Testing basic connection...');
    
    // Test basic connection
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError && !authError.message.includes('session_not_found')) {
      results.errors.push(`Auth error: ${authError.message}`);
    } else {
      results.connection = true;
      console.log('   ✅ Basic connection successful');
    }

    console.log('\n2. 🔄 Testing database access...');
    
    // Test if we can access any tables
    const tablesToTest = ['users', 'blog_posts', 'contact_submissions', 'app_settings'];
    
    for (const table of tablesToTest) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
          
        if (error) {
          if (error.message.includes('relation') && error.message.includes('does not exist')) {
            console.log(`   ⚠️  Table "${table}" does not exist`);
          } else {
            console.log(`   ❌ Table "${table}" error: ${error.message}`);
            results.errors.push(`${table}: ${error.message}`);
          }
        } else {
          console.log(`   ✅ Table "${table}" accessible`);
          results.tables.push(table);
        }
      } catch (e) {
        console.log(`   ❌ Table "${table}" exception: ${e.message}`);
        results.errors.push(`${table}: ${e.message}`);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 CONNECTION TEST SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`🔗 Connection Status: ${results.connection ? '✅ Connected' : '❌ Failed'}`);
    console.log(`🗄️  Tables Found: ${results.tables.length}`);
    console.log(`⚠️  Errors: ${results.errors.length}`);
    
    if (results.tables.length > 0) {
      console.log(`📋 Working Tables: ${results.tables.join(', ')}`);
    }
    
    if (results.errors.length > 0) {
      console.log('\n❌ Issues Found:');
      results.errors.forEach(error => console.log(`   • ${error}`));
    }
    
    console.log('\n🎯 RECOMMENDATIONS:');
    
    if (results.connection && results.tables.length === 0) {
      console.log('✨ Database connected but no tables found.');
      console.log('🔧 Action needed: Run the database schema from database/schema.sql');
      console.log('📍 Go to: https://supabase.com/dashboard/project/eflkozuqjcjsswiwqckl');
      console.log('📝 Copy schema.sql contents and run in SQL Editor');
    } else if (results.connection && results.tables.length > 0) {
      console.log('🎉 Database is working correctly!');
      console.log('🌐 Your website should show "Connected" status');
    } else {
      console.log('🔧 Connection issues detected');
      console.log('📞 Check your Supabase project status and credentials');
    }
    
    console.log('\n📊 Database URL: https://eflkozuqjcjsswiwqckl.supabase.co');
    console.log('🌐 Website URL: https://ddc3bd7fffb1496da342d3c52e31e64a-f8f1c0ababdc4e8890ad6717e.fly.dev');
    
    return results;

  } catch (error) {
    console.error('\n❌ Connection test failed:', error.message);
    return { connection: false, tables: [], errors: [error.message] };
  }
}

testConnection();
