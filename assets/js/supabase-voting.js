/**
 * Supabase Voting System Module
 * Handles user authentication and voting functionality
 */

class SupabaseVoting {
    constructor(supabaseUrl, supabaseKey) {
        if (!window.supabase) {
            throw new Error('Supabase client library not loaded');
        }
        
        this.supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        this.currentUser = null;
        this.initialized = false;
        
        // Initialize authentication
        this.initializeAuth();
    }

    async initializeAuth() {
        try {
            // Check if user is already logged in
            const { data: { user }, error } = await this.supabase.auth.getUser();
            
            if (error) {
                console.warn('Auth initialization error:', error);
            }
            
            this.currentUser = user;
            this.updateAuthUI();

            // Listen for auth changes
            this.supabase.auth.onAuthStateChange((event, session) => {
                console.log('Auth state change:', event);
                this.currentUser = session?.user || null;
                this.updateAuthUI();
            });
            
            this.initialized = true;
            console.log('✅ SupabaseVoting initialized');
        } catch (error) {
            console.error('Failed to initialize auth:', error);
        }
    }

    updateAuthUI() {
        const authContainer = document.getElementById('authContainer');
        const userInfo = document.getElementById('userInfo');
        const loginForm = document.getElementById('loginForm');

        if (!loginForm || !userInfo) {
            console.warn('Auth UI elements not found');
            return;
        }

        if (this.currentUser) {
            loginForm.style.display = 'none';
            userInfo.style.display = 'block';
            userInfo.innerHTML = `
                <span>Welcome, ${this.currentUser.email}</span>
                <button onclick="window.AppManager?.votingSystem?.signOut()" class="auth-btn logout">Sign Out</button>
            `;
            
            // Show voting buttons
            document.querySelectorAll('.voting-buttons').forEach(el => {
                el.style.display = 'flex';
            });
        } else {
            loginForm.style.display = 'block';
            userInfo.style.display = 'none';
            
            // Hide voting buttons
            document.querySelectorAll('.voting-buttons').forEach(el => {
                el.style.display = 'none';
            });
        }
    }

    async signIn(email, password) {
        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                console.error('Sign in error:', error);
                throw error;
            }
            
            console.log('Sign in successful!');
            return data;
        } catch (error) {
            console.error('Sign in failed:', error);
            throw error;
        }
    }

    async signOut() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) {
                console.error('Sign out error:', error);
                throw error;
            }
            
            console.log('Sign out successful!');
            this.showMessage('Successfully signed out!', 'success');
        } catch (error) {
            console.error('Sign out failed:', error);
            this.showMessage('Sign out failed: ' + error.message, 'error');
        }
    }

    async vote(paperPath, voteType) {
        if (!this.currentUser) {
            this.showMessage('Please sign in to vote', 'error');
            return;
        }

        try {
            const { data, error } = await this.supabase
                .from('votes')
                .upsert({
                    user_id: this.currentUser.id,
                    paper_path: paperPath,
                    vote_type: voteType
                });

            if (error) {
                console.error('Vote error:', error);
                throw error;
            }

            console.log('Vote recorded successfully');
            this.showMessage(`Vote recorded for "${paperPath}"`, 'success');
            
            // Update vote counts
            await this.updateVoteCounts(paperPath);
        } catch (error) {
            console.error('Voting failed:', error);
            this.showMessage('Voting failed: ' + error.message, 'error');
        }
    }

    async updateVoteCounts(paperPath) {
        try {
            const { data, error } = await this.supabase
                .from('votes')
                .select('vote_type')
                .eq('paper_path', paperPath);

            if (error) {
                console.error('Failed to fetch votes:', error);
                return;
            }

            const upvotes = data.filter(vote => vote.vote_type === 1).length;
            const downvotes = data.filter(vote => vote.vote_type === -1).length;

            // Update UI
            const card = document.querySelector(`[data-paper-path="${paperPath}"]`);
            if (card) {
                const upvoteCount = card.querySelector('.upvote-count');
                const downvoteCount = card.querySelector('.downvote-count');
                
                if (upvoteCount) upvoteCount.textContent = upvotes;
                if (downvoteCount) downvoteCount.textContent = downvotes;
            }

            // Get user's vote for this paper
            if (this.currentUser) {
                const { data: userVote } = await this.supabase
                    .from('votes')
                    .select('vote_type')
                    .eq('paper_path', paperPath)
                    .eq('user_id', this.currentUser.id)
                    .single();

                // Update button states
                if (card && userVote) {
                    const upvoteBtn = card.querySelector('.upvote-btn');
                    const downvoteBtn = card.querySelector('.downvote-btn');
                    
                    upvoteBtn?.classList.toggle('active', userVote.vote_type === 1);
                    downvoteBtn?.classList.toggle('active', userVote.vote_type === -1);
                }
            }
        } catch (error) {
            console.error('Failed to update vote counts:', error);
        }
    }

    showMessage(message, type = 'info') {
        // Try to use the new auth feedback system first
        if (window.AppManager?.authManager) {
            window.AppManager.authManager.showFeedback(message, type);
            return;
        }

        // Fallback to simple message display
        console.log(`${type.toUpperCase()}: ${message}`);
        
        // Create a simple notification
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-family: Arial, sans-serif;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            ${type === 'success' ? 'background: #10B981;' : ''}
            ${type === 'error' ? 'background: #EF4444;' : ''}
            ${type === 'info' ? 'background: #3B82F6;' : ''}
        `;
        
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }

    /**
     * Get current authentication status
     */
    getStatus() {
        return {
            initialized: this.initialized,
            hasUser: !!this.currentUser,
            userEmail: this.currentUser?.email || null
        };
    }

    /**
     * Wait for initialization to complete
     */
    async waitForInitialization(maxWait = 5000) {
        const start = Date.now();
        while (!this.initialized && (Date.now() - start) < maxWait) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return this.initialized;
    }
}

// Export to global scope
window.SupabaseVoting = SupabaseVoting;

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SupabaseVoting;
}