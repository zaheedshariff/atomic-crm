# Atomic CRM - Replit Setup

## Overview
Atomic CRM is a full-featured CRM built with React, shadcn-admin-kit, and Supabase. This Replit instance runs in **demo mode** using a fake REST data provider, so no backend database is required.

## Project Information
- **Name**: Atomic CRM
- **Type**: React + Vite single-page application
- **Database**: Demo mode (in-memory fake data)
- **Port**: 5000
- **Main Technologies**: React 19, Vite, TailwindCSS, shadcn/ui, react-admin

## Recent Changes (October 27, 2025)
- Configured project to run in Replit environment
- Set up demo mode to work without Supabase backend
- Configured Vite dev server to bind to 0.0.0.0:5000
- Added HMR (Hot Module Replacement) configuration for Replit proxy
- Set up workflow to run `npm run dev:demo`

## Architecture
- **Frontend**: React application with Vite as the build tool
- **Data Provider**: Fake REST provider with generated demo data (no backend needed in demo mode)
- **Auth Provider**: Fake auth provider (demo mode)
- **Entry Point**: `demo/main.tsx` (demo mode) or `src/main.tsx` (production with Supabase)

## Features
- Contact management with avatars and notes
- Company management
- Deal pipeline with Kanban board
- Task management
- Activity logs
- Dashboard with charts
- Import/Export functionality
- Customizable themes (light/dark)

## Running Locally
The app runs automatically via the configured workflow. For manual control:
- Start dev server: `npm run dev:demo`
- Build: `npm run build:demo`
- Run tests: `npm test`

## Customization
The CRM can be customized by editing `demo/App.tsx` or `src/App.tsx` and passing props to the `<CRM>` component. See the inline documentation in those files for available customization options.

## Production Setup
To run with a real Supabase backend:
1. Set up Supabase project
2. Configure environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Use `npm run dev` instead of `npm run dev:demo`
4. Follow deployment docs in `/doc/developer/`
