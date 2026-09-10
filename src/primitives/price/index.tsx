import { formatPrice } from '@/utils/format-price'
import { Skeleton } from '@/primitives/skeleton'
import { priceLabels } from './constants'
import { priceStyles } from './styles'
import type {
  EcoPartLabelProps,
  EcoPartSectionProps,
  PreviousPartProps,
  PreviousPriceProps,
  PriceProps,
} from './types'

function PreviousPrice({ value }: PreviousPriceProps) {
  return <del className={priceStyles.previous}>{formatPrice(value)}</del>
}
function EcoPartLabel({ part }: EcoPartLabelProps) {
  return (
    <small className={priceStyles.eco}>
      {priceLabels.ecoPartPrefix}
      {formatPrice(part.amount)}
      {priceLabels.ecoPartSuffix}
    </small>
  )
}
function PreviousPart({ previous, value }: PreviousPartProps) {
  if (previous == null || previous === value) return null
  return <PreviousPrice value={previous} />
}
function EcoPartSection({ ecoPart }: EcoPartSectionProps) {
  if (!ecoPart || ecoPart.amount <= 0) return null
  return <EcoPartLabel part={ecoPart} />
}
export function Price({ value, previous, ecoPart }: PriceProps) {
  return (
    <span className={priceStyles.root}>
      <strong>{formatPrice(value)}</strong>
      <PreviousPart previous={previous} value={value} />
      <EcoPartSection ecoPart={ecoPart} />
    </span>
  )
}
Price.Loading = function PriceLoading() {
  return <Skeleton className={priceStyles.loading} aria-hidden="true" />
}
