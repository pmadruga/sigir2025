/**
 * Authentication Module
 * Handles user authentication UI and interactions
 */

class AuthManager {
    constructor() {
        this.votingSystem = null;
        this.elements = {};
        this.initializeElements();
    }

    /**
     * Initialize DOM element references
     */
    initializeElements() {
        this.elements = {
            authContainer: document.getElementById('authContainer'),
            authFeedback: document.getElementById('authFeedback'),
            loginForm: document.getElementById('loginForm'),
            userInfo: document.getElementById('userInfo'),
            email: document.getElementById('email'),
            password: document.getElementById('password'),
            signInBtn: document.getElementById('signInBtn'),
            authLoadingOverlay: document.getElementById('authLoadingOverlay')
        };
    }

    /**
     * Initialize authentication system
     * @param {SupabaseVoting} votingSystem - Voting system instance
     */
    initialize(votingSystem) {
        this.votingSystem = votingSystem;
        this.setupEventListeners();
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Enter key support
        if (this.elements.email) {
            this.elements.email.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleSignIn();
            });
        }

        if (this.elements.password) {
            this.elements.password.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleSignIn();
            });
        }

        // Sign in button
        if (this.elements.signInBtn) {
            this.elements.signInBtn.addEventListener('click', () => this.handleSignIn());
        }
    }

    /**
     * Handle user sign in
     */
    async handleSignIn() {
        const email = this.elements.email?.value.trim();
        const password = this.elements.password?.value.trim();

        // Validation
        if (!this.validateInput(email, password)) {
            return;
        }

        if (!this.votingSystem) {
            this.showFeedback('Authentication system not initialized. Please refresh the page.', 'error');
            return;
        }

        this.showLoading(true);
        this.hideFeedback();

        try {
            this.showFeedback('Signing in...', 'info');
            await this.votingSystem.signIn(email, password);

            // Clear form
            this.clearForm();
            this.showFeedback('Successfully signed in! Loading your votes...', 'success');

            // Notify app of successful login
            if (window.AppManager) {
                await window.AppManager.onUserSignedIn();
            }

            this.showFeedback('Welcome! You can now vote on papers.', 'success');
        } catch (error) {
            console.error('Sign in error:', error);
            this.showFeedback(`Sign in failed: ${this.getErrorMessage(error)}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Validate user input
     * @param {string} email - Email address
     * @param {string} password - Password
     * @returns {boolean} True if valid
     */
    validateInput(email, password) {
        if (!email || !password) {
            this.showFeedback('Please enter both email and password', 'error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showFeedback('Please enter a valid email address', 'error');
            return false;
        }

        if (password.length < 6) {
            this.showFeedback('Password must be at least 6 characters', 'error');
            return false;
        }

        return true;
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Get user-friendly error message
     * @param {Error} error - Error object
     * @returns {string} User-friendly error message
     */
    getErrorMessage(error) {
        if (!error.message) {
            return 'An unexpected error occurred';
        }

        // Map common Supabase errors to user-friendly messages
        const errorMappings = {
            'Invalid login credentials': 'Invalid email or password',
            'Email not confirmed': 'Please check your email and confirm your account',
            'Too many requests': 'Too many login attempts. Please wait a moment.',
            'Network error': 'Connection failed. Please check your internet connection.'
        };

        return errorMappings[error.message] || error.message;
    }

    /**
     * Clear the login form
     */
    clearForm() {
        if (this.elements.email) this.elements.email.value = '';
        if (this.elements.password) this.elements.password.value = '';
    }

    /**
     * Show feedback message
     * @param {string} message - Message to display
     * @param {string} type - Type: 'success', 'error', 'info'
     */
    showFeedback(message, type = 'info') {
        if (!this.elements.authFeedback) return;

        this.elements.authFeedback.textContent = message;
        this.elements.authFeedback.className = `auth-feedback show ${type}`;

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.hideFeedback();
            }, 5000);
        }
    }

    /**
     * Hide feedback message
     */
    hideFeedback() {
        if (this.elements.authFeedback) {
            this.elements.authFeedback.classList.remove('show');
        }
    }

    /**
     * Show/hide loading state
     * @param {boolean} show - Whether to show loading
     */
    showLoading(show = true) {
        if (this.elements.authLoadingOverlay) {
            this.elements.authLoadingOverlay.classList.toggle('show', show);
        }
        
        if (this.elements.signInBtn) {
            this.elements.signInBtn.disabled = show;
        }
    }

    /**
     * Quick login for test users
     * @param {string} email - Test user email
     * @param {string} password - Test user password
     */
    async quickLogin(email, password) {
        if (this.elements.email) this.elements.email.value = email;
        if (this.elements.password) this.elements.password.value = password;
        
        this.showFeedback(`Using test account: ${email.split('@')[0]}`, 'info');
        await this.handleSignIn();
    }

    /**
     * Add test user buttons if available
     * @param {Array} testUsers - Array of test user objects
     */
    addTestUserButtons(testUsers) {
        if (!testUsers || testUsers.length === 0) return;

        const testButtonsDiv = document.createElement('div');
        testButtonsDiv.className = 'test-users-section';
        testButtonsDiv.innerHTML = `
            <details>
                <summary>🧪 Quick Login (Test Users)</summary>
                <div class="test-users-grid">
                    ${testUsers.map((user, index) => `
                        <button class="test-user-btn" data-email="${user.email}" data-password="${user.password}">
                            ${user.email.split('@')[0]}
                        </button>
                    `).join('')}
                </div>
            </details>
        `;

        // Add click handlers for test buttons
        testButtonsDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('test-user-btn')) {
                const email = e.target.getAttribute('data-email');
                const password = e.target.getAttribute('data-password');
                this.quickLogin(email, password);
            }
        });

        if (this.elements.authContainer) {
            this.elements.authContainer.appendChild(testButtonsDiv);
        }
    }
}

// Export for use in other modules
window.AuthManager = AuthManager;