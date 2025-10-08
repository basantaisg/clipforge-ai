-- Create repurpose_results table
create table if not exists public.repurpose_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  video_url text not null,
  title text,
  clip_start numeric,
  clip_end numeric,
  caption text,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.repurpose_results enable row level security;

-- RLS Policies
create policy "user_can_select_own" 
  on public.repurpose_results 
  for select 
  to authenticated 
  using (auth.uid() = user_id);

create policy "user_can_insert_own" 
  on public.repurpose_results 
  for insert 
  to authenticated 
  with check (auth.uid() = user_id);

create policy "user_can_delete_own" 
  on public.repurpose_results 
  for delete 
  to authenticated 
  using (auth.uid() = user_id);

-- Create profiles table for user metadata
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  plan text default 'free' check (plan in ('free', 'pro')),
  videos_processed_today integer default 0,
  last_processed_date date,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "users_can_view_own_profile" 
  on public.profiles 
  for select 
  to authenticated 
  using (auth.uid() = id);

create policy "users_can_update_own_profile" 
  on public.profiles 
  for update 
  to authenticated 
  using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();