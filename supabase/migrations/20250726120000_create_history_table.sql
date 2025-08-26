/*
          # Create Presentation History Table
          This script creates a table to store the history of generated presentations for each user.

          ## Query Description: 
          This operation creates a new table named `history` to store user-specific data. It is a non-destructive, structural change and will not affect any existing data. It is designed to work with Supabase's authentication system.

          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Low"
          - Requires-Backup: false
          - Reversible: true (the table can be dropped)
          
          ## Structure Details:
          - Table: `public.history`
          - Columns:
            - `id`: UUID, Primary Key
            - `user_id`: UUID, Foreign Key to `auth.users.id`
            - `prompt`: JSONB, Stores the input topic and style
            - `response`: JSONB, Stores the full generated presentation
            - `created_at`: Timestamp with time zone
          
          ## Security Implications:
          - RLS Status: Enabled
          - Policy Changes: Yes. New policies are created to ensure users can only access their own history records.
          - Auth Requirements: Users must be authenticated to interact with this table.
          
          ## Performance Impact:
          - Indexes: A new index is created on the `user_id` column to ensure efficient querying of user-specific history.
          - Triggers: None
          - Estimated Impact: Low. This will have a negligible impact on overall database performance.
          */

-- Create the history table
CREATE TABLE public.history (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    prompt jsonb NOT NULL,
    response jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT history_pkey PRIMARY KEY (id),
    CONSTRAINT history_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.history IS 'Stores the history of generated presentations for each user.';
COMMENT ON COLUMN public.history.user_id IS 'Links to the authenticated user.';
COMMENT ON COLUMN public.history.prompt IS 'The user''s input (topic and style).';
COMMENT ON COLUMN public.history.response IS 'The full AI-generated presentation object.';

-- Create an index on user_id for faster lookups
CREATE INDEX ix_history_user_id ON public.history USING btree (user_id);

-- 1. Enable Row Level Security (RLS) on the 'history' table
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy that allows users to insert their own history
CREATE POLICY "Allow authenticated users to insert their own history"
ON public.history
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. Create a policy that allows users to select their own history
CREATE POLICY "Allow authenticated users to select their own history"
ON public.history
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 4. Create a policy that allows users to delete their own history
CREATE POLICY "Allow authenticated users to delete their own history"
ON public.history
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
