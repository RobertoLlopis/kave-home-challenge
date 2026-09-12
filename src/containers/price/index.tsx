import { formatPrice } from '@/utils/format-price'
import { Skeleton } from '@/primitives/skeleton'
import { cn } from '@/utils/classnames'
import { priceStyles } from './styles'
import type { PreviousPartProps, PreviousPriceProps, PriceProps } from './types'

function PreviousPrice({ value }: PreviousPriceProps) {
  return <del className={priceStyles.previous}>{formatPrice(value)}</del>
}

function PreviousPart({ previous, value }: PreviousPartProps) {
  if (previous == null || previous === value) return null
  return <PreviousPrice value={previous} />
}

export function Price({ value, previous, className }: PriceProps) {
  return (
    <span data-slot="price" className={cn(priceStyles.root, className)}>
      <span>{formatPrice(value)}</span>
      <PreviousPart previous={previous} value={value} />
    </span>
  )
}

Price.Loading = function PriceLoading() {
  return <Skeleton className={priceStyles.loading} aria-hidden="true" />
}
