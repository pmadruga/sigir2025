/**
 * Papers Module
 * Handles paper display, search, and interactions
 */

class PapersManager {
    constructor() {
        this.papers = [];
        this.readmeCache = {};
        this.allCards = [];
        this.currentPaper = null;
        this.elements = {};
        this.initializeElements();
    }

    /**
     * Initialize DOM element references
     */
    initializeElements() {
        this.elements = {
            papersGrid: document.getElementById('papersGrid'),
            searchInput: document.getElementById('searchInput'),
            stats: document.getElementById('stats'),
            modalBackdrop: document.getElementById('modalBackdrop'),
            modalContent: document.getElementById('modalContent'),
            modalTitle: document.getElementById('modalTitle'),
            modalBody: document.getElementById('modalBody'),
            modalClose: document.getElementById('modalClose')
        };
    }

    /**
     * Initialize papers with data
     * @param {Array} papersData - Array of paper objects
     */
    initialize(papersData) {
        this.papers = papersData || [];
        this.setupEventListeners();
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Search functionality
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Modal close events
        if (this.elements.modalClose) {
            this.elements.modalClose.addEventListener('click', () => this.closeModal());
        }

        if (this.elements.modalBackdrop) {
            this.elements.modalBackdrop.addEventListener('click', () => this.closeModal());
        }

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentPaper) {
                this.closeModal();
            }
        });
    }

    /**
     * Display all papers
     */
    async displayPapers() {
        if (!this.elements.papersGrid) {
            console.error('Papers grid element not found');
            return;
        }

        try {
            this.showLoadingState();
            this.elements.papersGrid.innerHTML = '';
            this.allCards = [];

            for (const paper of this.papers) {
                const card = await this.createPaperCard(paper);
                this.elements.papersGrid.appendChild(card);
                this.allCards.push(card);
            }

            this.updateStats();
        } catch (error) {
            console.error('Error displaying papers:', error);
            this.showError('Failed to load papers. Please refresh the page.');
        }
    }

    /**
     * Create a paper card element
     * @param {Object} paper - Paper object
     * @returns {HTMLElement} Paper card element
     */
    async createPaperCard(paper) {
        const card = document.createElement('div');
        card.className = 'paper-card';
        card.setAttribute('data-paper-path', paper.path);

        try {
            const readme = await this.loadReadme(paper);
            const preview = this.extractPreview(readme);

            card.innerHTML = `
                <div class="paper-title">${this.escapeHtml(paper.title)}</div>
                <div class="paper-path">${this.escapeHtml(paper.path)}/</div>
                <div class="paper-preview">${this.escapeHtml(preview) || 'Click to view README content...'}</div>
                <div class="voting-buttons">
                    <div class="vote-btn upvote-btn" data-paper-path="${this.escapeHtml(paper.path)}" data-vote-type="1" title="I like this paper">
                        👍 <span class="vote-count upvote-count">0</span>
                    </div>
                    <div class="vote-btn downvote-btn" data-paper-path="${this.escapeHtml(paper.path)}" data-vote-type="-1" title="I don't like this paper">
                        👎 <span class="vote-count downvote-count">0</span>
                    </div>
                    <div class="vote-btn need-info-btn" data-paper-path="${this.escapeHtml(paper.path)}" data-vote-type="0" title="This paper needs better information">
                        ❓ <span class="vote-count need-info-count">0</span>
                        <span class="vote-label">Need Info</span>
                    </div>
                </div>
            `;

            // Add click handler for card
            card.addEventListener('click', (e) => {
                // Don't open modal if clicking on voting buttons
                if (!e.target.closest('.vote-btn')) {
                    this.openModal(paper);
                }
            });

            // Add click handlers for voting buttons
            card.addEventListener('click', (e) => {
                if (e.target.closest('.vote-btn')) {
                    e.stopPropagation();
                    const voteBtn = e.target.closest('.vote-btn');
                    const paperPath = voteBtn.getAttribute('data-paper-path');
                    const voteType = parseInt(voteBtn.getAttribute('data-vote-type'));
                    
                    // Special handling for "need better info" button
                    if (voteType === 0) {
                        this.handleNeedInfoVote(paperPath);
                    } else {
                        this.handleVote(paperPath, voteType);
                    }
                }
            });

        } catch (error) {
            console.error(`Error creating card for paper ${paper.title}:`, error);
            card.innerHTML = `
                <div class="paper-title">${this.escapeHtml(paper.title)}</div>
                <div class="paper-path">${this.escapeHtml(paper.path)}/</div>
                <div class="paper-preview">Error loading paper preview</div>
            `;
        }

        return card;
    }

    /**
     * Load README content for a paper
     * @param {Object} paper - Paper object
     * @returns {Promise<string>} README content
     */
    async loadReadme(paper) {
        if (this.readmeCache[paper.path]) {
            return this.readmeCache[paper.path];
        }

        try {
            const pathParts = paper.path.split('/');
            const encodedParts = pathParts.map(part => encodeURIComponent(part));
            const encodedPath = encodedParts.join('/');

            const response = await fetch(`${encodedPath}/README.md`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const content = await response.text();
            this.readmeCache[paper.path] = content;
            return content;
        } catch (error) {
            console.warn(`Could not load README for ${paper.path}:`, error);
            const fallbackContent = `# ${paper.title}\n\nREADME file not found or could not be loaded.\n\nError: ${error.message}`;
            this.readmeCache[paper.path] = fallbackContent;
            return fallbackContent;
        }
    }

    /**
     * Extract preview text from markdown content
     * @param {string} markdown - Markdown content
     * @returns {string} Preview text
     */
    extractPreview(markdown) {
        const lines = markdown.split('\n');
        for (let line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const preview = trimmed.replace(/[*_`]/g, ''); // Remove markdown formatting
                return preview.length > 150 ? preview.substring(0, 150) + '...' : preview;
            }
        }
        return '';
    }

    /**
     * Handle search input
     * @param {string} searchTerm - Search term
     */
    async handleSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        let visibleCount = 0;

        for (let i = 0; i < this.allCards.length; i++) {
            const paper = this.papers[i];
            const card = this.allCards[i];

            let isVisible = false;

            if (term === '') {
                isVisible = true;
            } else {
                // Search in title
                const titleMatch = paper.title.toLowerCase().includes(term);
                
                // Search in content
                let contentMatch = false;
                try {
                    const readme = await this.loadReadme(paper);
                    contentMatch = readme.toLowerCase().includes(term);
                } catch (error) {
                    console.warn(`Search error for ${paper.path}:`, error);
                }

                isVisible = titleMatch || contentMatch;
            }

            card.style.display = isVisible ? 'block' : 'none';
            if (isVisible) visibleCount++;
        }

        this.updateStats(visibleCount);
    }

    /**
     * Open modal for a paper
     * @param {Object} paper - Paper object
     */
    async openModal(paper) {
        this.currentPaper = paper;

        try {
            // Show modal immediately
            this.elements.modalBackdrop?.classList.add('show');
            this.elements.modalContent?.classList.add('show');
            document.body.style.overflow = 'hidden';

            // Load content
            if (this.elements.modalTitle) {
                this.elements.modalTitle.textContent = paper.title;
            }

            if (this.elements.modalBody) {
                this.elements.modalBody.innerHTML = '<div class="loading">Loading README content...</div>';
                
                const content = await this.loadReadme(paper);
                if (window.marked) {
                    this.elements.modalBody.innerHTML = window.marked.parse(content);
                } else {
                    // Fallback if marked is not available
                    this.elements.modalBody.innerHTML = `<pre>${this.escapeHtml(content)}</pre>`;
                }
            }

            // Update active card
            this.allCards.forEach((card, index) => {
                card.classList.toggle('active', this.papers[index] === paper);
            });

        } catch (error) {
            console.error('Error opening modal:', error);
            if (this.elements.modalBody) {
                this.elements.modalBody.innerHTML = `<p>Error loading content: ${error.message}</p>`;
            }
        }
    }

    /**
     * Close modal
     */
    closeModal() {
        this.elements.modalBackdrop?.classList.remove('show');
        this.elements.modalContent?.classList.remove('show');
        document.body.style.overflow = '';

        // Remove active state from cards
        this.allCards.forEach(card => card.classList.remove('active'));
        this.currentPaper = null;
    }

    /**
     * Handle voting
     * @param {string} paperPath - Paper path
     * @param {number} voteType - Vote type (1 or -1)
     */
    async handleVote(paperPath, voteType) {
        if (window.AppManager && window.AppManager.votingSystem) {
            try {
                await window.AppManager.votingSystem.vote(paperPath, voteType);
            } catch (error) {
                console.error('Voting error:', error);
            }
        } else {
            console.warn('Voting system not available');
        }
    }

    /**
     * Handle "need better info" vote with reason prompt
     * @param {string} paperPath - Paper path
     */
    async handleNeedInfoVote(paperPath) {
        if (!window.AppManager || !window.AppManager.votingSystem) {
            console.warn('Voting system not available');
            return;
        }

        try {
            // Check if user already voted "need better info" - if so, just toggle it off
            const existingVote = await window.AppManager.votingSystem.getUserVote(paperPath);
            
            if (existingVote && existingVote.vote_type === 0) {
                // Remove the vote (toggle off)
                await window.AppManager.votingSystem.vote(paperPath, 0);
                return;
            }

            // Show reason dialog
            const reason = await this.showReasonDialog(paperPath);
            
            // Vote with reason (reason can be null if user cancels)
            await window.AppManager.votingSystem.vote(paperPath, 0, reason);
            
        } catch (error) {
            console.error('Need info voting error:', error);
        }
    }

    /**
     * Show reason dialog for "need better info" votes
     * @param {string} paperPath - Paper path
     * @returns {Promise<string|null>} Reason or null if cancelled
     */
    async showReasonDialog(paperPath) {
        return new Promise((resolve) => {
            // Create modal dialog
            const modal = document.createElement('div');
            modal.className = 'reason-modal-backdrop';
            modal.innerHTML = `
                <div class="reason-modal">
                    <h3>Why does this paper need better info?</h3>
                    <p><strong>Paper:</strong> ${this.escapeHtml(this.truncateTitle(paperPath, 60))}</p>
                    <textarea 
                        id="reasonText" 
                        placeholder="Optional: Explain what information is missing or unclear..."
                        rows="4"
                        maxlength="500"
                    ></textarea>
                    <div class="reason-modal-buttons">
                        <button type="button" id="reasonCancel" class="btn-secondary">Cancel</button>
                        <button type="button" id="reasonSubmit" class="btn-primary">Submit Vote</button>
                    </div>
                </div>
            `;

            // Add styles
            modal.style.cssText = `
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.2s ease-out;
            `;

            const innerModal = modal.querySelector('.reason-modal');
            innerModal.style.cssText = `
                background: white;
                padding: 30px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease-out;
            `;

            const textarea = modal.querySelector('#reasonText');
            textarea.style.cssText = `
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-family: inherit;
                font-size: 14px;
                margin: 15px 0;
                resize: vertical;
                min-height: 80px;
            `;

            const buttonContainer = modal.querySelector('.reason-modal-buttons');
            buttonContainer.style.cssText = `
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                margin-top: 20px;
            `;

            const buttons = modal.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.style.cssText = `
                    padding: 10px 20px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.2s;
                `;
                
                if (btn.classList.contains('btn-primary')) {
                    btn.style.backgroundColor = '#667eea';
                    btn.style.color = 'white';
                } else {
                    btn.style.backgroundColor = '#f5f5f5';
                    btn.style.color = '#333';
                }
            });

            // Add event listeners
            modal.querySelector('#reasonCancel').onclick = () => {
                modal.remove();
                resolve(null);
            };

            modal.querySelector('#reasonSubmit').onclick = () => {
                const reason = textarea.value.trim();
                modal.remove();
                resolve(reason || null);
            };

            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    resolve(null);
                }
            });

            // Close on Escape key
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', escapeHandler);
                    resolve(null);
                }
            };
            document.addEventListener('keydown', escapeHandler);

            // Focus textarea
            setTimeout(() => textarea.focus(), 100);

            document.body.appendChild(modal);
        });
    }

    /**
     * Truncate text for display
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum length
     * @returns {string} Truncated text
     */
    truncateTitle(text, maxLength = 40) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    /**
     * Update vote counts for all papers
     */
    async updateAllVoteCounts() {
        if (!window.AppManager?.votingSystem?.currentUser) return;

        try {
            for (const paper of this.papers) {
                await window.AppManager.votingSystem.updateVoteCounts(paper.path);
            }
        } catch (error) {
            console.error('Error updating vote counts:', error);
        }
    }

    /**
     * Update statistics display
     * @param {number} visibleCount - Number of visible papers (optional)
     */
    updateStats(visibleCount = null) {
        if (!this.elements.stats) return;

        const count = visibleCount !== null ? visibleCount : this.papers.length;
        const total = this.papers.length;

        if (visibleCount !== null && visibleCount < total) {
            this.elements.stats.textContent = `Showing ${count} of ${total} papers`;
        } else {
            this.elements.stats.textContent = `${total} papers available`;
        }
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        if (this.elements.papersGrid) {
            this.elements.papersGrid.innerHTML = '<div class="loading">Loading papers...</div>';
        }
        
        if (this.elements.stats) {
            this.elements.stats.textContent = 'Loading papers...';
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        if (this.elements.papersGrid) {
            this.elements.papersGrid.innerHTML = `<div class="loading" style="color: #ef4444;">${message}</div>`;
        }
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Get papers data
     * @returns {Array} Papers array
     */
    getPapers() {
        return [...this.papers];
    }
}

// Export for use in other modules
window.PapersManager = PapersManager;