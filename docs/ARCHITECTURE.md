# 🏗️ SIGIR 2025 Papers - Architecture Documentation

## 📁 Project Structure

```
sigir2025/
├── assets/                     # Static assets
│   ├── css/
│   │   └── styles.css         # Main stylesheet
│   └── js/                    # Modular JavaScript
│       ├── config.js          # Configuration management
│       ├── auth.js            # Authentication handling
│       ├── papers.js          # Papers display & search
│       └── app.js             # Main application orchestrator
├── docs/                      # Documentation
│   └── ARCHITECTURE.md        # This file
├── scripts/                   # Utility scripts
│   └── setup-supabase.js     # Database setup script
├── src/                       # Source files (future use)
├── [Paper Directories]/       # Individual paper folders
├── index.html                 # Main application entry point
├── index-legacy.html          # Original monolithic version
├── supabase-client.js         # Legacy Supabase wrapper
├── load-env.js               # Legacy environment loader
└── config.js                 # Legacy configuration
```

## 🎯 Architecture Principles

### 1. **Modular Design**
- **Separation of Concerns**: Each module has a single responsibility
- **Loose Coupling**: Modules interact through well-defined interfaces
- **High Cohesion**: Related functionality is grouped together

### 2. **Progressive Enhancement**
- **Core Functionality**: Works without JavaScript
- **Enhanced Experience**: JavaScript adds interactivity
- **Accessibility**: ARIA labels and semantic HTML

### 3. **Error Handling**
- **Graceful Degradation**: App continues to work when parts fail
- **User Feedback**: Clear error messages and loading states
- **Logging**: Comprehensive console logging for debugging

## 🧩 Module Architecture

### ConfigManager (`assets/js/config.js`)
**Purpose**: Centralized configuration management

**Responsibilities**:
- Load environment-specific configuration
- Parse `.env` files for local development
- Handle production configuration injection
- Validate configuration integrity

**Key Methods**:
```javascript
await configManager.load()           // Load configuration
configManager.get(key)               // Get specific config value
configManager.getAll()               // Get all configuration
```

### AuthManager (`assets/js/auth.js`)
**Purpose**: User authentication and UI management

**Responsibilities**:
- Handle user sign-in/sign-out
- Manage authentication UI states
- Validate user input
- Display feedback messages
- Support test user quick login

**Key Methods**:
```javascript
authManager.initialize(votingSystem)     // Initialize with voting system
await authManager.handleSignIn()         // Handle sign-in process
authManager.showFeedback(msg, type)      // Show user feedback
```

### PapersManager (`assets/js/papers.js`)
**Purpose**: Papers display, search, and interactions

**Responsibilities**:
- Render paper cards
- Handle search functionality
- Manage modal displays
- Load and cache README content
- Handle voting interactions

**Key Methods**:
```javascript
papersManager.initialize(papersData)     // Initialize with data
await papersManager.displayPapers()      // Display all papers
await papersManager.handleSearch(term)   // Search papers
papersManager.openModal(paper)           // Open paper modal
```

### AppManager (`assets/js/app.js`)
**Purpose**: Application orchestration and lifecycle management

**Responsibilities**:
- Initialize all other modules
- Coordinate inter-module communication
- Handle application lifecycle events
- Manage error states
- Provide debugging information

**Key Methods**:
```javascript
await appManager.initialize()            // Initialize entire app
appManager.onUserSignedIn()             // Handle user auth events
appManager.getStatus()                  // Get app status info
```

## 🔄 Data Flow

```
1. App Initialization
   AppManager.initialize()
   ├── ConfigManager.load()
   ├── SupabaseVoting.new()
   ├── AuthManager.initialize()
   ├── PapersManager.initialize()
   └── UI rendering

2. User Authentication
   User Input → AuthManager → SupabaseVoting → UI Update

3. Paper Interaction
   User Click → PapersManager → README Loading → Modal Display

4. Search Functionality
   Search Input → PapersManager → Filter Cards → Update Display

5. Voting
   Vote Click → PapersManager → AppManager → SupabaseVoting → UI Update
```

## 🎨 CSS Architecture

### Methodology: **BEM-inspired Component-based**

```css
/* Component Structure */
.component-name {           /* Block */
    /* Base styles */
}

.component-name__element {  /* Element */
    /* Element styles */
}

.component-name--modifier { /* Modifier */
    /* Variant styles */
}
```

### Component Categories:
1. **Layout Components**: `.container`, `.papers-grid`
2. **UI Components**: `.paper-card`, `.modal-*`, `.auth-*`
3. **State Classes**: `.show`, `.active`, `.loading`
4. **Utility Classes**: `.spinner`, `.loading-overlay`

## 🔧 Configuration System

### Environment Detection
```javascript
// Development: localhost, 127.0.0.1, file://
// Production: GitHub Pages deployment
```

### Configuration Sources (Priority Order):
1. **Production**: `window.SIGIR_CONFIG` (injected by GitHub Actions)
2. **Development**: `.env` file parsing
3. **Fallback**: Hard-coded default values

### Configuration Schema:
```javascript
{
    SUPABASE_URL: string,        // Required
    SUPABASE_ANON_KEY: string,   // Required
    TEST_USERS: Array<{          // Optional
        email: string,
        password: string
    }>
}
```

## 🛡️ Error Handling Strategy

### 1. **Module Level**
- Try-catch blocks around async operations
- Graceful fallbacks for missing dependencies
- Detailed error logging

### 2. **User Interface**
- Loading states during async operations
- Error messages with actionable guidance
- Fallback content when data loading fails

### 3. **Network Resilience**
- Retry mechanisms for failed requests
- Caching for README content
- Offline-friendly design patterns

## 🚀 Performance Optimizations

### 1. **Code Splitting**
- Modular JavaScript for better caching
- Separate CSS file for parallel loading
- CDN-hosted external libraries

### 2. **Caching Strategy**
- README content caching
- Configuration caching
- Browser cache optimization

### 3. **Lazy Loading**
- README content loaded on demand
- Modal content loaded when opened
- Search results filtered efficiently

## 🧪 Testing Strategy

### 1. **Manual Testing Checklist**
- [ ] App initializes without errors
- [ ] Configuration loads correctly
- [ ] Authentication works with test users
- [ ] Papers display and search function
- [ ] Modal opens and closes properly
- [ ] Voting system operates correctly

### 2. **Browser Compatibility**
- Modern browsers (ES6+ support)
- Mobile responsive design
- Progressive enhancement for older browsers

### 3. **Error Scenarios**
- Network failures
- Invalid configuration
- Missing dependencies
- Supabase connection issues

## 🔮 Future Enhancements

### 1. **Technical Improvements**
- Service Worker for offline support
- TypeScript for better type safety
- Unit test suite (Jest/Vitest)
- E2E testing (Playwright/Cypress)

### 2. **Feature Additions**
- User profiles and preferences
- Advanced search filters
- Paper tagging and categories
- Export functionality

### 3. **Performance**
- Virtual scrolling for large datasets
- WebAssembly for heavy computations
- Progressive Web App features

## 📊 Monitoring and Analytics

### 1. **Performance Metrics**
- Page load time logging
- Module initialization timing
- API response times

### 2. **User Experience**
- Error rate monitoring
- User interaction tracking
- Feature usage analytics

### 3. **System Health**
- Supabase connection status
- Configuration validation
- Module initialization success

---

**Last Updated**: August 2025  
**Version**: 2.0 (Modular Architecture)  
**Maintainer**: SIGIR 2025 Papers Team