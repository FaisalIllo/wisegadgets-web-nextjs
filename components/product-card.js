import Link from 'next/link'
import Image from 'next/image'

import { formatCurrencyValue } from '@/utils/format-currency-value'
import { getProductMemory } from '@/utils/get-product-memory'
import { useSettingsContext } from '@/context/settings'
import SoldStickerBadge from '@/components/sold-sticker-badge'

function ProductCard({
  id,
  description,
  images,
  name,
  price,
  slug,
  sold,
  compactSoldBadgeOnMobile = false
}) {
  const { activeCurrency } = useSettingsContext()

  const [primaryImage] = images
  const isSold = sold === true
  const memorySize = getProductMemory(description)
  const soldBadgeClassName = [
    'absolute right-1 top-1 z-20 h-28 w-28 -rotate-12 sm:right-2 sm:top-2 sm:h-36 sm:w-36 md:h-44 md:w-44',
    compactSoldBadgeOnMobile ? 'origin-top-right scale-[0.74] sm:scale-100' : ''
  ].join(' ')

  return (
    <article key={id}>
      <Link
        href={`/products/${slug}`}
        className="group no-underline w-full h-full flex"
      >
        <div className="bg-gray-50 rounded-xl cursor-pointer w-full overflow-hidden relative px-2 py-4 sm:px-3 sm:py-6 md:px-6 transition-shadow hover:shadow-md">
          {isSold ? (
            <SoldStickerBadge className={soldBadgeClassName} />
          ) : null}

          {memorySize ? (
            <div className="absolute left-3 top-3 z-10 rounded-md bg-indigo-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base">
              {memorySize}
            </div>
          ) : null}

          {primaryImage ? (
            <div className="relative mx-auto block w-fit overflow-hidden rounded-lg">
              <Image
                src={primaryImage.url}
                height={primaryImage.height}
                width={primaryImage.width}
                alt={name}
                className={`transition-all ease-in-out group-hover:scale-105 ${
                  isSold ? 'brightness-[0.58] grayscale-[0.35]' : ''
                }`}
                title={name}
              />
              {isSold ? (
                <div
                  className="absolute inset-0 bg-black/25"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          ) : null}

          <div className="pt-3 sm:pt-6 text-center">
            <p className="text-gray-800 font-semibold text-sm sm:text-lg group-hover:text-blue-400 mb-1">
              {name}
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: price
              })}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
