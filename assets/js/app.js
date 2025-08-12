/**
 * Main Application Module
 * Orchestrates all other modules and handles app initialization
 */

class AppManager {
    constructor() {
        this.configManager = new ConfigManager();
        this.authManager = new AuthManager();
        this.papersManager = new PapersManager();
        this.votingSystem = null;
        this.initialized = false;
    }

    /**
     * Initialize the application
     */
    async initialize() {
        try {
            console.log('🚀 Initializing SIGIR 2025 Papers Application...');
            
            // Load configuration
            await this.loadConfiguration();
            
            // Wait for dependencies to load
            await this.waitForDependencies();
            
            // Initialize voting system
            const votingInitialized = this.initializeVotingSystem();
            if (!votingInitialized) {
                throw new Error('Failed to initialize voting system');
            }
            
            // Initialize managers
            this.initializeManagers();
            
            // Load and display papers
            await this.loadPapers();
            
            // Set up test users if available
            this.setupTestUsers();
            
            this.initialized = true;
            console.log('✅ Application initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.showInitializationError(error);
        }
    }

    /**
     * Wait for required dependencies to load
     */
    async waitForDependencies() {
        const maxAttempts = 50; // 5 seconds max
        let attempts = 0;

        while (attempts < maxAttempts) {
            if (window.SupabaseVoting && window.supabase && window.marked) {
                console.log('✅ All dependencies loaded');
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        // Check which dependencies are missing
        const missing = [];
        if (!window.SupabaseVoting) missing.push('SupabaseVoting');
        if (!window.supabase) missing.push('Supabase client');
        if (!window.marked) missing.push('Marked (markdown parser)');

        throw new Error(`Required dependencies not loaded: ${missing.join(', ')}`);
    }

    /**
     * Load application configuration
     */
    async loadConfiguration() {
        try {
            await this.configManager.load();
            console.log('✅ Configuration loaded');
        } catch (error) {
            console.error('⚠️ Configuration loading failed:', error);
            throw new Error('Failed to load configuration');
        }
    }

    /**
     * Initialize voting system with credentials
     */
    initializeVotingSystem() {
        try {
            const config = this.configManager.getAll();
            
            if (!window.SupabaseVoting) {
                console.warn('⚠️ SupabaseVoting class not found, waiting for scripts to load...');
                return false;
            }
            
            this.votingSystem = new SupabaseVoting(
                config.SUPABASE_URL,
                config.SUPABASE_ANON_KEY
            );
            
            console.log('✅ Voting system initialized');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize voting system:', error);
            throw error;
        }
    }

    /**
     * Initialize all managers
     */
    initializeManagers() {
        try {
            // Initialize authentication manager
            this.authManager.initialize(this.votingSystem);
            
            // Initialize papers manager with paper data
            const papersData = this.getPapersData();
            this.papersManager.initialize(papersData);
            
            console.log('✅ Managers initialized');
        } catch (error) {
            console.error('❌ Failed to initialize managers:', error);
            throw error;
        }
    }

    /**
     * Load and display papers
     */
    async loadPapers() {
        try {
            await this.papersManager.displayPapers();
            
            // Load vote counts if user is authenticated
            await this.updateVoteCounts();
            
            console.log('✅ Papers loaded');
        } catch (error) {
            console.error('❌ Failed to load papers:', error);
            // Don't throw here - let the app continue without papers
        }
    }

    /**
     * Set up test users if available
     */
    setupTestUsers() {
        try {
            const testUsers = this.configManager.get('TEST_USERS');
            if (testUsers && testUsers.length > 0) {
                this.authManager.addTestUserButtons(testUsers);
                console.log(`✅ ${testUsers.length} test users configured`);
            }
        } catch (error) {
            console.warn('⚠️ Could not set up test users:', error);
        }
    }

    /**
     * Handle user sign in event
     */
    async onUserSignedIn() {
        try {
            console.log('👤 User signed in, updating vote counts...');
            await this.updateVoteCounts();
        } catch (error) {
            console.error('❌ Error handling user sign in:', error);
        }
    }

    /**
     * Update vote counts for all papers
     */
    async updateVoteCounts() {
        if (this.votingSystem?.currentUser) {
            await this.papersManager.updateAllVoteCounts();
        }
    }

    /**
     * Get papers data (would be loaded from external source in production)
     */
    getPapersData() {
        return [
            { title: "Large Scale Deployment of BERT Based Cross Encoder Model for Re-Ranking in Walmart Search Engine", path: "Large Scale Deployment of BERT Based Cross Encoder Model for Re-Ranking in Walmart Search Engine" },
            { title: "Structure-Aware Conversational Legal Case Retrieval", path: "Structure-Aware Conversational Legal Case Retrieval" },
            { title: "Light: Enhancing Learning Path Recommendation via Knowledge Topology-Aware Sequence Optimization", path: "Light: Enhancing Learning Path Recommendation via Knowledge Topology-Aware Sequence Optimization" },
            { title: "A Reproducibility Study of Graph Based Legal Case Retrieval", path: "A Reproducibility Study of Graph Based Legal Case Retrieval" },
            { title: "Efficient Recommendation with Millions of Items by Dynamic Pruning", path: "Efficient Recommendation with Millions of Items by Dynamic Pruning" },
            { title: "Cafe+: Towards Compact, Adaptive, and Fast Embedding", path: "Cafe+: Towards Compact, Adaptive, and Fast Embedding" },
            { title: "Pre-training for Recommendation Unlearning", path: "Pre-training for Recommendation Unlearning" },
            { title: "Data-efficient Meta-models for Evaluation of Context-based Questions and Answers in LLMs", path: "Data-efficient Meta-models for Evaluation of Context-based Questions and Answers in LLMs" },
            { title: "Insight Agents: An LLM-Based Multi-Agent System for Data Insights", path: "Insight Agents: An LLM-Based Multi-Agent System for Data Insights" },
            { title: "From Relevance to Reality: Scaling Human-Centered Evaluation in the LLM Era", path: "From Relevance to Reality: Scaling Human-Centered Evaluation in the LLM Era" },
            { title: "AuditLLM: A Tool for Auditing Large Language Models Using Multiprobe Approach", path: "AuditLLM: A Tool for Auditing Large Language Models Using Multiprobe Approach" },
            { title: "Using Large Language Models to Generate, Validate, and Apply User Intent Taxonomies", path: "Using Large Language Models to Generate, Validate, and Apply User Intent Taxonomies" },
            { title: "From Prompt Engineering to Prompt Science", path: "aa_in_review/From Prompt Engineering to Prompt Science" },
            { title: "Face Fine-grained Reference Free Evaluator", path: "Face Fine-grained Reference Free Evaluator" },
            { title: "ReARTeR Retrieval Augmented Reasoning with Trustworthy Process Rewarding", path: "ReARTeR Retrieval Augmented Reasoning with Trustworthy Process Rewarding" },
            { title: "Unveiling Knowledge Utilization Mechanisms in LLM based RAG", path: "Unveiling Knowledge Utilization Mechanisms in LLM based RAG" },
            { title: "Robust Fine Tuning for RAG Against Retrieval Defects", path: "Robust Fine Tuning for RAG Against Retrieval Defects" },
            { title: "Predicting RAG Performance for Text Completion", path: "Predicting RAG Performance for Text Completion" },
            { title: "RAG with Collaborative Filtering for Personalized Text Generation", path: "RAG with Collaborative Filtering for Personalized Text Generation" },
            { title: "Knowing You Don't Know: Learning When to Continue Search Multi Round RAG", path: "Knowing You Dont Know Learning When to Continue Search Multi Round RAG" },
            { title: "Cirag Retrieval Augmented Language Model with Collective Intelligence", path: "Cirag Retrieval Augmented Language Model with Collective Intelligence" },
            { title: "Response Quality Assessment RAG Conditional Conformal Factuality", path: "Response Quality Assessment RAG Conditional Conformal Factuality" },
            { title: "Language Model Alignment Conversational Shopping Amazon", path: "Language Model Alignment Conversational Shopping Amazon" },
            { title: "Inquiry Assistant Using LLM-Generated Knowledge Graphs", path: "Inquiry Assistant Using LLM-Generated Knowledge Graphs" },
            { title: "MAAQR: An LLM-Based Multi-Agent Framework for Adaptive Query Rewriting in Alipay Search", path: "Maaqr an LLM-Based Multi-Agent Framework for Adaptive Query Rewriting in Alipay Search" },
            { title: "Examples as the Prompt: A Scalable Approach for Efficient LLM Adaptation in E-Commerce", path: "Examples as the Prompt A Scalable Approach for Efficient LLM Adaptation in E-Commerce" },
            { title: "HELM-D: A Dynamic Benchmark for Continual LLM Evaluation", path: "aa_in_review/Helm-D: A Dynamic Benchmark for Continual LLM Evaluation" },
            { title: "A Framework for Calibrating Human Raters on Subjective LLM Tasks", path: "aa_in_review/A Framework for Calibrating Human Raters on Subjective LLM Tasks" },
            { title: "Red-Teaming at Scale: Systematically Discovering LLM Failure Modes", path: "Red-Teaming at Scale: Systematically Discovering LLM Failure Modes" },
            { title: "Evaluating Reasoning Pathways, Not Just Final Answers", path: "aa_in_review/Evaluating Reasoning Pathways, Not Just Final Answers" },
            { title: "Assessing the Viability and Bias of LLM-based Evaluators", path: "aa_in_review/Assessing the Viability and Bias of LLM-based Evaluators" },
            { title: "WildChat: A Benchmark of Unfiltered, Real-World User Interactions", path: "WildChat: A Benchmark of Unfiltered, Real-World User Interactions" },
            { title: "Proactive Conversational AI: A Comprehensive Survey of Advancements and Opportunities", path: "Proactive Conversational AI A Comprehensive Survey of Advancements and Opportunities" },
            { title: "DISCO LLM: Knowledge Distillation for Efficient Sparse Retrieval in Conversational Search", path: "Disco LLM Knowledge Distillation for Efficient Sparse Retrieval in Conversational Search" },
            { title: "Clarifying Ambiguities on the Role of Ambiguity Types in Prompting Methods for Clarification Generation", path: "Clarifying Ambiguities on the Role of Ambiguity Types in Prompting Methods for Clarification Generation" },
            { title: "Beyond Whole Dialogue Modeling: Contextual Disentanglement for Conversational Recommendation", path: "Beyond Whole Dialogue Modeling Contextual Disentanglement for Conversational Recommendation" },
            { title: "MSCRS: Multi-Modal Semantic Graph Prompt Learning Framework for Conversational Recommender Systems", path: "Mscrs Multi-Modal Semantic Graph Prompt Learning Framework for Conversational Recommender Systems" },
            { title: "Action First: Leveraging Preference-Aware Actions for More Effective Decision-Making in Interactive Recommender Systems", path: "Action First Leveraging Preference-Aware Actions for More Effective Decision-Making in Interactive Recommender Systems" },
            { title: "Bridging the Gap from Ad-Hoc to Proactive Search in Conversations", path: "Bridging the Gap from Ad-Hoc to Proactive Search in Conversations" },
            { title: "Search-Based Interaction for Conversation Recommendation via Generative Reward Model Based Simulated User", path: "Search-Based Interaction for Conversation Recommendation via Generative Reward Model Based Simulated User" },
            { title: "Rankers, Judges, and Assistants: Towards Understanding the Interplay of LLMs in Information Retrieval Evaluation", path: "Rankers, Judges, and Assistants: Towards Understanding the Interplay of LLMs in Information Retrieval Evaluation" },
            { title: "InstructRAG: Leveraging Retrieval-Augmented Generation on Instruction Graphs for LLM-Based Task Planning", path: "InstructRAG: Leveraging Retrieval-Augmented Generation on Instruction Graphs for LLM-Based Task Planning" },
            { title: "A Unified Retrieval Framework with Document Ranking and EDU Filtering for Multi-Document Summarization", path: "A Unified Retrieval Framework with Document Ranking and EDU Filtering for Multi-Document Summarization" },
            { title: "Retrieval Augmented Generation for Dynamic Graph Modeling", path: "Retrieval Augmented Generation for Dynamic Graph Modeling" },
            { title: "Empowering Large Language Model Agent through Step-Level Self-Critique and Self-Training", path: "Empowering Large Language Model Agent through Step-Level Self-Critique and Self-Training" },
            { title: "Thursday Morning Workshop Papers", path: "unprocessed/Thursday Morning Workshop" },
            { title: "Thursday Afternoon Workshop Papers", path: "unprocessed/Thursday Afternoon Workshop" },
            { title: "Alleviating LLM-Based Generative Retrieval Hallucination in Alipay Search", path: "Alleviating LLM-Based Generative Retrieval Hallucination in Alipay Search" }
        ];
    }

    /**
     * Show initialization error
     * @param {Error} error - Error that occurred
     */
    showInitializationError(error) {
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; color: white; padding: 40px;">
                    <h1>❌ Application Failed to Initialize</h1>
                    <p>Error: ${error.message}</p>
                    <p>Please refresh the page or check the console for more details.</p>
                    <button onclick="window.location.reload()" style="
                        background: #667eea; 
                        color: white; 
                        border: none; 
                        padding: 12px 24px; 
                        border-radius: 8px; 
                        font-size: 1rem;
                        cursor: pointer;
                        margin-top: 20px;
                    ">Reload Page</button>
                </div>
            `;
        }
    }

    /**
     * Get app status
     * @returns {Object} App status information
     */
    getStatus() {
        return {
            initialized: this.initialized,
            configLoaded: this.configManager.loaded,
            votingSystemReady: !!this.votingSystem,
            userSignedIn: !!this.votingSystem?.currentUser,
            papersCount: this.papersManager.getPapers().length
        };
    }
}

// Global app instance
window.AppManager = null;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Wait for all scripts to load completely
        await new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
        
        // Additional safety delay for script loading
        await new Promise(resolve => setTimeout(resolve, 200));
        
        console.log('📦 Initializing AppManager...');
        window.AppManager = new AppManager();
        await window.AppManager.initialize();
        
    } catch (error) {
        console.error('Failed to create app manager:', error);
        // Let the AppManager handle the error display
        if (window.AppManager) {
            window.AppManager.showInitializationError(error);
        }
    }
});

// Export for debugging
window.AppManager = AppManager;