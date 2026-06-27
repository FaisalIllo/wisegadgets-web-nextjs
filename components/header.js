import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'

import { useEffect, useMemo, useState } from 'react'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { useSettingsContext } from '@/context/settings'
import { ShoppingCart, Menu, Search, X } from 'lucide-react'

function Header({ pages = [], productSuggestions = [] }) {
  const { cartTotal, totalItems = 0 } = useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()
  const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchFocused, setSearchFocused] = useState(false)
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false)
  useEffect(() => {
    if (typeof router.query.q === 'string') {
      setSearchTerm(router.query.q)
      return
    }

    setSearchTerm('')
  }, [router.query.q])

  const matchingSuggestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) return []

    return productSuggestions
      .filter((product) => product.name?.toLowerCase().includes(query))
      .slice(0, 5)
  }, [productSuggestions, searchTerm])
  const shouldShowSuggestions =
    isSearchFocused && matchingSuggestions.length > 0

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    const query = searchTerm.trim()

    router.push({
      pathname: '/',
      query: query ? { q: query } : {}
    })

    setHamburgerMenuOpen(false)
    setMobileSearchOpen(false)
    setSearchFocused(false)
  }

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.name)
    setSearchFocused(false)
    setMobileSearchOpen(false)
    setHamburgerMenuOpen(false)
    router.push(`/products/${product.slug}`)
  }

  return (
    <header className="sticky top-0 z-50 bg-white py-[0.5rem] shadow-sm border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex flex-wrap items-center justify-between gap-3 min-h-16 py-2">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-shrink-0 items-center gap-2 text-gray-900 transition hover:text-gray-700"
            >
              <img
                src="/wisegadgets-logo.PNG"
                alt="WiseGadgets logo"
                className="h-10 w-10 rounded-xl md:h-12 md:w-12"
              />
              <span className="font-bold text-lg md:text-xl">WiseGadgets</span>
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

          <div
            className={`relative order-3 mx-auto w-full max-w-xs [@media_(orientation:landscape)_and_(max-height:163.4mm)]:!max-w-[14rem] md:order-none md:mx-0 md:block md:max-w-sm md:flex-1 ${
              isMobileSearchOpen
                ? 'block [@media_(orientation:landscape)_and_(max-height:163.4mm)]:!block'
                : 'hidden [@media_(orientation:landscape)_and_(max-height:163.4mm)]:!hidden'
            }`}
          >
            <form
              role="search"
              onSubmit={handleSearchSubmit}
              className="flex w-full items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-1.5 transition focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 md:px-3 md:py-2"
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
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search gadgets"
                className="ml-2 min-w-0 flex-1 bg-transparent text-base text-gray-800 placeholder:text-gray-400 focus:outline-none md:text-sm"
                autoComplete="off"
              />
              <button
                type="submit"
                className="ml-2 rounded-full bg-indigo-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 md:px-3 md:text-sm"
              >
                Search
              </button>
            </form>

            {shouldShowSuggestions && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                {matchingSuggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-700 focus:bg-indigo-50 focus:text-indigo-700 focus:outline-none"
                    onPointerDown={(event) => {
                      event.preventDefault()
                      handleSuggestionClick(product)
                    }}
                    onClick={(event) => {
                      if (event.detail === 0) handleSuggestionClick(product)
                    }}
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setMobileSearchOpen((isOpen) => !isOpen)}
              className="inline-flex rounded-full p-2 text-gray-400 transition hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 md:hidden [@media_(orientation:landscape)_and_(max-height:163.4mm)]:!inline-flex"
              aria-label="Open product search"
              aria-expanded={isMobileSearchOpen}
            >
              <Search className="h-6 w-6" aria-hidden="true" />
            </button>

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
