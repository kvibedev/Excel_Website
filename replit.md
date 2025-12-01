# Excel Facility Services Group Website

## Overview

This is a commercial cleaning services website for Excel Facility Services Group (EFSG), an enterprise-focused B2B company with 20+ years of experience operating across 28 states. The application is built as a full-stack web application using React for the frontend and Express for the backend, with a focus on professional presentation, trust-building, and enterprise lead generation. The site replicates the exact structure and content of efsgnj.com with enhanced enterprise positioning.

## Recent Changes (2024)

**Homepage Rebuild (Complete)**
- Replicated original efsgnj.com homepage structure
- Applied exact brand colors from Excel Brand Book 2025
- Enterprise positioning: 28 states, 400M sq ft managed daily, 20+ years excellence
- Added enterprise stats bar and credentials strip (Inc. 5000, MBE Certified, Green Seal GS-42)
- "Why Choose EFSG Over Nationals" section with 4 value propositions
- Changed primary CTA to "REQUEST PROPOSAL" for enterprise buyers
- Removed explicit contract amounts for sophisticated appeal

**About Page Rebuild (Complete)**
- Replicated original efsgnj.com/about-us/ structure
- "At Excel, We Understand That People Matter" hero section
- Company story: 2001 founding to 28-state nationwide operation
- Enterprise value propositions: Scale, Professional Teams, Technology, Excellence
- Updated StatsBar to show 28 states and 400M sq ft
- Final CTA: "REQUEST PROPOSAL" aligned with enterprise messaging

**Contact Page Rebuild (Complete)**
- Replicated original efsgnj.com/contact/ structure
- "Get in touch" hero with enterprise positioning
- Enhanced form with Inquiry Type dropdown (Sales/General Inquiries)
- Real contact details: (800) 593-2414 and info@efsgnj.com
- Social media integration (Facebook, Instagram, LinkedIn)
- Vendor/Contractor and Careers sections added
- "REQUEST PROPOSAL" CTA (not "Request Estimate")
- Enterprise stats: 28 states nationwide, 400M sq ft serviced daily

**Services Page Rebuild (Complete)**
- Replicated original efsgnj.com/services/ structure exactly
- Hero: "We specialize in expert cleaning and disinfection services"
- All 12 service offerings with complete descriptions
- "REQUEST PROPOSAL" CTA for enterprise consistency
- Services: Janitorial, Day Porters, LevelUp Clean®, Disinfection, COVID-19 Cleaning, Floor Care, Window Washing, Air Duct & HVAC, Carpet Extraction, Concrete Polishing, Power Washing, Commercial Cleaning

**Industries Page Rebuild (Complete)**
- Replicated original efsgnj.com/industries/ structure exactly
- Hero subtitle includes full industry list (government facilities, transportation, theaters)
- Page structure: Hero → REQUEST PROPOSAL form → Industries description → Industry cards
- "Industries" section with 3 descriptive paragraphs
- Final CTA paragraph with link to contact page
- 8 industry cards: Office Building, Retailer, Distribution Centers, Restaurants, Medical Groups, Banks, Schools, Auto Dealerships

**Individual Service & Industry Pages (Complete - October 2025)**
- Built 20 individual detail pages (12 services + 8 industries) with content from efsgnj.com
- All pages use Hero component with appropriate imagery from attached_assets
- Consistent template structure: Hero → Main Content → CTA Section
- All CTAs use "REQUEST PROPOSAL" for enterprise positioning
- Zero 404 errors - comprehensive QC passed with all links functional
- All interactive elements have data-testid attributes for testing
- Service pages: janitorial, day-porters, levelup-clean, disinfection, covid-19-cleaning, floor-care, window-washing, air-duct-hvac, carpet-extraction, concrete-polishing, power-washing, commercial-cleaning
- Industry pages: office-building, retailer, distribution-centers, restaurants, medical-groups, banks, schools, auto-dealerships
- Updated Footer messaging to reflect 28 states for enterprise consistency

**Header Navigation Dropdown Menus (Complete - October 2025)**
- Added NavigationMenu dropdowns for Services and Industries in desktop header
- Services dropdown displays all 12 service pages in 2-column grid layout
- Industries dropdown displays all 8 industry pages in 2-column grid layout
- Proper accessibility: keyboard navigation support (Tab, Enter, Arrow keys)
- Mobile-responsive: accordion-style expandable sections for Services and Industries
- Active state highlighting shows current page in dropdowns
- All dropdown links use proper anchor tags for semantic HTML and accessibility
- Scroll-to-top behavior: All navigation links automatically scroll page to top on route change

**About Us Subpages (Complete - December 2025)**
- Added NavigationMenu dropdown for About Us in desktop and mobile header
- Created three About Us submenu pages using efsgnj.com content and Template 3 design:
  - Coverage Areas (/about/coverage-areas): 22 states listing, service expansion message
  - Recognitions & Certifications (/about/recognitions-certifications): Certifications, memberships, software technology
  - Green Seal (/about/green-seal): GS-42 certification information, environmental practices
- All pages use Template 3 design patterns with Excel brand colors
- All interactive elements have data-testid attributes
- Mobile dropdown accordion closes properly on navigation

**Alternative Homepage Templates (Complete - November 2025)**
- Created three distinct homepage designs offering varied aesthetics while maintaining EFSG branding
- Homepage template selector dropdown in Header navigation (desktop and mobile)
- Simplified naming: Template 1, Template 2, Template 3 (no descriptive labels)
- All templates use EFSG content (28 states, 400M sq ft, 20+ years excellence)
- All templates maintain brand colors (#063970, #0A5EB9, #97CC06) and enterprise positioning
- **Template 1 (Original Design)** - /:
  - Enterprise-focused design with hero, services overview, industries showcase
  - "Why Choose EFSG Over Nationals" value propositions
  - Stats bar and credentials strip (Inc. 5000, MBE Certified, Green Seal GS-42)
  - "REQUEST PROPOSAL" primary CTA
  - All interactive elements have data-testid attributes
- **Template 2 (Sanera-Inspired)** - /home-template-1:
  - Modern medical/sanitizing aesthetic
  - Feature cards highlighting time/money savings, healthy environment, professional experts
  - About section with company story and credentials
  - 6-service grid with images linking to detail pages
  - 4-step "How It Works" process flow
  - Pricing tiers (Small Business / Mid-Market / Enterprise)
  - All interactive elements have data-testid attributes
- **Template 3 (Fore Tech-Inspired)** - /home-template-2:
  - Modern IT services design adapted for commercial cleaning
  - Hero: "Professional Cleaning Excellence for Enterprise Facilities"
  - Client trust section with 4 key stats (28 states, 400M sq ft, 20+ years, 100% satisfaction)
  - About section: "Scalable Solutions for Every Facility"
  - 4 featured services (Janitorial, Day Porters, LevelUp Clean®, Disinfection)
  - Success Stories with 3 case study examples
  - Expert Teams section with team roles
  - Pricing plans (Small Business / Mid-Market / Enterprise) without explicit pricing
  - Client testimonials with 5-star ratings
  - FAQ section with 5 commercial cleaning questions
  - All interactive elements have data-testid attributes

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Client-side routing using Wouter (lightweight React Router alternative)
- TanStack Query (React Query) for server state management

**UI Component System**
- Shadcn/ui component library with Radix UI primitives
- "New York" style variant with customized design tokens
- Tailwind CSS for styling with custom color palette matching brand guidelines
- Design system based on Material Design 3 principles with corporate refinements

**Brand-Specific Design Tokens**
- Primary Blue: `#063970` for main brand elements
- Light Blue: `#0A5EB9` for interactive elements
- Accent Green: `#97CC06` for success indicators and certifications
- Custom typography: Barlow (headings) and Cabin (body text)
- Responsive breakpoints optimized for B2B desktop-first experience

**Key UI Patterns**
- Reusable Hero component with multiple height variants
- Service and Industry card components with hover effects
- Estimate form with toast notifications for user feedback
- Mobile-responsive header with hamburger menu
- Stats bar for trust indicators (years of experience, coverage area, sq ft serviced)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- HTTP server creation using Node's native `http` module
- Middleware for JSON parsing and URL-encoded form data
- Custom request logging middleware for API routes

**Development Environment**
- Vite middleware integration in development mode
- HMR (Hot Module Replacement) support
- Custom error overlay for runtime errors
- Replit-specific development tooling integration

**Storage Strategy**
- In-memory storage implementation (`MemStorage`) as the base
- Interface-based design (`IStorage`) for future database integration
- User management methods (CRUD operations)
- Prepared for migration to persistent database (PostgreSQL via Drizzle ORM)

### Data Storage Solutions

**Current Implementation**
- In-memory Map-based storage for users
- UUID generation for unique identifiers
- Schema definitions using Drizzle ORM with Zod validation

**Database Schema (Prepared)**
- PostgreSQL as target database (via Neon serverless)
- Drizzle ORM for type-safe database queries
- User table with username/password fields
- Migration system configured but not yet executed

**Validation**
- Zod schemas for runtime type validation
- Drizzle-Zod integration for database schema validation
- Form validation using React Hook Form with Zod resolvers

### Authentication & Authorization

**Current State**
- User schema defined with username/password fields
- Session management prepared (connect-pg-simple for PostgreSQL sessions)
- No active authentication flow implemented yet
- Foundation laid for future authentication implementation

### Routing & Navigation

**Frontend Routes**
- `/` - Home page with hero, services overview, and industries
- `/about` - Company story, values, and team information
- `/services` - Comprehensive services listing
- `/industries` - Industry-specific solutions showcase
- `/contact` - Estimate request form and contact information
- 404 handling with custom NotFound component

**API Routes**
- Prefix convention: `/api/*` for all backend endpoints
- Currently no active API endpoints implemented
- Infrastructure ready for estimate submissions, contact forms, etc.

## External Dependencies

### Core Framework Dependencies
- **React & React DOM** (v18+): Frontend framework
- **Express**: Backend HTTP server
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **Wouter**: Lightweight client-side routing

### Database & ORM
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **Drizzle ORM**: Type-safe database toolkit
- **Drizzle Kit**: Database migrations and schema management
- **connect-pg-simple**: PostgreSQL session store (prepared for use)

### UI Component Libraries
- **Radix UI**: Headless UI primitives (20+ components imported)
- **Shadcn/ui**: Pre-built accessible components
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **Embla Carousel**: Carousel/slider functionality

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Form validation integration

### State Management
- **TanStack Query**: Server state management and caching
- Query client configured with custom fetch handling
- Credential-based requests for future authentication

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Error overlay
- **@replit/vite-plugin-cartographer**: Development mapping
- **@replit/vite-plugin-dev-banner**: Development banner
- **tsx**: TypeScript execution for development server
- **esbuild**: Production build bundling

### Asset Management
- Custom alias `@assets` pointing to `attached_assets` directory
- Generated images for hero sections and industry showcases
- Google Fonts integration (Barlow and Cabin families)

### Future Integration Points
- Email service for estimate form submissions
- CRM integration for lead management
- Analytics platform (Google Analytics, etc.)
- Payment processing (if needed for service quotes)