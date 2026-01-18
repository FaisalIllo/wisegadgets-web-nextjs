import hygraphMutationClient, { gql } from '@/lib/hygraph-mutation-client'

export const createOrderMutation = gql`
  mutation CreateOrderMutation($order: OrderCreateInput!) {
    order: createOrder(data: $order) {
      id
    }
  }
`

async function createOrder({ sessionId }) {
  return await hygraphMutationClient.request(createOrderMutation, {
    order: {
      email: 'placeholder.email.com',
      total: 0,
      stripeCheckoutId: sessionId,
      orderItems: {
        create: []
      }
    }
  })
}

export default createOrder
