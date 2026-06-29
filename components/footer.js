import { useRouter } from 'next/router'
import Link from 'next/link'

import { Select } from '@/ui/form'
import { currencies, locales } from 'hygraph.config'
import { useSettingsContext } from '@/context/settings'

function Footer({ categories = [], collections = [] }) {
  const router = useRouter()
  const { activeCurrency, switchCurrency } = useSettingsContext()

  const activeLocale = locales.find((locale) => locale.value === router.locale)

  const updateCurrency = (event) => {
    const currency = currencies.find(
      (currency) => currency.code === event.target.value
    )

    switchCurrency(currency)
  }

  const updateLocale = (event) => {
    const path = ['/cart'].includes(router.asPath) ? router.asPath : '/'

    router.push(path, path, { locale: event.target.value })
  }

  const currentYear = new Date().getUTCFullYear()

  return (
    <footer className="bg-gray-100 mt-10" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="xl:col-span-4">
            <div className="grid grid-cols-2 gap-8">
              {categories.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Categories
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/${category.type.toLowerCase()}/${
                            category.slug
                          }`}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {collections.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Collections
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {collections.map((collection) => (
                      <li key={collection.id}>
                        <Link
                          href={`/${collection.type.toLowerCase()}/${
                            collection.slug
                          }`}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {collection.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-12 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Language &amp; Currency
            </h3>
            <form className="mt-4 space-y-4 sm:max-w-xs">
              <Select
                className="w-full"
                defaultValue={activeLocale.value}
                field="language"
                label="Language"
                onChange={updateLocale}
                options={locales}
              />
              <Select
                className="w-full"
                defaultValue={activeCurrency.code}
                field="currency"
                label="Currency"
                onChange={updateCurrency}
                options={currencies.map((currency) => ({
                  label: currency.code,
                  value: currency.code
                }))}
              />
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link
              href="https://wa.me/message/CML5HDUUZLCQN1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">WhatsApp</span>
              <WhatsAppIcon className="h-6 w-6" />
            </Link>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {currentYear} G I R I X C O. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
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

export default Footer
