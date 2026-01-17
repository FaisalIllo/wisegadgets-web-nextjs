const description = 'Buy the latest gadgets and electronics with ease.'
const title = 'Buy smart, Buy Wise.'
const url = 'https://wisegadgets.vercel.app'

const seo = {
  title,
  titleTemplate: '%s | WiseGadgets',
  description,
  openGraph: {
    description,
    title,
    type: 'website',
    url
  },
  twitter: {
    handle: '@wisegadgets',
    site: '@wisegadgets',
  }
}

export { seo as defaultSeo, url as defaultUrl }
