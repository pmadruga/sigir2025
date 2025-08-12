# 🧪 Testing Guide

## Overview

This document describes the testing strategy for the SIGIR 2025 Papers application, including automated tests to prevent initialization issues and ensure code quality.

## Test Suite Components

### 1. **Automated Test Runner** (`assets/js/tests.js`)

Comprehensive test suite that validates:
- ✅ Dependency loading (Supabase, Marked, etc.)
- ✅ Module availability and structure
- ✅ Configuration loading
- ✅ DOM elements presence
- ✅ Application initialization

### 2. **Visual Test Runner** (`test-runner.html`)

Interactive testing interface featuring:
- Real-time dependency status monitoring
- Console output capture
- Manual test checklist
- Diagnostic information
- Test execution controls

## Running Tests

### Automated Testing (Development)

Tests run automatically in development:

```javascript
// In browser console:
new TestSuite().runAll()           // Run all tests
TestSuite.runDiagnostics()         // Show diagnostic info
```

### Visual Test Runner

Navigate to: `http://localhost:7090/test-runner.html`

**Available Controls:**
- 🧪 **Run All Tests** - Execute complete test suite
- 🔍 **Run Diagnostics** - Show system information
- 📦 **Check Dependencies** - Update dependency status
- 🧹 **Clear Console** - Clear output display

### Manual Testing

After automated tests pass, verify:

1. **Application Loading**
   - [ ] Page loads without errors
   - [ ] Papers display correctly
   - [ ] No red console errors

2. **Authentication**
   - [ ] Login form appears
   - [ ] Test user buttons work (if configured)
   - [ ] Feedback messages display

3. **Core Functionality**
   - [ ] Search filters papers correctly
   - [ ] Modal opens when clicking papers
   - [ ] README content loads and displays

4. **Responsive Design**
   - [ ] Mobile layout works
   - [ ] Touch interactions function
   - [ ] Keyboard navigation works

## Test Categories

### 1. **Dependency Tests**

Verify all required external dependencies are loaded:

```javascript
// Critical dependencies checked:
- SupabaseVoting class
- Supabase client library
- Marked markdown parser
- Application modules (Config, Auth, Papers, App)
```

### 2. **Configuration Tests**

Validate configuration loading and structure:

```javascript
// Tests configuration:
- Environment detection
- .env file parsing
- Required config keys
- Configuration validation
```

### 3. **Module Tests**

Ensure all application modules are properly initialized:

```javascript
// Module structure validation:
- Class constructors
- Required methods
- Proper inheritance
- Method signatures
```

### 4. **DOM Tests**

Check presence of required DOM elements:

```javascript
// Critical elements verified:
- Authentication form elements
- Papers grid container
- Search input
- Modal components
- Navigation elements
```

### 5. **Integration Tests**

Validate end-to-end application flow:

```javascript
// Integration scenarios:
- App manager initialization
- Configuration → Voting system → UI
- Module communication
- Error handling paths
```

## Error Prevention

### The "SupabaseVoting not found" Issue

**Problem**: Modular app tried to access SupabaseVoting before script loaded.

**Solution**: 
1. **Dependency Waiting**: App waits for all dependencies before initializing
2. **Script Order**: Proper loading sequence with delays
3. **Error Recovery**: Graceful fallbacks and error messages
4. **Test Coverage**: Automated tests prevent regression

**Prevention Measures**:

```javascript
// 1. Dependency waiting with timeout
async waitForDependencies() {
    const maxAttempts = 50; // 5 seconds max
    while (!window.SupabaseVoting && attempts < maxAttempts) {
        await sleep(100);
        attempts++;
    }
}

// 2. Initialization checks
if (!window.SupabaseVoting) {
    throw new Error('SupabaseVoting class not found');
}

// 3. Automated testing
testDependencyLoading() {
    const missing = dependencies.filter(dep => !dep.check());
    if (missing.length > 0) {
        throw new Error(`Missing: ${missing.join(', ')}`);
    }
}
```

## Continuous Integration

### Pre-commit Testing

Before committing changes, run:

```bash
# 1. Start local server
python3 -m http.server 7090

# 2. Open test runner
open http://localhost:7090/test-runner.html

# 3. Run all tests and verify they pass
# 4. Check main application works
open http://localhost:7090
```

### Deployment Testing

GitHub Actions should include test verification:

```yaml
# Future: Add to .github/workflows/deploy.yml
- name: Run Tests
  run: |
    npm install -g puppeteer
    node scripts/run-tests.js
```

## Test Data

### Mock Configuration

Tests use safe mock data:

```javascript
const testConfig = {
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_ANON_KEY: 'test-key',
    TEST_USERS: [/* mock users */]
};
```

### Test Papers Data

Subset of papers for testing without hitting external APIs.

## Debugging Tests

### Common Issues

1. **Tests timing out**
   ```javascript
   // Increase wait time
   const maxAttempts = 100; // 10 seconds
   ```

2. **Dependency load order**
   ```html
   <!-- Ensure proper script order -->
   <script src="external-lib.js"></script>
   <script src="app-module.js"></script>
   ```

3. **Console errors**
   ```javascript
   // Check browser console for details
   TestSuite.runDiagnostics();
   ```

### Debug Commands

```javascript
// Check dependency status
TestSuite.runDiagnostics();

// Check app status
window.AppManager?.getStatus();

// Inspect configuration
window.AppManager?.configManager.getAll();

// Check DOM elements
['authContainer', 'papersGrid'].forEach(id => 
    console.log(id, !!document.getElementById(id))
);
```

## Performance Testing

### Load Time Monitoring

```javascript
// Built-in performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});
```

### Memory Usage

Monitor for memory leaks during testing:

```javascript
// Check memory usage
console.log('Memory usage:', performance.memory);
```

## Future Enhancements

### Automated Browser Testing

Add headless browser testing:

```javascript
// Puppeteer integration
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:7090/test-runner.html');
const testResults = await page.evaluate(() => {
    return new TestSuite().runAll();
});
```

### Unit Testing Framework

Consider adding Jest/Vitest for module-level testing:

```javascript
// Example unit test
describe('ConfigManager', () => {
    test('should load configuration', async () => {
        const config = new ConfigManager();
        await config.load();
        expect(config.loaded).toBe(true);
    });
});
```

## Troubleshooting

### Tests Failing

1. **Check browser console** for detailed error messages
2. **Verify all scripts loaded** using test runner dependency panel
3. **Check network requests** in browser dev tools
4. **Run diagnostics** for system information

### App Not Loading

1. **Check test runner first** at `/test-runner.html`
2. **Review dependency status** - all should be green
3. **Check configuration** - ensure .env file exists and is valid
4. **Verify server** is running on correct port (7090)

---

**Remember**: Tests are your safety net. Run them frequently and update them as the application evolves!