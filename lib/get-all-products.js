import hygraphClient, { gql } from '@/lib/hygraph-client'
import { ProductCardFragment } from '@/lib/graphql-fragments'
import { sortProductsByAvailabilityAndNewest } from '@/lib/sort-products'

export const getAllProductsQuery = gql`
  query AllProductsQuery($locale: Locale!) {
    products(locales: [$locale, en], orderBy: createdAt_DESC) {
      ...ProductCardFragment
    }
  }

  ${ProductCardFragment}
`

async function getAllProducts({ locale = 'en' }) {
  const { products } = await hygraphClient.request(getAllProductsQuery, {
    locale
  })
  return { products: sortProductsByAvailabilityAndNewest(products) }
}

export default getAllProducts
