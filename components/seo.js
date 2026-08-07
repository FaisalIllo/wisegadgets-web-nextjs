import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { defaultUrl } from 'next-seo.config'

function SEO({ image, ...props }) {
  const router = useRouter()
  const path = router.asPath.split(/[?#]/)[0]
  const canonical = `${defaultUrl}${path === '/' ? '' : path}`

  const SEO = {
    openGraph: {
      ...(image && {
        images: [
          {
            alt: props.title,
            ...image
          }
        ]
      }),
      url: canonical,
      ...props
    },
    canonical,
    ...props
  }

  return <NextSeo {...SEO} />
}

export default SEO
