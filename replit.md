# Excel Facility Services Group Website

## Overview

This project is a commercial cleaning services website for Excel Facility Services Group (EFSG), an enterprise-focused B2B company. The site aims to replicate the structure and content of efsgnj.com with an enhanced enterprise positioning, targeting lead generation for large-scale clients. It emphasizes professional presentation, trust-building, and EFSG's extensive experience (20+ years, 28 states, 400M sq ft managed daily). Key capabilities include dynamic content management for blog posts, detailed service and industry pages, and multiple homepage templates to cater to different aesthetic preferences while maintaining brand consistency and enterprise messaging.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React 18 and TypeScript, using Vite for development and bundling. Client-side routing is handled by Wouter, and server state management uses TanStack Query. UI components are sourced from Shadcn/ui, based on Radix UI primitives, with styling managed by Tailwind CSS. The design system follows Material Design 3 principles, customized with brand-specific tokens (Primary Blue: `#063970`, Light Blue: `#0A5EB9`, Accent Green: `#97CC06`) and custom typography (Barlow and Cabin). Key UI patterns include reusable Hero components, interactive service/industry cards, and a mobile-responsive header.

### Backend Architecture

The backend uses Express.js with TypeScript, running on Node.js. It integrates Vite middleware for development and HMR. The current storage strategy is an in-memory `Map`-based system with an `IStorage` interface, designed for future migration to PostgreSQL.

### Data Storage Solutions

Currently, user data is stored in-memory. The project is prepared for PostgreSQL integration (via Neon serverless) using Drizzle ORM for type-safe queries and schema management. Zod schemas are used for runtime and database schema validation, integrated with React Hook Form for form validation. Blog posts are stored in a PostgreSQL `blog_posts` table and managed via admin CRUD operations, served through public APIs.

### Authentication & Authorization

A user schema is defined with username/password fields, and session management is prepared using `connect-pg-simple` for PostgreSQL sessions. Full authentication and authorization flows are planned but not yet implemented.

### Routing & Navigation

Frontend routes include `/`, `/about-us`, `/services`, `/industries`, `/contact`, `/resources`, `/privacy-policy`, and dynamic routes for individual services, industries, about subpages (`/about-us/team`, `/about-us/coverage-areas`, `/about-us/recognitions-and-certifications`, `/about-us/green-seal`), and blog posts (`/resources/:slug`). A 404 handler is in place. API routes are prefixed with `/api/*`, with specific endpoints for dynamic blog content (`/api/blog` and `/api/blog/:slug`) and admin blog management (`/api/admin/blog`).

### URL Redirects & SEO Continuity

Server-side 301 redirects are configured for URL continuity during migration from WordPress (efsgnj.com):
- **Trailing slash removal**: All non-root paths with trailing slashes redirect to the clean path (e.g., `/about-us/` → `/about-us`)
- **Old about routes**: `/about` → `/about-us`, `/about/our-team` → `/about-us/team`, `/about/recognitions-certifications` → `/about-us/recognitions-and-certifications`, etc.
- **Old blog slug redirects**: 25 root-level blog slugs (e.g., `/non-toxic-cleaning-transforms-facilities`) redirect to `/resources/{slug}`

## External Dependencies

### Core Framework Dependencies
- **React & React DOM**: Frontend framework.
- **Express**: Backend HTTP server.
- **Vite**: Build tool and development server.
- **TypeScript**: Type safety.
- **Wouter**: Client-side routing.

### Database & ORM
- **@neondatabase/serverless**: PostgreSQL serverless driver.
- **Drizzle ORM & Drizzle Kit**: Database toolkit and migrations.

### UI Component Libraries
- **Radix UI**: Headless UI primitives.
- **Shadcn/ui**: Pre-built accessible components.
- **Lucide React**: Icon library.
- **Tailwind CSS**: Utility-first CSS framework.

### Form & Validation
- **React Hook Form**: Form state management.
- **Zod**: Schema validation.

### State Management
- **TanStack Query**: Server state management and caching.

### Development Tools
- **@replit/vite-plugin-* (runtime-error-modal, cartographer, dev-banner)**: Replit-specific development tooling.
- **tsx**: TypeScript execution.
- **esbuild**: Production build bundling.