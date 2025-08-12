/**
 * Configuration Module
 * Handles environment-specific configuration loading
 */

class ConfigManager {
    constructor() {
        this.config = null;
        this.loaded = false;
    }

    /**
     * Load configuration based on environment
     * @returns {Promise<Object>} Configuration object
     */
    async load() {
        if (this.loaded) {
            return this.config;
        }

        try {
            // Check if we're in development mode
            if (this.isLocalDevelopment()) {
                await this.loadLocalConfig();
            } else {
                this.loadProductionConfig();
            }

            this.validateConfig();
            this.loaded = true;
            return this.config;
        } catch (error) {
            console.error('Failed to load configuration:', error);
            this.loadFallbackConfig();
            return this.config;
        }
    }

    /**
     * Check if running in local development
     * @returns {boolean}
     */
    isLocalDevelopment() {
        return window.location.protocol === 'file:' || 
               window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1';
    }

    /**
     * Load configuration from .env file (local development)
     */
    async loadLocalConfig() {
        try {
            const response = await fetch('.env');
            const envContent = await response.text();
            const envVars = this.parseEnvFile(envContent);
            
            this.config = {
                SUPABASE_URL: envVars.SUPABASE_URL,
                SUPABASE_ANON_KEY: envVars.SUPABASE_ANON_KEY,
                TEST_USERS: this.parseTestUsers(envVars)
            };

            console.log('✅ Configuration loaded from .env file');
        } catch (error) {
            console.warn('⚠️ Could not load .env file:', error.message);
            throw error;
        }
    }

    /**
     * Load production configuration (injected by GitHub Actions)
     */
    loadProductionConfig() {
        if (window.SIGIR_CONFIG) {
            this.config = window.SIGIR_CONFIG;
            console.log('✅ Production configuration loaded');
        } else {
            throw new Error('Production configuration not found');
        }
    }

    /**
     * Load fallback configuration
     */
    loadFallbackConfig() {
        console.warn('⚠️ Using fallback configuration');
        this.config = {
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

    /**
     * Parse .env file content
     * @param {string} envContent - Contents of .env file
     * @returns {Object} Parsed environment variables
     */
    parseEnvFile(envContent) {
        const envVars = {};
        
        envContent.split('\n').forEach(line => {
            if (line.trim() && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split('=');
                if (key && valueParts.length > 0) {
                    envVars[key.trim()] = valueParts.join('=').trim();
                }
            }
        });
        
        return envVars;
    }

    /**
     * Parse test users from environment variables
     * @param {Object} envVars - Environment variables
     * @returns {Array} Array of test user objects
     */
    parseTestUsers(envVars) {
        const testUsers = [];
        
        for (let i = 1; i <= 6; i++) {
            const email = envVars[`TEST_USER_${i}_EMAIL`];
            const password = envVars[`TEST_USER_${i}_PASSWORD`];
            
            if (email && password) {
                testUsers.push({ email, password });
            }
        }
        
        return testUsers;
    }

    /**
     * Validate configuration
     * @throws {Error} If configuration is invalid
     */
    validateConfig() {
        if (!this.config) {
            throw new Error('Configuration is null');
        }

        const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
        const missing = required.filter(key => !this.config[key]);

        if (missing.length > 0) {
            throw new Error(`Missing required configuration: ${missing.join(', ')}`);
        }

        // Validate Supabase URL format
        if (!this.config.SUPABASE_URL.includes('supabase.co')) {
            console.warn('⚠️ Supabase URL format appears incorrect');
        }

        // Validate anon key format
        if (this.config.SUPABASE_ANON_KEY.includes('your-anon-key')) {
            console.warn('⚠️ Using placeholder Supabase key');
        }
    }

    /**
     * Get configuration value
     * @param {string} key - Configuration key
     * @returns {*} Configuration value
     */
    get(key) {
        if (!this.loaded) {
            throw new Error('Configuration not loaded. Call load() first.');
        }
        return this.config[key];
    }

    /**
     * Get all configuration
     * @returns {Object} Full configuration object
     */
    getAll() {
        if (!this.loaded) {
            throw new Error('Configuration not loaded. Call load() first.');
        }
        return { ...this.config };
    }
}

// Export for use in other modules
window.ConfigManager = ConfigManager;