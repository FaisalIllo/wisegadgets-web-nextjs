import { gql, GraphQLClient } from 'graphql-request'

export const isHygraphConfigured = Boolean(process.env.HYGRAPH_ENDPOINT)

export default new GraphQLClient(process.env.HYGRAPH_ENDPOINT || 'https://example.com/graphql', {
  headers: {
    ...(process.env.HYGRAPH_QUERY_TOKEN && {
      Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`
    })
  }
})

export { gql }
