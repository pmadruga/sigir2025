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

    async vote(paperPath, voteType, reason = null) {
        if (!this.currentUser) {
            this.showMessage('Please sign in to vote', 'error');
            return;
        }

        // Validate vote type
        if (![-1, 0, 1].includes(voteType)) {
            console.error('Invalid vote type:', voteType);
            this.showMessage('Invalid vote type', 'error');
            return;
        }

        try {
            // Check if user already voted on this paper
            const existingVote = await this.getUserVote(paperPath);
            
            // If same vote, remove it (toggle functionality)
            if (existingVote && existingVote.vote_type === voteType) {
                await this.removeVote(paperPath);
                this.showMessage(`Vote removed for "${this.truncateTitle(paperPath)}"`, 'info');
                await this.updateVoteCounts(paperPath);
                return;
            }

            // Insert or update vote
            const voteData = {
                user_id: this.currentUser.id,
                paper_path: paperPath,
                vote_type: voteType,
                updated_at: new Date().toISOString()
            };

            // Add reason for "need better info" votes
            if (voteType === 0 && reason) {
                voteData.vote_reason = reason;
            }

            const { data, error } = await this.supabase
                .from('votes_new') // Using the new table name from schema update
                .upsert(voteData);

            if (error) {
                console.error('Vote error:', error);
                throw error;
            }

            console.log('Vote recorded successfully:', voteData);
            
            // Show appropriate message based on vote type
            const voteMessages = {
                1: '👍 Upvoted',
                -1: '👎 Downvoted', 
                0: '❓ Marked as needing better info'
            };
            
            const action = existingVote ? 'Changed vote' : 'Voted';
            this.showMessage(`${action}: ${voteMessages[voteType]} "${this.truncateTitle(paperPath)}"`, 'success');
            
            // Update vote counts
            await this.updateVoteCounts(paperPath);
        } catch (error) {
            console.error('Voting failed:', error);
            this.showMessage('Voting failed: ' + error.message, 'error');
        }
    }

    /**
     * Remove a user's vote for a paper
     */
    async removeVote(paperPath) {
        if (!this.currentUser) {
            this.showMessage('Please sign in to vote', 'error');
            return;
        }

        try {
            const { error } = await this.supabase
                .from('votes_new')
                .delete()
                .eq('user_id', this.currentUser.id)
                .eq('paper_path', paperPath);

            if (error) {
                console.error('Remove vote error:', error);
                throw error;
            }

            console.log('Vote removed successfully');
        } catch (error) {
            console.error('Remove vote failed:', error);
            throw error;
        }
    }

    /**
     * Get user's current vote for a paper
     */
    async getUserVote(paperPath) {
        if (!this.currentUser) {
            return null;
        }

        try {
            const { data, error } = await this.supabase
                .from('votes_new')
                .select('vote_type, vote_reason, updated_at')
                .eq('user_id', this.currentUser.id)
                .eq('paper_path', paperPath)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
                console.error('Get user vote error:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Failed to get user vote:', error);
            return null;
        }
    }

    async updateVoteCounts(paperPath) {
        try {
            const { data, error } = await this.supabase
                .from('votes_new')
                .select('vote_type')
                .eq('paper_path', paperPath);

            if (error) {
                console.error('Failed to fetch votes:', error);
                return;
            }

            const upvotes = data.filter(vote => vote.vote_type === 1).length;
            const downvotes = data.filter(vote => vote.vote_type === -1).length;
            const needInfoVotes = data.filter(vote => vote.vote_type === 0).length;

            // Update UI
            const card = document.querySelector(`[data-paper-path="${paperPath}"]`);
            if (card) {
                const upvoteCount = card.querySelector('.upvote-count');
                const downvoteCount = card.querySelector('.downvote-count');
                const needInfoCount = card.querySelector('.need-info-count');
                
                if (upvoteCount) upvoteCount.textContent = upvotes;
                if (downvoteCount) downvoteCount.textContent = downvotes;
                if (needInfoCount) needInfoCount.textContent = needInfoVotes;
            }

            // Get user's vote for this paper and update button states
            if (this.currentUser) {
                const userVote = await this.getUserVote(paperPath);

                if (card) {
                    const upvoteBtn = card.querySelector('.upvote-btn');
                    const downvoteBtn = card.querySelector('.downvote-btn');
                    const needInfoBtn = card.querySelector('.need-info-btn');
                    
                    // Remove all active states first
                    upvoteBtn?.classList.remove('active');
                    downvoteBtn?.classList.remove('active');
                    needInfoBtn?.classList.remove('active');
                    
                    // Add active state for current vote
                    if (userVote) {
                        if (userVote.vote_type === 1) upvoteBtn?.classList.add('active');
                        else if (userVote.vote_type === -1) downvoteBtn?.classList.add('active');
                        else if (userVote.vote_type === 0) needInfoBtn?.classList.add('active');
                    }
                }
            }
        } catch (error) {
            console.error('Failed to update vote counts:', error);
        }
    }

    /**
     * Truncate paper title for display
     */
    truncateTitle(paperPath, maxLength = 40) {
        if (paperPath.length <= maxLength) {
            return paperPath;
        }
        return paperPath.substring(0, maxLength) + '...';
    }

    /**
     * Handle "need better info" vote with optional reason
     */
    async voteNeedInfo(paperPath, reason = null) {
        // Show prompt for reason if not provided
        if (!reason) {
            reason = prompt('Why does this paper need better info? (Optional)');
        }
        
        await this.vote(paperPath, 0, reason);
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