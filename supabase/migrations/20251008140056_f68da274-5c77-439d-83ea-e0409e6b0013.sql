-- Fix Privilege Escalation: Restrict profile updates to exclude plan changes
-- Drop the overly permissive update policy
DROP POLICY IF EXISTS "users_can_update_own_profile" ON public.profiles;

-- Create a new policy that allows users to update their profile except for plan and rate limit fields
-- The plan field should only be modified through backend payment verification
CREATE POLICY "users_can_update_own_profile_restricted" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND plan = (SELECT plan FROM public.profiles WHERE id = auth.uid())
  AND videos_processed_today = (SELECT videos_processed_today FROM public.profiles WHERE id = auth.uid())
  AND last_processed_date = (SELECT last_processed_date FROM public.profiles WHERE id = auth.uid())
);

-- Add UPDATE policy to repurpose_results table
-- Allow users to update title and caption of their own results
CREATE POLICY "users_can_update_own_results" 
ON public.repurpose_results 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND id = (SELECT id FROM public.repurpose_results WHERE id = repurpose_results.id)
);

-- Add DELETE policy to profiles for GDPR compliance
CREATE POLICY "users_can_delete_own_profile" 
ON public.profiles 
FOR DELETE 
TO authenticated
USING (auth.uid() = id);