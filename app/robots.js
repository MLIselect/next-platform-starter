export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://www.schoolsnowdaypredictor.com/sitemap.xml', // FIXED: Updated to your actual domain
  }
}
