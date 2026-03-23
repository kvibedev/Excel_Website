const SITE_NAME = "Excel Facility Services Group";
const DEFAULT_TITLE = "Excel Facility Services Group | Commercial Cleaning Services";
const DEFAULT_DESCRIPTION = "Professional commercial cleaning services with 20+ years of experience across 20+ states. Trusted janitorial, disinfection, and facility maintenance solutions.";

interface PageMeta {
  title: string;
  description: string;
}

const routeMetadata: Record<string, PageMeta> = {
  "/": { title: "Commercial Cleaning Services", description: DEFAULT_DESCRIPTION },
  "/about": { title: "About Us", description: "Learn about Excel Facility Services Group — 20+ years of commercial cleaning excellence across 20+ states." },
  "/services": { title: "Services", description: "Explore our full range of commercial cleaning services — janitorial, day porters, disinfection, floor care, window washing, and more." },
  "/industries": { title: "Industries We Serve", description: "Cleaning solutions for offices, retail, distribution centers, restaurants, medical facilities, banks, schools, and auto dealerships." },
  "/contact": { title: "Contact Us", description: "Get in touch with Excel Facility Services Group. Call (800) 593-2414 or email info@efsgnj.com." },
  "/resources": { title: "Resources", description: "Insights and articles on commercial cleaning, green practices, facility management, and industry trends." },
  "/vendor-registration": { title: "Vendor Registration", description: "Register as a vendor or contractor with Excel Facility Services Group." },
  "/about/coverage-areas": { title: "Coverage Areas", description: "Excel Facility Services Group serves clients across 20+ states." },
  "/about/recognitions-certifications": { title: "Recognitions & Certifications", description: "View certifications, memberships, and industry recognitions including Green Seal GS-42 and MBE certification." },
  "/about/green-seal": { title: "Green Seal Certification", description: "Green Seal GS-42 certified, delivering environmentally responsible commercial cleaning solutions." },
  "/about/our-team": { title: "Our Team", description: "Meet the leadership team behind Excel Facility Services Group." },
  "/services/janitorial": { title: "Janitorial Services", description: "Professional janitorial cleaning services. Customized cleaning programs for your facility." },
  "/services/day-porters": { title: "Day Porter Services", description: "Day porter services to keep your facility clean and presentable throughout the business day." },
  "/services/levelup-clean": { title: "LevelUp Clean®", description: "Advanced cleaning and disinfection with verified results and transparency." },
  "/services/disinfection": { title: "Disinfection Services", description: "Certified disinfection protocols to keep your facility safe and healthy." },
  "/services/covid-19-cleaning": { title: "COVID-19 Cleaning", description: "Specialized COVID-19 cleaning and disinfection services for safe, healthy facilities." },
  "/services/floor-care": { title: "Floor Care Services", description: "Floor care maintenance, restoration, and protection for all floor types." },
  "/services/window-washing": { title: "Window Washing", description: "Commercial window washing services to keep your building looking professional." },
  "/services/air-duct-hvac": { title: "Air Duct & HVAC Cleaning", description: "Air duct and HVAC cleaning to improve indoor air quality and energy efficiency." },
  "/services/carpet-extraction": { title: "Carpet Extraction", description: "Professional carpet extraction and deep cleaning services." },
  "/services/concrete-polishing": { title: "Concrete Polishing", description: "Concrete polishing services for durable, attractive commercial floors." },
  "/services/power-washing": { title: "Power Washing", description: "Commercial power washing to keep your building exterior clean and professional." },
  "/services/commercial-cleaning": { title: "Commercial Cleaning", description: "Comprehensive commercial cleaning solutions for businesses of all sizes." },
  "/industries/office-building": { title: "Office Building Cleaning", description: "Professional cleaning for office buildings. Create a healthier, more productive workspace." },
  "/industries/retailer": { title: "Retail Cleaning", description: "Cleaning services for retail stores. Maintain a clean, inviting shopping environment." },
  "/industries/distribution-centers": { title: "Distribution Center Cleaning", description: "Cleaning for distribution centers. Ensure safe, efficient operations." },
  "/industries/restaurants": { title: "Restaurant Cleaning", description: "Cleaning services for restaurants. Maintain health standards and customer satisfaction." },
  "/industries/medical-groups": { title: "Medical Facility Cleaning", description: "Specialized cleaning for medical groups. Certified disinfection for healthcare environments." },
  "/industries/banks": { title: "Bank & Financial Cleaning", description: "Cleaning services for banks and financial institutions." },
  "/industries/schools": { title: "School Cleaning", description: "Cleaning services for schools. Safe, healthy learning environments." },
  "/industries/auto-dealerships": { title: "Auto Dealership Cleaning", description: "Cleaning services for auto dealerships. Showroom-quality cleanliness." },
  "/resources/non-toxic-cleaning-transforms-facilities": { title: "Non-Toxic Cleaning Transforms Facilities", description: "How non-toxic cleaning solutions are transforming facility management through sustainable, health-conscious practices." },
  "/resources/sustainable-floor-care-transforming-facilities": { title: "Sustainable Floor Care Transforming Facilities", description: "Learn how sustainable floor care practices are transforming facility management and reducing environmental impact." },
  "/resources/green-cleaning-transforming-facility-management": { title: "Green Cleaning Transforming Facility Management", description: "Discover how green cleaning practices are revolutionizing facility management for healthier workplaces." },
  "/resources/smart-technology-revolutionizes-facility-security": { title: "Smart Technology Revolutionizes Facility Security", description: "How smart technology and IoT are revolutionizing facility security and management." },
  "/resources/automation-revolutionizes-commercial-cleaning-efficiency": { title: "Automation Revolutionizes Commercial Cleaning", description: "How automation is revolutionizing commercial cleaning efficiency and transforming the industry." },
  "/resources/unlocking-energy-efficiency-for-facilities": { title: "Unlocking Energy Efficiency for Facilities", description: "Learn how to unlock energy efficiency in your facilities with modern management practices and technology." },
};

export function getMetaForRoute(path: string): { title: string; description: string } {
  const meta = routeMetadata[path];
  if (meta) {
    return {
      title: `${meta.title} | ${SITE_NAME}`,
      description: meta.description,
    };
  }
  return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION };
}

export function injectOGTags(html: string, requestUrl: string, host: string): string {
  const protocol = "https";
  const baseUrl = `${protocol}://${host}`;
  const fullUrl = `${baseUrl}${requestUrl}`;
  const ogImageUrl = `${baseUrl}/og-image.png`;
  const { title, description } = getMetaForRoute(requestUrl);

  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${title}</title>`
  );

  html = html.replace(
    /<meta name="description" content=".*?"\s*\/>/,
    `<meta name="description" content="${description}" />`
  );

  html = html.replace(
    /<meta property="og:title" content=".*?"\s*\/>/,
    `<meta property="og:title" content="${title}" />`
  );

  html = html.replace(
    /<meta property="og:description" content=".*?"\s*\/>/,
    `<meta property="og:description" content="${description}" />`
  );

  html = html.replace(
    /<meta property="og:image" content=".*?"\s*\/>/,
    `<meta property="og:image" content="${ogImageUrl}" />`
  );

  if (!html.includes('og:url')) {
    html = html.replace(
      /<meta property="og:image"/,
      `<meta property="og:url" content="${fullUrl}" />\n    <meta property="og:image"`
    );
  } else {
    html = html.replace(
      /<meta property="og:url" content=".*?"\s*\/>/,
      `<meta property="og:url" content="${fullUrl}" />`
    );
  }

  html = html.replace(
    /<meta name="twitter:title" content=".*?"\s*\/>/,
    `<meta name="twitter:title" content="${title}" />`
  );

  html = html.replace(
    /<meta name="twitter:description" content=".*?"\s*\/>/,
    `<meta name="twitter:description" content="${description}" />`
  );

  html = html.replace(
    /<meta name="twitter:image" content=".*?"\s*\/>/,
    `<meta name="twitter:image" content="${ogImageUrl}" />`
  );

  return html;
}
