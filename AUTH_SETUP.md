# Authentication & Admin Setup Guide

This guide explains how to set up authentication and admin access for the AI Readiness Assessment application.

## Features Implemented

### User Authentication
- ✅ Email/password authentication
- ✅ Google OAuth login
- ✅ User registration with email verification
- ✅ Password reset functionality
- ✅ Secure session management with Supabase

### Data Persistence
- ✅ Assessment submissions saved to Supabase database
- ✅ User profiles with admin flag
- ✅ Row Level Security (RLS) policies for data protection
- ✅ Users can only view their own assessments
- ✅ Admins can view all assessments

### Admin Dashboard
- ✅ Admin-only access at `/admin`
- ✅ View all user assessments
- ✅ Analytics and statistics
- ✅ Export data to CSV
- ✅ Segment distribution charts

## Database Schema

### Tables Created

1. **profiles**
   - `id` (UUID, references auth.users)
   - `email` (TEXT)
   - `full_name` (TEXT)
   - `is_admin` (BOOLEAN, default: false)
   - `created_at`, `updated_at` (TIMESTAMPTZ)

2. **assessments**
   - `id` (UUID, primary key)
   - `user_id` (UUID, references auth.users)
   - All assessment fields (company_name, industry, etc.)
   - `maturity_score` (INTEGER)
   - `segment` (TEXT)
   - `created_at`, `updated_at` (TIMESTAMPTZ)

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

**Profiles:**
- Users can view and update their own profile
- Admins can view all profiles

**Assessments:**
- Users can view, insert, and update their own assessments
- Admins can view and delete all assessments

## Setup Instructions

### 1. Enable Google OAuth (Optional)

To enable Google login:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable **Google** provider
4. Follow Supabase's instructions to set up Google OAuth:
   - Create a Google Cloud project
   - Configure OAuth consent screen
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs
5. Copy the Client ID and Client Secret to Supabase

### 2. Create an Admin User

To grant admin access to a user:

1. Have the user sign up through the application
2. Go to your Supabase project dashboard
3. Navigate to **Table Editor** → **profiles**
4. Find the user's profile row
5. Set `is_admin` to `true`
6. Save the changes

Alternatively, run this SQL in the Supabase SQL Editor:

```sql
UPDATE profiles 
SET is_admin = true 
WHERE email = 'admin@example.com';
```

### 3. Email Configuration

For email verification and password reset to work:

1. Go to **Authentication** → **Email Templates** in Supabase
2. Customize the email templates if desired
3. For production, configure a custom SMTP provider:
   - Go to **Project Settings** → **Auth**
   - Configure SMTP settings with your email provider

## User Flows

### Regular User Flow

1. **Sign Up**: User creates account at `/auth/sign-up`
2. **Email Verification**: User receives verification email
3. **Login**: User logs in at `/auth/login`
4. **Take Assessment**: User completes assessment at `/assessment`
5. **View Results**: Results are saved to their account at `/results`
6. **Return Later**: User can log back in to view past assessments

### Admin Flow

1. **Login**: Admin logs in at `/auth/login`
2. **Access Dashboard**: Navigate to `/admin`
3. **View Analytics**: See total assessments, users, average scores
4. **Review Submissions**: View all user assessments in table
5. **Export Data**: Download CSV of all assessments

## Security Features

### Authentication
- Secure password hashing via Supabase Auth
- JWT-based session management
- Automatic session refresh
- Protected routes via middleware

### Data Access
- Row Level Security (RLS) on all tables
- Users can only access their own data
- Admin access requires explicit `is_admin` flag
- No data leaks between users

### Best Practices
- Environment variables for sensitive data
- HTTPS-only in production
- CSRF protection via Supabase
- SQL injection prevention via parameterized queries

## API Routes

### Public Routes
- `/` - Homepage (accessible to all)
- `/auth/login` - Login page
- `/auth/sign-up` - Registration page
- `/auth/forgot-password` - Password reset
- `/auth/error` - Auth error page

### Protected Routes (Require Login)
- `/assessment` - Take assessment
- `/results` - View results
- `/admin` - Admin dashboard (requires admin flag)

## Troubleshooting

### Users Can't Log In
- Check that email verification is complete
- Verify Supabase environment variables in `.env.local`
- Check browser console for errors

### Google OAuth Not Working
- Verify Google OAuth is enabled in Supabase
- Check redirect URIs are correctly configured
- Ensure Client ID and Secret are set in Supabase

### Admin Dashboard Access Denied
- Verify user has `is_admin = true` in profiles table
- Check that user is logged in
- Clear browser cache and try again

### Assessments Not Saving
- Check browser console for errors
- Verify user is logged in
- Check Supabase logs for database errors

## Development vs Production

### Development
- Uses Supabase development instance
- Email verification may use Supabase's test emails
- Google OAuth uses development credentials

### Production
- Configure custom SMTP for emails
- Use production Google OAuth credentials
- Enable rate limiting in Supabase
- Set up monitoring and alerts

## Support

For issues or questions:
1. Check Supabase logs in the dashboard
2. Review browser console for client-side errors
3. Check the Supabase documentation: https://supabase.com/docs
4. Review RLS policies if data access issues occur
