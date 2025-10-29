# Atomic CRM - Replit Setup

## Overview
Atomic CRM is a full-featured CRM built with React, shadcn-admin-kit, and Supabase. This Replit instance is now connected to a **production Supabase database** for persistent data storage.

## Project Information
- **Name**: Atomic CRM Heavy Machinery
- **Type**: React + Vite single-page application
- **Database**: Supabase PostgreSQL (production)
- **Supabase Project ID**: mifvlwmithsbdnkutcya
- **Supabase URL**: https://mifvlwmithsbdnkutcya.supabase.co
- **Port**: 5000
- **Main Technologies**: React 19, Vite, TailwindCSS, shadcn/ui, react-admin, Supabase

## Recent Changes (October 29, 2025)
- ✅ Connected to production Supabase database
- ✅ Created Supabase project "Atomic CRM Heavy Machinery" in US-East-1 region
- ✅ Applied all 10 database migrations successfully
- ✅ Configured Supabase credentials as Replit secrets
- ✅ Updated vite.config.ts with Replit-compatible server settings (port 5000, host 0.0.0.0)
- ✅ Switched from demo mode to production mode (npm run dev)
- ✅ Configured HMR for Replit's proxy environment
- ✅ Set allowedHosts: true to enable Replit's dynamic proxy URLs
- ✅ Fixed login page "Create account" link styling (white text on white background)
- ✅ Implemented Google OAuth authentication with automatic user provisioning
- ✅ Created RLS-safe database function for first-user detection
- ✅ Configured OAuth to automatically create sales records from Google profile data

## Previous Changes (October 27, 2025)
- ✅ Initial project setup in Replit environment
- ✅ Configured demo mode for testing without database
- ✅ Configured deployment for production (autoscale mode)

## Architecture
- **Frontend**: React application with Vite as the build tool
- **Backend**: Supabase (PostgreSQL database + authentication + edge functions)
- **Data Provider**: ra-supabase-core (connects React Admin to Supabase)
- **Auth Provider**: Supabase Auth with email/password and Google OAuth authentication
- **Entry Point**: `src/main.tsx` (production with Supabase)

## Database
- **Provider**: Supabase (hosted PostgreSQL)
- **Migrations**: All 10 migrations applied successfully
  - Database schema initialization (contacts, companies, deals, tasks, notes, tags)
  - Triggers and functions
  - Row-level security policies
  - JSON fields for emails and phone numbers
  - RLS-safe `check_has_sales()` function for OAuth first-user detection
- **Status**: ✅ All migrations synced between local and remote

## Environment Variables (Stored as Replit Secrets)
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous API key
- `SUPABASE_ACCESS_TOKEN`: Access token for Supabase CLI operations

## Features
- Contact management with avatars and notes
- Company management
- Deal pipeline with Kanban board
- Task management
- Activity logs
- Dashboard with charts
- Import/Export functionality (CSV import for contacts)
- Customizable themes (light/dark)
- **User authentication and management**:
  - Email/password sign-up and login
  - Google OAuth sign-in (automatic user creation from Google profile)
  - First user to sign in becomes administrator
  - Subsequent users are regular users
- Role-based access control

## Running Locally
The app runs automatically via the configured workflow. For manual control:
- Start production server: `npm run dev`
- Start demo mode (fake data): `npm run dev:demo`
- Build production: `npm run build`
- Build demo: `npm run build:demo`
- Run tests: `npm test`

## Deployment
The app is configured for deployment using Replit's autoscale deployment:
- Build command: `npm run build`
- Run command: `npx vite preview --host 0.0.0.0 --port 5000`

## Supabase Management
- **Link project**: `npx supabase link --project-ref mifvlwmithsbdnkutcya`
- **Check migrations**: `npx supabase migration list --linked`
- **Apply new migrations**: `npx supabase db push --linked`
- **Dashboard**: https://supabase.com/dashboard/project/mifvlwmithsbdnkutcya

## Customization
The CRM can be customized by editing `src/App.tsx` and passing props to the `<CRM>` component. See the inline documentation in that file for available customization options.

## Next Steps for Heavy Machinery Business
1. **Data Migration**: Import existing customer/contact data using CSV import feature
2. **Inventory Management**: Add custom resources for heavy machinery inventory
   - Machine specifications (make, model, year, hours, condition)
   - Equipment tracking (location, status, maintenance history)
   - Pricing and availability
3. **Custom Fields**: Extend company/contact models for machinery-specific needs
   - Equipment interests
   - Budget ranges
   - Industry/use case
4. **Deal Customization**: Adapt deal pipeline for machinery sales process

## Documentation
For more information, see:
- Developer docs: `/doc/src/content/docs/developers/`
- Supabase configuration: `/doc/src/content/docs/developers/supabase-configuration.mdx`
