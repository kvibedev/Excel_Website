import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

const SITE_NAME = "Excel Facility Services Group";
const DEFAULT_DESCRIPTION = "Professional commercial cleaning services with 20+ years of experience across 20+ states. Trusted janitorial, disinfection, and facility maintenance solutions.";

export default function SEO({ title, description, path }: SEOProps) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Commercial Cleaning Services`;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const ogImage = `${baseUrl}/og-image.png`;
  const canonicalUrl = path ? `${baseUrl}${path}` : undefined;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
}
