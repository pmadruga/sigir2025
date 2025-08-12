// Supabase client configuration and voting functionality

class SupabaseVoting {
    constructor(supabaseUrl, supabaseKey) {
        this.supabase = supabase.createClient(supabaseUrl, supabaseKey);
        this.currentUser = null;
        this.initializeAuth();
    }

    async initializeAuth() {
        // Check if user is already logged in
        const { data: { user } } = await this.supabase.auth.getUser();
        this.currentUser = user;
        this.updateAuthUI();

        // Listen for auth changes
        this.supabase.auth.onAuthStateChange((event, session) => {
            this.currentUser = session?.user || null;
            this.updateAuthUI();
        });
    }

    updateAuthUI() {
        const authContainer = document.getElementById('authContainer');
        const userInfo = document.getElementById('userInfo');
        const loginForm = document.getElementById('loginForm');

        if (this.currentUser) {
            loginForm.style.display = 'none';
            userInfo.style.display = 'block';
            userInfo.innerHTML = `
                <span>Welcome, ${this.currentUser.email}</span>
                <button onclick="votingSystem.signOut()" class="auth-btn logout">Sign Out</button>
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

            if (error) throw error;
            
            this.showMessage('Successfully signed in!', 'success');
            return data;
        } catch (error) {
            this.showMessage('Sign in failed: ' + error.message, 'error');
            throw error;
        }
    }

    async signOut() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            
            this.showMessage('Successfully signed out!', 'success');
        } catch (error) {
            this.showMessage('Sign out failed: ' + error.message, 'error');
        }
    }

    async vote(paperPath, voteType) {
        if (!this.currentUser) {
            this.showMessage('Please sign in to vote', 'error');
            return;
        }

        try {
            // First, get the paper ID
            const { data: paper, error: paperError } = await this.supabase
                .from('papers')
                .select('id')
                .eq('path', paperPath)
                .single();

            if (paperError) throw paperError;

            // Insert or update vote
            const { data, error } = await this.supabase
                .from('votes')
                .upsert({
                    user_id: this.currentUser.id,
                    paper_id: paper.id,
                    vote_type: voteType,
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;

            // Update vote counts in UI
            await this.updateVoteCounts(paperPath);
            this.showMessage(voteType === 1 ? 'Upvoted!' : 'Downvoted!', 'success');

        } catch (error) {
            this.showMessage('Voting failed: ' + error.message, 'error');
            console.error('Vote error:', error);
        }
    }

    async getVoteCounts(paperPath) {
        try {
            const { data, error } = await this.supabase
                .rpc('get_paper_votes', { paper_path: paperPath });

            if (error) throw error;
            return data[0] || { upvotes: 0, downvotes: 0 };
        } catch (error) {
            console.error('Error getting vote counts:', error);
            return { upvotes: 0, downvotes: 0 };
        }
    }

    async getUserVote(paperPath) {
        if (!this.currentUser) return null;

        try {
            const { data: paper, error: paperError } = await this.supabase
                .from('papers')
                .select('id')
                .eq('path', paperPath)
                .single();

            if (paperError) return null;

            const { data, error } = await this.supabase
                .from('votes')
                .select('vote_type')
                .eq('user_id', this.currentUser.id)
                .eq('paper_id', paper.id)
                .single();

            if (error) return null;
            return data?.vote_type || null;
        } catch (error) {
            return null;
        }
    }

    async updateVoteCounts(paperPath) {
        const counts = await this.getVoteCounts(paperPath);
        const userVote = await this.getUserVote(paperPath);
        
        const paperCard = document.querySelector(`[data-paper-path="${paperPath}"]`);
        if (paperCard) {
            const upvoteBtn = paperCard.querySelector('.upvote-btn');
            const downvoteBtn = paperCard.querySelector('.downvote-btn');
            const upvoteCount = paperCard.querySelector('.upvote-count');
            const downvoteCount = paperCard.querySelector('.downvote-count');

            if (upvoteCount) upvoteCount.textContent = counts.upvotes || 0;
            if (downvoteCount) downvoteCount.textContent = counts.downvotes || 0;

            // Update button states based on user vote
            if (upvoteBtn && downvoteBtn) {
                upvoteBtn.classList.toggle('active', userVote === 1);
                downvoteBtn.classList.toggle('active', userVote === -1);
            }
        }
    }

    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        if (type === 'success') messageDiv.style.background = '#10B981';
        else if (type === 'error') messageDiv.style.background = '#EF4444';
        else messageDiv.style.background = '#3B82F6';

        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Initialize voting system when page loads
let votingSystem;