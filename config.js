// Configuration loader - handles both local development and production
(function() {
    // Default configuration (will be overridden by environment-specific values)
    const defaultConfig = {
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
    
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
        // Use environment-specific config if available (set by GitHub Actions)
        // Otherwise fall back to default config for local development
        window.SIGIR_CONFIG = window.SIGIR_CONFIG || defaultConfig;
        
        // Validate required configuration
        if (!window.SIGIR_CONFIG.SUPABASE_URL.includes('supabase.co')) {
            console.warn('⚠️ Supabase URL not configured properly. Please update your environment variables.');
        }
        
        if (window.SIGIR_CONFIG.SUPABASE_ANON_KEY.includes('your-anon-key')) {
            console.warn('⚠️ Supabase anon key not configured properly. Please update your environment variables.');
        }
        
        // Helper function to get test user for quick login (development only)
        window.getTestUser = function(index = 0) {
            const user = window.SIGIR_CONFIG.TEST_USERS[index];
            if (user) {
                console.log(`Test User ${index + 1}: ${user.email}`);
                return user;
            } else {
                console.log('Test users:', window.SIGIR_CONFIG.TEST_USERS.map((u, i) => `${i + 1}: ${u.email}`));
                return null;
            }
        };
    }
})();