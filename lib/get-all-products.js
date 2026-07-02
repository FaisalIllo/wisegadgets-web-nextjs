import hygraphClient, { gql, isHygraphConfigured } from '@/lib/hygraph-client'
import { ProductCardFragment } from '@/lib/graphql-fragments'

export const getAllProductsQuery = gql`
  query AllProductsQuery($locale: Locale!) {
    products(locales: [$locale, en]) {
      ...ProductCardFragment
    }
  }

  ${ProductCardFragment}
`

async function getAllProducts({ locale = 'en' }) {
  if (!isHygraphConfigured) {
    return { products: [] }
  }

  const { products } = await hygraphClient.request(getAllProductsQuery, {
    locale
  })
  return { products }
}

export default getAllProducts
