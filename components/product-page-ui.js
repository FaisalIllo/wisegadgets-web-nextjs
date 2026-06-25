import * as React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useCart } from 'react-use-cart'

import Button from '@/ui/button'
import ImageCarousel from '@/ui/image-carousel'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import ProductReviews from '@/components/product-reviews'
import { useSettingsContext } from '@/context/settings'

function ProductPageUI({ product }) {
  const { addItem } = useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()
  const activeVariantId = product.variants[0]?.id || product.id
  const isSold = product.sold === true

  const addToCart = () => {
    const itemMetadata = router.locales.reduce(
      (acc, locale) => ({
        ...acc,
        [locale]: {
          ...product.localizations.find(
            (localization) => localization.locale === locale
          )
        }
      }),
      {}
    )

    addItem(
      {
        id: activeVariantId,
        productId: product.id,
        image: product.images[0],
        price: product.price,
        ...itemMetadata
      },
      1
    )
  }

  return (
    <div className="lg:flex -mx-6">
      <div className="mb-8 px-6 md:mb-0 lg:w-1/2">
        <div className="w-full overflow-hidden relative bg-gainsboro rounded-lg">
          <ImageCarousel
            images={product.images.map((img) => img.url)}
            alt={product.name}
          />
        </div>
      </div>
      <div className="px-6 md:py-3 lg:w-1/2">
        <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary leading-tight">
          {product.name}
        </h1>
        <div className="mb-6">
          <p className="font-semibold text-2xl text-slategray">
            {formatCurrencyValue({
              currency: activeCurrency,
              value: product.price
            })}
          </p>
        </div>
        <div className="mb-6">
          <p className="leading-loose text-lightgray">{product.description}</p>
        </div>
        {isSold ? (
          <div className="inline-block rounded-md bg-red-600 px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm font-bold uppercase tracking-widest text-white">
            SOLD!
          </div>
        ) : (
          <Button onClick={addToCart}>Add to cart</Button>
        )}

        <ProductReviews product={product} />
      </div>
    </div>
  )
}

export default ProductPageUI
