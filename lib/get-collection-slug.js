import hygraphClient, { gql } from '@/lib/hygraph-client'
import {
  CollectionFragment,
  ProductCardFragment
} from '@/lib/graphql-fragments'
import { sortProductsByAvailabilityAndNewest } from '@/lib/sort-products'

export const getCollectionSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    collections(where: { slug: $slug }, locales: [$locale, en]) {
      ...CollectionFragment
      products(orderBy: createdAt_DESC) {
        ...ProductCardFragment
      }
    }
  }

  ${[CollectionFragment, ProductCardFragment]}
`

async function getCollectionBySlug({ locale = 'en', slug }) {
  const {
    collections: [collection]
  } = await hygraphClient.request(getCollectionSlugQuery, {
    locale,
    slug
  })

  return {
    collection: collection
      ? {
          ...collection,
          products: sortProductsByAvailabilityAndNewest(collection.products)
        }
      : collection
  }
}

export default getCollectionBySlug
