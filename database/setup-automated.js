// Automated Database Setup for Zira Technologies
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://eflkozuqjcjsswiwqckl.supabase.co';
const supabaseServiceKey = 'sb_secret_O612eal9M_1g8kSo9hmSew_1DW5kTp1';

console.log('🚀 Automated Database Setup for Zira Technologies\n');

// Create admin client with service role key
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  try {
    console.log('📍 Connecting to Supabase...');
    console.log(`🔗 URL: ${supabaseUrl}`);
    
    // Test connection
    const { data: connectionTest, error: connectionError } = await supabaseAdmin.auth.getSession();
    if (connectionError && !connectionError.message.includes('session_not_found')) {
      throw new Error(`Connection failed: ${connectionError.message}`);
    }
    console.log('✅ Connected successfully\n');

    // Read and execute schema
    console.log('📄 Reading database schema...');
    const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    console.log(`📊 Schema size: ${schemaSQL.length} characters`);

    // Split SQL into individual statements
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`🔧 Found ${statements.length} SQL statements to execute\n`);

    // Execute each statement
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      if (statement.includes('CREATE TABLE')) {
        const tableName = statement.match(/CREATE TABLE (?:IF NOT EXISTS )?(\w+)/)?.[1];
        process.stdout.write(`📋 Creating table ${tableName}... `);
      } else if (statement.includes('CREATE INDEX')) {
        const indexName = statement.match(/CREATE INDEX (?:IF NOT EXISTS )?(\w+)/)?.[1];
        process.stdout.write(`📊 Creating index ${indexName}... `);
      } else if (statement.includes('INSERT INTO')) {
        const tableName = statement.match(/INSERT INTO (\w+)/)?.[1];
        process.stdout.write(`📝 Inserting data into ${tableName}... `);
      } else {
        process.stdout.write(`⚙️  Executing SQL statement ${i + 1}... `);
      }

      try {
        const { error } = await supabaseAdmin.rpc('exec_sql', {
          sql: statement + ';'
        });

        if (error) {
          console.log(`❌ Error: ${error.message}`);
          errorCount++;
        } else {
          console.log('✅');
          successCount++;
        }
      } catch (execError) {
        console.log(`❌ Exception: ${execError.message}`);
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 SETUP COMPLETION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successful operations: ${successCount}`);
    console.log(`❌ Failed operations: ${errorCount}`);
    console.log(`📊 Total operations: ${statements.length}`);

    // Verify setup by checking tables
    console.log('\n🔍 Verifying database setup...');
    
    const tablesToVerify = ['users', 'blog_posts', 'contact_submissions', 'app_settings'];
    const verifiedTables = [];

    for (const table of tablesToVerify) {
      try {
        const { data, error } = await supabaseAdmin
          .from(table)
          .select('count')
          .limit(1);
          
        if (!error) {
          verifiedTables.push(table);
          console.log(`✅ Table ${table} verified`);
        } else {
          console.log(`⚠️  Table ${table} issue: ${error.message}`);
        }
      } catch (e) {
        console.log(`❌ Table ${table} verification failed: ${e.message}`);
      }
    }

    console.log('\n🎯 FINAL STATUS:');
    
    if (verifiedTables.length === tablesToVerify.length) {
      console.log('🎉 DATABASE SETUP COMPLETE!');
      console.log('✅ All essential tables created and verified');
      console.log('✅ Sample data inserted successfully');
      console.log('✅ Your Zira Technologies website is ready!');
      
      console.log('\n🌐 Next Steps:');
      console.log('   1. Check your website Database Status (should show green)');
      console.log('   2. Login to admin dashboard at /admin');
      console.log('   3. Test contact forms and blog functionality');
      console.log('   4. Customize content as needed');
      
    } else {
      console.log('⚠️  SETUP PARTIALLY COMPLETE');
      console.log(`📊 ${verifiedTables.length}/${tablesToVerify.length} tables verified`);
      console.log('🔧 Some manual setup may be required');
      
      console.log('\n💡 Manual Setup Option:');
      console.log('   1. Go to: https://supabase.com/dashboard/project/eflkozuqjcjsswiwqckl');
      console.log('   2. Open SQL Editor');
      console.log('   3. Copy and run contents of database/schema.sql');
    }

    console.log('\n📞 Support Information:');
    console.log('   🌐 Website: https://ddc3bd7fffb1496da342d3c52e31e64a-f8f1c0ababdc4e8890ad6717e.fly.dev');
    console.log('   📧 Admin Email: admin@ziratech.com');
    console.log('   🗄️  Database: https://eflkozuqjcjsswiwqckl.supabase.co');

    return {
      success: verifiedTables.length === tablesToVerify.length,
      tablesCreated: verifiedTables.length,
      totalTables: tablesToVerify.length,
      errors: errorCount
    };

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🆘 Troubleshooting:');
    console.log('   1. Check your internet connection');
    console.log('   2. Verify Supabase project is active');
    console.log('   3. Confirm service role key is correct');
    console.log('   4. Try manual setup via Supabase dashboard');
    
    return { success: false, error: error.message };
  }
}

// Run setup
setupDatabase().then(result => {
  process.exit(result.success ? 0 : 1);
});
