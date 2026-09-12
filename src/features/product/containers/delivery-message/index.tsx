import { Truck } from 'lucide-react'
import { commonStyles } from '@/styles/common'
import { deliveryMessageConstants } from './constants'
import { deliveryDateRange, formatDeliveryDate } from './helpers'
import { deliveryMessageStyles } from './styles'
import type { DeliveryMessageProps } from './types'

export function DeliveryMessage({ now = new Date() }: DeliveryMessageProps) {
  const [minimum, maximum] = deliveryDateRange(
    now,
    deliveryMessageConstants.deliveryMinDays,
    deliveryMessageConstants.deliveryMaxDays,
  )
  return (
    <p className={deliveryMessageStyles.delivery}>
      <Truck aria-hidden="true" />
      <span>
        {deliveryMessageConstants.deliveryPrefix}{' '}
        <span className={commonStyles.spanSemibold}>
          {formatDeliveryDate(minimum)}
        </span>{' '}
        y el{' '}
        <span className={commonStyles.spanSemibold}>
          {formatDeliveryDate(maximum)}
        </span>
        .
      </span>
    </p>
  )
}
