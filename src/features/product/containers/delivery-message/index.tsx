import { Truck } from 'lucide-react'

import { Skeleton } from '@/primitives/skeleton'
import { commonStyles } from '@/styles/common'

import { deliveryMessageConstants } from './constants'
import { deliveryDateRange, formatDeliveryDate } from './helpers'
import { deliveryMessages } from './messages'
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
        {deliveryMessages.deliveryPrefix}{' '}
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

DeliveryMessage.Loading = function DeliveryMessageLoading() {
  return (
    <div className={deliveryMessageStyles.delivery} aria-hidden="true">
      <Skeleton className={deliveryMessageStyles.loadingIcon} />
      <Skeleton className={deliveryMessageStyles.loadingText} />
    </div>
  )
}
