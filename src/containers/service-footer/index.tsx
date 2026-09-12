import { Truck } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils/classnames'
import { serviceFooterConstants } from './constants'
import { deliveryDateRange, formatDeliveryDate } from './helpers'
import { serviceFooterStyles } from './styles'
import type { DeliveryMessageProps } from './types'

export function ServiceFooter() {
  return (
    <footer className={serviceFooterStyles.root}>
      {serviceFooterConstants.services.map((service) => (
        <div
          className={cn(
            serviceFooterStyles.item,
            service.desktopHidden && serviceFooterStyles.desktopHidden,
          )}
          key={service.title}
        >
          <span className={serviceFooterStyles.spanSemibold}>
            {service.title}
          </span>
          <Link href="#">{service.link}</Link>
        </div>
      ))}
    </footer>
  )
}

export function DeliveryMessage({ now = new Date() }: DeliveryMessageProps) {
  const [minimum, maximum] = deliveryDateRange(
    now,
    serviceFooterConstants.deliveryMinDays,
    serviceFooterConstants.deliveryMaxDays,
  )
  return (
    <p className={serviceFooterStyles.delivery}>
      <Truck aria-hidden="true" />
      <span>
        {serviceFooterConstants.deliveryPrefix}{' '}
        <span className={serviceFooterStyles.spanSemibold}>
          {formatDeliveryDate(minimum)}
        </span>{' '}
        y el{' '}
        <span className={serviceFooterStyles.spanSemibold}>
          {formatDeliveryDate(maximum)}
        </span>
        .
      </span>
    </p>
  )
}

ServiceFooter.Loading = function ServiceFooterLoading() {
  return <div className={serviceFooterStyles.loading} aria-hidden="true" />
}
