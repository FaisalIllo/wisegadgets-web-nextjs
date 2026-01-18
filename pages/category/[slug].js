import * as React from 'react'

import getCategoryBySlug from '@/lib/get-category-slug'
import getPageData from '@/lib/get-page-data'
import ProductGrid from '@/components/product-grid'
import SEO from '@/components/seo'

function CategoryPage({ category }) {
  return (
    <React.Fragment>
      <SEO title={category.name} {...category} />
      <ProductGrid products={category.products} />
    </React.Fragment>
  )
}

export async function getServerSideProps({ locale, params }) {
  const pageData = await getPageData({ locale })
  const { category } = await getCategoryBySlug({
    locale,
    slug: params.slug
  })

  return {
    props: {
      category,
      ...pageData
    }
  }
}

export default CategoryPage
