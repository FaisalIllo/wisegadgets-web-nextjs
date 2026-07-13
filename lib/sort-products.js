function getUploadedAtTimestamp(product) {
  const timestamp = new Date(product.createdAt || 0).getTime()

  return Number.isNaN(timestamp) ? 0 : timestamp
}

export function sortProductsByAvailabilityAndNewest(products = []) {
  return [...products].sort((leftProduct, rightProduct) => {
    const leftSoldRank = leftProduct.sold === true ? 1 : 0
    const rightSoldRank = rightProduct.sold === true ? 1 : 0

    if (leftSoldRank !== rightSoldRank) {
      return leftSoldRank - rightSoldRank
    }

    return (
      getUploadedAtTimestamp(rightProduct) - getUploadedAtTimestamp(leftProduct)
    )
  })
}
