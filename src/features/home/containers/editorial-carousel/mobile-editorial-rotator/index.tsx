'use client'

import Image from 'next/image'
import Link from 'next/link'

import { editorialItems } from '@/features/home/containers/editorial-carousel/constants'
import { editorialMessages } from '@/features/home/containers/editorial-carousel/messages'
import { editorialStyles } from '@/features/home/containers/editorial-carousel/styles'
import { Button } from '@/primitives/button'
import { cn } from '@/utils/classnames'

import { useEditorialRotator } from './hooks'

export function MobileEditorialRotator() {
  const { advanceManually, index, item, paused, togglePause, visible } =
    useEditorialRotator()
  const message = editorialMessages.items[item.messageKey]

  return (
    <article
      aria-label={`${index + 1} de ${editorialItems.length}`}
      className={editorialStyles.card}
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="100vw"
        className={cn(
          editorialStyles.image,
          visible ? editorialStyles.visible : editorialStyles.hidden,
        )}
      />
      <div className={editorialStyles.overlay} aria-hidden="true" />
      <Button
        type="button"
        nativeButton
        variant="icon"
        className={editorialStyles.advance}
        aria-label={editorialMessages.nextLabel}
        onClick={advanceManually}
      />
      <Button
        type="button"
        nativeButton
        variant="secondary"
        className={editorialStyles.pause}
        aria-label={
          paused ? editorialMessages.resumeLabel : editorialMessages.pauseLabel
        }
        onClick={togglePause}
      >
        {paused ? editorialMessages.resumeLabel : editorialMessages.pauseLabel}
      </Button>
      <h2 className={editorialStyles.title}>{message.title}</h2>
      <Link href={item.href} className={editorialStyles.cta}>
        {message.cta}
      </Link>
    </article>
  )
}
