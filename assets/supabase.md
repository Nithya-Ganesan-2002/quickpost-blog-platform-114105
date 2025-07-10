# Supabase Integration Documentation

## Project: QuickPost

**Supabase URL:** https://sxbiwadsxkdkorglgpdh.supabase.co

## Tables

### posts

Stores all blog posts created by users.

| Column     | Type                        | Constraints                              | Description                  |
|------------|-----------------------------|------------------------------------------|------------------------------|
| id         | uuid                        | Primary Key, Default: gen_random_uuid()  | Unique identifier            |
| user_id    | uuid                        | NOT NULL                                 | (Intended) foreign key to users table (not currently enforced: users table missing) |
| title      | text                        | NOT NULL                                 | Post title                   |
| content    | text                        | NOT NULL                                 | Post content in markdown     |
| created_at | timestamp with time zone     | Default: now()                           | Time of creation             |
| updated_at | timestamp with time zone     |                                          | Last update time             |

> **Note**: The foreign key constraint on `user_id` is not yet enforced due to the absence of a users table.

## Extensions

- `pgcrypto`: Used for `gen_random_uuid()` as the default for primary key.
- `uuid-ossp`: Installed, but `uuid_generate_v4()` not available (potential Supabase config quirk).

## Missing Prerequisite

- **users table**: Not present. The posts table was created without the foreign key constraint. Please create the users table with a compatible UUID primary key to enforce relational integrity in the future.

## Integration Notes

- The posts table allows storing, retrieving, and managing blog posts with titles and markdown content.
- All posts reference a `user_id`, which should correspond to an authenticated user when the users table is present.

## Next Steps

- Create the `users` table if user management via database row is desired.
- Consider running an ALTER TABLE on posts to add the foreign key once users exists.

---
Task completed: Supabase set up with the required "posts" table for blog post storage.
