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

## Recent Changes (November 20, 2025)
- ✅ **Version Control System Setup**:
  - Updated to semantic versioning v1.0.0
  - Created CHANGELOG.md to track version history
  - Created VERSION_CONTROL.md with complete workflow guide
  - Created .env.example template for safe credential sharing
  - Set up Git tagging system for releases
  - Updated MIGRATION_TO_VSCODE.md with versioning instructions
- ✅ **Equipment Management Enhancements**:
  - Multi-image upload with drag-and-drop support (JPG, PNG, GIF, WebP)
  - Supabase Storage bucket "equipment-images" with ownership-based RLS policies
  - Comprehensive search (full-text across manufacturer, model, stock number, serial, description, category, location)
  - Advanced filtering (status, condition, listing type, price ranges, assigned rep)
  - Grid view with visual card layout and larger images
  - List/Grid view toggle buttons
  - Fixed filter value alignment with database enums
  - Tightened storage RLS to prevent unauthorized image modifications
- ✅ **GitHub Integration**:
  - Repository: https://github.com/zaheedshariff/atomic-crm
  - Configured GIT_URL secret for authenticated pushes
  - Ready for local development in VS Code

## Previous Changes (October 29, 2025)
- ✅ Connected to production Supabase database
- ✅ Created Supabase project "Atomic CRM Heavy Machinery" in US-East-1 region
- ✅ Applied 12 database migrations successfully
- ✅ Configured Supabase credentials as Replit secrets
- ✅ Updated vite.config.ts with Replit-compatible server settings (port 5000, host 0.0.0.0)
- ✅ Switched from demo mode to production mode (npm run dev)
- ✅ Configured HMR for Replit's proxy environment
- ✅ Set allowedHosts: true to enable Replit's dynamic proxy URLs
- ✅ Fixed login page "Create account" link styling (white text on white background)
- ✅ Implemented Google OAuth authentication with automatic user provisioning
- ✅ Created RLS-safe database function for first-user detection
- ✅ Configured OAuth to automatically create sales records from Google profile data
- ✅ **Built Equipment/Inventory Management System**:
  - Created equipment table with 20+ fields (manufacturer, model, year, condition, location, price, etc.)
  - Auto-generated stock numbers (EQ000001 format) using database-level GENERATED ALWAYS AS
  - Implemented Row Level Security so sales reps can only manage their assigned equipment
  - Built list view with image thumbnails, metadata, status badges, and pricing
  - Created create/edit forms with fields organized in sections (Basic Info, Pricing, Details, Notes)
  - Registered equipment resource in CRM navigation

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
- **Migrations**: 12 migrations applied successfully
  - Database schema initialization (contacts, companies, deals, tasks, notes, tags)
  - Equipment/inventory table with auto-generated stock numbers (EQ000001 format)
  - Triggers and functions
  - Row-level security policies (including equipment ownership rules)
  - JSON fields for emails, phone numbers, images, and documents
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
- **Equipment/Inventory Management**:
  - Full CRUD operations for heavy machinery listings
  - Auto-generated stock numbers (EQ000001, EQ000002, etc.)
  - Multi-image upload with drag-and-drop (Supabase Storage)
  - Secure image storage with ownership-based RLS policies
  - Comprehensive full-text search across all fields
  - Advanced filtering (status, condition, listing type, price ranges, assigned rep)
  - List view with thumbnails, status badges, pricing, and metadata
  - Grid view with card layout and larger images
  - Toggle between list and grid views
  - Create/edit forms with sections: Basic Info, Pricing, Details, Notes
  - Status tracking (Available, Pending, Sold)
  - Sales rep assignment and ownership
  - Fields: manufacturer, model, year, condition, location, price, quantity, category, serial number, hours, description, notes, images
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

## Version Control
- **Current Version**: 1.0.0
- **GitHub Repository**: https://github.com/zaheedshariff/atomic-crm
- **Versioning Guide**: See `VERSION_CONTROL.md` for complete workflow
- **Changelog**: See `CHANGELOG.md` for version history
- **Local Development**: See `MIGRATION_TO_VSCODE.md` for VS Code setup

## Next Steps for Development
1. **Equipment-Contact Relationships**: Link contacts to equipment they're interested in
2. **Document Upload**: Add support for PDFs, specs, inspection reports
3. **Bulk Actions**: "Mark as Sold" for multiple items
4. **Data Migration**: Import existing customer/contact data using CSV import feature
5. **Deal Customization**: Adapt deal pipeline for machinery sales process

## Documentation
For more information, see:
- Developer docs: `/doc/src/content/docs/developers/`
- Supabase configuration: `/doc/src/content/docs/developers/supabase-configuration.mdx`
