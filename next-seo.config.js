const description =
  'Shop smartphones, gadgets, and accessories from GIRIXCO. Discover quality devices and trusted deals in one convenient place.'
const title = 'Smartphones, Gadgets & Accessories'
const url = (process.env.NEXT_PUBLIC_SITE_URL || 'https://girixco.vercel.app').replace(
  /\/$/,
  ''
)
const logoUrl = `${url}/girixco-logo.png`

const seo = {
  title,
  titleTemplate: '%s | GIRIXCO',
  description,
  canonical: url,
  additionalMetaTags: [
    { name: 'application-name', content: 'GIRIXCO' },
    { name: 'apple-mobile-web-app-title', content: 'GIRIXCO' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'theme-color', content: '#ffffff' }
  ],
  additionalLinkTags: [
    { rel: 'icon', href: '/girixco-logo.png', type: 'image/png' },
    { rel: 'apple-touch-icon', href: '/girixco-logo.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ],
  openGraph: {
    description,
    title,
    siteName: 'GIRIXCO',
    type: 'website',
    url,
    images: [
      {
        url: logoUrl,
        width: 300,
        height: 300,
        alt: 'GIRIXCO logo',
        type: 'image/png'
      }
    ]
  }
}

export { logoUrl, seo as defaultSeo, url as defaultUrl }
