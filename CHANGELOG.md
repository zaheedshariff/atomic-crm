# Changelog

All notable changes to Atomic CRM will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-20

### Added
- **Equipment/Inventory Management System**
  - Full CRUD operations for heavy machinery listings
  - Auto-generated stock numbers (EQ000001, EQ000002, etc.)
  - Multi-image upload with drag-and-drop support (JPG, PNG, GIF, WebP)
  - Supabase Storage integration with ownership-based RLS policies
  - Comprehensive search across manufacturer, model, stock number, serial number, description, category, location
  - Advanced filtering: status, condition, listing type, price ranges, assigned rep
  - List view with thumbnails, status badges, pricing, and metadata
  - Grid view with card layout and larger images
  - Toggle between list and grid views
  - Create/edit forms with organized sections (Basic Info, Pricing, Details, Notes)
  - Status tracking (Available, Pending, Sold)
  - Sales rep assignment and ownership controls
  - Row Level Security ensuring reps can only manage their assigned equipment

- **Core CRM Features**
  - Contact management with avatars and notes
  - Company management
  - Deal pipeline with Kanban board
  - Task management
  - Activity logs and audit trails
  - Dashboard with analytics charts
  - CSV import for contacts
  - Light/dark theme support

- **Authentication**
  - Email/password authentication
  - Google OAuth sign-in with automatic user provisioning
  - First user becomes administrator
  - Role-based access control

- **Database**
  - Supabase PostgreSQL database (production)
  - 12 database migrations applied
  - Comprehensive RLS policies for security
  - Automatic timestamp tracking

### Technical Details
- React 19 with Vite
- TailwindCSS + shadcn/ui components
- React Admin framework (ra-core, ra-supabase-core)
- Supabase for database, authentication, and storage
- TypeScript for type safety

---

## Version Format

**MAJOR.MINOR.PATCH** (e.g., 1.2.3)

- **MAJOR** (1.x.x): Breaking changes, major new features
- **MINOR** (x.1.x): New features, non-breaking changes
- **PATCH** (x.x.1): Bug fixes, small improvements

### Examples:
- `1.0.0 → 1.0.1`: Fixed a bug in equipment search
- `1.0.0 → 1.1.0`: Added document upload feature
- `1.0.0 → 2.0.0`: Complete redesign or major breaking change
