import Link from 'next/link'
import { useCart } from 'react-use-cart'

import { formatCurrencyValue } from '@/utils/format-currency-value'
import { useSettingsContext } from '@/context/settings'
import { ShoppingCart } from 'lucide-react'

function Header({ pages = [] }) {
  const { cartTotal } = useCart()
  const { activeCurrency } = useSettingsContext()

  return (
    <header className="sticky top-0 z-50 bg-white py-[0.5rem] shadow-sm border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <p className="font-bold text-lg text-gray-900 hover:text-gray-700 transition">
              WiseGadgets
            </p>
          </Link>

          {/* Navigation Links */}
          {pages.length > 0 && (
            <ul className="hidden md:flex md:flex-grow md:justify-center md:space-x-1">
              {pages.map((page) => (
                <li key={page.id}>
                  <Link
                    href={`/${page.type.toLowerCase()}/${page.slug}`}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md py-2 px-3 font-medium transition"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition"
          >
            <span className="text-base font-medium">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: cartTotal
              })}
            </span>
            <ShoppingCart
              className="h-6 w-6 text-gray-400 hover:text-gray-600 transition"
              aria-hidden="true"
            />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
