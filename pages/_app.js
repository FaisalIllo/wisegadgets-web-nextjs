import 'nprogress/nprogress.css'
import 'tailwindcss/tailwind.css'

import NProgress from 'nprogress'
import Router from 'next/router'
import Layout from '@/components/layout'
import { CartProvider } from 'react-use-cart'
import { SettingsProvider } from '@/context/settings'

NProgress.configure({
  minimum: 0.9,
  easing: 'ease',
  speed: 500,
  showSpinner: false
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <CartProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </SettingsProvider>
  )
}

export default App
