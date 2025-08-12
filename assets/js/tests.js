/**
 * Application Test Suite
 * Comprehensive tests to ensure dependency loading and app initialization
 */

class TestSuite {
    constructor() {
        this.tests = [];
        this.results = {
            passed: 0,
            failed: 0,
            total: 0
        };
    }

    /**
     * Run all tests
     */
    async runAll() {
        console.log('🧪 Starting Application Test Suite...');
        console.log('=====================================');

        // Dependency Tests
        this.testDependencyLoading();
        this.testSupabaseVotingClass();
        this.testExternalLibraries();
        
        // Configuration Tests
        await this.testConfigurationLoading();
        
        // Module Tests
        this.testModuleExistence();
        this.testModuleInitialization();
        
        // DOM Tests
        this.testDOMElements();
        
        // Integration Tests
        await this.testAppInitialization();
        
        // Output Results
        this.outputResults();
        
        return this.results.failed === 0;
    }

    /**
     * Test dependency loading
     */
    testDependencyLoading() {
        this.test('External Dependencies Loaded', () => {
            const dependencies = [
                { name: 'Supabase Client', check: () => !!window.supabase },
                { name: 'Marked Library', check: () => !!window.marked },
                { name: 'SupabaseVoting Class', check: () => !!window.SupabaseVoting }
            ];

            const missing = dependencies.filter(dep => !dep.check());
            
            if (missing.length > 0) {
                throw new Error(`Missing dependencies: ${missing.map(d => d.name).join(', ')}`);
            }
            
            return true;
        });
    }

    /**
     * Test SupabaseVoting class functionality
     */
    testSupabaseVotingClass() {
        this.test('SupabaseVoting Class Structure', () => {
            if (!window.SupabaseVoting) {
                throw new Error('SupabaseVoting class not found');
            }

            const requiredMethods = ['signIn', 'signOut', 'vote', 'updateVoteCounts'];
            const prototype = window.SupabaseVoting.prototype;
            
            const missingMethods = requiredMethods.filter(method => 
                typeof prototype[method] !== 'function'
            );

            if (missingMethods.length > 0) {
                throw new Error(`Missing methods: ${missingMethods.join(', ')}`);
            }

            return true;
        });
    }

    /**
     * Test external libraries
     */
    testExternalLibraries() {
        this.test('External Libraries Available', () => {
            const libraries = [
                { name: 'Supabase', check: () => window.supabase?.createClient },
                { name: 'Marked', check: () => window.marked?.parse }
            ];

            const missing = libraries.filter(lib => !lib.check());
            
            if (missing.length > 0) {
                throw new Error(`Missing libraries: ${missing.map(l => l.name).join(', ')}`);
            }

            return true;
        });
    }

    /**
     * Test configuration loading
     */
    async testConfigurationLoading() {
        await this.testAsync('Configuration Loading', async () => {
            if (!window.ConfigManager) {
                throw new Error('ConfigManager class not found');
            }

            const configManager = new window.ConfigManager();
            await configManager.load();
            
            const config = configManager.getAll();
            const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
            
            const missing = required.filter(key => !config[key]);
            if (missing.length > 0) {
                throw new Error(`Missing config keys: ${missing.join(', ')}`);
            }

            return true;
        });
    }

    /**
     * Test module existence
     */
    testModuleExistence() {
        this.test('Module Classes Available', () => {
            const modules = [
                'ConfigManager',
                'AuthManager', 
                'PapersManager',
                'AppManager'
            ];

            const missing = modules.filter(module => !window[module]);
            
            if (missing.length > 0) {
                throw new Error(`Missing modules: ${missing.join(', ')}`);
            }

            return true;
        });
    }

    /**
     * Test module initialization
     */
    testModuleInitialization() {
        this.test('Module Initialization', () => {
            // Test ConfigManager
            const configManager = new window.ConfigManager();
            if (!configManager.load) {
                throw new Error('ConfigManager missing load method');
            }

            // Test AuthManager
            const authManager = new window.AuthManager();
            if (!authManager.initialize) {
                throw new Error('AuthManager missing initialize method');
            }

            // Test PapersManager
            const papersManager = new window.PapersManager();
            if (!papersManager.initialize) {
                throw new Error('PapersManager missing initialize method');
            }

            return true;
        });
    }

    /**
     * Test required DOM elements
     */
    testDOMElements() {
        this.test('Required DOM Elements Present', () => {
            const requiredIds = [
                'authContainer',
                'authFeedback', 
                'loginForm',
                'email',
                'password',
                'signInBtn',
                'papersGrid',
                'searchInput',
                'stats',
                'modalBackdrop',
                'modalContent',
                'modalTitle',
                'modalBody'
            ];

            const missing = requiredIds.filter(id => !document.getElementById(id));
            
            if (missing.length > 0) {
                throw new Error(`Missing DOM elements: ${missing.join(', ')}`);
            }

            return true;
        });
    }

    /**
     * Test app initialization
     */
    async testAppInitialization() {
        await this.testAsync('App Manager Initialization', async () => {
            if (!window.AppManager) {
                throw new Error('AppManager class not found');
            }

            // Create test instance (don't interfere with main app)
            const testApp = new window.AppManager();
            
            // Test configuration loading
            await testApp.loadConfiguration();
            if (!testApp.configManager.loaded) {
                throw new Error('Configuration failed to load');
            }

            // Test dependency waiting (should complete quickly if dependencies are loaded)
            await testApp.waitForDependencies();

            return true;
        });
    }

    /**
     * Test runner helper
     */
    test(name, testFn) {
        this.results.total++;
        
        try {
            const result = testFn();
            if (result === true) {
                this.results.passed++;
                console.log(`✅ ${name}`);
            } else {
                this.results.failed++;
                console.error(`❌ ${name}: Test did not return true`);
            }
        } catch (error) {
            this.results.failed++;
            console.error(`❌ ${name}: ${error.message}`);
        }
    }

    /**
     * Async test runner helper
     */
    async testAsync(name, testFn) {
        this.results.total++;
        
        try {
            const result = await testFn();
            if (result === true) {
                this.results.passed++;
                console.log(`✅ ${name}`);
            } else {
                this.results.failed++;
                console.error(`❌ ${name}: Test did not return true`);
            }
        } catch (error) {
            this.results.failed++;
            console.error(`❌ ${name}: ${error.message}`);
        }
    }

    /**
     * Output test results
     */
    outputResults() {
        console.log('\n🧪 Test Results');
        console.log('================');
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`📊 Total:  ${this.results.total}`);
        
        if (this.results.failed === 0) {
            console.log('🎉 All tests passed!');
        } else {
            console.warn('⚠️  Some tests failed. Please check the issues above.');
        }
    }

    /**
     * Run diagnostic information
     */
    static runDiagnostics() {
        console.log('🔍 Application Diagnostics');
        console.log('==========================');
        
        console.log('📦 Script Loading Status:');
        console.log(`  - SupabaseVoting: ${!!window.SupabaseVoting}`);
        console.log(`  - Supabase Client: ${!!window.supabase}`);
        console.log(`  - Marked: ${!!window.marked}`);
        console.log(`  - ConfigManager: ${!!window.ConfigManager}`);
        console.log(`  - AuthManager: ${!!window.AuthManager}`);
        console.log(`  - PapersManager: ${!!window.PapersManager}`);
        console.log(`  - AppManager: ${!!window.AppManager}`);
        
        console.log('\n🌐 Environment:');
        console.log(`  - Protocol: ${window.location.protocol}`);
        console.log(`  - Hostname: ${window.location.hostname}`);
        console.log(`  - Document State: ${document.readyState}`);
        
        console.log('\n📄 DOM Elements:');
        const requiredIds = ['authContainer', 'papersGrid', 'searchInput'];
        requiredIds.forEach(id => {
            console.log(`  - ${id}: ${!!document.getElementById(id)}`);
        });
        
        if (window.AppManager?.prototype?.getStatus) {
            console.log('\n📊 App Status:');
            try {
                const status = new window.AppManager().getStatus();
                Object.entries(status).forEach(([key, value]) => {
                    console.log(`  - ${key}: ${value}`);
                });
            } catch (error) {
                console.log(`  - Error getting status: ${error.message}`);
            }
        }
    }
}

// Export test suite
window.TestSuite = TestSuite;

// Auto-run tests in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Run tests after page load
    window.addEventListener('load', async () => {
        // Wait a bit for everything to settle
        setTimeout(async () => {
            console.log('\n🧪 Running automated tests...');
            const testSuite = new TestSuite();
            const success = await testSuite.runAll();
            
            if (!success) {
                console.warn('⚠️ Some tests failed. Run TestSuite.runDiagnostics() for more info.');
            }
        }, 1000);
    });
}

// Console helpers
console.info('🧪 Test Suite loaded. Available commands:');
console.info('  - new TestSuite().runAll() - Run all tests');
console.info('  - TestSuite.runDiagnostics() - Show diagnostic info');