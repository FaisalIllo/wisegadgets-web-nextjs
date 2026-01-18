import * as React from 'react'

import getCollectionBySlug from '@/lib/get-collection-slug'
import getPageData from '@/lib/get-page-data'
import ProductGrid from '@/components/product-grid'
import SEO from '@/components/seo'

function CollectionPage({ collection }) {
  return (
    <React.Fragment>
      <SEO title={collection.name} {...collection} />
      <ProductGrid products={collection.products} />
    </React.Fragment>
  )
}

export async function getServerSideProps({ locale, params }) {
  const pageData = await getPageData({ locale })
  const { collection } = await getCollectionBySlug({
    locale,
    slug: params.slug
  })

  return {
    props: {
      collection,
      ...pageData
    }
  }
}

export default CollectionPage
