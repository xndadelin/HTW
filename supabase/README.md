# Supabase Migrations

This directory contains SQL migrations for the Supabase project.

## User Profile Trigger

The migration creates:

1. A `profiles` table that stores additional user information
2. A trigger that automatically creates a profile when a user signs up
3. Row-level security policies to protect user data

## How to Apply

### Option 1: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase db push
```

### Option 2: Manual Application

1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Copy the contents of each migration file
4. Execute the SQL statements in order
