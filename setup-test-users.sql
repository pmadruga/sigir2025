-- SQL script to create test users in Supabase
-- Run this in the Supabase SQL Editor after creating the voting schema

-- First, ensure the votes table exists
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    paper_path TEXT NOT NULL,
    vote_type INTEGER CHECK (vote_type IN (-1, 1)),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, paper_path)
);

-- Enable Row Level Security
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies for votes table
CREATE POLICY "Users can view all votes" ON votes
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Users can insert their own votes" ON votes
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" ON votes
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes" ON votes
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

-- Create function to handle user creation (Supabase doesn't allow direct password insertion)
-- Instead, we'll create a simple notification that users need to be created via the dashboard

DO $$
BEGIN
    RAISE NOTICE 'Test users need to be created manually in Supabase Auth dashboard:';
    RAISE NOTICE '1. alex.researcher@example.com - Password: ResearchPaper2025!';
    RAISE NOTICE '2. priya.datascience@example.com - Password: DataScience123#';
    RAISE NOTICE '3. carlos.mleng@example.com - Password: MachineLearning456$';
    RAISE NOTICE '4. sarah.phd@example.com - Password: PhDStudent789%%';
    RAISE NOTICE '5. david.industry@example.com - Password: IndustryExp2025^';
    RAISE NOTICE '6. maria.prof@example.com - Password: Academic&Research!';
    RAISE NOTICE '';
    RAISE NOTICE 'Go to Authentication → Users → Create User for each user above';
END $$;

-- Create a view to see vote statistics (optional but useful)
CREATE OR REPLACE VIEW vote_statistics AS
SELECT 
    paper_path,
    COUNT(CASE WHEN vote_type = 1 THEN 1 END) as upvotes,
    COUNT(CASE WHEN vote_type = -1 THEN 1 END) as downvotes,
    COUNT(*) as total_votes
FROM votes
GROUP BY paper_path;

-- Grant access to the view
GRANT SELECT ON vote_statistics TO authenticated;
GRANT SELECT ON vote_statistics TO anon;

-- Success message
SELECT 'Database schema created successfully! Now create test users in Supabase Auth dashboard.' as message;