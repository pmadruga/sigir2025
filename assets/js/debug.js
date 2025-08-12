/**
 * Debug Helper for Script Loading and Dependencies
 */

class DebugHelper {
    constructor() {
        this.loadTimes = {};
        this.scriptStates = {};
        this.startTime = performance.now();
        
        // Monitor script loading
        this.monitorScriptLoading();
        
        // Log when dependencies become available
        this.monitorDependencies();
        
        console.log('🐞 Debug Helper initialized');
    }

    monitorScriptLoading() {
        // Override script creation to monitor loading
        const originalCreateElement = document.createElement.bind(document);
        
        document.createElement = function(tagName) {
            const element = originalCreateElement(tagName);
            
            if (tagName.toLowerCase() === 'script') {
                const src = element.src;
                if (src) {
                    element.addEventListener('load', () => {
                        console.log(`📜 Script loaded: ${src}`);
                    });
                    
                    element.addEventListener('error', () => {
                        console.error(`❌ Script failed: ${src}`);
                    });
                }
            }
            
            return element;
        };
    }

    monitorDependencies() {
        const dependencies = [
            'supabase',
            'marked',
            'SupabaseVoting',
            'ConfigManager',
            'AuthManager',
            'PapersManager',
            'AppManager'
        ];

        dependencies.forEach(dep => {
            this.waitForGlobal(dep).then(() => {
                const time = Math.round(performance.now() - this.startTime);
                console.log(`✅ ${dep} available after ${time}ms`);
                this.loadTimes[dep] = time;
            });
        });
    }

    async waitForGlobal(name, timeout = 15000) {
        const start = performance.now();
        
        while (!window[name] && (performance.now() - start) < timeout) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        if (!window[name]) {
            console.error(`❌ ${name} never became available`);
            throw new Error(`Global ${name} not found after ${timeout}ms`);
        }
        
        return window[name];
    }

    static checkCurrentState() {
        console.log('🔍 Current Dependency State:');
        console.log('============================');
        
        const checks = [
            ['Supabase Client', () => !!window.supabase?.createClient],
            ['Marked Parser', () => !!window.marked?.parse],
            ['SupabaseVoting', () => !!window.SupabaseVoting],
            ['ConfigManager', () => !!window.ConfigManager],
            ['AuthManager', () => !!window.AuthManager],
            ['PapersManager', () => !!window.PapersManager],
            ['AppManager', () => !!window.AppManager],
            ['App Instance', () => !!window.AppManager]
        ];
        
        checks.forEach(([name, check]) => {
            const status = check() ? '✅' : '❌';
            console.log(`${status} ${name}`);
        });
        
        console.log('\n🌐 Environment Info:');
        console.log(`URL: ${window.location.href}`);
        console.log(`Protocol: ${window.location.protocol}`);
        console.log(`Document State: ${document.readyState}`);
        console.log(`Scripts loaded: ${document.querySelectorAll('script[src]').length}`);
        
        const failedScripts = Array.from(document.querySelectorAll('script[src]')).filter(script => {
            // Check if script failed to load (this is approximate)
            return !script.textContent && script.src;
        });
        
        if (failedScripts.length > 0) {
            console.warn('⚠️ Potentially failed scripts:');
            failedScripts.forEach(script => console.warn(`  - ${script.src}`));
        }
    }

    static async testDependencyLoad() {
        console.log('🧪 Testing Dependency Loading...');
        
        const testResults = {};
        const dependencies = ['supabase', 'marked', 'SupabaseVoting', 'ConfigManager'];
        
        for (const dep of dependencies) {
            const start = performance.now();
            try {
                await new DebugHelper().waitForGlobal(dep, 5000);
                testResults[dep] = {
                    status: 'success',
                    time: Math.round(performance.now() - start)
                };
            } catch (error) {
                testResults[dep] = {
                    status: 'failed',
                    error: error.message
                };
            }
        }
        
        console.log('📊 Test Results:', testResults);
        return testResults;
    }

    static logScriptOrder() {
        console.log('📜 Script Loading Order:');
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        scripts.forEach((script, index) => {
            const filename = script.src.split('/').pop();
            console.log(`${index + 1}. ${filename}`);
        });
    }
}

// Initialize debug helper in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.DebugHelper = DebugHelper;
    window.debugHelper = new DebugHelper();
    
    // Add helpful console commands
    window.checkDeps = () => DebugHelper.checkCurrentState();
    window.testDeps = () => DebugHelper.testDependencyLoad();
    window.scriptOrder = () => DebugHelper.logScriptOrder();
    
    console.log('🐞 Debug commands available:');
    console.log('  - checkDeps() - Check current dependency state');
    console.log('  - testDeps() - Test dependency loading');
    console.log('  - scriptOrder() - Show script loading order');
}