import { productPurchaseConstants } from './constants'

export function availableQuantities(stock: number) {
  const quantity =
    Number.isInteger(stock) && stock > 0
      ? Math.min(stock, productPurchaseConstants.maximumQuantity)
      : productPurchaseConstants.maximumQuantity
  return Array.from({ length: quantity }, (_, index) => index + 1)
}
