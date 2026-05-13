import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'

import { useEffect, useState } from 'react'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { useSettingsContext } from '@/context/settings'
import { ShoppingCart, Menu, Search, X } from 'lucide-react'

function Header({ pages = [] }) {
  const { cartTotal, totalItems = 0 } = useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()
  const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (typeof router.query.q === 'string') {
      setSearchTerm(router.query.q)
      return
    }

    setSearchTerm('')
  }, [router.query.q])

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    const query = searchTerm.trim()

    router.push({
      pathname: '/',
      query: query ? { q: query } : {}
    })

    setHamburgerMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white py-[0.5rem] shadow-sm border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex flex-wrap items-center justify-between gap-3 min-h-16 py-2">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <p className="font-bold text-lg text-gray-900 hover:text-gray-700 transition">
                WiseGadgets
              </p>
            </Link>

            {/* Navigation Links */}
            {pages.length > 0 && (
              <ul className="hidden md:flex md:space-x-1">
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
          </div>

          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="order-3 flex w-full items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-2 transition focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 md:order-none md:max-w-sm md:flex-1"
          >
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search gadgets"
              className="ml-2 w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              Search
            </button>
          </form>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition"
              aria-label={`Shopping cart with ${totalItems} ${
                totalItems === 1 ? 'item' : 'items'
              }`}
            >
              <span className="hidden sm:inline text-base font-medium">
                {formatCurrencyValue({
                  currency: activeCurrency,
                  value: cartTotal
                })}
              </span>
              <span className="relative inline-flex">
                <ShoppingCart
                  className="h-6 w-6 text-gray-400 hover:text-gray-600 transition"
                  aria-hidden="true"
                />
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-bold leading-none text-white">
                    {totalItems}
                  </span>
                )}
              </span>
            </Link>

            {/* Hamburger Menu */}
            <button
              onClick={() => setHamburgerMenuOpen(!isHamburgerMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isHamburgerMenuOpen ? (
                <X className="h-6 w-6 text-gray-400 hover:text-gray-600 transition" />
              ) : (
                <Menu className="h-6 w-6 text-gray-400 hover:text-gray-600 transition" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isHamburgerMenuOpen && pages.length > 0 && (
          <ul className="md:hidden space-y-2 pb-4">
            {pages.map((page) => (
              <li key={page.id}>
                <Link
                  href={`/${page.type.toLowerCase()}/${page.slug}`}
                  className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md py-2 px-3 font-medium transition"
                  onClick={() => setHamburgerMenuOpen(false)}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header
