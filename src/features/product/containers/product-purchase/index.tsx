import { ChevronDown } from 'lucide-react'

import { Button } from '@/primitives/button'
import { Skeleton } from '@/primitives/skeleton'

import { productPurchaseConstants } from './constants'
import { availableQuantities } from './helpers'
import { purchaseStyles } from './styles'

import type { ProductPurchaseProps } from './types'

export function ProductPurchase({ stock }: ProductPurchaseProps) {
  return (
    <div className={purchaseStyles.root}>
      <label htmlFor="quantity" className={purchaseStyles.label}>
        {productPurchaseConstants.quantityLabel}
      </label>
      <div className={purchaseStyles.row}>
        <div className={purchaseStyles.selectWrapper}>
          <select
            id="quantity"
            defaultValue="1"
            className={purchaseStyles.select}
            aria-label={productPurchaseConstants.quantityLabel}
          >
            {availableQuantities(stock).map((quantity) => (
              <option key={quantity}>{quantity}</option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className={purchaseStyles.selectIcon}
          />
        </div>
        <Button
          disabled
          variant="purchase"
          className={purchaseStyles.cta}
          aria-label={productPurchaseConstants.unavailableLabel}
        >
          {productPurchaseConstants.cta}
        </Button>
      </div>
    </div>
  )
}

ProductPurchase.Loading = function ProductPurchaseLoading() {
  return (
    <div className={purchaseStyles.root} aria-hidden="true">
      <div className={purchaseStyles.row}>
        <Skeleton className={purchaseStyles.loadingSelect} />
        <Skeleton className={purchaseStyles.loadingCta} />
      </div>
    </div>
  )
}
