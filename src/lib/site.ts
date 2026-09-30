// The site's public URL, used for SEO metadata, the sitemap and Open Graph links.
// Order: NEXT_PUBLIC_SITE_URL (set it for a custom domain) → the production domain Vercel
// provides automatically at build time → localhost for local development.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
