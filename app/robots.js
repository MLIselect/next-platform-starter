export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://www.snowdaypredictor.com/sitemap.xml', // CHANGE THIS to your domain
  }
}
