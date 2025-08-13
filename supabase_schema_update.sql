-- Enhanced SIGIR 2025 Papers Database Schema Update
-- Run this in Supabase SQL Editor to add new voting features

-- First, let's check if we need to modify the existing votes table structure
-- If the votes table uses paper_id instead of paper_path, we'll update it

-- Step 1: Update votes table to support new vote types and paper_path
-- Drop the existing table if it exists (BE CAREFUL - this removes all vote data)
-- Comment out the DROP if you want to preserve existing votes
-- DROP TABLE IF EXISTS votes CASCADE;

-- Create the enhanced votes table
CREATE TABLE IF NOT EXISTS votes_new (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    paper_path TEXT NOT NULL, -- Using paper_path instead of paper_id for simpler integration
    vote_type INTEGER CHECK (vote_type IN (-1, 0, 1)), -- -1=downvote, 0=need_info, 1=upvote
    vote_reason TEXT, -- Optional: reason for "need better info" votes
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, paper_path)
);

-- Enable Row Level Security on the new table
ALTER TABLE votes_new ENABLE ROW LEVEL SECURITY;

-- Migrate data from old table to new table (if votes table exists with different structure)
-- Uncomment these lines if you have existing vote data to migrate:
-- INSERT INTO votes_new (user_id, paper_path, vote_type, created_at, updated_at)
-- SELECT v.user_id, p.path, v.vote_type, v.created_at, v.updated_at
-- FROM votes v
-- JOIN papers p ON v.paper_id = p.id
-- ON CONFLICT (user_id, paper_path) DO NOTHING;

-- Drop the old table and rename the new one (BE CAREFUL)
-- Uncomment these lines after confirming the migration worked:
-- DROP TABLE IF EXISTS votes CASCADE;
-- ALTER TABLE votes_new RENAME TO votes;

-- OR if you want to keep both tables for now, just use votes_new
-- The application code will need to be updated to use 'votes_new' instead of 'votes'

-- Create policies for the votes table (using votes_new for now)
CREATE POLICY "Users can view all votes" ON votes_new
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Users can insert their own votes" ON votes_new
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" ON votes_new
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes" ON votes_new
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

-- Create a view to see vote statistics including the new "need better info" votes
CREATE OR REPLACE VIEW vote_statistics AS
SELECT 
    paper_path,
    COUNT(CASE WHEN vote_type = 1 THEN 1 END) as upvotes,
    COUNT(CASE WHEN vote_type = -1 THEN 1 END) as downvotes,
    COUNT(CASE WHEN vote_type = 0 THEN 1 END) as need_info_votes,
    COUNT(*) as total_votes,
    -- Calculate a simple engagement score
    (COUNT(CASE WHEN vote_type = 1 THEN 1 END) * 1.0 + 
     COUNT(CASE WHEN vote_type = 0 THEN 1 END) * 0.5 - 
     COUNT(CASE WHEN vote_type = -1 THEN 1 END) * 0.5) as engagement_score
FROM votes_new
GROUP BY paper_path;

-- Grant access to the view
GRANT SELECT ON vote_statistics TO authenticated;
GRANT SELECT ON vote_statistics TO anon;

-- Create a function to get user votes for a specific paper
CREATE OR REPLACE FUNCTION get_user_vote(user_uuid UUID, paper_path_param TEXT)
RETURNS TABLE (
    vote_type INTEGER,
    vote_reason TEXT,
    updated_at TIMESTAMPTZ
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT v.vote_type, v.vote_reason, v.updated_at
    FROM votes_new v
    WHERE v.user_id = user_uuid 
    AND v.paper_path = paper_path_param;
END;
$$;

-- Create a function to handle vote updates (allows changing votes)
CREATE OR REPLACE FUNCTION update_vote(
    paper_path_param TEXT,
    vote_type_param INTEGER,
    vote_reason_param TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Validate vote_type
    IF vote_type_param NOT IN (-1, 0, 1) THEN
        RAISE EXCEPTION 'Invalid vote_type. Must be -1, 0, or 1';
    END IF;
    
    -- Insert or update the vote
    INSERT INTO votes_new (user_id, paper_path, vote_type, vote_reason, updated_at)
    VALUES (auth.uid(), paper_path_param, vote_type_param, vote_reason_param, NOW())
    ON CONFLICT (user_id, paper_path)
    DO UPDATE SET 
        vote_type = EXCLUDED.vote_type,
        vote_reason = EXCLUDED.vote_reason,
        updated_at = NOW();
END;
$$;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION get_user_vote(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION update_vote(TEXT, INTEGER, TEXT) TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_votes_new_user_paper ON votes_new(user_id, paper_path);
CREATE INDEX IF NOT EXISTS idx_votes_new_paper_path ON votes_new(paper_path);
CREATE INDEX IF NOT EXISTS idx_votes_new_vote_type ON votes_new(vote_type);

-- Success message
SELECT 'Enhanced voting schema created successfully! 
- Added support for "need better info" votes (vote_type = 0)
- Added vote_reason field for explanations
- Added vote changing capability
- Created helper functions and views
- Note: You may need to migrate from the old votes table to votes_new' as message;