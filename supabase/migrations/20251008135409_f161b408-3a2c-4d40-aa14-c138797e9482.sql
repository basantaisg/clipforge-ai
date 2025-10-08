-- Add INSERT policy to profiles table to prevent unauthorized profile creation
-- This ensures only authenticated users can create profiles for their own ID
CREATE POLICY "users_can_insert_own_profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);