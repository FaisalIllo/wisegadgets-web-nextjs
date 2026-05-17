import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'
import Button from '@/components/ui/button'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import getPageData from '@/lib/get-page-data'
import SEO from '@/components/seo'
import { useSettingsContext } from '@/context/settings'
import useSubmissionState from 'hooks/use-form-submission'
import { ChevronDown, ChevronUp, ShoppingCart, X } from 'lucide-react'

function Cart() {
  const { cartTotal, isEmpty, items, removeItem, updateItemQuantity } =
    useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()
  const { submissionLoading } = useSubmissionState()
  const decrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity - 1)

  const incrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity + 1)

  const handleClick = () => {
    const origin = window.location.origin
    const locale = router.locale || router.defaultLocale
    const itemLines = items.map((item, index) => {
      const localizedItem = item[locale] || item[router.defaultLocale] || {}
      const productUrl = localizedItem.slug
        ? `${origin}/products/${localizedItem.slug}`
        : origin
      const itemTotal = formatCurrencyValue({
        currency: activeCurrency,
        value: item.itemTotal
      })

      return `${index + 1}. ${localizedItem.name || 'Product'} x ${
        item.quantity
      } - ${itemTotal} (${productUrl})`
    })
    const cartTotalValue = formatCurrencyValue({
      currency: activeCurrency,
      value: cartTotal
    })
    const message = [
      'Hello Wise Gadgets, I would like to checkout this cart:',
      '',
      ...itemLines,
      '',
      `Cart total: ${cartTotalValue}`
    ].join('\n')
    const whatsappUrl = `https://wa.me/2347074058547?text=${encodeURIComponent(
      message
    )}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  if (isEmpty)
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center">
        <SEO title="Checkout" />
        <ShoppingCart className="h-12 w-12 text-gray-400" />
        <p className="text-gray-600 text-lg">Your cart is empty</p>
        <Link href="/" className="text-indigo-600 hover:underline mt-2">
          Continue Shopping
        </Link>
      </div>
    )

  return (
    <div className="max-w-2xl mx-auto">
      <SEO title="Checkout" />
      <div className="space-y-3 md:space-y-0">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={() => removeItem(item.id)}
            onIncrement={() => incrementItemQuantity(item)}
            onDecrement={() => decrementItemQuantity(item)}
            isLoading={submissionLoading}
          />
        ))}
      </div>
      <CartSummary
        total={cartTotal}
        onCheckout={handleClick}
        isLoading={submissionLoading}
      />
    </div>
  )

  function CartItem({ item, onRemove, onIncrement, onDecrement, isLoading }) {
    return (
      <div className="md:bg-gray-50 md:rounded-lg flex items-center py-3 md:py-6 md:px-6 md:mb-3">
        <div className="w-3/5 flex flex-grow items-center">
          <div className="h-16 md:h-20 w-16 md:w-20 mr-4 bg-gray-50 p-1 rounded-lg">
            <Image
              src={item.image.url}
              width={item.image.width}
              height={item.image.height}
              alt={item[router.locale].name}
            />
          </div>
          <div>
            <Link
              href={`/products/${item[router.locale].slug}`}
              className="text-gray-800 font-medium text-sm md:text-base"
            >
              {item[router.locale].name}
            </Link>
            <button
              className="text-gray-400 hover:text-indigo-600 text-xs flex items-center focus:outline-none"
              onClick={onRemove}
              disabled={isLoading}
            >
              <X className="h-3 w-3" />
              Remove
            </button>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-center ml-auto">
          <button
            className="text-gray-400 hover:text-indigo-600 focus:outline-none p-1"
            onClick={onIncrement}
            disabled={isLoading}
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <span className="mx-3 md:mx-6 p-1">{item.quantity}</span>
          <button
            className="text-gray-400 hover:text-indigo-600 focus:outline-none p-1"
            onClick={onDecrement}
            disabled={isLoading}
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="text-right md:w-1/5">
          <p className="font-medium text-gray-800">
            {formatCurrencyValue({
              currency: activeCurrency,
              value: item.itemTotal
            })}
          </p>
          {item.quantity > 1 && (
            <p className="text-gray-400 text-sm">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: item.price
              })}{' '}
              each
            </p>
          )}
        </div>
      </div>
    )
  }

  function CartSummary({ total, onCheckout, isLoading }) {
    return (
      <div className="mt-3 md:mt-6 py-3 md:py-6 border-t-2 border-gray-50">
        <div className="flex flex-col items-center md:items-end">
          <div className="flex flex-col items-center md:items-end mb-3">
            <span className="text-gray-700">Sub total</span>
            <span className="text-xl font-bold text-indigo-600">
              {formatCurrencyValue({ currency: activeCurrency, value: total })}
            </span>
          </div>
          <Button
            onClick={onCheckout}
            disabled={isLoading}
            className="bg-[#25D366] hover:bg-[#1DA851] px-5 py-3 rounded-full text-white text-sm font-bold tracking-widest uppercase focus:outline-none inline-flex items-center gap-2"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Checkout via WhatsApp
          </Button>
        </div>
      </div>
    )
  }
}

function WhatsAppIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.03 4C9.42 4 4.05 9.36 4.05 15.94c0 2.11.56 4.18 1.61 5.99L4 28l6.24-1.63a12.03 12.03 0 0 0 5.79 1.47C22.64 27.84 28 22.48 28 15.9 28 9.36 22.64 4 16.03 4Zm0 21.82c-1.78 0-3.53-.48-5.05-1.38l-.36-.21-3.7.97.99-3.59-.24-.37a9.88 9.88 0 0 1-1.52-5.3c0-5.47 4.43-9.92 9.88-9.92 5.45 0 9.88 4.45 9.88 9.92 0 5.45-4.43 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.75-.71 2-1.4.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  )
}

export async function getServerSideProps({ locale }) {
  const pageData = await getPageData({ locale })

  return {
    props: {
      ...pageData
    }
  }
}

export default Cart
