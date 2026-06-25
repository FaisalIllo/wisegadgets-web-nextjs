import * as React from 'react'

import getAllProducts from '@/lib/get-all-products'
import getPageData from '@/lib/get-page-data'
import ProductGrid from '@/components/product-grid'

function IndexPage({ products, searchQuery }) {
  return (
    <React.Fragment>
      {searchQuery && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">
            Search results for
          </p>
          <h1 className="text-2xl font-bold text-gray-900">
            “{searchQuery}”
          </h1>
        </div>
      )}
      <ProductGrid
        products={products}
        searchQuery={searchQuery}
        compactSoldBadgeOnMobile
      />
    </React.Fragment>
  )
}

export async function getServerSideProps({ locale, query }) {
  const pageData = await getPageData({ locale })
  const { products } = await getAllProducts({ locale })
  const searchQuery = typeof query.q === 'string' ? query.q.trim() : ''
  const normalizedSearchQuery = searchQuery.toLowerCase()
  const filteredProducts = normalizedSearchQuery
    ? products.filter((product) =>
        [product.name, product.slug]
          .filter(Boolean)
          .some((value) =>
            value.toLowerCase().includes(normalizedSearchQuery)
          )
      )
    : products

  return {
    props: { ...pageData, products: filteredProducts, searchQuery }
  }
}

export default IndexPage
