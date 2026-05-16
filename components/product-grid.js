import ProductCard from '@/components/product-card'

function ProductGrid({ products, searchQuery }) {
  if (!products.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
        <p className="text-lg font-semibold text-gray-900">
          No products found
        </p>
        <p className="mt-2 text-gray-500">
          {searchQuery
            ? `Try a different search than “${searchQuery}”.`
            : 'Check back soon for new gadgets.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3">
      {products.map(ProductCard)}
    </div>
  )
}

export default ProductGrid
