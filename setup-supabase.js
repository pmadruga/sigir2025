#!/usr/bin/env node

// Setup script for Supabase database and users
// Run with: node setup-supabase.js

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables
function loadEnv() {
    const envPath = path.join(__dirname, '.env');
    if (!fs.existsSync(envPath)) {
        console.error('❌ .env file not found');
        process.exit(1);
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    
    envContent.split('\n').forEach(line => {
        if (line.trim() && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                env[key.trim()] = valueParts.join('=').trim();
            }
        }
    });
    
    return env;
}

// Make HTTPS request
function makeRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(response);
                    } else {
                        reject(new Error(`Request failed: ${res.statusCode} - ${JSON.stringify(response)}`));
                    }
                } catch (e) {
                    resolve(body);
                }
            });
        });
        
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function testConnection(env) {
    console.log('\n📡 Testing Supabase connection...');
    
    const url = new URL(env.SUPABASE_URL);
    
    try {
        const options = {
            hostname: url.hostname,
            path: '/rest/v1/',
            method: 'GET',
            headers: {
                'apikey': env.SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`
            }
        };
        
        await makeRequest(options);
        console.log('✅ Successfully connected to Supabase!');
        console.log(`   Project URL: ${env.SUPABASE_URL}`);
        return true;
    } catch (error) {
        console.error('❌ Failed to connect to Supabase:', error.message);
        return false;
    }
}

async function createDatabaseSchema(env) {
    console.log('\n🗄️  Setting up database schema...');
    
    const sql = `
    -- Create votes table if not exists
    CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        paper_path TEXT NOT NULL,
        vote_type INTEGER CHECK (vote_type IN (-1, 1)),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, paper_path)
    );

    -- Enable Row Level Security
    ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can view all votes" ON votes;
    DROP POLICY IF EXISTS "Users can insert their own votes" ON votes;
    DROP POLICY IF EXISTS "Users can update their own votes" ON votes;
    DROP POLICY IF EXISTS "Users can delete their own votes" ON votes;

    -- Create policies
    CREATE POLICY "Users can view all votes" ON votes
        FOR SELECT TO authenticated
        USING (true);

    CREATE POLICY "Users can insert their own votes" ON votes
        FOR INSERT TO authenticated
        WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can update their own votes" ON votes
        FOR UPDATE TO authenticated
        USING (auth.uid() = user_id)
        WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can delete their own votes" ON votes
        FOR DELETE TO authenticated
        USING (auth.uid() = user_id);
    `;
    
    const url = new URL(env.SUPABASE_URL);
    
    try {
        // Note: This would require service role key to execute SQL directly
        // For now, we'll provide instructions
        console.log('📋 Database schema SQL has been prepared.');
        console.log('   Please run the following SQL in your Supabase SQL Editor:');
        console.log('   1. Go to: https://supabase.com/dashboard/project/' + url.hostname.split('.')[0]);
        console.log('   2. Click SQL Editor → New Query');
        console.log('   3. Copy and paste from setup-test-users.sql');
        console.log('   4. Click Run');
        return true;
    } catch (error) {
        console.error('❌ Error with database schema:', error.message);
        return false;
    }
}

async function checkExistingUsers(env) {
    console.log('\n👥 Checking for existing users...');
    
    const testUsers = [
        'alex.researcher@example.com',
        'priya.datascience@example.com',
        'carlos.mleng@example.com',
        'sarah.phd@example.com',
        'david.industry@example.com',
        'maria.prof@example.com'
    ];
    
    console.log('📋 Test users that need to be created:');
    testUsers.forEach((email, index) => {
        console.log(`   ${index + 1}. ${email}`);
    });
    
    return testUsers;
}

async function testLocalServer() {
    console.log('\n🌐 Testing local server...');
    
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 8000,
            path: '/',
            method: 'GET'
        };
        
        const req = https.request(options, (res) => {
            console.log('✅ Local server is running on http://localhost:8000');
            resolve(true);
        });
        
        req.on('error', () => {
            console.log('⚠️  Local server is not running. Start it with: python3 -m http.server 8000');
            resolve(false);
        });
        
        req.end();
    });
}

async function main() {
    console.log('🚀 Supabase Setup Script');
    console.log('========================\n');
    
    // Load environment variables
    const env = loadEnv();
    console.log('✅ Environment variables loaded');
    
    // Test connection
    const connected = await testConnection(env);
    if (!connected) {
        console.log('\n⚠️  Please check your Supabase credentials in .env file');
        process.exit(1);
    }
    
    // Setup database schema
    await createDatabaseSchema(env);
    
    // Check for users
    const users = await checkExistingUsers(env);
    
    // Instructions for manual steps
    console.log('\n📝 Manual Steps Required:');
    console.log('=======================');
    console.log('\n1. Create Test Users in Supabase:');
    console.log('   - Go to Authentication → Users in Supabase dashboard');
    console.log('   - Click "Add user" → "Create new user"');
    console.log('   - For each user, enter email and password');
    console.log('   - Check "Auto Confirm Email"\n');
    
    console.log('2. User Credentials:');
    users.forEach((email, index) => {
        const passwords = [
            'ResearchPaper2025!',
            'DataScience123#',
            'MachineLearning456$',
            'PhDStudent789%',
            'IndustryExp2025^',
            'Academic&Research!'
        ];
        console.log(`   ${email} → ${passwords[index]}`);
    });
    
    console.log('\n3. Test Local Application:');
    console.log('   python3 -m http.server 8000');
    console.log('   Open: http://localhost:8000');
    
    console.log('\n✅ Setup script completed!');
}

// Run the script
main().catch(console.error);