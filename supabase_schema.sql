-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create papers table
CREATE TABLE papers (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  path TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create votes table
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  paper_id INTEGER REFERENCES papers(id) ON DELETE CASCADE,
  vote_type INTEGER NOT NULL CHECK (vote_type IN (-1, 1)), -- -1 for downvote, 1 for upvote
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, paper_id)
);

-- Create function to get vote counts
CREATE OR REPLACE FUNCTION get_paper_votes(paper_path TEXT)
RETURNS TABLE(upvotes BIGINT, downvotes BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) FILTER (WHERE vote_type = 1) as upvotes,
    COUNT(*) FILTER (WHERE vote_type = -1) as downvotes
  FROM votes v
  JOIN papers p ON v.paper_id = p.id
  WHERE p.path = paper_path;
END;
$$ LANGUAGE plpgsql;

-- Insert papers from your current collection
INSERT INTO papers (title, path) VALUES
('Large Scale Deployment of BERT Based Cross Encoder Model for Re-Ranking in Walmart Search Engine', 'Large Scale Deployment of BERT Based Cross Encoder Model for Re-Ranking in Walmart Search Engine'),
('Structure-Aware Conversational Legal Case Retrieval', 'Structure-Aware Conversational Legal Case Retrieval'),
('Light: Enhancing Learning Path Recommendation via Knowledge Topology-Aware Sequence Optimization', 'Light: Enhancing Learning Path Recommendation via Knowledge Topology-Aware Sequence Optimization'),
('A Reproducibility Study of Graph Based Legal Case Retrieval', 'A Reproducibility Study of Graph Based Legal Case Retrieval'),
('Efficient Recommendation with Millions of Items by Dynamic Pruning', 'Efficient Recommendation with Millions of Items by Dynamic Pruning'),
('Cafe+: Towards Compact, Adaptive, and Fast Embedding', 'Cafe+: Towards Compact, Adaptive, and Fast Embedding'),
('Pre-training for Recommendation Unlearning', 'Pre-training for Recommendation Unlearning'),
('Data-efficient Meta-models for Evaluation of Context-based Questions and Answers in LLMs', 'Data-efficient Meta-models for Evaluation of Context-based Questions and Answers in LLMs'),
('Insight Agents: An LLM-Based Multi-Agent System for Data Insights', 'Insight Agents: An LLM-Based Multi-Agent System for Data Insights'),
('From Relevance to Reality: Scaling Human-Centered Evaluation in the LLM Era', 'From Relevance to Reality: Scaling Human-Centered Evaluation in the LLM Era');

-- Enable Row Level Security on votes table
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only insert/update/delete their own votes
CREATE POLICY "Users can manage their own votes" ON votes
FOR ALL USING (auth.uid() = user_id);

-- Policy: Anyone can view votes (for displaying counts)
CREATE POLICY "Anyone can view votes" ON votes
FOR SELECT USING (true);

-- Policy: Anyone can view papers
CREATE POLICY "Anyone can view papers" ON papers
FOR SELECT USING (true);

ALTER TABLE papers ENABLE ROW LEVEL SECURITY;