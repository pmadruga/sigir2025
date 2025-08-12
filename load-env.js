// Legacy environment variable loader for local development
// This script is kept for backward compatibility with production deployment
// The new modular system uses assets/js/config.js instead
(function() {
    console.log('📦 Legacy environment loader (load-env.js) active');
    
    // Only run in development (local file:// or localhost)
    if (typeof window !== 'undefined' && 
        (window.location.protocol === 'file:' || 
         window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1')) {
        
        // Load environment variables from .env file
        fetch('.env')
            .then(response => response.text())
            .then(envContent => {
                const envVars = {};
                
                // Parse .env file
                envContent.split('\n').forEach(line => {
                    if (line.trim() && !line.startsWith('#')) {
                        const [key, value] = line.split('=');
                        if (key && value) {
                            envVars[key.trim()] = value.trim();
                        }
                    }
                });
                
                // Build test users array
                const testUsers = [];
                for (let i = 1; i <= 6; i++) {
                    const email = envVars[`TEST_USER_${i}_EMAIL`];
                    const password = envVars[`TEST_USER_${i}_PASSWORD`];
                    if (email && password) {
                        testUsers.push({ email, password });
                    }
                }
                
                // Set configuration for both legacy and new system compatibility
                window.SIGIR_CONFIG = {
                    SUPABASE_URL: envVars.SUPABASE_URL,
                    SUPABASE_ANON_KEY: envVars.SUPABASE_ANON_KEY,
                    TEST_USERS: testUsers
                };
                
                console.log('✅ Legacy: Environment variables loaded from .env file');
            })
            .catch(error => {
                console.warn('⚠️ Legacy: Could not load .env file. Using fallback configuration.');
                
                // Fallback to default configuration
                loadDefaultConfig();
            });
    } else {
        // In production, config should be injected by GitHub Actions
        console.log('🚀 Legacy: Running in production mode');
        
        // If no config exists yet, create default
        if (!window.SIGIR_CONFIG) {
            loadDefaultConfig();
        }
    }
    
    function loadDefaultConfig() {
        window.SIGIR_CONFIG = {
            SUPABASE_URL: 'https://your-project-id.supabase.co',
            SUPABASE_ANON_KEY: 'your-anon-key-here',
            TEST_USERS: [
                { email: 'alex.researcher@example.com', password: 'ResearchPaper2025!' },
                { email: 'priya.datascience@example.com', password: 'DataScience123#' },
                { email: 'carlos.mleng@example.com', password: 'MachineLearning456$' },
                { email: 'sarah.phd@example.com', password: 'PhDStudent789%' },
                { email: 'david.industry@example.com', password: 'IndustryExp2025^' },
                { email: 'maria.prof@example.com', password: 'Academic&Research!' }
            ]
        };
    }
})();