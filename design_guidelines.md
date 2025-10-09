# Design Guidelines: Excel Facility Services Group Website Rebuild

## Design Approach: Professional Service Excellence

**Selected Approach:** Design System-Based (Material Design 3 + Corporate Refinements)  
**Justification:** As a B2B commercial cleaning service, EFSG requires a design that prioritizes trust, credibility, and professionalism. The design system approach ensures consistency across all pages while maintaining the polish expected by corporate decision-makers.

**Core Design Principles:**
- Professional credibility through clean, structured layouts
- Trust-building through consistent visual hierarchy
- Accessibility for corporate procurement teams
- Clear pathways to conversion (estimate requests)

---

## Color Palette

**Official Excel Brand Colors (from Brand Book 2025):**
- Primary Blue: `#063970` / `210 90% 23%` (Main brand color for buttons, headers, trust elements)
- Light Blue: `#0A5EB9` / `211 90% 38%` (Accent color for interactive elements, links)
- Accent Green: `#97CC06` / `76 94% 41%` (Success indicators, certifications, accents)
- Brand Grey: `#777D82` / `207 4% 49%` (Muted text, secondary information)

**Supporting Colors:**
- Neutral Gray Scale: 
  - Text: `210 90% 15%` (primary text, dark blue-tinted)
  - Borders: `207 10% 85%`
  - Backgrounds: `0 0% 98%`
- White: Pure white for content cards and primary backgrounds

**Dark Mode (if implemented):**
- Background: `215 30% 12%`
- Surface: `215 25% 18%`
- Primary: `210 75% 60%`

---

## Typography

**Font Families (from Brand Book 2025):**
- **Primary (Headings):** Barlow Bold, Medium - weights 500, 600, 700, 800
- **Secondary (Body):** Cabin - weights 400, 500, 600
- **Accent (Numbers/Stats):** Barlow Bold - weight 700

**Type Scale:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headers: text-3xl md:text-4xl lg:text-5xl, font-bold
- Subsection Headers: text-2xl md:text-3xl, font-semibold
- Card Titles: text-xl md:text-2xl, font-semibold
- Body Large: text-lg, font-normal
- Body Regular: text-base, font-normal
- Small/Meta: text-sm, font-medium

---

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6 to p-8
- Section vertical spacing: py-16 md:py-20 lg:py-32
- Card gaps: gap-6 md:gap-8
- Content max-width: max-w-7xl for containers, max-w-4xl for text content

**Grid System:**
- Services/Industries: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Feature sections: grid-cols-1 lg:grid-cols-2
- Stats/Numbers: grid-cols-2 lg:grid-cols-4
- Always single column on mobile

---

## Component Library

### Navigation
- **Desktop:** Horizontal navigation bar with logo left, main links center, CTA button right
- **Mobile:** Bottom fixed navigation bar (Home, Services, Industries, Contact icons) + hamburger menu for full links
- Sticky header with subtle shadow on scroll

### Hero Sections
- **Homepage:** Full-width hero (80vh) with professional cleaning facility background image, bold headline, subheadline, dual CTA buttons (primary "Get Estimate" + secondary "View Services")
- **Interior Pages:** Medium hero (50vh) with relevant imagery, page title, breadcrumb navigation

### Service Cards
- White cards with subtle shadow and hover elevation
- Icon at top (from Heroicons - use cleaning/facility related icons)
- Service title (font-semibold, text-xl)
- Short description (2-3 lines)
- "Learn More" link with arrow icon
- Organized in responsive grid

### Industry Cards
- Image-based cards with overlay gradient
- Industry name overlaid on image
- Hover effect: slight zoom on image, increased overlay opacity
- "Read More" CTA appears on hover

### Call-to-Action Sections
- Full-width colored sections (primary blue background)
- Centered content with headline, supporting text, form or button
- Contrasting white text on blue backgrounds
- Include trust indicators (20+ years, 20+ states, 30M+ sq ft stats)

### Forms
- Estimate request form with service dropdown
- Clear field labels above inputs
- Blue focus states on inputs
- Large, accessible submit button
- reCAPTCHA integration
- Success/error state messaging

### Trust Elements
- Stats bar with large numbers (font-bold, text-4xl) and labels
- Certification badges/logos grid
- Client testimonials (if available)
- "Why Choose Us" icon grid with descriptive text

### Footer
- Multi-column layout (Company Info, Services Quick Links, Industries Quick Links, Contact Info)
- Social media icons (Facebook, Instagram, LinkedIn with brand colors)
- Bottom bar with copyright and legal links
- Newsletter signup section with email input and submit button

---

## Images

**Hero Images Required:**
1. **Homepage Hero:** Professional commercial building lobby or office space being cleaned - bright, modern, aspirational (wide shot, 1920x1080 minimum)
2. **About Us Hero:** Team photo or modern cleaning equipment in action - conveys professionalism and technology
3. **Services Page Hero:** Close-up of cleaning professional with equipment - focus on quality and attention to detail
4. **Industries Page Hero:** Diverse workplace environments montage
5. **Contact Page:** Modern office or facility exterior - inviting and accessible

**Supporting Images:**
- Industry-specific images for each of 8 industry cards (Medical, Banks, Schools, Auto, Office, Retail, Distribution, Restaurants)
- Service icons/illustrations for all 12 services (can use icon libraries or simple SVGs)
- Team photos for About Us page
- Before/after cleaning photos for credibility

**Image Treatment:** 
- Slight blue overlay on hero images (opacity 10-20%) to maintain brand consistency
- Subtle parallax effect on scroll for hero sections
- Lazy loading for performance

---

## Page-Specific Guidelines

### Homepage
Sections (in order):
1. Hero with dual CTAs
2. Company overview (split layout: text + image)
3. Industries carousel/grid (8 industries)
4. Services showcase (featured 4-6 services)
5. Stats/trust bar (20+ years, 20+ states, 30M+ sq ft)
6. CTA section (Get Estimate form or button to contact)

### Services Page
- Service grid (all 12 services as cards)
- Filter/search capability for CMS integration
- Featured service highlight section

### Industries Page  
- Industry cards grid (8 industries)
- Overview text about customized approach
- Inline estimate form

### About Us Page
- Company story narrative
- Why Choose Us section with icons
- Stats integration
- Team/leadership section (if applicable)
- Social proof elements

---

## Animations & Interactions
- Subtle fade-in on scroll for sections (use Intersection Observer)
- Card hover states: elevation change (shadow-md to shadow-xl)
- Button hover: slight scale (scale-105) and color darken
- Navigation: smooth scroll to anchor links
- Form validation: inline error messages with gentle shake animation
- **Keep animations minimal and professional** - no distracting effects

---

## SEO & Technical Considerations
- Semantic HTML5 elements (header, nav, main, section, article, footer)
- Proper heading hierarchy (single h1 per page)
- Meta descriptions for each page (155 characters)
- Schema.org LocalBusiness markup
- Alt text for all images (descriptive, keyword-rich)
- Mobile-first responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Fast-loading: optimize images (WebP format), lazy load below fold content