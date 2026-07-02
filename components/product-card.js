import Link from 'next/link'
import Image from 'next/image'

import { formatCurrencyValue } from '@/utils/format-currency-value'
import { useSettingsContext } from '@/context/settings'

function ProductCard({
  id,
  images,
  name,
  price,
  slug,
  sold,
  description,
  variants = [],
  compactSoldBadgeOnMobile = false
}) {
  const { activeCurrency } = useSettingsContext()

  const [primaryImage] = images
  const isSold = sold === true
  const memorySize = getProductMemorySize({ description, name, variants })
  const soldBadgeClassName = [
    'rounded-md bg-red-600 px-3 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-md sm:px-4 sm:py-3 sm:text-sm',
    compactSoldBadgeOnMobile ? 'origin-top-left scale-[0.69] sm:scale-100' : ''
  ].join(' ')

  return (
    <article key={id}>
      <Link
        href={`/products/${slug}`}
        className="group no-underline w-full h-full flex"
      >
        <div className="bg-gray-50 rounded-xl cursor-pointer w-full overflow-hidden relative px-2 py-4 sm:px-3 sm:py-6 md:px-6 transition-shadow hover:shadow-md">
          {isSold ? (
            <div className={`absolute left-3 top-3 z-10 ${soldBadgeClassName}`}>
              SOLD!
            </div>
          ) : null}
          {memorySize ? (
            <div className="absolute right-3 top-3 z-10 rounded-md bg-indigo-600 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white shadow-md sm:px-2.5 sm:py-1.5 sm:text-xs">
              {memorySize}
            </div>
          ) : null}

          {primaryImage ? (
            <Image
              src={primaryImage.url}
              height={primaryImage.height}
              width={primaryImage.width}
              alt={name}
              className="transition-all ease-in-out group-hover:scale-105 mx-auto"
              title={name}
            />
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

function getProductMemorySize({ description, name, variants = [] }) {
  const searchableText = [
    name,
    description,
    ...variants.map((variant) => variant?.name)
  ]
    .filter(Boolean)
    .join(' ')

  const storageMatch = searchableText.match(
    /(?:storage|memory|rom|internal(?:\s+memory)?)[^0-9]{0,20}(\d+(?:\.\d+)?)\s*(tb|gb)\b|(\d+(?:\.\d+)?)\s*(tb|gb)\b[^a-z0-9]{0,20}(?:storage|memory|rom|internal(?:\s+memory)?)/i
  )

  if (storageMatch) {
    return formatMemorySize(
      storageMatch[1] || storageMatch[3],
      storageMatch[2] || storageMatch[4]
    )
  }

  const capacityMatches = [
    ...searchableText.matchAll(/(\d+(?:\.\d+)?)\s*(tb|gb)\b/gi)
  ]

  const likelyStorageMatch = capacityMatches.find((match) => {
    const amount = Number(match[1])
    const unit = match[2].toLowerCase()

    return unit === 'tb' || amount >= 32
  })

  return likelyStorageMatch
    ? formatMemorySize(likelyStorageMatch[1], likelyStorageMatch[2])
    : null
}

function formatMemorySize(amount, unit) {
  return `${Number(amount)}${unit.toUpperCase()}`
}
